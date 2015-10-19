'use strict';

// LOADING DEPENDENCIES
var express = require('express');
var path = require('path');

// INITIALIZIN EXPRESS APLICAION
var app = express();

//LOADING config
var config = require('./lib/config');

// BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

// LOGGER
var logger = require('morgan');
app.use(logger('dev'));

// COOKIES / SESSION
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Layout setup
var exphbs = require('express-handlebars');

// Stylus setup
var stylus = require('stylus');
var nib = require('nib');

//handlebars setup
app.engine(config().views.engine, exphbs({
  extname: config().views.extension,
  defaultLayaut: config().views.layout,
  layoutDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}));

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
var home = require('./routes/home');
var users = require('./routes/users');

app.use('/', home);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Export application or star the server
if (!!module.parent) {
    module.exports = app;
} else {
  app.listen(config().serverPort);
}