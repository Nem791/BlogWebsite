var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


const db = 'mongodb://localhost/blogdbp';
mongoose.connect(db);
var indexRouter = require('./routes/index');
var postRouter = require('./routes/posts');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: "keyboard cat",
  cookie: { maxAge: 8*60*60*1000 }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// Trang home 
// Get thong tin cac bai post
app.use('/', indexRouter); // Trang home

// Trang POSTS 
// Tao moi 1 bai POST 
app.use('/posts', postRouter);

// Trang user 
// Dang ky moi 1 user 
app.use('/users', usersRouter);

// Trang login 
// Dang ky moi 1 user 
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
