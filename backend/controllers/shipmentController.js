const { shipmentValidator } = require('../utils/validator')
const Shipment = require('../schema/shipment')
const { trackingId } = require('../utils/generateotp')
const { sendCustomMail } = require('../utils/mailer')

const getShipments = async(req, res) => {
    try {
        const getAll = await Shipment.find()
        res.status(200).json({data: getAll})
    } catch (error) {
        res.status(400).json({err: error})        
    }
}

const getSingleShipment = async(req, res) => {  
    
    const {tracking_number} = req.body
    const check_tracking_number = await Shipment.findOne({tracking_number: tracking_number})
    if(check_tracking_number) {
        return res.status(200).json({msg: 'success', data: check_tracking_number})
    }else{
        return res.status(400).send({err: 'tracking id does not exist'})
    }
    
}

const createShipment = async(req, res) => {

    const generatedId = await trackingId()

    const {error} = shipmentValidator(req.body)
    const {shipper_fname, shipper_lname, shipper_phone_no, shipper_email, receiver_fname, receiver_lname, receiver_phone_no, receiver_email,
    carrier, destination, shipment_mode, type_of_shipment, expected_delivery_date, departure_date, shipment_package, product, pick_up_date,
    pick_up_time, payment_mode, quantity, piece_type, description, package_length, package_width, package_weight, package_height,package,
    shipper_location, receiver_location, freight_fee, origin} = req.body

   if(error) return res.status(401).json(error.details[0].message)

   try {

        const subject = 'Your Package ID has been generated'
        const message = 
                        `
                        <div style="font-family: Helvetica,Arial,sans-serif; width:400px; min-width: 800px">
                            <div style="margin:50px auto; width:70%; padding:20px 0">
                                    <div style="border-bottom:1px solid #eee">
                                        <a href="" style="font-size:1.7em;color: #050B2A;text-decoration:none;font-weight:600">AirnXX Limited</a>
                                    </div>
                                    <p style="font-size:1.1em">Hi, <b>${shipper_fname} ${shipper_lname}</b></p>
                                    <p>Thank you for shipping with us, your tracking ID is: <b style="color: #07113B;">${generatedId}</b>.</p>
                                    <p style="font-size:0.9em;">Regards,<br />AirnXX Limited</p>
                                    <hr style="border:none;border-top:1px solid #eee" />
                                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                                        <p>AirnXX Limited</p>
                                        <p>1600 Amphitheatre Parkway</p>
                                        <p>California</p>
                                    </div>
                            <div>
                        </div>
                        `

        const sent_to = shipper_email
        const sent_from = process.env.SMTP_USER
        const replyTo = shipper_email

        await sendCustomMail(subject, message, sent_from, sent_to, replyTo)

        const shipment_details = await Shipment.create(
        {shipper_fname,shipper_lname,shipper_phone_no,shipper_email,receiver_fname,receiver_lname,receiver_phone_no,receiver_email,
        carrier, destination, shipment_mode, type_of_shipment, expected_delivery_date, departure_date, shipment_package, product, pick_up_date,
        pick_up_time, payment_mode, quantity, piece_type, description, package_length, package_width, package_weight, package_height, tracking_number:generatedId,
        package, shipper_location, receiver_location, freight_fee, origin})

        // await send_tracking_id({shipper_fname, shipper_lname, shipper_email})

    return res.status(201).json({message: 'shipment created successfully', data: shipment_details})
   } catch (error) {
    return res.status(400).json(error)
   }

}

module.exports = {createShipment, getShipments, getSingleShipment}