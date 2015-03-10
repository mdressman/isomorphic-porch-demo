"use strict";

var React                 = require('react');
var cx                    = React.addons.classSet;
var FluxibleMixin         = require('fluxible').Mixin;
var ProjectStore          = require('../../stores/project-store');

var ProjectList = React.createClass({

    mixins: [FluxibleMixin],

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

        var classes = cx({
            'projectList': true,
            'hidden-xs': this.props.hideOnMobile
        });
        
        return (
            <div className={classes}>
                <h2 className="sectionHeading">Projects.</h2>
                <ul className="projectList-ul">
                    {this.state.projects.map(function (project, i) {
                        return (
                            <Project project={project} key={i} />
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var Project = React.createClass({

    render: function () {

        var p = this.props.project;

        return (
            <li>
                {p.projectName}
                <ul><li>{p.projectDesc}</li></ul>
            </li>
        );
    }
});

module.exports = ProjectList;
