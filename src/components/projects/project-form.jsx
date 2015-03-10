"use strict";

var React         = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var createProject = require('../../actions/create-project');

var ProjectForm = React.createClass({

    mixins: [FluxibleMixin],

    getInitialState: function() {
        return {
            value: ''
        };
    },

    submitForm: function (e) {
        e.preventDefault();

        // TODO: Add form validation assignment w instructions

        var formData = {
            projectName: this.state.value,
            projectImg: "http://placehold.it/546x408"
        };

        this.executeAction(createProject, formData);
        this.setState({ value: '' });
    },

    handleChange: function(e) {
        e.preventDefault();
        this.setState({ value: e.target.value });
    },

    render: function () {

        return (
            <div className="row">
                <div className="col-sm-12">

                    <form onSubmit={this.submitForm}>
                        <input
                            ref="projectName"
                            placeholder="Add a project!"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <button className="btn projectForm-button" type="submit">
                            >
                        </button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = ProjectForm;
