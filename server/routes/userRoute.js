const express = require("express");
const userRoute = express.Router();
const fs = require("fs");
const { saveData, getData, findValue } = require("../data/utils");

const bcrypt = require("bcrypt");

// GET all user /user/list
userRoute.get("/user/list", (req, res) => {
  const user = getData("user");
  console.log(user);

  if (!user?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.send(user);
});

// add new user with unique email and username
userRoute.post("/user/add", async (req, res) => {
  let existUser = getData("user");
  try {
    const { username, email, password } = req.body;
    //confirm data
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = findValue(existUser, "email", email);
    const duplicate2 = findValue(existUser, "username", username);

    if (duplicate || duplicate2) {
      return res.status(409).json({ message: "Duplicate data" });
    }

    //salt rounds to hash password
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUserId = Math.floor(1000 + Math.random() * 9000);

    const userObject = { id: newUserId, username, email, password: hashedPwd };

    existUser[existUser.length] = userObject;

    saveData(existUser, "user");

    res.json({
      status: "ok",
      message: "user added successfully",
    });
  } catch (err) {
    res.json({ 
      status: "error", 
      error: err });
  }
});

module.exports = userRoute;
