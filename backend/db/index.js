const mongoose = require('mongoose')
mongoose.connect(''); //url here

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});
const WalletSchema = mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, 'balance must be non negetive'],
        require: true
    },
    transactions: {
        type: mongoose.Schema.Types.ObjectId
    }
});
const TransactionSchema = mongoose.Schema({
    sending_user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiving_user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    }
});


const User = mongoose.model('User', userSchema);
const Wallet = mongoose.model('Wallet', WalletSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = {
    User,
    Wallet,
    Transaction
}

