const express = require('express');
const controller = require('./controller');
const token = require('../service/passport').token;

const router = new express.Router();

router.get('/',token({ required: true}), controller.index);
router.get('/:id',token({ required: true}), controller.show);
router.post('/',token({ required: true, roles:['admin']}), controller.create);
router.put('/:id', token({ required: true, roles:['admin']}),controller.update);
router.delete('/:id',token({ required: true, roles:['admin']}), controller.delete);
router.get('/add/book/:id/:book',token({ required: true, roles:['admin']}),controller.addBook);
router.get('/remove/book/:id/:book',token({ required: true, roles:['admin']}),controller.removeBook);


module.exports=router;