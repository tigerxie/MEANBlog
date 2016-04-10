var mongo = require('mongodb');
var host = 'localhost';
var port = '27017';
var db = new mongo.Db('node-mongo-examples',
         new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});

var docs= [{type:'food',price:9},
    {type:'food',price:10},
    {type:'food',price:11},
    {type:'book',price:100}];
db.open(function(err,db){
  db.collection('goods',function(err,collection){
    collection.insert(docs,function(err,docs){
      if(err) throw err;
      else {
        collection.find({type:'food'}).toArray(function(err,docs){
          if(err) throw err;
          console.log('food----------------');
          console.log(docs);
        })
        collection.find({type:'food',price:10}).toArray(function(err,docs){
          if(err) throw err;
          console.log('food_10-----------------');
          console.log(docs);
        })
        collection.find({type:{$in:['food','book']}}).toArray(function(err,docs){
          if(err) throw err;
          console.log('food_book---------------');
          console.log(docs);
        })
      }
    })
  })
});
