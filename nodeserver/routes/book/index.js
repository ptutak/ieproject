const express = require('express');
const controller = require('./controller');


const router = express.Router();
// Start here
// Core examples - you need to have it in your project!
router.get('/index', controller.index);
router.get('/index2',controller.index2);
/*
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)
*/


module.exports=router;