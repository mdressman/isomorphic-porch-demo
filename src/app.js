'use strict';
var React        = require('react');
var FluxibleApp  = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin  = require('fluxible-plugin-routr');

/*
* This is our porch global flux app. It registers all of our pages, stores,
* and handles the basic routing and page loading.
*/
var app = new FluxibleApp({
  component: React.createFactory(require('./pages/homepage/home-page'))
});

app.plug(fetchrPlugin({
  xhrPath: '/napi/'
}));

app.plug(routrPlugin({
  routes: require('./routes')
}));

module.exports = app;
