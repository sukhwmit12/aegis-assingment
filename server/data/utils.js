const fs = require("fs");
const dataPath = "./data/data.json"; // path to our JSON file

// util functions for json server
const saveData = (dataUse, dataName) => {
  const oldData = fs.readFileSync(dataPath);
  let newData =JSON.parse(oldData)
  newData[dataName] = dataUse
  const stringifyData = JSON.stringify(newData);
  fs.writeFileSync(dataPath, stringifyData);
};

const getData = (dataName) => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData)[dataName];
};

const findValue = (dataUse, keyName, keyData) => {
  const arrayResult = [];
  for (const element of dataUse) {
    if (element[keyName] === keyData) {
      arrayResult.push(element);
    }
  }
  return arrayResult.length? arrayResult: null;
};

module.exports = {
  saveData,
  getData,
  findValue,
};
