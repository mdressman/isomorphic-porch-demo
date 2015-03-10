"use strict";

var React         = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var createProject = require('../../actions/create-project');

var ProjectForm = React.createClass({

    mixins: [FluxibleMixin],

    submitForm: function (e) {
        e.preventDefault();

        var formData = {
            projectName: this.refs['projectName'].getDOMNode().value.trim(),
            projectDesc: this.refs['projectDesc'].getDOMNode().value.trim()
        };

        this.executeAction(createProject, formData);
    },
    render: function () {

        return (
            <div className="createProject">

                <h2 className="sectionHeading">Create a project!</h2>

                <form className="createProject-form" onSubmit={this.submitForm}>
                    <input ref="projectName" placeholder="Project Name" />
                    <input ref="projectDesc" placeholder="Project Description" />
                    <button type="submit">Do it!</button>
                </form>
            </div>
        );
    }
});

module.exports = ProjectForm;
