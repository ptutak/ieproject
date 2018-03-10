const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//create a schema
var ksiazkaSchema = new mongoose.Schema({
    tytul : String,
    autor : String,
    rok_wydania : String
});

//create a model
var ksiazkaModel = mongoose.model('ksiazki',ksiazkaSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
    var input=req.query.text;
    ksiazkaModel.find({tytul : input}, function (err, rec) {
        if (err){
            console.log('db error');
            res.send('!!! ERROR !!!');
        }
        else if (rec.length===0){
            res.json( {result : null} );
        }
        else {
            res.json(rec);
        }
        
    });
});

module.exports = router;
