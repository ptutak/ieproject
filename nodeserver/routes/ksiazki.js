const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//db setup
mongoose.connect('mongodb://localhost/biblioteka');


//create a schema
let ksiazkaSchema = new mongoose.Schema({
    tytul : String,
    autor : String,
    rok_wydania : String
});

//create a model
let ksiazkiModel = mongoose.model('ksiazki',ksiazkaSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
    let tytul=req.query.tytul;
    let autor=req.query.autor;
    let rok_wydania=req.query.rok_wydania;
    let query={};
    if (tytul!==undefined)
        query.tytul=tytul;
    if (autor!==undefined)
        query.autor=autor;
    if (rok_wydania!==undefined)
        query.rok_wydania=rok_wydania;
    console.log(query);
    ksiazkiModel.find(query, function (err, rec) {
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
});

module.exports = router;
