'use strict';

require('node-jsx').install({extension: '.jsx', harmony: true}); // parses JSX and enables ES6/7 transpiling

var express      = require('express');
var bodyParser   = require('body-parser');
var app          = require('../src/app'); // Fluxible app
var path         = require('path'); // path util

// Make our node process bulletproof
process.on('uncaughtException', function(err) {
    console.error(err.stack);
});

// initialize our server
var server = express();
server.set('state namespace', 'App');

// serve our 'build' dir assets under '/v2/assets'
server.use('/v2/assets', express.static(path.join(__dirname, '..', 'dist')));

// automatically parse any encoding of JSON
server.use(bodyParser.json());

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// attach our flux middleware (this is our actual app)
server.use(require('./flux-middleware'));

// ok, ready: run the server
var port = 9312;
server.listen(port, function() {
    var env = process.env.NODE_ENV || 'development';
    console.log('Listening on port ' + port + ' [' + env + ']');
});
