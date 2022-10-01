
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        if (!req.headers) return res.status(401).send({
            code: 401,
            message: 'No headers provided.'
        })
        const token = req.headers.authorization.split(' ')[1]
        console.log('token...', token)
        if (!token) return res.status(401).send({
            code: 401,
            message: 'No token provided.'
        })

        jwt.verify(token, "WALLASecret", (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    code: 401,
                    message: 'Failed to authenticate token.'
                })
            }
            const { id, facebookId } = decoded

            req.session = {
                userId: id,
                facebookId: facebookId,
            }
            next()
        })
    } catch (err) {
        return res.status(401).send({
            code: 401,
            message: 'Failed to authenticate token.'
        })
    }
}

module.exports = auth
