const express = require('express');
const router = express.Router();
const books = require('./book');


/* GET users listing. */
router.get('/', function(req, res, next) {
    let title=req.query.title;
    let author=req.query.author;
    let year=req.query.year;
    let query={};
    if (title!==undefined)
        query.title=title;
    if (author!==undefined)
        query.author=author;
    if (year!==undefined)
        query.year=year;
    console.log(query);
    books.get('/')
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
