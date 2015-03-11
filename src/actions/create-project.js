'use strict';

module.exports = function (context, payload, done) {

    /*
     * Calls the service's create function and passes in data. This service
     * returns all projects including the one newly added.
     */
    context.service.create('projectService', payload, {}, function(err, projects) {
        if (err) {
            console.error(err);
            done(err);
            return;
        }

        /*
         * Dispatches the same event as the server's load action,
         * passing along an updated list of projects to all stores registered
         * to handle this event.
         */
        context.dispatch('RECEIVE_PROJECTS_SUCCESS', projects);
        done();
    });

};
