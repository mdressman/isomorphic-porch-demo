"use strict";

var React         = require('react/addons');
var FluxibleMixin = require('fluxible').Mixin;

var HomePage = React.createClass({
    mixins: [ FluxibleMixin ],

    render: function() {
        return (
            <div className="homePage">
                <h1>Isomorphic React + Flux at Porch.com</h1>
            </div>
        );
    }
});

module.exports = HomePage;
