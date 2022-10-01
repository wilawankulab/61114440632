const express = require('express')
const bcrypt = require('bcryptjs')

const TransactionModel = require('../../models/TransactionModel')

// const UserDecorator = require('../../decorators/UserDecorator')

const router = express.Router()

router.get('/', async (request, response, next) => {
    ///
    const userId = request.session?.userId;

    const startDate = request.query.endDate;
    const endDate = request.query.endDate;
    const daily = request.query.daily;
    const perMount = request.query.perMount;
    const income = request.query.income;
    const expense = request.query.expense;

    const date = new Date()
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    const where = { idUser: userId }

    if (daily) {
        where.date = {
            $gte: new Date(new Date(year, month, day) + 7 * hour),
            $lte: new Date(new Date(year, month, day + 1) + 7 * hour)
        }
    }

    if (perMount) {
        where.date = {
            $gt: new Date(year, month),
            $lte: new Date(year, month + 1)
        }
    }

    if (income) {
        where.type = 'income';
    }

    if (expense) {
        where.type = 'expense';
    }

    if (startDate && endDate) {
        where.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }


    const transaction = await TransactionModel.find(where).sort({ date: -1 }); 
    const amount = await TransactionModel.aggregate([
        { $match: where },
        { $group: { _id: null, _sum_val: { $sum: "$amount" } } }
    ])

    console.log('amount', amount)

    return response.json({
        code: 200,
        totalAmount: amount[0]?._sum_val || 0,
        message: transaction,

    })
})

router.get('/day', async (request, response, next) => {

    // get userId from middlerwares
    const userId = request.session?.userId;

    // console.log("2020-05-12T23:50:21.817Z")
    const date = new Date()
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const transaction = await TransactionModel.find({
        idUser: userId,
        date: {
            $gte: new Date(year, month, day) + 7 * hour,
            $lt: new Date(year, month, day + 1) + 7 * hour
        }
    })
    return response.json({
        code: 200,
        message: transaction,
    })
})

router.post('/', async (request, response, next) => {

    // get userId from middlerwares
    const userId = request.session?.userId;

    const date = new Date(request.body.date);
    const transaction = new TransactionModel({
        idUser: userId,
        date: date,
        payee: request.body.payee,
        amount: request.body.amount,
        category: request.body.category,
        type: request.body.type
    });
    transaction.save((err, user) => {
        if (err) {
            return response.json({
                code: 500,
                message: err,
            })
        }
        return response.json({
            code: 200,
            message: 'success',
        })
    }
    )

})




module.exports = router