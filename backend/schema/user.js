const mongoose = require('mongoose')
const {roles} = require('../utils/constants')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    phone_number:{
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: roles.client,
        enum: [roles.client, roles.admin]
    }
}, {
    timestamps: true
}) 

module.exports = mongoose.model('User', UserSchema)