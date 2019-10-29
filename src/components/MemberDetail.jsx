var React = require('react')
var Router = require('react-router')
var { State, Navigation } = Router
var DocumentTitle = require('react-document-title')
var $ = require('jquery')
var MobileDetect = require('mobile-detect');
var isMobile = !!new MobileDetect(navigator.userAgent).mobile();
var moment = require('moment')
moment.locale('en')

var WorkItem = require('./WorkItem')
var Lang = require('./Lang')


module.exports = React.createClass({

    mixins: [State, Navigation, Lang],

    getInitialState() {
        return { title: "", member: null, work: [], news: [] }
    },

    getDetail() {
        var member = this.getParams().member
        if (!member || member == this.state.member) return
        $.getJSON('/wp-json/posts', { 'filter[tag]': member, 'filter[posts_per_page]': 200, lang: this.context.lang, _wp_json_nonce: window.nonce }).done((result) => {
            var state = { member: member, work: [], news: [] }
            result.map((entry) => {
                if (state[entry.terms.category[0].slug]) {
                    state[entry.terms.category[0].slug].push(entry)
                }
            })
            result.find(entry => entry.terms.post_tag.find(tag => {
                if (tag.slug == member) {
                    state.title = tag.name
                    return true
                }
                return false
            }))
            this.setState(state)
        })
    },

    componentDidMount() {
        this.getDetail()
    },

    componentWillReceiveProps() {
        this.getDetail()
    },

    _onClickItem(path) {
        this.transitionTo(`${this.context.langPrefix}/post/${path}/`)
    },

    render() {
        var title = this.state.title ? `${this.state.title} ● Whatever Inc.` : 'Whatever Inc.'
        var work = this.state.work.map(work => <WorkItem key={work.guid} {...work} />)
        var news = this.state.news.map((news) => {
            var date = moment(news.date).format('LL');
            if (isMobile) {
                return (
                    <tr key={news.guid} onClick={this._onClickItem.bind(this, news.slug)}>
                        <td dangerouslySetInnerHTML={{ __html: news.title }} />
                        <th>{date}</th>
                    </tr>
                );
            } else {
                return (
                    <tr key={news.guid} onClick={this._onClickItem.bind(this, news.slug)}>
                        <th>{date}</th>
                        <td dangerouslySetInnerHTML={{ __html: news.title }} />
                    </tr>
                );
            }
        });
        return (
            <DocumentTitle title={title}>
                <div className="member-detail">
                    {work.length ? (
                        <div>
                            <h2>WORK</h2>
                            <div className="works-list clearfix">{work}</div>
                        </div>
                    ) : ''}
                    {news.length ? (
                        <div>
                            <h2>NEWS</h2>
                            <table className="news-list"><tbody>{news}</tbody></table>
                        </div>
                    ) : ''}
                </div>
            </DocumentTitle>
        )
    }
})
