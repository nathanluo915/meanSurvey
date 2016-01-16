var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var surveys = require('./routes/surveys');

var app = express();

// Enable session storing
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_sesson_test',
  collection: 'mySessions'
});

store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
})

app.use(session({
  secret:"qiewurxvjh",
  cookie: {
    maxAge: 30*60*1000,
  },
  saveUninitialized: true,
  resave: true,
  store: store
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// MongoDB setup
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/myapp');

app.use(function(req,res,next){
  req.db = db;
  next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/surveys', surveys);


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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
