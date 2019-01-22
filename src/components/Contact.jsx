var React = require('react');
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).mobile()

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
                    address: "2F, HOLSTER, TOC-2nd Building, 1-17-1 Shibuya, Shibuya-ku, Tokyo,  150-0002, Japan",
                    phone: "+81-3-6427-6022",
                    president: "Yusuke Tominaga ",
                },
                {
                    name: "NEW YORK",
                    address: "347 W 36th St, #902 New York, NY 10018 U.S.A.",
                    phone: "+1-347-801-7789",
                    president: "Masashi Kawamura / Qanta Shimizu (<a href='https://bassdrum.org/' target='_blank'>BASSDRUM</a>)",
                },
                {
                    name: "TAIPEI",
                    address: "4F, 30-2, Beiping East Road, Zhongzheng District, Taipei City, Taiwan",
                    phone: "+886-908-222-101",
                    president: "Eiji Muroichi",
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
                    address: "〒150-0002 東京都渋谷区渋谷 1-17-1 TOC 第 2 ビル 2F HOLSTER",
                    phone: "03-6427-6022",
                    president: "富永 勇亮",
                },
                {
                    name: "NEW YORK",
                    address: "347 W 36th St, #902 New York, NY 10018 U.S.A.",
                    phone: "+1-347-801-7789",
                    president: "川村 真司 / 清水 幹太 (<a href='https://bassdrum.org/' target='_blank'>BASSDRUM</a>)",
                },
                {
                    name: "TAIPEI",
                    address: "4F, 30-2, Beiping East Road, Zhongzheng District, Taipei City, Taiwan",
                    phone: "+886-908-222-101",
                    president: "室市 栄二",
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
                    address: "2F, HOLSTER, TOC-2nd Building, 1-17-1 Shibuya, Shibuya-ku, Tokyo,  150-0002, Japan",
                    phone: "+81-3-6427-6022",
                    president: "Yusuke Tominaga ",
                },
                {
                    name: "NEW YORK",
                    address: "347 W 36th St, #902 New York, NY 10018 U.S.A.",
                    phone: "+1-347-801-7789",
                    president: "Masashi Kawamura / Qanta Shimizu (<a href='https://bassdrum.org/' target='_blank'>BASSDRUM</a>)",
                },
                {
                    name: "台北",
                    address: "台北市北平東路 30-2 號 4 樓",
                    phone: "+886-908-222-101",
                    president: "Eiji Muroichi",
                },
            ]
        },
    },

    getInitialState() {
        return this.data[this.context.lang] ? this.data[this.context.lang] : this.data['en']
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
            {this.state.companies.map(company => {
                return <div className="region">
                    <div className="name">{company.name}</div>
                    <table>
                        <tr>
                            <th>{this.state.items[0]}</th>
                            <td>{company.address}</td>
                        </tr>
                        <tr>
                            <th>{this.state.items[1]}</th>
                            <td>{company.phone}</td>
                        </tr>
                        <tr>
                            <th>{this.state.items[2]}</th>
                            <td dangerouslySetInnerHTML={{ __html: company.president }}></td>
                        </tr>
                    </table>
                </div>
            })}
            <div className="region">
                <div className="name">BERLIN</div>
                <table>
                    <tr>
                        <td>{this.state.items[3]}</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    }

})
