const mongoose = require('mongoose');
const OtpSchema = mongoose.Schema;

const OTPschema = new OtpSchema({
    userId: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    expiredAt:{
        type: Date
    } 
})

module.exports = mongoose.model("OtpVerificationSchema", OTPschema)
