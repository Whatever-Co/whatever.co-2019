# CLAUDE.md - 開発ガイドライン

このファイルはClaude AIがこのリポジトリで作業する際のガイドラインと設定を記載しています。

## プロジェクト概要

Whatever Inc.のコーポレートウェブサイト（2019年版）。React 0.12.2とCoffeeScriptを使用したレガシーなフロントエンドアプリケーション。

## 技術仕様

### メイン技術スタック
- **React**: 0.12.2（非常に古いバージョン）
- **CoffeeScript**: 2.4.1
- **Sass**: スタイリング
- **Grunt**: ビルドツール
- **Express.js**: 開発サーバー

### 重要な制約
- React 0.12.2は現代のReactとAPIが大きく異なる
- JSX変換にreactifyを使用
- ES6機能は限定的
- 関数コンポーネントやHooksは使用不可

## ディレクトリ構造

```
src/
├── components/          # Reactコンポーネント
├── styles/              # Sassファイル  
├── main.jsx            # アプリケーションエントリーポイント
├── main.sass           # メインスタイル
└── data.coffee         # データ定義
```

## 開発コマンド

```bash
# 開発サーバー起動（推奨）
npm start
# または
grunt

# 本番ビルド
npm run build
# または  
grunt build

# デプロイ
npm run deploy
# または
grunt deploy

# 開発サーバー（ngrok使用）
npm run serve
# または
coffee run.coffee
```

## コーディング規約

### React コンポーネント
- `React.createClass()`を使用（classベースのコンポーネントは不可）
- propsの型チェックには`PropTypes`を使用
- `getInitialState()`でstate初期化

### CoffeeScript
- インデントは2スペース
- 関数定義は`->`記法
- `require()`でモジュール読み込み

### Sass
- インデント記法を使用（波括弧なし）
- ファイル名は`.sass`拡張子

### ファイル命名
- コンポーネントはPascalCase (`ComponentName.jsx`)
- スタイルファイルはkebab-case (`component-name.sass`)

## ビルドプロセス

1. **Sass → CSS**: `grunt-contrib-sass`でコンパイル
2. **Autoprefixer**: ベンダープレフィックス追加
3. **Browserify**: JSX/CoffeeScriptをバンドル
4. **Minification**: CSS/JS圧縮
5. **Copy**: `dist/`に出力

## 多言語対応

- ルートパス: 日本語（デフォルト）
- `/en/`: 英語
- `/zh/`: 中国語

ルーティングは`react-router` 0.11.6で実装。

## レガシー考慮事項

### 注意すべき点
- React 0.12.2は非常に古く、現代のReact知識が直接適用できない
- `componentWillMount`等の非推奨ライフサイクルメソッドを使用
- Context APIは存在しない
- React Hooksは使用不可
- ES6のclass記法は未対応

### 修正時の方針
- 既存のコード記法を維持
- 無理な現代化は避ける
- 機能追加時は既存パターンに従う
- セキュリティ更新のみ優先

## 依存関係管理

- Node.js 4.9.1指定（非常に古い）
- 依存関係の更新は慎重に行う
- 互換性を保つため、メジャーバージョンアップは避ける

## デプロイメント

- rsyncでサーバーに配布
- WordPressテーマとしても動作
- 静的アセット配信とPHP連携

## トラブルシューティング

### よくある問題
1. **Node.jsバージョン不整合**: nvm等でNode.js 4.9.1を使用
2. **CoffeeScript変換エラー**: 構文確認
3. **Browserifyバンドルエラー**: require文の確認

### デバッグ方法
- ブラウザの開発者ツールでコンソールエラー確認
- `grunt --verbose`で詳細ログ出力
- `dist/`ディレクトリの生成ファイル確認

## 最後に

このプロジェクトは2019年の技術を使用しており、現代的な開発手法とは大きく異なります。変更を加える際は、既存のアーキテクチャを尊重し、無理な現代化を避けることが重要です。