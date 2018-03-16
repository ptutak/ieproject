const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//db setup
resp=mongoose.connect('mongodb://localhost/biblioteka');


//create a schema
let autorSchema = new mongoose.Schema({
    imie : String,
    nazwisko : String,
    data_urodzenia : String
});

//create a model
let autorzyModel = mongoose.model('autorzy',autorSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
    let command=req.query.command;
    if (command==='dateUpdate'){
        let response=[];
        let query={};
        autorzyModel.find(query,function(err,result){
            if(err){
                res.json({result : 'Date update error'});
            }
            else if (result.length===0){
                response.push({result : null});
                console.log(response);
                res.json(response);

            }
            else{
                //data_urodzenia=new Date(person.data_urodzenia);
                console.log(result);
                //console.log(data_urodzenia);
                response.push(result);
                res.json(response);
            }
        });
/*
        query.select('data_urodzenia');
        query.exec((err,person)=>{
           if(err)
               res.json({result : 'Date update error'});
           else{
               data_urodzenia=new Date(person.data_urodzenia);
               console.log(person);
               console.log(data_urodzenia);
               response.push(person);
           }

        });
*/
        response.push({result : 'Dates updated'});
        console.log('abc');
        //res.json(response);
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
