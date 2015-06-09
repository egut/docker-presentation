'use strict';

var debug = require('debug')('app:app');
var path = require('path');
var express = require('express'),
    expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser');
var morgan = require('morgan');

var rootRouter = require('./routes/root');
var awsomeV0Router = require('./routes/awsome_v0');
var awsomeV1Router = require('./routes/awsome_v1');
var awsomeV2Router = require('./routes/awsome_v2');
var awsomeV3Router = require('./routes/awsome_v3');
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
app.use('/awsome/v0', awsomeV0Router);
app.use('/awsome/v1', awsomeV1Router);
app.use('/awsome/v2', awsomeV2Router);
app.use('/awsome/v3', awsomeV3Router);
app.use('/docker', dockerRouter);

app.use(express.static(path.join(__dirname, '..', 'app')));

module.exports = app;
