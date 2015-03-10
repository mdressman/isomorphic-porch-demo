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
