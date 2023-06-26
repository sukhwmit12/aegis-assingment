const express = require("express");
const fs = require("fs");
// util functions

// util functions
const saveData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const findValue = (keyName, keyData) => {};

module.exports = {
  saveData,
  getData,
  findValue,
};
