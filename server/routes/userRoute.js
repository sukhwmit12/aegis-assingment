const express = require("express");
const userRoute = express.Router();
const fs = require("fs");

const dataPath = "./data/users.json"; // path to our JSON file

// util functions
const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getUserData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

userRoute.post("/user/add", (req, res) => {
  var existUser = getUserData();
  const newUserId = Math.floor(1000 + Math.random() * 9000);

  existUser[newUserId] = req.body;

  console.log(existUser);
  saveUserData(existUser);
  res.send({ success: true, msg: "user added successfully" });
});

// Read - get all user from the json file
userRoute.get("/user/list", (req, res) => {
  const user = getUserData();
  res.send(user);
});

// Update - using Put method
userRoute.put("/user/:id", (req, res) => {
  var existUser = getUserData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const accountId = req.params["id"];
      existUser[accountId] = req.body;
      saveUserData(existUser);
      res.send(`user with id ${accountId} has been updated`);
    },
    true
  );
});

// delete - using delete method
userRoute.delete("/user/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      var existUser = getUserData();
      const userId = req.params["id"];
      delete existUser[userId];
      saveUserData(existUser);
      res.send(`user with id ${userId} has been deleted`);
    },
    true
  );
});

module.exports = userRoute;
