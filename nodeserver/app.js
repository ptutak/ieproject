const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
//const logger = require('morgan');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');
const books = require('./routes/book/index');
const authors = require('./routes/author/index');
const imageupload = require('./routes/service/imageupload');
//const bookstest = require('./routes/bookstest');
//const authorstest = require('./routes/authorstest');
const images = require('./routes/service/images');
const app = express();

const promise=mongoose.connect('mongodb://localhost/library');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
app.use('/books', books);
app.use('/authors',authors);
//app.use('/bookstest',bookstest);
//app.use('/authorstest',authorstest);
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

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
