var classnames = require('classnames')
var React = require('react/addons')
var cx = React.addons.classSet
var Router = require('react-router')
var { RouteHandler, Navigation, State } = Router
var DocumentTitle = require('react-document-title')
var $ = require('jquery')
var _ = require('underscore')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).mobile()

var Lang = require('./Lang')


var Member = React.createClass({

    mixins: [Navigation, State, Lang],

    _onClick() {
        this.transitionTo(`${this.context.langPrefix}/team/${this.props.member.slug}/`)
    },

    _onClickLink(e) {
        e.preventDefault()
        var href = $(e.currentTarget).attr('href')
        if (href.match(/^\w+:/i)) {
            window.open(href)
        } else {
            this.transitionTo(this.context.langPrefix + href)
        }
    },

    _onResize() {
        var w = window.innerWidth
        var h = w
        $(this.refs.portrait.getDOMNode()).css('background-size', `${w}px ${h}px`)
        $(this.refs.inner.getDOMNode()).css({
            'padding-top': h - 13,
            'background-size': `${w}px ${h}px`
        })
    },

    componentDidMount() {
        if (isMobile) {
            $(window).on('resize', this._onResize)
            this._onResize()
        }
        $('a', this.refs.body.getDOMNode()).on('click', this._onClickLink)
    },

    componentWillUnmount() {
        $(window).off('resize', this._onResize)
        $('a', this.refs.body.getDOMNode()).off('click', this._onClickLink)
    },

    render() {
        var member = this.props.member
        if (member.meta.rel_links) {
            var links = member.meta.rel_links.split(/\n/).map((link) => {
                var info = link.split(',')
                var name = info[0].trim()
                var href = info[1].trim()
                return <li key={href}><a href={href} target="_blank">{name}</a></li>
            })
        }
        var region = member.meta.region ? `${member.meta.region.join(' / ')}` : ''
        var co = member.meta['co-creator'] ? "display" : "none"
        var cotext = this.context.lang == 'ja' ? { title: "Co-creator とは", desc: "個人活動（フリーランス、アーティスト）と会社員とのハイブリットな働き方ができる制度。<br />詳しくは <a href='https://careerhack.en-japan.com/report/detail/549' target='_blank' >こちら</a> の記事を参照ください。" } : { title: 'About “Co-creator”:', desc: "Co-creator is a new way of working which allows one to be an employee of the company while keeping his/her professional activities (as a freelancer or an artist) outside.<br/>Please follow <a href='https://careerhack.en-japan.com/report/detail/549' target='_blank' >this link (Japanese)</a> for details." }
        return (
            <div className={'member ' + member.mode} onClick={member.mode == 'list' ? this._onClick : null}>
                <div ref="portrait" style={{ backgroundImage: `url(${member.featured_image.source})` }}>
                    <div className="inner" ref="inner">
                        <div className="name-title">
                            <div>
                                <span className="title"><span>{member.meta.title}</span><span style={({ display: co })}> (Co-creator)</span></span>
                                <span className="name-ja">{member.meta.japanese}</span>
                                {member.meta.english ? <span className="name-en">{member.meta.english}</span> : ''}
                                <span className="region">{region}</span>
                            </div>
                        </div>
                        <div className="more">
                            <div ref="body" className="body" dangerouslySetInnerHTML={{ __html: member.content }}></div>
                            {links ? (<ul className="links">{links}</ul>) : ''}
                            <div className="co-creator" style={({ display: co })}>
                                <div>{cotext.title}</div>
                                <div dangerouslySetInnerHTML={{ __html: cotext.desc }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})


module.exports = React.createClass({

    mixins: [State, Navigation, Lang],

    getInitialState() {
        return {
            members: [],
            regions: [
                { name: "ALL", slug: "", selected: true },
                { name: "TOKYO", slug: "tokyo", selected: false },
                { name: "NEW YORK", slug: "new-york", selected: false },
                { name: "TAIPEI", slug: "taipei", selected: false },
                { name: "BERLIN", slug: "berlin", selected: false },
            ],
            // region 追加するときは main.jsx に Route 追加ひつよう
        }
    },

    _setFlags(state) {
        var current = this.getParams().member
        state.members.map((member) => {
            if (current) {
                member.mode = member.slug == current ? 'open' : 'close'
            } else {
                member.mode = 'list'
            }
        })
        var m = this.getPath().match("\/team\/(.+)\/")
        var r = m ? m[1] : ""
        this.state.regions.forEach(region => region.selected = r == region.slug)
        return state
    },

    componentDidMount() {
        var data = {
            lang: this.context.lang,
            _wp_json_nonce: window.nonce,
            'filter[posts_per_page]': 100,
        }
        return $.getJSON('/wp-json/pages', data).done(result => {
            var members = result.filter(member => member.parent)
            this.setState(this._setFlags({ members: _.shuffle(members) }))
        });
    },

    componentWillReceiveProps() {
        this.setState(this._setFlags(this.state))
    },

    _onClickRegion(region) {
        if (region.slug) {
            this.transitionTo(`${this.context.langPrefix}/team/${region.slug}/`)
        } else {
            this.transitionTo(`${this.context.langPrefix}/team/`)
        }
    },

    _memberRegions(member) {
        if (member.meta && member.meta.region) {
            return member.meta.region
        }
        return []
    },

    render() {
        var region = this.state.regions.find(region => region.selected)
        var members = (!region || region.name == "ALL") ? this.state.members : this.state.members.filter(member => {
            return this._memberRegions(member).indexOf(region.name) >= 0
        })
        return (
            <DocumentTitle title="TEAM ● Whatever Inc.">
                <div className="member-list">
                    <ul className="regions" style={({ display: region ? "block" : "none" })}>
                        {this.state.regions.map(region => {
                            return (
                                <li key={region.slug} className={classnames({ selected: region.selected })} onClick={this._onClickRegion.bind(this, region)}>
                                    <span className={cx({ dot: true, inactive: !region.selected })}></span>
                                    {region.name}
                                </li>
                            )
                        })}
                    </ul>
                    {members.map(member => <Member key={member.guid} member={member} />)}
                    <RouteHandler />
                </div>
            </DocumentTitle >
        )
    }
})
