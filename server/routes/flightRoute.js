const express = require("express");
const flightRoute = express.Router();
const fs = require("fs");

const dataPath = "./data/flight.json"; // path to our JSON file

// util functions
const saveFlightData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};
const getFlightData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

flightRoute.post("/flight/add", (req, res) => {
  var existFlight = getFlightData();
  const newflightId = Math.floor(1000 + Math.random() * 9000);

  existFlight[newflightId] = req.body;

  console.log(existFlight);
  saveFlightData(existFlight);
  res.send({ success: true, msg: "flight added successfully" });
});

// Read - get all flight from the json file
flightRoute.get("/flight/list", (req, res) => {
  const flight = getFlightData();
  res.send(flight);
});

// Update - using Put method
flightRoute.put("/flight/:id", (req, res) => {
  var existFlight = getFlightData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const accountId = req.params["id"];
      existFlight[accountId] = req.body;
      saveFlightData(existFlight);
      res.send(`flight with id ${accountId} has been updated`);
    },
    true
  );
});

// delete - using delete method
flightRoute.delete("/flight/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      var existFlight = getFlightData();
      const flightId = req.params["id"];
      delete existFlight[flightId];
      saveFlightData(existFlight);
      res.send(`flight with id ${flightId} has been deleted`);
    },
    true
  );
});

module.exports = flightRoute;
