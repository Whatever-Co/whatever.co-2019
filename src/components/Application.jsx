var React = require('react');
var Router = require('react-router');
var { RouteHandler } = Router;
var DocumentTitle = require('react-document-title');

var Header = require('./Header');
var Menu = require('./Menu');
var Footer = require('./Footer');


module.exports = React.createClass({
    render() {
        return (
            <DocumentTitle title="Whatever Inc.">
                <div>
                    <div id="container" className="clearfix">
                        <Header />
                        <RouteHandler {...this.props} />
                    </div>
                    <Menu />
                    <Footer />
                </div>
            </DocumentTitle>
        );
    }
});
