"use strict";

/*
 * Route's action will be executed by navigateAction in server/index
 */
module.exports = {

    HomePage: {
        path: '/',
        method: 'get',
        action: require('./actions/load-home-page')
    }

};
