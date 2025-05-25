# whatever.co (2019)

Whatever Inc.のコーポレートウェブサイト（2019年版）のソースコードです。

## 概要

Whatever Inc.は多様な分野で活動するクリエイティブ集団のウェブサイトです。このプロジェクトは会社情報、ポートフォリオ、ニュース、メンバー紹介などを含む多言語対応のコーポレートサイトです。

## 技術スタック

- **フレームワーク**: React 0.12.2
- **言語**: CoffeeScript, JavaScript (JSX)
- **スタイル**: Sass
- **ビルドツール**: Grunt
- **サーバー**: Express.js
- **その他**: jQuery, React Router, Browserify

## 多言語対応

- 日本語 (デフォルト)
- 英語 (`/en/`)
- 中国語 (`/zh/`)

## ディレクトリ構造

```
src/
├── components/          # Reactコンポーネント
│   ├── Application.jsx  # メインアプリケーション
│   ├── Header.jsx       # ヘッダー
│   ├── Menu.jsx         # ナビゲーションメニュー
│   ├── WorkList.jsx     # 作品一覧
│   ├── MemberList.jsx   # メンバー一覧
│   └── ...
├── styles/              # Sassスタイルファイル
├── main.jsx            # エントリーポイント
├── main.sass           # メインスタイル
└── data.coffee         # データファイル
```

## セットアップ

### 必要環境

- Node.js 4.9.1
- npm 6.11.3

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm start
# または
grunt
```

開発サーバーがポート8000で起動します。

### ビルド

```bash
npm run build
# または
grunt build
```

### デプロイ

```bash
npm run deploy
# または
grunt deploy
```

## 開発

### ファイル監視

開発中は以下のファイルが自動監視され、変更時に自動ビルドされます：

- `src/**/*.sass` - Sassファイル
- `src/**/*.jsx` - JSXファイル
- `src/**/*.coffee` - CoffeeScriptファイル

### ライブリロード

`grunt`コマンドでライブリロード機能が有効になります。

## 主要機能

- **ポートフォリオ表示**: 制作物の一覧と詳細
- **ニュース**: 最新情報の表示
- **メンバー紹介**: チームメンバーの紹介
- **コンタクト**: お問い合わせフォーム
- **多言語対応**: 日英中の3言語切り替え
- **レスポンシブデザイン**: モバイル対応

## ライセンス

MIT License

## 作者

Saqoosha

## ホームページ

https://whatever.co/