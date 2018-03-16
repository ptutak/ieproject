const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//db setup
resp=mongoose.connect('mongodb://localhost/biblioteka');


//create a schema
let autorSchema = new mongoose.Schema({
    imie : String,
    nazwisko : String,
    data_urodzenia : Date
});

//create a model
let autorzyModel = mongoose.model('autorzys',autorSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
    let command=req.query.command;
    if (command==='dateUpdate'){
        res.json({result : null});
    }
    else {
        let imie=req.query.imie;
        let nazwisko=req.query.nazwisko;
        let data_urodzenia=req.query.data_urodzenia;
        let query={};
        if (imie!==undefined)
            query.imie=imie;
        if (nazwisko!==undefined)
            query.nazwisko=nazwisko;
        if (data_urodzenia!==undefined)
            query.data_urodzenia=data_urodzenia;
        console.log(query);
        autorzyModel.find(query, function (err, rec) {
            if (err){
                console.log('db error');
                res.json({ result : '!!! ERROR !!!'});
            }
            else if (rec.length===0){
                res.json( {result : null} );
            }
            else {
                res.json(rec);
            }

        });
    }

});

module.exports = router;
