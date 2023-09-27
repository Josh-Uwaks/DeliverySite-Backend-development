const User = require('../schema/user')
const {registrationValidation, loginValidation} = require('../utils/validator')
const bcrypt = require('bcryptjs')
const { sendOtpVerification } = require('../otp/controller')
const {verifyOtp}  = require('../otp/controller')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const AllUserData = async(req, res) => {
  const user = await User.findById(req.user.id).select('-password')

  if(user){
    res.status(201).json(user)
  }else{
    res.status(401).json("User not found")
  }

}

const userRegisteration = async(req, res) => {

    const {error} = registrationValidation(req.body)
    const {username,firstname, lastname, email,country, state, city, phone_number, password} = req.body
    if(error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).json("Email Already Exists kindly login")

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    try {
       const user = await User.create({username,firstname,lastname,email,country,state,city,phone_number,password: hashedpassword});
       await sendOtpVerification({email, firstname})
       return res.status(201).json({success: true, data: {_id: user._id, username:user.username, email:user.email, role:user.role}})
    }catch(error) {
        res.status(400).json({err: error})
    }
}

const Otpverification = async(req, res) => {
    const {email, otp}  = req.body
    const getData = await User.findOne({email:email})
    try {
        const validateOtp = await verifyOtp({email, otp})
        if(validateOtp === true){
          await User.updateOne({_id:getData._id}, {$set: {verified: true}})
        }
        return res.status(200).json({valid: validateOtp})

    } catch (error) {
        throw error
    }
}

const userLogin = async(req, res) => {
    const {email, password} = req.body

    const {error} = loginValidation(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const user = await User.findOne({email: email})
    if(!user) return res.status(401).json({msg: 'invalid email or password'})

    const validPass = await bcrypt.compare(password, user.password)

    if(validPass){
    const accesstoken = jwt.sign({id:user._id, username:user.username, email:user.email, role:user.role}, process.env.ACCESSTOKEN_SECRET, {expiresIn: '15m'})
    const refreshToken = jwt.sign({id:user._id, username:user.username, email:user.email, role:user.role}, process.env.REFRESHTOKEN_SECRET, {expiresIn: '7d'})

    // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure:true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie('jwt', accesstoken, {path: '/',httpOnly: true, sameSite: 'None', secure:true})

    res.status(201).json({
        _id: user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        username:user.username,
        email: email,
        password: user.password,
        accesstoken: accesstoken,
        refreshtoken: refreshToken
    })

    }else{
        res.status(400).json({message: 'invalid email or password'})
    }
}

const checkuserstatus = async(req, res) => {
    const token = req.cookies.jwt

    if(!token){
        console.log('no token present ran')
        return res.json(false)
    }

    try {
        jwt.verify(token, process.env.ACCESSTOKEN_SECRET)
        console.log('jwt token is true ran')
        return res.status(200).json(true)
    
    } catch (error) {
        console.log('invalid signature')
        return res.status(401).json(error)
    }
    
}

const refresh = (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({message: "Unauthorized"});

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESHTOKEN_SECRET,
        async (err, user) => {
            if(err) return res.status(403).json({message: 'Forbidden'})
            const getUser = await User.findOne({username: user.username})
            if(!getUser) return res.status(401).json({message: 'Unauthorized'})

            const accessToken = jwt.sign(
                {
                "info": {
                    "username": getUser.username,
                    "email": getUser.email
                },
            },

            process.env.ACCESSTOKEN_SECRET,
            {expiresIn: '15m'}
            ) 

            res.json({accessToken})
        },
    )
}

const userLogout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(204)

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })

    res.json({message: 'user logged out'})
}

const userProfile = (req, res) => {
    const user = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email
    }
    res.json({user})
}

const userUpdateProfile = (req, res) => {
    res.json('update user profile')
}

module.exports = {AllUserData ,userRegisteration ,Otpverification, checkuserstatus, userLogin, userLogout, userProfile, userUpdateProfile, refresh }