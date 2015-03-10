'use strict';

var React          = require('react');
var serialize      = require('serialize-javascript');
var debug          = require('debug')('fluxMiddleware');
var navigateAction = require('flux-router-component').navigateAction;
var app            = require('../src/app');
var HtmlComponent  = React.createFactory(require('../src/components/html-component.jsx'));

module.exports = function(req, res) {

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
};
