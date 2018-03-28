express = require('express');
const request = require('request');

const router = new express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let first_name=req.query.first_name;
    let last_name=req.query.last_name;
    let year=req.query.year;
    let query={};
    if (first_name!==undefined)
        query.first_name=first_name;
    if (last_name!==undefined)
        query.last_name=last_name;
    if (year!==undefined)
        query.year=year;
    console.log(query);
    request({
        url:'http://localhost:3001/authors/',
        method:'POST',
        json:{first_name:first_name,last_name:last_name,year:year,book:[null]}
    },(err, resp, body)=>{
        console.log('error:',err);
        console.log('body:',body);
        res.json(body);
    });

});

module.exports = router;
