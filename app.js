const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const asobibaSrcHandler = require('./asobiba-src-manager-function')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middle wares
app.use(logger('dev')); //いつものログを表示する
app.use(express.json()); //POSTで送られてくるjsonデータをjsonにパースする
app.use(express.urlencoded({ extended: false })); //formなどで送られてくるオプション達をオブジェクトにパースする
app.use(cookieParser()); //あのCookieから送られてくるデータをオブジェクトにパースする
app.use(function (req, res, next) {
  res.render("asobiba", { title: 'Asobiba', asobibaSrc: asobibaSrcHandler.src });
})
//app.use(express.static(path.join(__dirname, 'public')));

// routes
{
  const indexRouter = express.Router().get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });
  app.use('/', indexRouter);
}

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
