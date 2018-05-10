const express = require('express');
const token =require('../service/passport').token;
const showMe = require('./controller').showMe;
const update = require('./controller').update;
const destroy = require('./controller').destroy;
const create = require('./controller').create;
const index = require('./controller').index;
const show = require('./controller').show;

const router = express.Router();


router.get('/', token({ required: true, roles:['admin']}), index);
router.get('/me',token({ required: true }),showMe);
router.get('/:id',token({required:true, roles:['admin']}),show);
router.post('/',create);
router.put('/:id',token({ required: true}),update);
router.delete('/:id',token({ required: true, roles: ['admin'] }),destroy);

module.exports=router;
