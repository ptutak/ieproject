'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var router = new _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //  res.render('index', { title: 'Express' });
    var mongoClient = _mongodb2.default.MongoClient;
    var url = "mongodb://localhost:27017/";
    var input = req.query.input;
    if (input === 'findAll') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var mydb = db.db('mydb');
            mydb.collection("customers").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                db.close();
            });
        });
    } else if (input === 'createCollection') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var mydb = db.db("mydb");
            mydb.createCollection("customers", function (err, res) {
                if (err) throw err;
                console.log("Collection created!");
                res.send("Collection created!");
                db.close();
            });
        });
    } else if (input === 'insertOne') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var mydb = db.db("mydb");
            var myobj = { name: req.query.name, address: req.query.address };
            console.log(myobj);
            mydb.collection("customers").insertOne(myobj, function (err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                res.send("1 document inserted");
                db.close();
            });
        });
    } else if (input === 'find') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var query = {};
            if (req.query.name !== undefined) query['name'] = req.query.name;
            if (req.query.address !== undefined) query['address'] = req.query.address;
            console.log(query);
            dbo.collection("customers").find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json(result);
                db.close();
            });
        });
    } else if (input === 'delete') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var query = {};
            if (req.query.name !== undefined) query['name'] = req.query.name;
            if (req.query.address !== undefined) query['address'] = req.query.address;

            dbo.collection("customers").deleteOne(query, function (err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                res.send("1 document deleted");
                db.close();
            });
        });
    } else if (input === 'drop') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("customers").drop(function (err, delOK) {
                if (err) throw err;
                if (delOK) {
                    console.log("Collection deleted");
                    res.send("Collection deleted");
                }
                db.close();
            });
        });
    } else if (input === 'update') {
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var query = {};
            if (req.query.name !== undefined) query['name'] = req.query.name;
            if (req.query.address !== undefined) query['address'] = req.query.address;
            var newvalues = { $set: {} };
            if (req.query.nname !== undefined) newvalues.$set.name = req.query.nname;
            if (req.query.naddress !== undefined) newvalues.$set.address = req.query.naddress;
            dbo.collection("customers").updateOne(query, newvalues, function (err, result) {
                if (err) throw err;
                console.log("1 document updated");
                res.send("1 document updated");
                db.close();
            });
        });
    } else {
        res.send('Hello to my MongoDB database.');
    }
});

exports.default = router;
//# sourceMappingURL=index.js.map