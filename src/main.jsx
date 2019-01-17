var React = require('react')
var Router = require('react-router')
var { Route, DefaultRoute, NotFoundRoute, RouteHandler } = Router
var $ = require('jquery')
require('jquery.transit')
var MobileDetect = require('mobile-detect')

var About = require('./components/About')
var Application = require('./components/Application')
var Contact = require('./components/Contact')
var Dummy = require('./components/Dummy')
var EntryList = require('./components/EntryList')
var MemberDetail = require('./components/MemberDetail')
var MemberList = require('./components/MemberList')
var NotFound = require('./components/NotFound')
var Page = require('./components/Page')
var Single = require('./components/Single')
var Statement = require('./components/Statement')
var WorkList = require('./components/WorkList')

var FaviconAnimator = require('./FaviconAnimator')

var mb = new MobileDetect(navigator.userAgent)
if (mb.mobile()) {
    $('body').addClass('mobile')
} else {
    new FaviconAnimator()
}

React.initializeTouchEvents(true)


var LangRoot = React.createClass({
    render() {
        return <RouteHandler />
    }
})


var routes = (
    <Route name="Application" path="/" handler={Application}>
        <DefaultRoute name="Root" handler={Statement} />

        <Route path="en/" handler={LangRoot}>
            <DefaultRoute handler={Statement} />

            <Route path="about/" handler={About} />
            <Route path="members/" handler={MemberList}>
                <Route path="tokyo/" handler={Dummy} />
                <Route path="new-york/" handler={Dummy} />
                <Route path="taipei/" handler={Dummy} />
                <Route path="berlin/" handler={Dummy} />
                <Route path=":member/" handler={MemberDetail} />
            </Route>
            <Route path="work/" handler={WorkList}>
                <Route path=":tag/" handler={Dummy} />
            </Route>
            <Route path="contact/" handler={Contact} />

            <Route path="category/:category/" handler={EntryList} />
            <Route path="post/:post/" handler={Single} />
            <Route path=":page/" handler={Page} />
            <Route path=":parent/:page/" handler={Page} />
        </Route>

        <Route path="zh/" handler={LangRoot}>
            <DefaultRoute handler={Statement} />

            <Route path="about/" handler={About} />
            <Route path="members/" handler={MemberList}>
                <Route path="tokyo/" handler={Dummy} />
                <Route path="new-york/" handler={Dummy} />
                <Route path="taipei/" handler={Dummy} />
                <Route path="berlin/" handler={Dummy} />
                <Route path=":member/" handler={MemberDetail} />
            </Route>
            <Route path="work/" handler={WorkList}>
                <Route path=":tag/" handler={Dummy} />
            </Route>
            <Route path="contact/" handler={Contact} />

            <Route path="category/:category/" handler={EntryList} />
            <Route path="post/:post/" handler={Single} />
            <Route path=":page/" handler={Page} />
            <Route path=":parent/:page/" handler={Page} />
        </Route>

        <Route name="About" path="about/" handler={About} />
        <Route name="MemberList" path="members/" handler={MemberList}>
            <Route path="tokyo/" handler={Dummy} />
            <Route path="new-york/" handler={Dummy} />
            <Route path="taipei/" handler={Dummy} />
            <Route path="berlin/" handler={Dummy} />
            <Route name="MemberDetail" path=":member/" handler={MemberDetail} />
        </Route>
        <Route name="WorkList" path="work/" handler={WorkList}>
            <Route name="WorkListSelected" path=":tag/" handler={Dummy} />
        </Route>
        <Route name="Contact" path="contact/" handler={Contact} />

        <Route name="Category" path="category/:category/" handler={EntryList} />
        <Route name="Post" path="post/:post/" handler={Single} />
        <Route name="Page" path=":page/" handler={Page} />
        <Route name="SubPage" path=":parent/:page/" handler={Page} />

        <NotFoundRoute handler={NotFound} />
    </Route>
)


Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    var context = { lang: 'ja', langPrefix: '' }
    if (state.pathname.indexOf('/en/') == 0) {
        context.lang = 'en'
        context.langPrefix = '/en'
    } else if (state.pathname.indexOf('/zh/') == 0) {
        context.lang = 'zh'
        context.langPrefix = '/zh'
    }
    React.withContext(context, () => {
        React.render(<Handler />, document.body)
        ga('send', 'pageview', { page: state.pathname })
    })
})
