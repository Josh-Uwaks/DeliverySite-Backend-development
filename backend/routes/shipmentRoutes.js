const express = require('express')
const router = express.Router()
const {verifyJwt, adminOnly} = require('../middleware/verifyJwt')
const {createShipment, getShipments, getSingleShipment} = require('../controllers/shipmentController')
const { requestlimiter } = require('../middleware/loginLimiter')

router.get('/',verifyJwt, getShipments)
router.post('/create_shipment', verifyJwt, adminOnly, createShipment)
router.post('/tracker',requestlimiter, getSingleShipment)

module.exports = router