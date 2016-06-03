// require the mongo client from MongoDB
var MongoClient = require('mongodb').MongoClient;

// connect to database
MongoClient.connect('mongodb://localhost:27017/hockey', function(err, db) {
  if(err) {
    console.log('error');
  } else {
    var collection = db.collection('teams'); // assign collection to var
    // could return all of the items, but 'Bruins' is specified below
    collection.find({teamName : 'Bruins'}).toArray(function(err, items) {
      console.log(items);
    });
  }
});

/* Notes

the mongo db wire protocol is built around four main operations:

insert/update/remove/query

the find() method

- does not run the actual query, it builds an instance of a cursor that is then used to retrieve the data.  Simplest way is to use the toArray method, it is not good for enormous result sets, but it gets the job done.  It sends the entire document into the response:

collection.find().toArray(function(err, items) {
  console.log(items);
});



 */
