const rateLimiter = require('express-rate-limit')

const limiter = rateLimiter({
    max: 3,
    windowMS: 15 * 60 * 10000,
    message: "You can't make any more requests at the moment. Try again later"
})

const signInLimiter = rateLimiter({
    max: 3,
    windowMS: 10000, //10 seconds
    message: "Too many sign-in attempts. Try again later."
})

const otplimiter = rateLimiter({
    max: 5,
    windowMS: 2 * 60,
    message: 'Too many otp request. Try again later'
})

const createAccountLimiter = rateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
	legacyHeaders: false, // X-RateLimit-* headers
})

const requestlimiter = rateLimiter({
    max: 3,
    windowMS: 2 * 60,
    message: 'Too many otp request. Try again later'
})

module.exports = {limiter, signInLimiter, createAccountLimiter, otplimiter, requestlimiter}