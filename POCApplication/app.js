var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const masterRouter = require('./routes/master');
const marketPlaceOfUserRouter = require('./routes/marketPlaceOfUser')
var port = process.env.PORT || '3000';
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/master', masterRouter);
app.use('/user/marketPlacesOfUser', marketPlaceOfUserRouter);

module.exports = app;
app.listen(port, () => console.log(`server running on port ${port}`))