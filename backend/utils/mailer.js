const nodemailer = require('nodemailer')

const sendCustomMail = async (subject, message, sent_from, sent_to, replyTo) => {
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: '587',
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
  },
  tls: {
      rejectUnauthorized: false
  },
  // connectionTimeout: 15000, // 15 seconds
  // greetingTimeout: 15000,   // 15 seconds
})

const mailOptions = {
  from: sent_from,
  to: sent_to,
  replyTo: replyTo,
  subject: subject,
  html: message
}

transporter.sendMail(mailOptions, (err, res) => {
  if(err){
      console.log(err)
  }else {
      console.log(res)
  }
})

}

module.exports = {sendCustomMail}
