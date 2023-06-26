const express = require("express")
const router = express.Router();
const fs = require('fs');


const userRoute = require('./userRoute.js') 
const flightRoute = require('./flightRoute.js')
const authRoute = require('./authRoutes.js') 
router.use(userRoute)
router.use(flightRoute)
router.use(authRoute)

module.exports = router;