'use strict';

var debug = require('debug')('app:app');
var path = require('path');
var express = require('express'),
    expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser');
var morgan = require('morgan');

var rootRouter = require('./routes/root');
var awesomeV0Router = require('./routes/awesome_v0');
var awesomeV1Router = require('./routes/awesome_v1');
var awesomeV2Router = require('./routes/awesome_v2');
var awesomeV3Router = require('./routes/awesome_v3');
var dockerRouter = require('./routes/docker');

var app = express();

// Middleware and routes are added with use
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressLayouts);

//Init ejs engine
app.set('view engine', 'ejs');
app.set('views', 'app');


app.use('/', rootRouter);
app.use('/awesome/v0', awesomeV0Router);
app.use('/awesome/v1', awesomeV1Router);
app.use('/awesome/v2', awesomeV2Router);
app.use('/awesome/v3', awesomeV3Router);
app.use('/docker', dockerRouter);

app.use(express.static(path.join(__dirname, '..', 'app')));

module.exports = app;
