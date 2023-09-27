const Joi = require('joi')

const registrationValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        phone_number: Joi.string().min(11).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

const shipmentValidator = (data) => {
    const schema = Joi.object({
        shipper_fname: Joi.string().required(),
        shipper_lname: Joi.string().required(),
        shipper_phone_no: Joi.string().required(),
        shipper_email: Joi.string().required(),
        receiver_fname: Joi.string().required(),
        receiver_lname: Joi.string().required(),
        receiver_phone_no: Joi.string().required(),
        receiver_email: Joi.string().required(),
        carrier: Joi.string().required(),
        destination: Joi.string().required(),
        shipment_mode: Joi.string().required(),
        type_of_shipment: Joi.string().required(),
        expected_delivery_date: Joi.string().required(),
        departure_date: Joi.string().required(),
        shipment_package: Joi.string().required(),
        product: Joi.string().required(),
        pick_up_date:Joi.string().required(),
        pick_up_time: Joi.string().required(),
        payment_mode: Joi.string().required(),
        quantity: Joi.string().required(),
        piece_type: Joi.string().required(),
        description: Joi.string().required(),
        package_length: Joi.string().required(),
        package_width: Joi.string().required(),
        package_weight: Joi.string().required(),
        package_height: Joi.string().required(),
        tracking_number: Joi.string(),
        status: Joi.string(),
        package: Joi.string().required(),
        shipper_location: Joi.string().required(),
        receiver_location: Joi.string().required(),
        freight_fee:Joi.string().required(),
        origin: Joi.string().required(),
    })

    return schema.validate(data)
}


module.exports = {registrationValidation, loginValidation, shipmentValidator}