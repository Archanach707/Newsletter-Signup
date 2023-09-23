const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.listen(5000, function(){
  console.log("Server is running on port 5000"); 
})