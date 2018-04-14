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
router.get('/add/book/:id/:book',controller.addBook);
router.get('/remove/book/:id/:book',controller.removeBook);


/*
// Other examples - not necessary but can upgrade your mark
router.get('/search/name/:name', searchByName)
router.get('/search/height/:min/:max', searchByHeight)
router.get('/search/birthday/:min/:max', searchByBirthday)
router.get('/count', count)
router.get('/list', listcount)
router.get('/index/:limit?/:skip?', paginatedIndex)
router.get('/:id/movies', moviesByActor)
*/

module.exports=router;