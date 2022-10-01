const express = require('express')

const jwt = require('jsonwebtoken')
const Joi = require('joi')
const Validate = require('express-joi-validator')
const bcrypt = require('bcryptjs')

const UserModel = require('../../models/UserModel')
const { invalid } = require('joi')

const middleware = require('../../middlewares/authentication')


// const UserDecorator = require('../../decorators/UserDecorator')

const router = express.Router()

router.get('/', async (request, response, next) => {
    const users = await UserModel.find()
    return response.json({
        code: 200,
        message: users,
    })
})

router.get('/me', middleware, async (request, response, next) => {
    const userId = request.session?.userId;
    const users = await UserModel.findOne({ _id: userId })
    return response.json({
        code: 200,
        message: users,
    })
})



router.post('/signup', async (request, response, next) => {
    // const users = await UserModel.find()
    const user = new UserModel({
        username: request.body.username,
        name: request.body.name,
        phone: request.body.phone,
        password: bcrypt.hashSync(request.body.password, 8),
        image: "https://img.freepik.com/premium-vector/flat-yellow-rubber-duck_23-2148289963.jpg?w=2000",
    });
    // console.log("user", user)
    user.save((err, user) => {
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

router.post('/signin', async (request, response, next) => {
    UserModel.findOne({
        username: request.body.username,
    })
        .exec((err, user) => {
            if (err) {
                return response.json({
                    code: 500,
                    message: err,
                })
            }

            if (!user) {
                return response.json({
                    code: 404,
                    message: "user not found",
                })
            }

            var passwordIsValid = bcrypt.compareSync(
                request.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return response.json({
                    code: 401,
                    message: "invalid password",
                })
            }

            var token = jwt.sign({ id: user.id }, "WALLASecret", {
                expiresIn: 86400, // 24 hours
            });
            return response.json({
                code: 200,
                message: "success",
                data: {
                    id: user._id,
                    token: token,
                }
            })
        })
})

module.exports = router