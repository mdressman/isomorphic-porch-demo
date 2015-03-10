"use strict";

var React         = require('react/addons');
var FluxibleMixin = require('fluxible').Mixin;
var ProjectList   = require('../../components/projects/project-list');
var ProjectForm   = require('../../components/projects/project-form');
var Footer        = require('../../components/footer');

var HomePage = React.createClass({
    mixins: [ FluxibleMixin ],

    render: function() {
        return (
            <div className="homePage container">
                <div className="homePage-projects">
                    <h1>Isomorphic Project Gallery</h1>
                    <ProjectForm />
                    <ProjectList />
                </div>
                <Footer />
            </div>
        );
    }
});

module.exports = HomePage;
