const express = require('express');
const controller = require('./controller');
const token = require('../service/passport').token;

const router = express.Router();


router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/add/author/:id/:author',controller.addAuthor);
router.get('/remove/author/:id/:author',controller.removeAuthor);


module.exports=router;