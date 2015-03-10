'use strict';

var app             = require('./app');

var React           = require('react');
var dehydratedState = window.App; // sent from the server
window.React        = React; // for chrome dev tool support

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;

    var mountNode = document.getElementById('app');

    React.render(app.getComponent()({context: context.getComponentContext()}), mountNode, function () {
        console.log('React client-side rendered.');
    });
});