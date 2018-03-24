const express = require('express');
const controller = require('./controller');


const router = new express.Router();
// Start here
// Core examples - you need to have it in your project!
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);



module.exports=router;