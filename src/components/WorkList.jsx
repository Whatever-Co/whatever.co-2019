var $ = require('jquery')
var _ = require('underscore')
var classnames = require('classnames')
var React = require('react')
var cx = React.addons.classSet
var Route = require('react-router')
var { State, Navigation } = Route
var DocumentTitle = require('react-document-title')

var WorkItem = require('./WorkItem')

var Lang = require('./Lang')


module.exports = React.createClass({

    displayName: 'WorkList',

    mixins: [State, Navigation, Lang],

    regionOrder: ["ALL", "TOKYO", "NEW YORK", "TAIPEI"],

    getInitialState() {
        return { regionTags: [], typeTags: [], entries: [] }
    },

    componentDidMount() {
        this.loadEntries()
    },

    loadEntries() {
        var qs = {
            lang: this.context.lang,
            'filter[category_name]': 'work',
            'filter[posts_per_page]': 1000,
            _wp_json_nonce: window.nonce,
        }
        $.getJSON(location.origin + '/wp-json/posts', qs).done(result => {
            this.initTags(result)
            this.updateEntries(result)
        })
    },

    initTags(entries) {
        var tags = this.getTags(entries)
        var regions = tags.filter(tag => tag.description.match(/region/))
        regions.unshift({ name: "ALL", slug: "all" })
        var types = tags.filter(tag => !tag.description.match(/region/))
        this.setState({ regionTags: regions, typeTags: types })
        this.updateTags()
    },

    getTags(entries) {
        var tags = _.flatten(entries.map(entry => entry.terms.post_tag || []))
        tags = _.uniq(tags, false, "ID").filter(tag => !tag.description.match(/member/))
        return _.sortBy(tags, "name")
    },

    componentWillReceiveProps() {
        this.updateTags()
        this.updateEntries()
    },

    updateTags() {
        var tag = this.getParams().tag
        var selected = tag ? tag.split(' ') : []
        this.state.regionTags.forEach(tag => tag.selected = selected.indexOf(tag.slug) >= 0)
        if (this.state.regionTags.every(tag => !tag.selected)) {
            this.state.regionTags[0].selected = true
        }
        this.state.typeTags.forEach(tag => tag.selected = selected.indexOf(tag.slug) >= 0)
        this.setState({ regionTags: this.state.regionTags, typeTags: this.state.typeTags })
    },

    updateEntries(entries) {
        if (!entries) {
            entries = this.state.entries
        }
        var tag = this.getParams().tag
        if (tag) {
            var selected = tag.split(' ')
            entries.forEach(entry => {
                var matched = entry.terms.post_tag.filter(tag => selected.indexOf(tag.slug) >= 0)
                entry.match = matched.length == selected.length
            })
        } else {
            entries.forEach(entry => entry.match = true);
        }
        this.setState({ entries: entries })
    },

    _onClickRegionTag(tag) {
        this.state.regionTags.forEach(t => t.selected = t.name == tag.name)
        this._setLocation()
    },

    _onClickTypeTag(tag) {
        tag.selected = !tag.selected
        if (tag.selected) {
            this.state.typeTags.forEach(t => t.selected = t.name == tag.name)
        }
        this._setLocation()
    },

    _setLocation() {
        var region = this.state.regionTags.filter(tag => tag.selected && tag.name != "ALL")
        var type = this.state.typeTags.filter(tag => tag.selected)
        var tags = region.concat(type).map(tag => tag.slug)
        if (tags.length == 0) {
            this.transitionTo(`${this.context.langPrefix}/work/`)
        } else {
            this.transitionTo(`${this.context.langPrefix}/work/${tags.join('+')}/`)
        }
    },

    render() {
        var regions = this.regionOrder.map(name => {
            return this.state.regionTags.find(region => region.name == name)
        }).filter(tag => !!tag)
        return (
            <DocumentTitle title="WORK ● Whatever Inc.">
                <div className="work-list">
                    <ul className="region-list">
                        {regions.map(tag => {
                            return (
                                <li key={tag.slug} className={classnames({ selected: tag.selected })} onClick={this._onClickRegionTag.bind(this, tag)}>
                                    <span className={cx({ dot: true, inactive: !tag.selected })}></span>
                                    {tag.name}
                                </li>
                            )
                        })}
                    </ul>
                    <hr />
                    <ul className="tag-list">
                        {this.state.typeTags.map(tag => <li key={tag.slug} className={classnames({ selected: tag.selected })} onClick={this._onClickTypeTag.bind(this, tag)}>{tag.name}</li>)}
                    </ul>
                    <div className="work-items">
                        {this.state.entries.map(entry => <WorkItem key={entry.guid} {...entry} />)}
                    </div>
                </div>
            </DocumentTitle>
        )
    },

})
