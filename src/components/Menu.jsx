var React = require('react/addons')
var cx = React.addons.classSet
var Router = require('react-router')
var { State } = Router
var $ = require('jquery')
var _ = require('underscore')
require('browsernizr/test/touchevents')
var Modernizr = require('browsernizr')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).mobile()

var Link = require('./Link')
var MenuData = require('../data').menu
var Lang = require('./Lang')


var MenuButton = React.createClass({
    getDefaultProps() {
        return { isEnable: false, isOpen: false }
    },
    render() {
        return (
            <div id="menu-button" className={cx({ enable: this.props.isEnable, close: this.props.isOpen })} onClick={Modernizr.touchevents ? null : this.props.onClick} onTouchStart={Modernizr.touchevents ? this.props.onClick : null}>
                <div className="upper-left" />
                <div className="upper-right" />
                <div className="middle" />
                <div className="lower-left" />
                <div className="lower-right" />
            </div>
        )
    }
})


module.exports = React.createClass({

    mixins: [State, Lang],

    getInitialState() {
        return {
            isEnable: false,
            isOpen: false,
            items: MenuData.map(item => _.clone(item)),
            languages: [['ja', '日本語'], ['en', 'English'], ['zh', '繁體中文']],
        }
    },

    _toggleMenu() {
        this.setState({ isOpen: !this.state.isOpen })
    },

    _onChangeColor(color) {
        this.dots.css({ color: color })
    },

    _onScroll() {
        var state = { isEnable: $(window).scrollTop() > 170 }
        if (!state.isEnable) state.isOpen = false
        this.setState(state)
    },

    _onClick(e) {
        if (!$.contains(this.getDOMNode(), e.target)) {
            this.setState({ isOpen: false })
        }
    },

    _selectLang(lang) {
        var m = this.getPath().match(/^(\/[a-z]{2})?(\/.*)/)
        var path = m[2]
        var next = location.origin + '/' + lang + path
        location.href = next
    },

    componentDidMount() {
        $(window).on('scroll', this._onScroll).on('click', this._onClick)
    },

    componentWillUnmount() {
        $(window).off('scroll', this._onScroll)
    },

    componentWillReceiveProps() {
        this.setState({ isOpen: false })
    },

    render() {
        var m = this.getPath().match(/^\/([a-z]{2})\//)
        var currentLang = m ? m[1] : ''
        return (
            <div>
                <div id="floating-menu" className={cx({ close: !this.state.isOpen })}>
                    <div>
                        {this.state.items.map((item) => {
                            var current = this.getPathname()
                            var active = false
                            if (item.path == '/') {
                                active = current == this.context.langPrefix + item.path
                            } else {
                                active = current.indexOf(this.context.langPrefix + item.path) == 0
                            }
                            return (
                                <Link to={item.path} key={item.path}>
                                    <span className={cx({ dot: true, inactive: !active })}></span>
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                    {isMobile ? <div className="language-selector">
                        <ul>
                            {this.state.languages.map(lang => { return (<li onClick={currentLang == lang[0] ? null : this._selectLang.bind(this, lang[0])} className={cx({ current: currentLang == lang[0] })} key={lang[1]}>{lang[1]}</li>) })}
                        </ul>
                    </div> : null}
                </div>
                <MenuButton isEnable={this.state.isEnable} isOpen={this.state.isOpen} onClick={this._toggleMenu} />
            </div>
        )
    }
})
