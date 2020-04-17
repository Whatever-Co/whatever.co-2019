var React = require('react')
var MobileDetect = require('mobile-detect')
var isMobile = !!new MobileDetect(navigator.userAgent).phone()

var Lang = require('./Lang')
var Link = require('./Link')

module.exports = React.createClass({

    mixins: [Lang],

    data: {
        en: {
            poem_pc: '/assets/poem-en.svg',
            poem_sp: '/assets/poem-en-sp.svg',
            poem_alt: 'Whatever is a creative studio that aims to conceive unexplored ideas, and bring them to life by whatever means possible. Based in Tokyo, New York, Taipei, and Berlin, our multidisciplinary team allows us to produce innovative work in various creative fields such as advertising and brand design, to content productions such as TV  shows, products, and service designs. By “thinking and making” under one roof, we strive to create beautiful experiences that can be talked and endeared by the people around the world.',
            cotodama: 'A joint venture to develop and license Lyric Speaker, co-funded with SIX, WOW and THE GUILD. Whatever also provides technical and management support.',
            bassdrum: 'The world’s first Technical Directors collective formed by Qanta Shimizu together with the industry-leading Technical Directors in Japan. Financial and management support provided by Whatever.',
            yummysake: 'Yummy Sake is the unique tasting service to analyze customer\'s sake preference using blind tasting and machine learning. Financial and technical support provided by Whatever.',
            kasa: 'Kasa is a creative unit specialized in developing interactive experiences for museums and public spaces. Co-founded with Kudos and Conduit in New York.',
            wtfc: 'A joint company co-funded and co-managed with Tohokushinsha Film Corporation. Dedicated for the new business development and global creative services as well as co-operating the coworking space "WHEREVER."',
        },
        ja: {
            poem_pc: '/assets/poem-ja.svg',
            poem_sp: '/assets/poem-ja-sp.svg',
            poem_alt: 'わたしたちは、誰も見たことがないようなアイデアを考え、あらゆる方法でそれを実現していくクリエイティブスタジオです。東京、ニューヨーク、台北、ベルリンの拠点を活かし、世界を舞台に広告やブランディングから、テレビ番組、ゲーム、プロダクトなどのコンテンツや新規事業開発まで、様々な分野のモノづくりを手がけていきます。考えるだけでもない、作るだけでもない、「考えて作る」ことで生まれるアイデアと実現力を武器に、世界中の人に驚かれ愛されるような体験を作り上げていきます。',
            about: [
                "考えるだけに終わらず、つくるだけに留まらず、実際にユーザーの手に届き、話題となり、愛されるところまでがモノづくりだと私たちは考えます。<br />その想いの元生み出された作品の数々は、世界中で高い評価を受け、Cannes Lions をはじめ、One Show、Clio、Annecy Animation Film Festival、China 4A でのグランプリや、文化庁メディア芸術祭最優秀賞など、国内外で 100 以上のデザイン賞・広告賞を受賞しています。",
                "私たちは受託案件だけでなく、自社開発プロジェクトにも力を入れています。<br />単に企画や研究、実験に終わることなく、ユーザーの手に届くまでのプロセスを自社で実践することで、どうすればマーケットに耐えうるレベルまでコンセプトの完成度を高められるかを常に学んでいます。<br />その結果、普通の制作会社では持ち得ない開発力や検証能力、値付けや配送ネットワーク構築、PR、お客様対応などのノウハウを獲得。その経験がクライアントワークにも還元され、様々な企業の商品開発やクリエイティブコンサルティング等に役立てられています。",
                "日本だけでなくグローバルでの実績とネットワークも、私たちの強みの1つです。<br />前身の PARTY NY（現 Whatever NY）ではプロジェクトの 80% が海外クライアント案件となっており、名実ともにグローバルに活動してきた実績を持っています。<br />日本とグローバルそれぞれの市場を理解し、クリエイティブに落とし込むことができるので、日本企業のグローバルキャンペーンや、海外クライアント・アーティストの日本展開サポートも得意としています。",
                "自由度の高い採用制度の導入や、コワーキングスペースの運用、コミュニティイベントなどを通して、組織や国境を越えて思いきりモノづくりができる環境をつくっています。",
                "おもしろいアイデアや特別なノウハウを持つ企業に出資を行ったり、技術者やクリエイティブ人材、役員を派遣することで、自社単独ではやれない領域のプロジェクトに参加し、世の中に新しいものを生み出しています。",
            ],
            about4: [
                {
                    title: "Creative Commune<br/>WHEREVER の運営",
                    text: "面白いモノが作りたい！という共通の思想を持ったチームが近くで働き化学反応を起こせるように、WHEREVER を設立・運営しています。"
                }, {
                    title: "優秀な仲間を集める<br/>Co-creator 制度",
                    text: "フリーランス/アーティストと会社員とのハイブリッドな働き方ができる制度。すぐれたクリエイティブ人材がプロジェクトに参画しやすい仕組みを整えました。"
                }, {
                    title: "働く場所は<br/>世界中どこでも",
                    text: "様々なクリエイターとのグローバルネットワークを駆使して、働くフィールドを世界中に拡げ、在宅ワークでもグローバルクライアントの仕事ができるプロセスを構築しています。"
                }, {
                    title: "作り手を大切にする<br/>クレジットのルール",
                    text: "プロジェクトのコアとなるクリティカルなアイデアを出した人をクレジットに記載する社内ルールを定めています。役職に関わらずフラットにアイデアを評価し、称える制度です。"
                },
            ],
            cotodama: 'Lyric Speaker の開発・ライセンス提供を行うジョイント・ベンチャー。SIX、WOW、THE GUILD との共同出資、及び役員・技術者を派遣。',
            bassdrum: '清水幹太をはじめ、日本をリードするテクニカルディレクターが集まった世界初のテクニカルディレクター集団。出資、及び役員を派遣。',
            yummysake: '機械学習 x ブラインドテイスティングで好みの日本酒がわかるサービス。出資、及び技術者を派遣。',
            kasa: 'ミュージアムや公共空間のためのインタラクティブ体験を企画・開発するクリエイティブ・ユニット。Kudos、Conduit と共同で NY に設立。',
            wtfc: '東北新社との共同出資による合弁会社。コワーキングスペース「WHEREVER」の共同運営及び新規事業開発とグローバルでのクリエイティブサービス等を展開。出資、及び役員を派遣。',
        },
        zh: {
            poem_pc: '/assets/poem-zh.svg',
            poem_sp: '/assets/poem-zh-sp.svg',
            poem_alt: '​​Whatever 是一家擅長發想出前所未有的創意，並透過各式各樣的方式將其化為現實的創意工作室。我們充分活用分布於東京、紐約、台北及柏林的據點，以全世界為舞台，提供從廣告、體驗行銷、品牌策略、到內容創作及產品開發等的多領域創意製作服務。我們不僅限於只發想創意，或單純提供製作，而是兼具「動腦想和動手做」的優勢，來創造出讓全世界驚豔且著迷的體驗。',
            cotodama: '開發 Lyric Speaker，同時也是提供 license 的 Joint venture。與 SIX、WOW、THE GUILD 共同出資，並提供經營管理人員及技術人員。',
            bassdrum: '由 Qanta Shimizu 等引領日本業績 technical director 組成。是全世界第一個 technical director 匯集組織。提供出資以及指派經營管理者。',
            yummysake: '透過 Machine Learning x Blind Tasting 辨識使用者日本酒偏好的服務。提供出資以及指派經營管理者。',
            kasa: '特別為博物館和及公共空間提供互動體驗的企劃與開發的創意團隊。與 Kudos 及 Conduit 一同設立於 NY。',
            wtfc: '這是我們與東北新社共同出資的合資公司。 ​​一同經營 co-working space「WHEREVER」的營運，同時拓展新事業開發和提供全球化的創意設計服務，其中營運模式包含出資以及指派經營管理者。',
        },
    },

    getInitialState() {
        return this.data[this.context.lang] ? this.data[this.context.lang] : this.data['en']
    },

    _onClick(href) {
        console.log(href)
        window.open(href, '_blank')
    },

    render() {
        var prefix = "-" + this.context.lang
        if (isMobile) prefix += "-sp"
        console.log(prefix)
        return <div className="about">
            <img className="about-text" src={isMobile ? "/assets/makewhatever-sp.svg" : "/assets/makewhatever.svg"} alt="Make whatever. Rules, whatever." />
            <img className="about-poem" src={isMobile ? this.state.poem_sp : this.state.poem_pc} alt={this.state.poem_alt} />
            <div className="about-chiefs">
                <Link className="about-chief" to="/team/yusuke/">
                    <img src="https://whatever.co/wp-content/uploads/2018/01/dotbydot7168.jpg" />
                    <div className="about-chief-title">CEO / Executive Producer</div>
                    <div className="about-chief-name-ja">富永 勇亮</div>
                    <div className="about-chief-name-en">Yusuke Tominaga</div>
                </Link>
                <Link className="about-chief" to="/team/masa/">
                    <img src="https://whatever.co/wp-content/uploads/2019/06/masa-2.jpg" />
                    <div className="about-chief-title">CCO / Creative Director</div>
                    <div className="about-chief-name-ja">川村 真司</div>
                    <div className="about-chief-name-en">Masashi Kawamura</div>
                </Link>
                <Link className="about-chief" to="/team/saqoosha/">
                    <img src="https://whatever.co/wp-content/uploads/2018/01/dotbydot7043.jpg" />
                    <div className="about-chief-title">CTO / Programmer</div>
                    <div className="about-chief-name-ja">Saqoosha</div>
                    <div className="about-chief-name-en">さくーしゃ</div>
                </Link>
            </div>

            <img className="about-aboutus-title" src="/assets/aboutus.png" alt="ABOUT US" />
            {[0, 1, 2, 3].map(i => <div className={"about-" + (i + 1)}>
                <img className="about-aboutus-title2" src={"/assets/about-" + (i + 1) + prefix + ".png"} />
                <div className="about-aboutus-text" dangerouslySetInnerHTML={{ __html: this.state.about[i] }}></div>
                {isMobile ? <img className="about-aboutus-image" src={"/assets/about-" + (i + 1) + "-sp.jpg"} /> : null}
            </div>)}
            <div className="about-4-detail">
                {this.state.about4.map(item => <div className="about-4-detail-item">
                    <div className="about-4-detail-item-title" dangerouslySetInnerHTML={{ __html: item.title }}></div>
                    <div className="about-4-detail-item-text">{item.text}</div>
                </div>)}
            </div>
            <div className="about-5">
                <img src={"/assets/about-5" + prefix + ".png"} />
                <div dangerouslySetInnerHTML={{ __html: this.state.about[4] }}></div>
            </div>
            <div className="about-alliances">
                <div style={{ backgroundImage: "url(/assets/cotodama.png)" }} onClick={this._onClick.bind(this, "https://lyric-speaker.com/")}>
                    <div>
                        <b>COTODAMA</b>
                        <span>{this.state.cotodama}</span>
                    </div>
                </div>
                <div style={{ backgroundImage: "url(/assets/bassdrum.png)" }} onClick={this._onClick.bind(this, "https://bassdrum.org//")}>
                    <div>
                        <b>BASSDRUM</b>
                        <span>{this.state.bassdrum}</span>
                    </div>
                </div>
                <div style={{ backgroundImage: "url(/assets/yummysake.png)" }} onClick={this._onClick.bind(this, "https://yummysake.jp/")}>
                    <div>
                        <b>YUMMY SAKE</b>
                        <span>{this.state.yummysake}</span>
                    </div>
                </div>
                <div style={{ backgroundImage: "url(/assets/kasa.png)" }} onClick={this._onClick.bind(this, "https://kasa-made.com/")}>
                    <div>
                        <b>kasa</b>
                        <span>{this.state.kasa}</span>
                    </div>
                </div>
                <div style={{ backgroundImage: "url(/assets/wtfc.png)" }} onClick={this._onClick.bind(this, "https://wtfc.jp/")}>
                    <div>
                        <b>WTFC</b>
                        <span>{this.state.wtfc}</span>
                    </div>
                </div>
            </div>

            <img className="about-ourclients-title" src="/assets/ourclients.png" alt="OUT CLIENTS" />
            <img className="about-ourclients-table" src={"/assets/client-logo" + (isMobile ? "-sp" : "") + ".png"} alt="" />
        </div>
    }

})
