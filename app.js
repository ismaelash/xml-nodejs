const parserOrderModule = require("./index");
const fs = require("fs");

const orderJson = require("./order.json");
const mappingJson = require("./mapping.json");

const xmlContent = parserOrderModule(orderJson, mappingJson);
console.log(xmlContent);

try {
  fs.writeFileSync("./order.xml", xmlContent);
} catch (err) {
  console.error(err);
}
