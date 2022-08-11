// index.js
// where your node app starts
var validateDate = require("validate-date");
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function (req, res) {
  res.json({ unix: Date.now(), utc: utcDate(new Date()) });
});

// your first API endpoint... 
app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

var response = {};
//parsing date into timestamp 
app.get("/api/:date", function (req, res) {
  var date_string = req.params.date;
  if(date_string.match(/\d{5,}/)){
    date_string = +date_string;
  }
  let date = new Date(date_string);
  
  if (date_string.includes('-')) {
    response['unix'] = Date.parse(date_string).toString();
    response['utc'] = date.toUTCString();

  }
  if (!isNaN(date_string)) {
    date = new Date(Number(date_string));
    response['unix'] = date_string.toString();
    response['utc'] = date.toUTCString();

  }
  if (date.toUTCString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }
  res.json(response);
});


var listener = app.listen(3500, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});