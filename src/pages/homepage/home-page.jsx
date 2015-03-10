"use strict";

var React         = require('react/addons');
var FluxibleMixin = require('fluxible').Mixin;
var ProjectList   = require('../../components/projects/project-list');

var HomePage = React.createClass({
    mixins: [ FluxibleMixin ],

    render: function() {
        return (
            <div className="homePage">
                <h1>Isomorphic React + Flux at Porch.com</h1>
                <ProjectList />
            </div>
        );
    }
});

module.exports = HomePage;
