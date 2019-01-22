var React = require('react/addons')
var cx = React.addons.classSet
var Router = require('react-router')
var { State, Navigation } = Router
var _ = require('underscore')

var Link = require('./Link')
var MenuData = require('../data').menu
var Lang = require('./Lang')


module.exports = React.createClass({

    displayName: 'Header',

    mixins: [State, Navigation, Lang],

    getInitialState() {
        return {
            items: _.without(MenuData.map((item) => {
                if (item.name == 'TOP') return false
                var copy = _.clone(item)
                copy.active = false
                return copy
            }), false)
        }
    },

    _setActive() {
        var current = this.getPathname()
        var items = this.state.items.map((item) => {
            item.active = current.indexOf(this.context.langPrefix + item.path) == 0
            return item
        })
        this.setState({ items: items })
    },

    componentDidMount() {
        this._setActive()
    },

    componentWillReceiveProps() {
        this._setActive()
    },

    render() {
        var showLogo = !this.getPath().match(/^\/([a-z]{2}\/)?$/)
        return (
            <div id="header">
                <div id="logo" style={({ visibility: showLogo ? "visible" : "hidden" })}>
                    <Link to="/"><img src="/assets/logo.svg" /></Link>
                </div>
                <ul id="menu">
                    {this.state.items.map((item) => {
                        return (
                            <li key={item.path}>
                                <span className={cx({ dot: true, inactive: !item.active })}></span>
                                <Link to={item.path}>{item.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div >
        )
    }
})
