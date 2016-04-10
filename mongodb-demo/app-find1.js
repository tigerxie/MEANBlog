var mongo = require('mongodb');
var host = 'localhost';
var port = '27017';
var db = new mongo.Db('node-mongo-examples',
         new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});

var store1 = {name:'store1',goods:{type:'food',price:10}};
var store2 = {name:'store2',goods:{type:'food',price:11}};
var store3 = {name:'store3',goods:{type:'food',price:12}};
var store4 = {name:'store4',goods:{type:'food',price:13}};
var store5 = {name:'store5',goods:{type:'food',price:14}};
var store6 = {name:'store6',goods:{type:'food',price:15}};

var docs = [store1,store2,store3,store4,store5,store6];

db.open(function(err,db){
  db.collection('stores',function(err,collection){
    collection.insert(docs,function(err,docs){
      if(err) throw err;
      collection.find({goods:{type:'food',price:12}}).toArray(function(err,docs){
        if(err) throw err;
        else {
          console.log(docs);
          db.close();
        }
      })
    })
  })
});
