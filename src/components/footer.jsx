"use strict";

var React = require('react');

var Footer = React.createClass({

    render: function () {

        return (
            <div className="homePage-footer">
                <div className="homePage-footer--left">
                    <a href="http://twitter.com/mdressman">@mdressman</a>
                    <a href="http://twitter.com/porchdev">@PorchDev</a>
                    <a href="http://porch.com">Porch.com</a>
                </div>
                <div className="homePage-footer--right">
                    Made w &hearts;, <a href="http://facebook.github.io/react/">React</a> and <a href="http://fluxible.io">Fluxible</a>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
