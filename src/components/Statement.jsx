var React = require('react')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).mobile()

var Lang = require('./Lang')

module.exports = React.createClass({

    mixins: [Lang],

    data: {
        en: {
            text_pc: 'Creative agency PARTY New York and PARTY Taipei, <br />are merging with Japan’s renowned<br />digital production company dot by dot<br />to start a new global studio “Whatever”.',
            text_sp: 'Creative agency PARTY New York and PARTY Taipei, <br />are merging with Japan’s renowned digital production company dot by dot<br />to start a new global studio “Whatever”.',
            image_pc: '/assets/statement-en.svg',
            image_sp: '/assets/statement-en-sp.svg',
            alt: '“PARTY (New York & Taipei)” is a creative agency that loves to make weird and wonderful things with their own hands. “dot by dot” is a digital production company that loves to create new ideas and strategies using their own brains.  Descriptions aside, the two teams share one similarity: Before anything else, we are creatives who “think and make”, because we believe that\'s the only way to bring dreamlike ideas to life.Many agencies and production companies around the world share the same mission of "thinking and making", but only few have walked the talk.Our challenge is to prove to the world that we can make whatever we imagine through our Tokyo, New York, Berlin, and Taipei teams.',
            names: ['Yusuke Tominaga', 'Masashi Kawamura']
        },
        ja: {
            text_pc: 'dot by dot 、PARTY New York 、PARTY Taipei は<br />このたび合併し、1つの新しい組織として<br />「Whatever」をスタートします',
            text_sp: 'dot by dot 、PARTY New York 、PARTY Taipei はこのたび合併し、<br />1つの新しい組織として「Whatever」をスタートします',
            image_pc: '/assets/statement-ja.svg',
            image_sp: '/assets/statement-ja-sp.svg',
            alt: '自ら手を動かして作りたいクリエイティブエージェンシー“PARTY”と、自分たちの頭で考えたいプロダクション“dot by dot”。わたしたちに共通して言えるのは「考えて、作りたい」人の集まりだということ。なぜならそれこそが、夢のようなアイデアを夢のような形で実現できる唯一のつくり方だからです。これを標榜しているエージェンシーやプロダクションはたくさん出現していますが、残念ながらこれを本当に実現できているチームは、世界を見渡してもまだほとんど存在しません。わたしたちは東京、ニューヨーク、台北、ベルリンを拠点として、日本のみならず世界をもフィールドと定め、「考えて作る」ことの力を実証していきたいと思っています。',
            names: ['富永 勇亮', '川村 真司']
        },
    },

    getInitialState() {
        return this.data[this.context.lang] ? this.data[this.context.lang] : this.data['en']
    },

    render() {
        return <div className="statement">
            <img className="logo" src="/assets/logo.gif" alt="Whatever Inc." />
            {isMobile ? <div className="logo3">
                <p dangerouslySetInnerHTML={{ __html: this.state.text_pc }}></p>
                <img src="/assets/logo3-sp.svg" alt="" />
            </div> : <div className="logo3"><img src="/assets/logo3.svg" alt="" /><p dangerouslySetInnerHTML={{ __html: this.state.text_sp }}></p></div>}
            <img className="text" src={isMobile ? this.state.image_sp : this.state.image_pc} alt={this.state.alt} />
            <table>
                <tr>
                    <td>Chief Executive Officer :</td>
                    <td>{this.state.names[0]}</td>
                </tr>
                <tr>
                    <td>Chief Creative Officer :</td>
                    <td>{this.state.names[1]}</td>
                </tr>
                <tr>
                    <td>Chief Technology Officer :</td>
                    <td>Saqoosha</td>
                </tr>
            </table>
        </div>
    }
})
