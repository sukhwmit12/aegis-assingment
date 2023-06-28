const express = require("express");
const loginRoute = express.Router();
const { getData, findValue } = require("../data/utils");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST for Login and auth
loginRoute.post("/auth/login", async (req, res) => {
  const existUser = getData("user");
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = findValue(existUser, "username", username);

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const currentUser = foundUser[0];

  const match = await bcrypt.compare(password, currentUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: currentUser.username,
        email: currentUser.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: currentUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 15 * 60 * 1000,
  });

  // Send accessToken containing username
  res.json({ accessToken });
});

// POST logout for the users
// not used by frontend
loginRoute.post("/auth/logout", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
});

module.exports = loginRoute;
