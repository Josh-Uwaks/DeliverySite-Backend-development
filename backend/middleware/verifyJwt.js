const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJwt = (req, res, next) => {
    try {
        let token
        let authHeader = req.headers.Authorization || req.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            const jwtSecret = req.originalUrl.includes('refresh') ? process.env.REFRESHTOKEN_SECRET : process.env.ACCESSTOKEN_SECRET
            jwt.verify(token, jwtSecret, (err, user) => {
                if(err && err?.message === 'jwt expired'){
                    return res.status(403).send("Token Expired");
                }
                if(err){
                    return res.status(401).send(err)
                }
                req.user = user
                next()
                console.log(user)
            })
        if(!token){
            res.status(401).json("unauthorized token is missing")
        }
        }
    }catch(err){
        res.status(401).json(err)
    }
} 

const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === 'ADMIN'){
        next()
    }else{
        res.status(401).send('Not authorised as an admin.')
    }
}

module.exports = {verifyJwt, adminOnly}