const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 1/2 hour
    max: 3, 
    message:
        { message: 'Too many login attempts, please try again later' },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, 
    legacyHeaders: false, 
})

module.exports = loginLimiter