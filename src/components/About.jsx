var React = require('react')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).phone()

var Lang = require('./Lang')
var Link = require('./Link')

module.exports = React.createClass({

    mixins: [Lang],

    data: {
        en: {
            poem_pc: '/assets/pome-ja.svg',
            alt: 'Whatever is a creative studio that aims to conceive unexplored ideas, and bring them to life by whatever means possible. Based in Tokyo, New York, Taipei, and Berlin, our multidisciplinary team allows us to produce innovative work in various creative fields such as advertising and brand design, to content productions such as TV  shows, products, and service designs. By “thinking and making” under one roof, we strive to create beautiful experiences that can be talked and endeared by the people around the world.',
        },
        ja: {
            poem_pc: '/assets/pome-ja.svg',
            alt: 'わたしたちは、誰も見たことがないようなアイデアを考え、あらゆる方法でそれを実現していくクリエイティブスタジオです。東京、ニューヨーク、台北、ベルリンの拠点を活かし、世界を舞台に広告やブランディングから、テレビ番組、ゲーム、プロダクトなどのコンテンツや新規事業開発まで、様々な分野のモノづくりを手がけていきます。考えるだけでもない、作るだけでもない、「考えて作る」ことで生まれるアイデアと実現力を武器に、世界中の人に驚かれ愛されるような体験を作り上げていきます。',
        },
        zh: {
            poem_pc: '/assets/pome-ja.svg',
            alt: '​​Whatever 是一家擅長發想出前所未有的創意，並透過各式各樣的方式將其化為現實的創意工作室。我們充分活用分布於東京、紐約、台北及柏林的據點，以全世界為舞台，提供從廣告、體驗行銷、品牌策略、到內容創作及產品開發等的多領域創意製作服務。我們不僅限於只發想創意，或單純提供製作，而是兼具「動腦想和動手做」的優勢，來創造出讓全世界驚豔且著迷的體驗。',
        },
    },

    getInitialState() {
        return this.data[this.context.lang] ? this.data[this.context.lang] : this.data['en']
    },

    render() {
        return <div className="about">
            <img className="about-text" src="/assets/03_about_03.svg" alt="Make whatever. Rules, whatever." />
            <img className="about-poem" src={this.state.poem_pc} alt={this.state.alt} />
            <div className="about-chiefs">
                <Link className="about-chief" to="/team/yusuke/">
                    <img src="https://whatever.co/wp-content/uploads/2018/01/dotbydot7168.jpg"/>
                    <div className="about-chief-title">Global CEO / Founder</div>
                    <div className="about-chief-name-ja">富永 勇亮</div>
                    <div className="about-chief-name-en">Yusuke Tominaga</div>
                </Link>
                <Link className="about-chief" to="/team/masa/">
                    <img src="https://whatever.co/wp-content/uploads/2019/06/masa-2.jpg" />
                    <div className="about-chief-title">Creative Director / COO</div>
                    <div className="about-chief-name-ja">川村 真司</div>
                    <div className="about-chief-name-en">Masashi Kawamura</div>
                </Link>
                <Link className="about-chief" to="/team/saqoosha/">
                    <img src="https://whatever.co/wp-content/uploads/2018/01/dotbydot7043.jpg" />
                    <div className="about-chief-title">Programmer / CTO</div>
                    <div className="about-chief-name-ja">Saqoosha</div>
                    <div className="about-chief-name-en">さくーしゃ</div>
                </Link>
            </div>
            <img className="about-partner-title" src="/assets/partners.png" alt="PARTNERS" />
            <div className="about-partners">
                <div>
                    <a href="https://lyric-speaker.com/">
                        <img src="/assets/cotodama.png" alt="COTODAMA" />
                    </a>
                    <div>Lyric Speaker の開発・ライセンス提供を行うジョイント・ベンチャー。SIX、WOW、THE GUILD との共同出資、及び役員・技術者を派遣。</div>
                </div>
                <div>
                    <a href="https://bassdrum.org/">
                        <img src="/assets/bassdrum.png" alt="BASSDRUM" />
                    </a>
                    <div>清水幹太をはじめ、日本をリードするテクニカルディレクターが集まった世界初のテクニカルディレクター集団。出資、及び役員を派遣。</div>
                </div>
                <div>
                    <a href="https://yummysake.jp/">
                        <img src="/assets/yummysake.png" alt="YUMMY SAKE" />
                    </a>
                    <div>機械学習 x ブラインドテイスティングで好みの日本酒がわかるサービス。出資、及び技術者を派遣。</div>
                </div>
                <div>
                    <img src="/assets/kasa.png" alt="kasa" />
                    <div>ミュージアムや公共空間のためのインタラクティブ体験を企画・開発するクリエイティブ・ユニット。Kudos、Conduit と共同で NY に設立。</div>
                </div>
            </div>
        </div>
    }

})
