'use strict';

module.exports = function (context, payload, done) {

    context.service.create('projectService', payload, {}, function(err, projects) {
        if (err) {
            console.error(err);
            done(err);
            return;
        }

        context.dispatch('RECEIVE_PROJECTS_SUCCESS', projects);
        done();
    });

};
