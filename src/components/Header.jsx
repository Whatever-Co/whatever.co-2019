var React = require('react/addons')
var cx = React.addons.classSet
var Router = require('react-router')
var { State, Navigation } = Router
var _ = require('underscore')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).mobile()

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
            }), false),
            langSelector: false,
            languages: [['ja', '日本語'], ['en', 'English'], ['zh', '繁體中文']]
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
        window.addEventListener('click', this._hideLangSelector)
    },

    componentWillReceiveProps() {
        this._setActive()
    },

    _toggleLangMenu(e) {
        e.stopPropagation()
        this.setState({ langSelector: !this.state.langSelector })
    },

    _selectLang(lang) {
        var m = this.getPath().match(/^(\/[a-z]{2})?(\/.*)/)
        var path = m[2]
        var next = location.origin + '/' + lang + path
        location.href = next
    },

    _hideLangSelector() {
        this.setState({ langSelector: false })
    },

    render() {
        var showHeader = !isMobile || !this.getPath().match(/^\/([a-z]{2}\/)?$/)
        var m = this.getPath().match(/^\/([a-z]{2})\//)
        var currentLang = m ? m[1] : ''
        return (showHeader ? 
            <div id="header">
                <div id="logo">
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
                    <li className="slash"><img src="/assets/slash.png" width="11" height="20" /></li>
                    <li className="language" onClick={this._toggleLangMenu}>LANGUAGE <span className={cx({ triangle: true, opening: this.state.langSelector })} /></li>
                </ul>
                <div className="lang-selector" style={{ visibility: this.state.langSelector ? "visible" : "hidden" }} onMouseLeave={this._hideLangSelector}>
                    <ul>
                        {this.state.languages.map(lang => { return (<li onClick={currentLang == lang[0] ? null : this._selectLang.bind(this, lang[0])} className={cx({ current: currentLang == lang[0] })} key={lang[1]}>{lang[1]}</li>) })}
                    </ul>
                </div >
            </div >
        : null)
    }
})
