var React = require('react')
var $ = require('jquery')
var _ = require('underscore')


module.exports = React.createClass({

    _onClickFB() {
        FB.ui({
            method: 'share',
            href: location.href
        })
    },

    _onClickTW() {
        var url = 'https://twitter.com/share?url=' + encodeURIComponent(location.href)
        var width = 550
        var height = 300
        var opts = {
            width: width,
            height: height,
            left: (window.screenLeft || window.screenX) + (window.outerWidth - width) / 2,
            top: (window.screenTop || window.screenY) + (window.outerHeight - height) / 2
        }
        opts = _.keys(opts).map(key => key + '=' + opts[key]).join(',')
        window.open(url, 'twitter', opts)
    },

    _onClickTop() {
        $('html, body').animate({ scrollTop: 0 }, 'fast')
    },

    render() {
        return (
            <div id="footer">
                <img className="copyright" src="/assets/copyright.png" />
                <div className="buttons">
                    <a className="instagram" href="https://www.instagram.com/whtevr_co/" target="_blank" />
                    <a className="facebook" href="https://www.facebook.com/whtevr.co/" target="_blank" />
                    <a className="twitter" href="https://twitter.com/whtevr_co" target="_blank" />
                    <button className="top" onClick={this._onClickTop} />
                </div>
            </div>
        )
    }

})
