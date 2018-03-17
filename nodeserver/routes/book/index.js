const express = require('express');
const controller = require('./controller');


const router = express.Router();


router.get('/index', controller.index);
router.get('/index2',controller.index2);
router.get('/:id', controller.show);
router.get('/', controller.create);
router.get('/:id', controller.update);
router.get('/:id', controller.destroy);



module.exports=router;