"use strict";

var React          = require('react');
var cx             = React.addons.classSet;
var FluxibleMixin  = require('fluxible').Mixin;
var ProjectStore   = require('../../stores/project-store');

var ProjectList = React.createClass({

    mixins: [ FluxibleMixin ],

    statics: {
        storeListeners: [ ProjectStore ]
    },

    getInitialState: function () {
        return this.getStateFromStores();
    },

    getStateFromStores: function () {
        return {
            projects: this.getStore(ProjectStore).getProjects()
        };
    },

    onChange: function() {
        this.setState(this.getStateFromStores());
    },

    render: function () {

        return (
            <div className="projectList">
                <div className="row">
                    {this.state.projects.map(function (project, i) {
                        return (
                            <Project project={project} key={i} />
                        );
                    })}
                </div>
            </div>
        );
    }
});

var Project = React.createClass({

    render: function () {

        var classes = cx({
            'project': true,
            'col-sm-4': true,
            'col-md-3': true,
            'hidden-sm': this.props.index > 2,
            'hidden-xs': this.props.index > 2
        });

        var p = this.props.project;

        // TODO: Add Read More assignment using state and classSet
        return (
            <div className={classes}>
                <figure>
                    <img src={p.projectImg} />
                    <figcaption>{p.projectName}</figcaption>
                </figure>
            </div>
        );
    }
});

module.exports = ProjectList;
