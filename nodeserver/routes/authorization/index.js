const express = require('express');
const login = require('./controller');
const password = require('../service/passport').password;

const router = express.Router();


router.post('/',password(),login);


module.exports=router;
