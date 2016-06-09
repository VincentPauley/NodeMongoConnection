/* MODULES */
var commandLineArgs = require('command-line-args');
var MongoClient = require('mongodb').MongoClient;

var path = require('path');
var fs = require('fs');

var express = require('express');
var app = express();


var filePath = path.join(__dirname + '/public/index.html');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));

/*------------------------------------------------------*/

/* GLOBALS */
var allTeams;

/* GET REQUST WITH ARG
app.get('/team/:teamName', function(req, res) {
  var teamName = req.params.teamName;
  res.send('You requested info on the ' + teamName);
  console.log(teamName);
}); */

/* send homepage */
app.get('/', function(req, res) {
  var readstream = fs.createReadStream(filePath);
  readstream.pipe(res);
});

/* handler for html fragment */
app.get('/public/fragment.html', function(req, res) {
  var fragment = path.join(__dirname + '/public/fragment.html');
  var readstream = fs.createReadStream(fragment);
  readstream.pipe(res);
});



/* handle post request for new team */
app.post('/newteam', function(req, res) {
  var teamName = req.body.name;
  var teamLocation = req.body.location;
  // console.log(teamName + ' are located in ' + teamLocation);
  addTeam(teamName, teamLocation);
});

/* send find all page */
app.get('/find-all-page', function(req, res) {
  var allTeams = path.join(__dirname + '/public/findAll.html');
  var readstream = fs.createReadStream(allTeams);
  readstream.pipe(res);
});

/* handle read request for all teams, send array of docs back */
app.get('/all', function(req, res) {
  MongoClient.connect('mongodb://localhost:27017/hockey', function(err, db) {
    if(err) {
      console.log(err);
    } else {
      var collection = db.collection('teams');

      /* find all teams and send them in response */
      collection.find({}).toArray(function(err, items) {
        res.send(items);
      });
    }
  });
});

/*---------------------------------------------------------------------
 DATABASE OPERATIONS
 -------------------*/

/* add to database with query */
function addTeam (teamName, location) {
  // build
  var newDoc = {'teamName' : teamName, 'location' : location}

  MongoClient.connect('mongodb://localhost:27017/hockey', function(err, db) {
    if(err) {
      console.log('error');
    } else {
      var collection = db.collection('teams');
      collection.insert(newDoc);
    }
  });
}

// read now handled directly by the '/all' route

/*---------------------------------------------------------------------
 PORT CONFIGURATION
 ------------------*/
app.listen(8080);
console.log('Server listening on port 8080');
