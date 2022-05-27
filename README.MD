# youtube
https://www.youtube.com/watch?v=NKWHYk0PF6s

# Retrieve - Practical Test

Hi! Welcome to our development test.

Working on Retrieve you will normally create and maintain integrations, between different applications and sources of data.

We need to make sure every code we write is **reusable, no-platform specific, and extendable**. And why? Because our customers may use our base code but also ask for custom implementations and customizations, like customizing fields, joining data from different sources of data, etc.

In this test we are going to see if you can write a base code, that can map data from a source to a destination keeping in mind reusability, flexibility for customizations, code standards, and code performance.

<hr/>
<br/>

### The test

On this package, you'll see an **order.json** file. This file contains the data from a Magento 2 order. This order has to be pushed to a different application, but this application differently of Magento uses an XML file instead of a JSON, and this XML file has a completely different format (result.xml is an example).

##### Write a NodeJS package that will based on a mapping JSON file, convert the data from the JSON into the XML file.

#### Here it goes the instructions:

##### 1) Create a NodeJS package that exports a function that can be used inside another NodeJS package to convert data from a JSON file into the XML file.

##### 2) This function should get the data from the order.json file, generate and return a XML file.

##### 3) The field mapping should be defined in the mapping.json file (check that file as an example).

    {  
	  "origin": "extension_attributes.syspro_id",  
	  "target": "Customer"  
	}

##### 4) The mapping.json will map the origin field, the target field, it will have a field to define if a field is static and what's the value, a convert function where you can write a basic js function to convert the value (in case it's needed).

    {  
	  "origin": "",  
	  "target": "OrderActionType",  
	  "static_value" : "A"  
	},
    {  
	  "origin": "shipping_description",  
	  "target": "ShippingInstrs",  
	  "convert_function": "return value.substring(0, 19)"  
	}

##### 5) Sometimes it's difficult to map the data only using the mapping. So, at the end of this function, you will also have the possibility to call an external JS function passing the origin data (a javascript object with the data from order.json) and the data after the execution of the mapping. You can create a second index.js file (index2.js) where you have this file and then import it into the first js file.

index2.js:

    module.exports = function (originData, mappedData) {
	    .... make the magic ...
		return finalData;
    }

index.js:

    const externalJs = require("index2.js");
	
	... my magic code ...
	
	return externalJs(originData, mappedData);

##### 6) Publish this code into a github repository and publish it as a npm package in GitHub.

##### 7) Create a README.MD file in the repository with the instructions on how to install and use the npm package.

##### 8) Add all detailed info to the package.json file as well as the npm start and build commands.

<br/>

***Avoid using 3rd party packages and libraries as much as possible. We prioritize clean and no-dependency code always.***

<hr/>

<br/>

### Data Mapping:

| origin field | target field | static | convertion |
|--|--|--|--|
|  |OrderActionType  | A | |
|extension_attributes.syspro_id|Customer  | | |
|created_at|OrderDate  | | Y-m-dd |
||InvoiceTerms  | 27 |  |
||Currency  | $ |  |
||ShippingInstrs  | |  Maximum of 40 characters |
|extension_attributes.company_order_attributes.company_name|CustomerName  | |  Maximum of 40 characters |
|billing_address.street.0|ShipAddress1  | | |
|billing_address.street.1|ShipAddress2  | | Leave field empty if there's no second line on the street |
|billing_address.city|ShipAddress3  | | |
|billing_address.region_code|ShipAddress4  | | |
|billing_address.postcode|ShipPostalCode  | | |
|customer_email|Email  | | |
|items.x|OrderDetails.StockLine.CustomerPoLine| |It's an incremental number|
|items.x.sku|OrderDetails.StockLine.StockCode| ||
|items.x.extension_attributes.suggested_inventory_source|OrderDetails.StockLine.Warehouse| ||
|items.x.qty_ordered|OrderDetails.StockLine.OrderQty| ||
|items.x.extension_attributes.unit_of_measure|OrderDetails.StockLine.OrderUom| ||
|items.x.price|OrderDetails.StockLine.Price| ||
|items.x.extension_attributes.unit_of_measure_price|OrderDetails.StockLine.PriceUom| ||
||OrderDetails.StockLine.PriceCode|TEST||
||OrderDetails.StockLine.AlwaysUsePriceEntered|Y||
||OrderDetails.StockLine.AlwaysUseDiscountEntered|N||
|items.x.created_at|OrderDetails.StockLine.CustRequestDate||Y-m-dd|
|extension_attributes.bold_order_comment|CommentLine.CustomerPoLine||It's an incremental number - Add CommentLine only if the extension_attributes.bold_order_comment is not empty|
|extension_attributes.bold_order_comment|CommentLine.LineActionType|A|Add CommentLine only if the extension_attributes.bold_order_comment is not empty|
|extension_attributes.bold_order_comment|CommentLine.Comment||Add CommentLine only if the extension_attributes.bold_order_comment is not empty|
||FreightLine.CustomerPoLine||It's an incremental number|
||FreightLine.LineActionType|A||
|shipping_amount|FreightLine.FreightValue|||
||FreightLine.FreightCost|0||
