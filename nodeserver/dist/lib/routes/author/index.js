'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _controller = require('./controller');

var router = new _express.Router();
// Start here
// Core examples - you need to have it in your project!
router.get('/index', _controller.index);
router.get('/index2', _controller.index2);
/*
router.get('/:id', show)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy)
*/

exports.router = router;
//# sourceMappingURL=index.js.map