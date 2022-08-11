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

// utc date setter
var utcDate = function (testDate) {
  const date = new Date(testDate);
  return date.toUTCString();
}

var response = {};
//parsing date into timestamp 
app.get("/api/:date", function (req, res) {
  var dt = req.params.date;

  if (dt.includes('-')) {
    response['unix'] = Date.parse(dt).toString();
    response['utc'] = utcDate(new Date(dt)).toString();

  }
  if (!isNaN(dt)) {
    response['unix'] = dt.toString();
    response['utc'] = utcDate(new Date(Number(dt))).toString();

  }
  if ((response['unix'].valueOf() === 'NaN') || (response['utc'].valueOf() === "Invalid Date")) {
    res.json({ error: "Invalid Date" });
  }
  res.json(response);
});


var listener = app.listen(3500, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});