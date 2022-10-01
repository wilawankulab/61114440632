
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        idUser: {
            type: String
        },
        date: {
            type: Date,
        },
        amount: {
            type: Number,
        },
        category: {
            type: String,
        },
        payee: {
            type: String,
        },
        type: {
            type: String,
        }

    },
    { timestamps: true },
)

const TransactionModel = mongoose.model('Transactions', transactionSchema)


module.exports = TransactionModel
