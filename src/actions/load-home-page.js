'use strict';

var RSVP = require('rsvp');

/**
 * executes the navigation to the home page
 *
 * @param {Context} context
 * @param {Object} payload: the route object
 * @param {Fn} done
 */
module.exports = function (context, payload, done) {

    var getProjects = new RSVP.Promise(function (resolve, reject) {
        context.service.read('projectService', {}, {}, function(err, results) {
            if (err) { reject(err); }
            resolve(results);
        });
    });

    getProjects.then(function(projects) {
        context.dispatch('RECEIVE_PROJECTS_SUCCESS', projects);
        done();
    }).catch(function (err) {
        console.error(err);
        done(err);
    });
};
