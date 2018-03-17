express = require('express');
authors = require('./author/model').model;


const router = new express.Router();

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
        authors.find(query, function (err, rec) {
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
