const jwt = require('jsonwebtoken')
const user = require('../schema/user')

const protect = async(req, res, next) => {
    let token;

    token = req.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) 
            req.user = await user.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401).json('Not authorized, Invalid token')
        }
    }else{
        res.status(401).json('Not Authorized, No token')
    }
}

module.exports = {protect}