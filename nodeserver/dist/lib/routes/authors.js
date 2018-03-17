'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _model = require('./author/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var router = new _express2.default.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var command = req.query.command;
    if (command === 'dateUpdate') {
        res.json({ result: null });
    } else {
        var imie = req.query.imie;
        var nazwisko = req.query.nazwisko;
        var data_urodzenia = req.query.data_urodzenia;
        var query = {};
        if (imie !== undefined) query.imie = imie;
        if (nazwisko !== undefined) query.nazwisko = nazwisko;
        if (data_urodzenia !== undefined) query.data_urodzenia = data_urodzenia;
        console.log(query);
        _model2.default.find(query, function (err, rec) {
            if (err) {
                console.log('db error');
                res.json({ result: '!!! ERROR !!!' });
            } else if (rec.length === 0) {
                res.json({ result: null });
            } else {
                res.json(rec);
            }
        });
    }
});

exports.router = router;
//# sourceMappingURL=authorstest.js.map