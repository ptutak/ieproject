const express = require('express');
const token =require('../service/passport').token;
const showMe = require('./controller').showMe;
const update = require('./controller').update;
const destroy = require('./controller').destroy;
const create = require('./controller').create;

const router = express.Router();

router.get('/me',token({ required: true }),showMe);
router.post('/',create);
router.put('/:id',token({ required: true}),update);
router.delete('/:id',token({ required: true, roles: ['admin'] }),destroy);

module.exports=router;
