'use strict';
var React        = require('react');
var Fluxible     = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin  = require('fluxible-plugin-routr');

/*
 * Common application setup code.
 *
 * - Create new Fluxible app instance
 * - Define root application component
 * - Install plugins
 * - Register stores
 */

var app = new Fluxible({
  component: React.createFactory(require('./pages/homepage/home-page'))
});

app.plug(fetchrPlugin());

app.plug(routrPlugin({ routes: require('./routes') }));

app.registerStore(require('../src/stores/project-store'));

module.exports = app;
