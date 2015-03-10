'use strict';

var createStore = require('fluxible/utils/createStore');

var ProjectStore = createStore({
    storeName: "ProjectStore",

    handlers: {
        'RECEIVE_PROJECTS_SUCCESS': 'updateProjects'
    },

    initialize: function () {
        this.projects = [];
    },

    getProjects: function () {
        return this.projects;
    },

    updateProjects: function (payload) {
        this.projects = payload;
        this.emitChange();
    },

    dehydrate: function () {
        return {
            projects: this.projects
        };
    },
    rehydrate: function (state) {
        this.projects = state.projects;
    }
});

module.exports = ProjectStore;
