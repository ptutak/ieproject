const express = require('express');

const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/:id',(req,res,next)=>{
    let imgName=req.params.id;

    fs.readFile('/public/images/'+imgName, {encoding: 'bin'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            res.writeHead(200, {'Content-Type': 'image'});
            res.write(data);
            res.end();
        } else {
            console.log(err);
        }
    });
});

module.exports = router;