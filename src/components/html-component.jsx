"use strict";

var React             = require('react/addons');
var FluxibleMixin     = require('fluxible').Mixin;

var Html = React.createClass({

    mixins: [ FluxibleMixin ],

    getInitialState: function () {
        return {};
    },

    render: function () {

        return (
            <html>
                <head>
                    <meta charSet="UTF-8" />
                    <title>Isomorphic React + Flux at Porch.com</title>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimal-ui" />
                    <link rel="shortcut icon" href="//cdn.porch.com/bootstrap/favicon.ico"/>
                    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css' />
                    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
                    <link rel="stylesheet" type="text/css" href="/v2/assets/app.css" />
                </head>

                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                </body>

                {/* dehydrated json state of all the stores */}
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>

                <script src="/v2/assets/bundle.js"></script>
            </html>
        );
    }
});

module.exports = Html;
