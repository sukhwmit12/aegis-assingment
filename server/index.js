const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const path = require("path");
const cors = require("cors");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

app.use(logger);

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
// create our express app
const app = express();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require("./routes/Route");
app.use("/", routes);
//start server
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "error.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
