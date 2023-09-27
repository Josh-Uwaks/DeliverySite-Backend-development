const jwt = require('jsonwebtoken');

const accessToken = (res, userData) => {
    jwt.sign({userData}, process.env.ACCESSTOKEN_SECRET, {
        expiresIn: '30s'
    })

    // res.cookie('jwt', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     sameSite: 'strict',
    //     maxAge:  30 * 24 * 60 * 60 * 1000
    // })
}

const refreshToken = (res, userData) => {
    jwt.sign({userData}, process.env.REFRESHTOKEN_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = {accessToken, refreshToken}