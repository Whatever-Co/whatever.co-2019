var React = require('react/addons')
var cx = React.addons.classSet
var Router = require('react-router')
var { Navigation } = Router
var $ = require('jquery')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).mobile()
var moment = require('moment')
moment.locale('en')
var Baby = require('babyparse')

var Link = require('./Link')
var Lang = require('./Lang')


module.exports = React.createClass({

    mixins: [Navigation, Lang],

    _onClick(e) {
        e.preventDefault()
        var href = $(e.currentTarget).attr('href')
        if (href.match(/^\w+:/i)) {
            window.open(href)
        } else {
            if (this.context.langPrefix && href.indexOf(this.context.langPrefix) != 0) {
                href = this.context.langPrefix + href
            }
            this.transitionTo(href)
        }
    },

    _onResize() {
        var width = $(this.refs.entry.getDOMNode()).outerWidth()
        var height = Math.floor(width / 960 * 430)
        var size = { 'background-size': `${width}px ${height}px` }
        $(this.refs.entry.getDOMNode()).css(size)
        $(this.refs.inner.getDOMNode()).css(size).css('padding-top', height - (isMobile ? 17 : 34))

        if (this._iframes) {
            width = $(this.refs.body.getDOMNode()).width()
            this._iframes.each((index, element) => {
                var el = $(element)
                el.attr({ width: width, height: width / el.data('aspect') })
            })
        }
    },

    componentDidMount() {
        $('a', this.getDOMNode()).on('click', this._onClick)

        var needResize = !!this.props.entry.featured_image
        var iframes = $('iframe', this.getDOMNode())
        if (iframes.length > 0) {
            iframes.each((index, element) => {
                var el = $(element)
                el.data({ aspect: el.attr('width') / el.attr('height') })
            })
            this._iframes = iframes
            needResize = true
        }
        $('img', this.refs.body.getDOMNode()).each((index, element) => {
            $(element).attr({ width: null, height: null })
        })
        if (needResize) {
            $(window).on('resize', this._onResize)
            this._onResize()
        }
    },

    componentWillUnmount() {
        $('a', this.getDOMNode()).off('click', this._onClick)
        $(window).off('resize', this._onResize)
    },

    decodeHtml(html) {
        var txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    },

    _buildCredit(data) {
        var lines = []
        Baby.parse(this.decodeHtml(data)).data.forEach((tokens) => {
            if (tokens[0].toLowerCase() == 'title') return
            var flags = 0
            tokens.forEach((element, index, array) => {
                flags |= !!(element.trim()) << index
            })
            switch (flags) {
                case 0: break
                case 1:
                    lines.push([tokens[0]])
                    break
                default:
                    if (flags & 1) {
                        lines.push(tokens)
                    } else {
                        tokens.shift()
                        var last = lines.length - 1
                        lines[last] = lines[last].concat(tokens)
                    }
                    break
            }
        })
        return lines.map((tokens) => {
            if (tokens.length == 0) {
                return null
            } else if (tokens.length == 1) {
                return tokens[0] == "-" ? <h2 /> : <h2 dangerouslySetInnerHTML={{ __html: tokens[0] }} />
            } else {
                var elements = []
                var title = tokens.shift().trim().replace(/\s*\+\s*/g, ', ')
                if (title.toLowerCase() == 'title') {
                    return null
                }
                if (title && title != '-') {
                    elements.push(<span dangerouslySetInnerHTML={{ __html: title + ': ' }} />)
                }
                while (tokens.length) {
                    var name = null
                    var company = null
                    var link = null
                    try {
                        name = tokens.shift().trim()
                        company = tokens.shift().trim()
                        link = tokens.shift().trim()
                    } catch (e) {
                    }
                    if (company && company.match(/^\/|http/i)) {
                        link = company
                        company = null
                    }
                    if (link && link.match(/^[a-z]+$/)) {
                        link = `/team/${link}/`
                    }
                    if (elements.length > 1) {
                        elements.push(' / ')
                    }
                    if (company && link) {
                        elements.push(<span>{name} (<a href={link} dangerouslySetInnerHTML={{ __html: company }} />)</span>)
                    } else if (company) {
                        elements.push(<span dangerouslySetInnerHTML={{ __html: `${name} (${company})` }} />)
                    } else if (link) {
                        elements.push(<span><a href={link} dangerouslySetInnerHTML={{ __html: name }} /></span>)
                    } else {
                        elements.push(<span dangerouslySetInnerHTML={{ __html: name }} />)
                    }
                }
                return <span>{elements}</span>
            }
        })
    },

    _onClickTag(tag) {
        this.transitionTo(`${this.context.langPrefix}/work/${tag.slug}/`)
    },

    _getCredit(entry) {
        var credit = {
            ja: entry.meta.credit,
            en: entry.meta.credit_en,
            zh: entry.meta.credit_zh,
        }[this.context.lang]
        if (!credit) {
            credit = entry.meta.credit_en
        }
        if (credit) {
            return this._buildCredit(credit)
        }
        return null
    },

    render() {
        var entry = this.props.entry
        var style = { backgroundImage: entry.featured_image ? `url(${entry.featured_image.source})` : '' }
        var credit = this._getCredit(entry)
        var tags = entry.terms.post_tag ? entry.terms.post_tag.filter(tag => tag.description != "member") : []
        return (
            <div className={cx({ entry: true, 'with-image': entry.featured_image })} ref="entry" style={style}>
                <div className={cx({ inner: true, hover: this.props.single })} ref="inner">
                    <h1 className="title" dangerouslySetInnerHTML={{ __html: entry.title }} />
                    <span className="date"><Link to={`/post/${entry.slug}/`}>{moment(entry.date_gmt).format('LL')}</Link></span>
                    <div className="body" ref="body">
                        <div dangerouslySetInnerHTML={{ __html: entry.content }} />
                        {entry.terms.category[0].slug == 'work' ? (
                            <table>
                                <tbody>
                                    <tr className="tags">
                                        <th>TAG</th>
                                        <td className="work-list">
                                            <ul className="tag-list">
                                                {tags.map(tag => <li onClick={this._onClickTag.bind(this, tag)}>{tag.name}</li>)}
                                            </ul>
                                        </td>
                                    </tr>
                                    {entry.meta.awards ? (
                                        <tr className="award">
                                            <th>AWARD</th>
                                            <td>
                                                {entry.meta.awards.map(item => item ? <img key={item} src={`/assets/${item}.png`} /> : false)}
                                            </td>
                                        </tr>
                                    ) : null}
                                    <tr className="credit">
                                        <th>CREDIT</th>
                                        <td ref="credit">{credit}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
})
