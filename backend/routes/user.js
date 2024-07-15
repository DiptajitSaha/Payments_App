const express = require('express');
const { signupAuthenticator, signinAuthenticator } = require('../middlewares/userMiddlewares');
const { User, Wallet } = require('../db/index');
const { signJwt } = require('../utils/jwtAuth');
const { authMiddleware, passwordCheck } = require('../authentication/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
    
})
router.post('/signup', signupAuthenticator, async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    });

    if (user) {
        if (user.password != req.body.password) res.status(400).json({ msg: "username already taken/ invalid password" });
        else {
            const token = signJwt({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id
            });
            return res.status(411).send({
                message: "Email already taken / Incorrect inputs",
                token,
            });
        }
    }
    else {
        try {
            const user = await User.create(req.body);
            await Wallet.create({
                user: user._id,
            });
            const token = signJwt({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id
            });
            console.log('new user created, username: ' + req.body.username);
            return res.status(200).send({
                msg: 'User created successfully',
                token,
                user: req.body
            });

        }
        catch (e) {
            return res.status(400).send(e);
        }

    }
});

router.post('/signin', signinAuthenticator, async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    });

    if (user) {
        if (user.password != req.body.password) {
            return res.status(411).send({
                message: "Incorrect password",
            });
        }
        const token = signJwt({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        });
        return res.status(200).send({
            msg: 'User signed in successfully',
            token: token
        });
    }
    else {
        res.status(411).json({
            message: "Error while logging in",
        })
    }
});

router.put('/', authMiddleware, passwordCheck, async (req, res) => {
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const update = {};
    if (password) {
        update.password = password;
    }
    if (firstName) {
        update.firstName = firstName;
    }
    if (lastName) {
        update.lastName = lastName;
    }

    await User.findByIdAndUpdate(req.user, update);
    res.status(200).json({
        message: "User updated successfully",
        update
    });
});

router.get('/bulk', authMiddleware, async (req, res) => {
    const parameter = (req.query.filter).toLowerCase();
    console.log(parameter);

    const userList = [];
    const users = await User.find({
        $or: [
            { username: { $regex: parameter } },
            { firstName: { $regex: parameter } },
            { lastName: { $regex: parameter } }
        ]
    });
    users.forEach((user) => {
        userList.push({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        })
    });
    res.status(200).json(userList);
});

module.exports = router;