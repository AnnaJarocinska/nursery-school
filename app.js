var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://administrator:eJMXbjU2LUgfac1P@cluster0-j7d4b.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("connected!")
// });

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var questionnaireRouter = require('./routes/questionnaire');
var employeeRouter = require('./routes/employee');
var parentsRouter = require('./routes/parents');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(cookieSession({
  name: 'session',
  keys: config.keySession,
  maxAge: config.maxAgeSession
}))

app.use(function(req, res, next){
  //jako atrybut globalny
res.locals.path = req.path;
next();
});

app.use('/', indexRouter);
app.use('/questionnaire', questionnaireRouter);
app.use('/employee', employeeRouter);
app.use('/news', newsRouter);
app.use('/parents', parentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
