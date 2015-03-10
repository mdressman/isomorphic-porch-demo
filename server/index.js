'use strict';

require('node-jsx').install({extension: '.jsx', harmony: true}); // parses JSX and enables ES6/7 transpiling

var express      = require('express');
var bodyParser   = require('body-parser');
var app          = require('../src/app'); // Fluxible app
var path         = require('path'); // path util
var React          = require('react');
var serialize      = require('serialize-javascript');
var debug          = require('debug')('fluxMiddleware');
var navigateAction = require('flux-router-component').navigateAction;
var HtmlComponent  = React.createFactory(require('../src/components/html-component.jsx'));

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

// Register our REST services
fetchrPlugin.registerService(require('./services/project-service'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// attach our flux middleware (this is our actual app)
server.use(function(req, res) {

    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: { // Used as query params for all XHR calls
            lang: 'en-US', // make sure XHR calls receive the same lang as the initial request
            _csrf: 'a3fc2d' // CSRF token to validate on the server using your favorite library
        }
    });

    var actionContext = context.getActionContext();

    debug('Executing navigate action');
    actionContext.executeAction(navigateAction, {
        url: req.url
    }, function (err) {
        if (err) {
            res.status(500);
            res.send("five hundo. sad panda.");
            return;
        }

        debug('Exposing context state to client as window.App');
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        var Component = app.getComponent();

        var html = React.renderToStaticMarkup(HtmlComponent({
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(Component({context:context.getComponentContext()}))
        }));

        debug('Sending markup');
        res.send(html);
    });
});

// ok, ready: run the server
var port = 9312;
server.listen(port, function() {
    var env = process.env.NODE_ENV || 'development';
    console.log('Listening on port ' + port + ' [' + env + ']');
});
