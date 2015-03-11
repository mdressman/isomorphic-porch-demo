'use strict';

var RSVP = require('rsvp');

/*
 * Action executed on the server before route loads. All server functionality,
 * data fetching, etc. needed for initial page load happens here.
 */
module.exports = function (context, payload, done) {

    // Create RSVP promise to fetch asynchronous data from the server
    var getProjects = new RSVP.Promise(function (resolve, reject) {

        /*
         * Call projectService's read() with fetchr and handle the response
         * in callback. If the call succeeded, resolve the promise passing in
         * the server payload. Otherwise, reject the promise with the error.
         */
        context.service.read('projectService', {}, {}, function(err, results) {
            if (err) { reject(err); }
            resolve(results);
        });

    });

    getProjects.then(function(projects) {
        /*
         * Flux magic!
         *
         * Dispatch a named event to all stores registered to handle this
         * specific event, passing along the action's payload.
         */
        context.dispatch('RECEIVE_PROJECTS_SUCCESS', projects);
        done();
    }).catch(function (err) {
        console.error(err);
        done(err);
    });
};
