const express = require("express")
const router = express.Router();
const fs = require('fs');


const userRoute = require('./userRoute.js') 
const flightRoute = require('./flightRoute.js') 
router.use(userRoute)
router.use(flightRoute)

module.exports = router;