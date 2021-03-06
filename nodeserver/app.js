const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const passport=require('passport');


const index = require('./routes/index');
const users = require('./routes/user/index');
const authorization = require('./routes/authorization/index');
const books = require('./routes/book/index');
const authors = require('./routes/author/index');
const imageupload = require('./routes/service/imageupload');
const images = require('./routes/service/images');
const app = express();


const promise=mongoose.connect('mongodb://localhost/library');

// uncomment after placing your favicon in /public

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', index);
app.use('/users', users);
app.use('/login',authorization);
app.use('/books', books);
app.use('/authors',authors);
app.use('/imageupload',imageupload);
app.use('/images',images);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send(err.stack);

});

module.exports = app;
