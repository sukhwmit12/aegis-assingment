const express = require("express");
const flightRoute = express.Router();
const fs = require("fs");
const { saveData, getData, findValue } = require("../middleware/utils");

const dataPath = "./data/flight.json"; // path to our JSON file

// GET all flights /flight/list
flightRoute.get("/flight/list", (req, res) => {
  const flight = getData();

  if (flight?.length) {
    return res.status(400).json({ message: "No flights found" });
  }
  res.send(flight);
});

// // GET all flights /flight/list
flightRoute.get("/flight", (req, res, next) => {
  const flight = getValue();
  const filters = req.query;
  const filteredFlight = data.filter((user) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, flight[key], filters[key]);
      isValid = isValid && flight[key] == filters[key];
    }
    return isValid;
  });
  if (filteredFlight?.length) {
    return res.status(400).json({ message: "No flights found" });
  }
  res.send(filteredFlight);
});

// ADD a new flight
flightRoute.post("/flight/add", (req, res) => {
  let existFlight = getData();
  try {
    const newFlightId = Math.floor(1000 + Math.random() * 9000);

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

    existFlight[newFlightId] = req.body;

    console.log(existFlight);
    saveData(existFlight);
    res.send({ success: "ok", msg: "flight added successfully" });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});

// Update flight not being used atm
flightRoute.put("/flight/:id", (req, res) => {
  let existFlight = getData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const accountId = req.params["id"];
      try {
        existFlight[accountId] = req.body;
        saveData(existFlight);
        res.send(`flight with id ${accountId} has been updated`);
      } catch (err) {
        console.log("Error while updating flight details: ", err);
      }
    },
    true
  );
});

// delete flight details
flightRoute.delete("/flight/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      let existFlight = getData();
      const flightId = req.params["id"];
      try {
        delete existFlight[flightId];
        saveData(existFlight);
        res.send(`flight with id ${flightId} has been deleted`);
      } catch (err) {
        console.log("Error while deleting user: ", err);
      }
    },
    true
  );
});

module.exports = flightRoute;
