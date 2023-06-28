const express = require("express")
const router = express.Router();

const authRoute = require('./authRoutes.js') 
router.use(authRoute)

const userRoute = require('./userRoute.js') 
router.use(userRoute)

const flightRoute = require('./flightRoute.js')
router.use(flightRoute)

module.exports = router;