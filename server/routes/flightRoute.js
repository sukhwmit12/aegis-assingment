const express = require("express");
const flightRoute = express.Router();
const fs = require("fs");

const verifyJWT = require("../middleware/verifyJWT");
flightRoute.use(verifyJWT);

const { saveData, getData, findValue } = require("../data/utils");

function findFlights(dataFlights, res) {
  const dateFlights = findValue(
    dataFlights,
    "journeyDate",
    res.query["journeyDate"]
  );
  const sourceFlight = findValue(
    dateFlights,
    "departureAirport",
    res.query["departureAirport"]
  );
  const destinationFlight = findValue(
    sourceFlight,
    "arrivalAirport",
    res.query["arrivalAirport"]
  );
  return destinationFlight;
}

// GET all flights /flight/list
flightRoute.get("/flight/list", (req, res) => {
  try {
    const flight = getData("flight");

    if (!flight?.length) {
      return res.status(200).json({ message: "No flights found" });
    }
    res.send(flight);
  } catch (err) {
    res.status(501).json({
      error: err,
    });
  }
});

// GET flights with res.query
flightRoute.get("/flight/find", (req, res, next) => {
  try {
    const dataFlights = getData("flight");

    const arrayResultFLights = {};

    const destinationFlight = findFlights(dataFlights, req);

    for (const element of destinationFlight) {
      arrayResultFLights[element["flightName"]] = element["price"];
    }
    if (arrayResultFLights?.length) {
      return res.status(200).json({ message: "No flights found" });
    }
    res.send(arrayResultFLights);
  } catch (err) {
    res.status(501).json({
      error: err,
    });
  }
});

// ADD a new flight
// not to be used by frontend
flightRoute.post("/flight/add", (req, res) => {
  let existFlight = getData("flight");
  try {
    const newFlightId = Math.floor(10000 + Math.random() * 90000);

    const { flightName, journeyDate, departureAirport, arrivalAirport, price } =
      req.body;

    if (
      !flightName ||
      !journeyDate ||
      !departureAirport ||
      !arrivalAirport ||
      !price
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const flightObject = {
      id: newFlightId,
      flightName,
      journeyDate,
      departureAirport,
      arrivalAirport,
      price,
    };

    existFlight[existFlight.length] = flightObject;

    saveData(existFlight, "flight");
    res.send({
      success: "ok",
      msg: "flight added successfully",
    });
  } catch (err) {
    res.json({
      status: "error",
      error: err,
    });
  }
});

module.exports = flightRoute;
