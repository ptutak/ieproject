const express = require('express');
const router = express.Router();
const books = require('./book');
const request = require('request');


/* GET users listing. */
router.get('/', function(req, res, next) {
    let title=req.query.title;
    let year=req.query.year;
    let query={};
    if (title!==undefined)
        query.title=title;
    if (year!==undefined)
        query.year=year;
    console.log(query);
    request({
        url:'http://localhost:3001/books/',
        method:'POST',
        json:{title:title,year:year,author:[null]}
    },(err, resp, body)=>{
        console.log('error:',err);
        console.log('body:',body);
        res.json(body);
    });

});

router.get('/find',(req,res,next)=>{

});

module.exports=router;
