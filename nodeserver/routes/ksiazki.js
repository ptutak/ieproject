const express = require('express');
const router = express.Router();
const books = require('./book/model').model;


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
    books.find(query, function (err, rec) {
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

module.exports=router;
