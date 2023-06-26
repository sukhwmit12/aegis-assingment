const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const path = require("path");
const cors = require("cors");

const { logger, logEvents } = require("./middleware/logger");

const port = process.env.PORT || 3001;
const app = express();
const routes = require("./routes/Route");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

app.use(logger);

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});