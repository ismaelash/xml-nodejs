//  based on test = https://github.com/Imagination-Media/retrieve-test

const { create } = require("xmlbuilder2");

module.exports = function (originDataJson, mappedDataJson) {
  let xmlBuilder = create({ version: "1.0" })
    .ele("SalesOrders", {
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema-instance",
      "xsd:noNamespaceSchemaLocation": "SORTOIDOC.XSD",
    })
    .ele("Orders");

  mappedDataJson.forEach((map) => {
    const valueOnJson = getValueWithScaffoldJson(originDataJson, map.origin);
    if (valueOnJson) {
      createChildrenOnXml(xmlBuilder, map.target, valueOnJson);
    } else {
      createChildrenOnXml(xmlBuilder, map.target, map.static_value);
    }
  });

  return xmlBuilder.end({ prettyPrint: true });
};

function createChildrenOnXml(xmlBuilder, target, value) {
  const paths = target.split(".");

  if (paths.length === 1) {
    xmlBuilder.ele(`${paths[0]}`).txt(value);
  } else {
    let children = undefined;
    console.log("count", paths.length);

    for (let index = 0; index < paths.length; index++) {
      const path = paths[index];

      if (children) {
        if (index === paths.length - 1) {
          console.log("ele final", value);
          children.ele(`${path}`).txt(value.toString());
        } else {
          children.ele(`${path}`);
        }
      } else {
        children = xmlBuilder.ele(`${path}`);
      }
    }
  }
}

function getValueWithScaffoldJson(json, path) {
  const paths = path.split(".");

  if (paths.length === 1) {
    return json[`${paths[0]}`].toString();
  } else {
    let valueFinal = undefined;
    paths.forEach((path) => {
      if (valueFinal) {
        valueFinal = valueFinal[`${path}`];
      } else {
        valueFinal = json[`${path}`];
      }
    });

    return valueFinal.toString();
  }
}

// TODO

// 1. Cases of where key on json not exist
// 2. apply conversion method // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function
