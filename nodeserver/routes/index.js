const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
    let mongoClient = mongodb.MongoClient;
    let url = "mongodb://localhost:27017/";
    let input=req.query.input;
    if (input==='findAll'){
        mongoClient.connect(url,function(err,db){
            if (err) throw err;
            let mydb=db.db('mydb');
            mydb.collection("customers").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                db.close();
            });
        });
    }
    else if (input==='createCollection') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let mydb = db.db("mydb");
            mydb.createCollection("customers", function (err, res) {
                if (err) throw err;
                console.log("Collection created!");
                db.close();
            });
        });
    }

    else if (input==='insertOne') {
        mongoClient.connect(url,function (err,db) {
            if (err) throw err;
            let mydb = db.db("mydb");
            let myobj = {name: req.query.name, address: req.query.address};
            mydb.collection("customers").insertOne(myobj, function (err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }
    else if (input==='query'){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let query = { name : req.query.name, address: req.query.address };
            dbo.collection("customers").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                db.close();
            });
        });

    }


});

module.exports = router;
