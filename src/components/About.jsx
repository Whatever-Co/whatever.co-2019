var React = require('react')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).phone()

var Lang = require('./Lang')

module.exports = React.createClass({

    mixins: [Lang],

    data: {
        en: {
            image_pc: '/assets/about-en.svg',
            image_sp: '/assets/about-en-sp.svg',
            alt: 'We are a creative agency,A digital production company,A design studio,A brand consulting firm,An innovation lab,A group of media artists,Or whatever else you want to call us. What matters is the fact that Whatever we can imagine, we can make.Whatever form it may take, Whatever method it may require,We will always find the best way to bring weird and wonderful ideas to life.',
        },
        ja: {
            image_pc: '/assets/about-ja.svg',
            image_sp: '/assets/about-ja-sp.svg',
            alt: '自ら手を動かして作りたいクリエイティブエージェンシー“PARTY”と、自分たちの頭で考えたいプロダクション“dot by dot”。ぼくたちに共通して言えるのは「考えて、作りたい」人の集まりだということ。なぜならそれこそが、夢のようなアイデアを夢のような形で実現できる唯一のつくり方だからです。これを標榜しているエージェンシーやプロダクションはたくさん出現していますが、残念ながらこれを本当に実現できているチームは、世界を見渡してもまだほとんど存在しません。僕らは東京、ニューヨーク、台北、ベルリンを拠点として、日本のみならず世界をもフィールドと定め、「考えて作る」ことの力を実証していきたいと思っています。',
        },
        zh: {
            image_pc: '/assets/about-zh.svg',
            image_sp: '/assets/about-zh-sp.svg',
            alt: '我們是創意代理商，是數位製作公司是設計工作室，是品牌顧問是創新實驗室，是新媒體藝術集團或是隨便哪個名字最重要的是我們將天馬行空的想像化為現實不限形式，不限方法我們將奇特又美好的創意打造成全球頂尖的精彩體驗',
        },
    },

    getInitialState() {
        return this.data[this.context.lang] ? this.data[this.context.lang] : this.data['en']
    },

    render() {
        return <div className="about">
            <img className="about-text" src={isMobile ? this.state.image_sp : this.state.image_pc} alt={this.state.alt} />
        </div>
    }

})
