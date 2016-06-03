/* MODULES */
var commandLineArgs = require('command-line-args');
var MongoClient = require('mongodb').MongoClient;

/* set up the argument for team name */
var optionDefinitions = [
  {name: 'team', alias: 't', type: String}
]

/* parse input into 'options' var */
var options = commandLineArgs(optionDefinitions);

/* What will go into the DB query */
var team = options.team;

/* Connect to database */
MongoClient.connect('mongodb://localhost:27017/hockey', function(err, db) {
  if(err) {
    console.log('error');
  } else {
    var collection = db.collection('teams'); // assign collection to var

    /* find team with the name supplied */
    collection.find({teamName : team}).toArray(function(err, items) {
      teamLocation = items[0].location; // find location of team supplied
      console.log(teamLocation);
    });
  }
});
