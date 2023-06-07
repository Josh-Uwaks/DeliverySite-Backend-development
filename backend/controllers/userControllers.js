const AllUserData = (req, res) => {
    res.json('inside the registration routes modified')
}

const userRegisteration = (req, res) => {
    res.json('route to register users')
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