'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//db setup
mongoose.connect('mongodb://localhost/biblioteka');

//create a model
var ksiazkiModel = mongoose.model('ksiazkis', ksiazkaSchema);

/* GET users listing. */
router.get('/', function (req, res, next) {
    var tytul = req.query.tytul;
    var autor = req.query.autor;
    var rok_wydania = req.query.rok_wydania;
    var query = {};
    if (tytul !== undefined) query.tytul = tytul;
    if (autor !== undefined) query.autor = autor;
    if (rok_wydania !== undefined) query.rok_wydania = rok_wydania;
    console.log(query);
    ksiazkiModel.find(query, function (err, rec) {
        if (err) {
            console.log('db error');
            res.json({ result: '!!! ERROR !!!' });
        } else if (rec.length === 0) {
            res.json({ result: null });
        } else {
            res.json(rec);
        }
    });
});

exports.default = router;
//# sourceMappingURL=ksiazki.js.map