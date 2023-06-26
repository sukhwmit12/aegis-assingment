const express = require("express");
const userRoute = express.Router();
const fs = require("fs");
const { saveData, getData, findValue } = require("../middleware/utils");

const bcrypt = require("bcrypt");

const dataPath = "./data/users.json"; // path to our JSON file

// GET all user /user/list
userRoute.get("/user/list", (req, res) => {
  const user = getData();

  if (user?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.send(user);
});

// add new user with unique email
userRoute.post("/user/add", (req, res) => {
  let existUser = getData();
  try {
    const { username, email, password } = req.body;

    //confirm data
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = findValue("email", email);

    const duplicate2 = findValue("username", username);

    if (duplicate || duplicate2) {
      return res.status(409).json({ message: "Duplicate data" });
    }

    const hashedPwd = bcrypt.hash(password, 10); //salt rounds to hash password

    const newUserId = Math.floor(1000 + Math.random() * 9000);

    const userObject = { username, email, password: hashedPwd };

    existUser[newUserId] = userObject;

    console.log(existUser);
    saveData(existUser);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});

// Update user not being used yet
userRoute.put("/user/:id", (req, res) => {
  let existUser = getData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const accountId = req.params["id"];
      try {
        existUser[accountId] = req.body;
        saveData(existUser);
        res.send(`user with id ${accountId} has been updated`);
      } catch (err) {
        console.log("Error while updating user: ", err);
      }
    },
    true
  );
});

// delete user by id
userRoute.delete("/user/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      let existUser = getData();
      const userId = req.params["id"];
      try {
        delete existUser[userId];
        saveData(existUser);
        res.send(`user with id ${userId} has been deleted`);
      } catch (err) {
        console.log("Error while deleting user: ", err);
      }
    },
    true
  );
});

module.exports = userRoute;
