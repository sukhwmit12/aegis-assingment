const express = require("express");
const loginRoute = express.Router();
const { saveData, getData, findValue } = require("../data/utils");

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
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { username: currentUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3m" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  // Send accessToken containing username
  res.json({ accessToken });
});

// GET refresh for users
loginRoute.get("/auth/refresh", (req, res) => {
  const cookies = req.cookies;
  
  const existUser = getData("user");

  if (!cookies?.jwt)
    return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = findValue(
        existUser,
        "username",
        (username = decoded.username)
      );

      if (!foundUser)
        return res.status(401).json({ message: "Unauthorized" });

      const currentUser = foundUser[0];

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: currentUser.username,
            email: currentUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      res.json({ accessToken });
    }
  );
});

// POST logout for the users
loginRoute.post("/auth/logout", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
});

module.exports = loginRoute;
