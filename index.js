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

// date validator
var date_validator = function (testDate) {
  try {
    var num = Number(testDate);
    date = new Date(num);
  } catch (any) {
    var str = testDate;
    date = new Date(str);
  }
  
  var valid = (date).getTime() >= 0;
  return valid;
}

// utc date setter
var utcDate = function (testDate) {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const date = new Date(testDate);

  return days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + date.getUTCFullYear() + " 00:00:00 GMT";
}

//parsing date into timestamp 
app.get("/api/:date", function (req, res) {
    var dt = req.params.date;

  //var testedDate = date_validator(dt);
  if (dt != null) {
    if(dt.includes('-')){
      res.json({ unix: Date.parse(dt), utc: utcDate(new Date(dt)) });
    }
    
  }
  else {
     res.json({ unix: dt, utc: utcDate(new Date(dt) )});
   }
});


// listen for requests :)
var listener = app.listen(3500, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});