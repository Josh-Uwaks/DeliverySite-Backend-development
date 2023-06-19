const User = require('../schema/user')
const {registrationValidation, loginValidation} = require('../utils/validator')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../utils/generateToken')

const AllUserData = (req, res) => {
    res.json('inside the registration routes modified')
}

const userRegisteration = async(req, res) => {

    const {error} = registrationValidation(req.body)
    const {username, email, password} = req.body
    if(error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).json("Email Already Exists")

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    try {
       const user = await User.create({
        username,
        email,
        password
       });

       if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: username,
            email: email,
            password: hashedpassword
        })
        
       }else{
        throw new Error('Invalid user data')
       }

    }catch(error) {
        res.status(400).json({err: error})
    }
}

const userLogin = (req, res) => {
    res.json('route for users to login')
}

const userLogout = (req, res) => {
    res.json('logout route')
}

const userProfile = (req, res) => {
    res.json('user profile')
}

const userUpdateProfile = (req, res) => {
    res.json('update user profile')
}

module.exports = {AllUserData ,userRegisteration, userLogin, userLogout, userProfile, userUpdateProfile}