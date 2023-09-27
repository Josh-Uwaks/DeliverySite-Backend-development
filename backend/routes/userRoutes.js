const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {freshRequest} = require('../otp/controller')
const {AllUserData, userRegisteration, userLogin, userLogout, userProfile, userUpdateProfile, Otpverification, refresh, checkuserstatus} = require('../controllers/userControllers')
const { verifyJwt } = require('../middleware/verifyJwt')
const {signInLimiter, createAccountLimiter, otplimiter} = require('../middleware/loginLimiter')

router.get('/', verifyJwt, AllUserData)
router.post('/register', userRegisteration)
router.post('/otpverification', otplimiter, Otpverification)
router.post('/resendotp', freshRequest)
router.post('/login', userLogin)
router.get('/checkstatus', checkuserstatus)
router.post('/logout', userLogout)
router.get('/refresh', refresh)
router.route('/profile').get(protect ,userProfile).put(protect,userUpdateProfile)
 
module.exports = router