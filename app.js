const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data); 

  const url = "https://us21.api.mailchimp.com/3.0/lists/1153a27d34";

  const options = {
    method: "POST",
    auth: "achana1:9ee4536f459e2f998a8abb30735d02ea-us21"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.listen(5000, function(){
  console.log("Server is running on port 5000"); 
});


// API Key
// 9ee4536f459e2f998a8abb30735d02ea-us21

// Audiance id
// 1153a27d34