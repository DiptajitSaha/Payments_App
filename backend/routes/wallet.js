
const express = require('express');
const { authMiddleware } = require('../authentication/authMiddleware');
const { Wallet, User } = require('../db/index');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res)=> {

    const wallet = await Wallet.findOne({user: req.user});

    res.json({
        balance: wallet.balance/100
    });
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const { amount, to } = req.body;
    const session = await  mongoose.startSession();
    session.startTransaction();
    try {
        const wallet = await Wallet.findOne({user: req.user}).session(session);
        if(wallet.balance < amount*100){
            throw new Error('Insufficient balance');
        }

        const toUser = await Wallet.findOne({ user: to }).session(session);
        if(!toUser){
            throw new Error('User not found');
        }

        await Wallet.updateOne({user: req.user}, { $inc :  { balance : -amount*100}}).session(session);
        await Wallet.updateOne({user: to}, { $inc :  { balance : amount*100}}).session(session);
        await session.commitTransaction();
        res.json({
            message: 'Transfer successful'
        });
        
    }
    catch (e){
        await session.abortTransaction();
        res.status(411).json({
            error: e.message
        });
    }
    finally {
        session.endSession();
    }
    
});

router.put('/addmoney', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    const id = req.user;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const wallet = await Wallet.findOne({user: id}).session(session);
        await Wallet.updateOne({user: id}, { $inc :  { balance : amount*100}});
        res.json({
            message: 'Money added successfully'
        });
        await session.commitTransaction();
    }
    catch (e){
        await session.abortTransaction();
        res.status(411).json({
            error: e.message
        });
    }
    finally{
        session.endSession();
    }

});

router.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    });

})


module.exports = router;