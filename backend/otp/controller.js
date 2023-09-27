
const { generateOtp, trackingId } = require('../utils/generateotp')
const bcrypt = require('bcryptjs')
const OtpSchema = require('../schema/userotp')
const ShipmentSchema = require('../schema/shipment')
const { sendCustomMail } = require('../utils/mailer')


const verifyOtp = async({email, otp}) => {
    try {
        if(!(email && otp)){
            throw Error("provide values for email, otp");
        }

        const dbcheck = await OtpSchema.findOne({email})

        if(!dbcheck){
            throw Error("No Otp found!!")
        }

        const {expiredAt} = dbcheck;
      

        if(expiredAt < Date.now()){
            // await OtpSchema.deleteOne({email})
            throw Error("code has expired. kindly request a new one!.")
        }

        const getOtp_DB = dbcheck.otp
        const verifyOtp = bcrypt.compare(otp, getOtp_DB)

        return verifyOtp

    } catch (error) {
        throw error   
    }
}

const freshRequest = async(req, res) => {
    const {email} = req.body

    const getData = await OtpSchema.findOne({email: email})
    if(!getData){
        throw Error("no email present to send new tokenss")
    }
    
    try {
        const newotp = await generateOtp()
        const gensalt = await bcrypt.genSalt(10)
        const hashedotp = await bcrypt.hash(newotp, gensalt)

        const subject = 'New Otp generated for Airnxx Account'
        const message =  `<p>Your Otp verification code is <b style={{fontWeight: bolder}}>${newotp}</b>, kindly enter your new code</p>`
        const sent_to = email
        const sent_from = process.env.SMTP_USER
        const replyTo = email

       await sendCustomMail(subject, message, sent_from, sent_to, replyTo)
  
        const updatedata = await OtpSchema.updateOne({_id: getData._id},{$set: {otp: hashedotp}})
        return res.status(201).json({message: 'updated successfully', data: updatedata, sentotp:newotp})

    } catch (error) {
        res.json({message: error})
    }
}

const deleteOtp = async(email) => {
    try {
        await OtpSchema.deleteOne({email})
    } catch (error) {
        throw error
    }
}

const sendOtpVerification = async ({email, firstname}) => {
    try {

        await Otp.deleteOne({email})
        const generatedOtp = await generateOtp()
        console.log(generatedOtp)

        const otpsalt = await bcrypt.genSalt(10)
        const hashedOtp = await bcrypt.hash(generatedOtp, otpsalt)
    
        const subject = 'Kindly Setup Your Airnxx Account'
        const message =  `<div style="font-family: Helvetica,Arial,sans-serif; width:400px; min-width: 800px">
                            <div style="margin:50px auto; width:70%; padding:20px 0">
                                <div style="border-bottom:1px solid #eee">
                                    <a href="" style="font-size:1.7em;color: #050B2A;text-decoration:none;font-weight:600">AirnXX Limited</a>
                                </div>
                                <p style="font-size:1.1em">Hi, ${firstname}</p>
                                <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 1 hour</p>
                                <h2 style="background: #050B2A;margin: 0 auto;width: max-content;padding: 15px 20px;color: #fff;border-radius: 4px;">${generatedOtp}</h2>
                                <p style="font-size:0.9em;">Regards,<br />AirnXX Limited</p>
                                <hr style="border:none;border-top:1px solid #eee" />
                                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                                    <p>AirnXX Limited</p>
                                    <p>1600 Amphitheatre Parkway</p>
                                    <p>California</p>
                                </div>
                            </div>
                        </div>`
        const sent_to = email
        const sent_from = process.env.SMTP_USER
        const replyTo = email

       await sendCustomMail(subject, message, sent_from, sent_to, replyTo)

       const newOtp = new OtpSchema({
           email,
           otp: hashedOtp,
           createdAt: Date.now(),
           expiredAt: new Date(Date.now() + 1000 * 5000),
       })

       const createdOtpRecord = await newOtp.save()
       return createdOtpRecord

    }catch(error){
        throw error 
    }
}



module.exports = {sendOtpVerification, verifyOtp, deleteOtp, freshRequest}