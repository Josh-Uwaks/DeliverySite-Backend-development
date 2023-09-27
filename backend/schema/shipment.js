const mongoose = require("mongoose");
const {status} = require('../utils/constants')

const shipmentSchema = mongoose.Schema({
    shipper_fname: {
        type: String,
        required: true
    },
    shipper_lname: {
        type: String,
        required: true
    },
    shipper_phone_no: {
        type: String,
        required: true
    },
    shipper_email: {
        type: String,
        required: true
    },
    receiver_fname: {
        type: String,
        required: true
    },
    receiver_lname: {
        type: String,
        required: true
    },
    receiver_phone_no: {
        type: String,
        required: true
    },
    receiver_email:{
        type: String,
        required: true
    },
    carrier: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    shipment_mode: {
        type: String,
        required: true
    },
    type_of_shipment: {
        type: String,
        required: true
    },
    expected_delivery_date: {
        type: String,
        required: true
    },
    departure_date: {
        type: String,
        required: true
    },
    shipment_package: {
        type:String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    pick_up_date: {
        type: String,
        required: true
    },
    pick_up_time: {
        type: String,
        required: true
    },
    payment_mode: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    piece_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    package_length: {
        type: String,
        required: true
    },
    package_width: {
        type: String,
        required: true
    },
    package_weight: {
        type: String,
        required: true
    },
    package_height: {
        type: String,
        required: true
    },
    tracking_number: {
        type: String
    },
    status: {
        type: String,
        default: status.pending,
        enum: [status.pending, status.in_transit, status.delivered],
    },
    package: {
        type: String,
        required: true
    },
    shipper_location: {
        type: String,
        required: true
    },
    receiver_location: {
        type: String,
        required: true
    },
    freight_fee: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },

}, {timeStamps: true})


module.exports = mongoose.model('shipment_information', shipmentSchema)