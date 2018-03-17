express = require('express');
authors = require('./author/model').model;


const router = new express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

});

module.exports = router;
