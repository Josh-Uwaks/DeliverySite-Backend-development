const express = require('express')
const router = express.Router()
const {AllUserData, userRegisteration, userLogin, userLogout, userProfile, userUpdateProfile} = require('../controllers/userControllers')

router.get('/', AllUserData)
router.post('/register', userRegisteration)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.route('/profile').get(userProfile).put(userUpdateProfile)


module.exports = router