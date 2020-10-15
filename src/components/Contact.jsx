var React = require('react');
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).phone()
var ClipboardJS = require('clipboard')

var Lang = require('./Lang')

module.exports = React.createClass({

    mixins: [Lang],

    data: {
        en: {
            image_pc: '/assets/contact2-en.svg',
            image_sp: '/assets/contact-en-sp.svg',
            items: ['Address', 'Phone Number', 'Representative', 'Address TBD'],
            companies: [
                {
                    name: "TOKYO",
                    address: "WHEREVER 7F, 7-2-8 Roppongi, Minato-ku, Tokyo 106-0032, Japan",
                    maplink: "https://g.page/whatever-inc",
                    phone: "+81-3-6427-6022",
                    president: "Yusuke Tominaga ",
                },
                {
                    name: "NEW YORK",
                    address: "347 W 36th St, #902 New York, NY 10018 U.S.A.",
                    maplink: "https://goo.gl/maps/x7zKNoj7ixG2",
                    phone: "+1-347-801-7789",
                    president: "Masashi Kawamura / Qanta Shimizu (<a href='https://bassdrum.org/' target='_blank'>BASSDRUM</a>)",
                },
                {
                    name: "TAIPEI",
                    address: "No. 97, Songren Road, Xinyi District, Taipei City 11073, Taiwan",
                    maplink: "https://goo.gl/maps/1ytCrzEK9EPKGWxe8",
                    phone: "+886-908-222-101",
                    president: "Eiji Muroichi",
                },
                {
                    name: "BERLIN",
                    address: "Friedrichstraße 68, 10117 Berlin, Germany",
                    maplink: "https://goo.gl/maps/JJ9c4hEupRFWHB5X6",
                },
            ]
        },
        ja: {
            image_pc: '/assets/contact2-ja.svg',
            image_sp: '/assets/contact-ja-sp.svg',
            items: ['所在地', '電話番号', '代表', 'オフィス準備中'],
            companies: [
                {
                    name: "TOKYO",
                    address: "〒106-0032 東京都港区六本木 7 丁目 2 番 8 号 WHEREVER 7F",
                    maplink: "https://g.page/whatever-inc",
                    phone: "03-6427-6022",
                    president: "富永 勇亮",
                },
                {
                    name: "NEW YORK",
                    address: "347 W 36th St, #902 New York, NY 10018 U.S.A.",
                    maplink: "https://goo.gl/maps/x7zKNoj7ixG2",
                    phone: "+1-347-801-7789",
                    president: "川村 真司 / 清水 幹太 (<a href='https://bassdrum.org/' target='_blank'>BASSDRUM</a>)",
                },
                {
                    name: "TAIPEI",
                    address: "No. 97, Songren Road, Xinyi District, Taipei City 11073, Taiwan",
                    maplink: "https://goo.gl/maps/1ytCrzEK9EPKGWxe8",
                    phone: "+886-908-222-101",
                    president: "室市 栄二",
                },
                {
                    name: "BERLIN",
                    address: "Friedrichstraße 68, 10117 Berlin, Germany",
                    maplink: "https://goo.gl/maps/JJ9c4hEupRFWHB5X6",
                },
            ]
        },
        zh: {
            image_pc: '/assets/contact2-zh.svg',
            image_sp: '/assets/contact-zh-sp.svg',
            items: ['地址', '電話', '負責人', 'Address TBD'],
            companies: [
                {
                    name: "TOKYO",
                    address: "WHEREVER 7F, 7-2-8 Roppongi, Minato-ku, Tokyo 106-0032, Japan",
                    maplink: "https://g.page/whatever-inc",
                    phone: "+81-3-6427-6022",
                    president: "Yusuke Tominaga ",
                },
                {
                    name: "NEW YORK",
                    address: "347 W 36th St, #902 New York, NY 10018 U.S.A.",
                    maplink: "https://goo.gl/maps/x7zKNoj7ixG2",
                    phone: "+1-347-801-7789",
                    president: "Masashi Kawamura / Qanta Shimizu (<a href='https://bassdrum.org/' target='_blank'>BASSDRUM</a>)",
                },
                {
                    name: "台北",
                    address: "台北市信義區松仁路 97 號",
                    maplink: "https://goo.gl/maps/1ytCrzEK9EPKGWxe8",
                    phone: "+886-908-222-101",
                    president: "Eiji Muroichi",
                },
                {
                    name: "BERLIN",
                    address: "Friedrichstraße 68, 10117 Berlin, Germany",
                    maplink: "https://goo.gl/maps/JJ9c4hEupRFWHB5X6",
                },
            ]
        },
    },

    getInitialState() {
        return this.data[this.context.lang] ? this.data[this.context.lang] : this.data['en']
    },

    componentDidMount() {
        var clipboard = new ClipboardJS('.copy-button');
        clipboard.on('success', e => {
            alert("Copied!")
        });
    },

    render() {
        return <div className="contact">
            {isMobile ?
                <div className="contact-text">
                    <img src={this.state.image_sp} alt="" />
                    <div className="mail-link">
                        <a href="mailto:hello@whatever.co">hello@whatever.co</a>
                    </div>
                </div>
                :
                <div>
                    <img className="contact-text1" src="/assets/contact1.svg" alt="For new business, career and media inquiries, contact us." />
                    <div className="contact-text2">
                        <img src={this.state.image_pc} alt="" />
                        <div className="mail-link">
                            <a href="mailto:hello@whatever.co">hello@whatever.co</a>
                        </div>
                    </div>
                </div>}
            {this.state.companies.map((company, indek) => {
                return <div className="region">
                    <div className="name">{company.name}</div>
                    <table>
                        <tr>
                            <th>{this.state.items[0]}</th>
                            <td><span className="copy-button" data-clipboard-text={company.address}>{company.address}</span> (<a href={company.maplink} target="_blank">MAP</a>)</td>
                        </tr>
                        {company.phone ? <tr>
                            <th>{this.state.items[1]}</th>
                            <td><a href={"tel:" + company.phone}>{company.phone}</a></td>
                        </tr> : null}
                        {company.president ? <tr>
                            <th>{this.state.items[2]}</th>
                            <td dangerouslySetInnerHTML={{ __html: company.president }}></td>
                        </tr> : null}
                    </table>
                </div>
            })}
        </div>
    }

})
