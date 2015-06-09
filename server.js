'use strict';

var debug = require('debug')('app:server');
var http = require('http');

function environment() {
    return process.env.NODE_ENV || 'development';
}

function isProduction() {
    return environment() === 'production';
}

var app = require('./lib/app');

// Make sure uncaught exceptions are logged on exit
process.on('uncaughtException', function(err) {
    console.log("Uncaught exception", err, err.stack);
    process.exit(1);
});

function start() {
    var port = process.env.PORT || 3000;

    server.listen(port, function() {
        console.log(environment().toUpperCase() + ' server started');
        console.log('Port:', port);
        console.log('URL:', 'http://localhost:' + port);
    });
}


var server = http.createServer(app);
server.app = app;
server.start = start;

module.exports = server;

// Start the app if called directly
if(require.main === module)
    start();
