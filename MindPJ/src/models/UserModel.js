
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        name: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        phone: {
            type: String,
        }

    },
    { timestamps: true },
)

const UserModel = mongoose.model('User', userSchema)


module.exports = UserModel
