//Middlewares
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const config = require('./config');
const passport = require('passport');

//Current working directory
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productRouter');
const commentRouter = require('./routes/commentRouter');
const shoppingCartRouter = require('./routes/shoppingCartRouter');

//Database
const mongoose = require('mongoose');
const url = config.mongoUrl; //point to db
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

connect.then(
    () => console.log('Connected correctly to db server'),
    err => console.log(err) //handle promise rejection
);

//App is using Express framework
var app = express();

//Redirect all traffic to secure URL
app.all('*', (req, res, next) => {
    if (req.secure) { //check for https request
      return next();
    } else {
      console.log(`Redirecting to: https://${req.hostname}:${app.get('secPort')} ${req.url}`);
      res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); //modern replacement for body-parser

//parse req.body when user uses POST, output as JSON object
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

//URL endpoints for public HTTP requests
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Directory for static files
//_dirname is Node special var = current dir absolute path of file where found
app.use(express.static(path.join(__dirname, 'public')));

//URL endpoints for protected HTTP requests
app.use('/products', productRouter);
app.use('/products/item', productRouter);
app.use('/comments', commentRouter);
app.use('/shoppingCart', shoppingCartRouter);
app.use('/shoppingCart/cartId', shoppingCartRouter);

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
