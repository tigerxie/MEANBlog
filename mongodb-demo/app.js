var mongo = require('mongodb');
var host = 'localhost';
var port = '27017';
var db = new mongo.Db('node-mongo-examples',
         new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});
db.open(function(err,db){
  db.collection('users',function(err,collection){
    collection.insert({username:'xxh',password:'xxx'},function(err,docs){
      if(err) throw error;
      else {
        console.log(docs);
        db.close(true);
      }
    });
  });
});
db.once('close',function(err,db){
  if(err) throw err;
  else {
    db.open(function(err,db){
      db.collection('users',function(err,collection){
        collection.insert({username:'xxx',password:'ppp'},function(err,docs){
          if(err) throw err;
          else {
            console.log(docs);
            db.close(true);
          }
        })
      })
    })
  }
})
