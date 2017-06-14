var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let session = require('express-session');
const mongoose = require('mongoose');
global.dbHelper = require( './common/dbHelper' );
global.db = mongoose.connect("mongodb://127.0.0.1:27017/myblog");

var routers = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
layout: true
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * 配置静态文件服务器
 */

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', users);
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    },
    resave: false,
    saveUninitialized: true
}));

app.use('/', routers);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.message = req.session.error;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
