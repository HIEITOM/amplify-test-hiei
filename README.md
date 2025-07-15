# パワハラ対策Webアプリケーション

AWS Amplifyを活用したパワハラ相談・管理システム

## 機能

- ユーザー認証（Amazon Cognito）
- パワハラ相談フォーム
- 相談履歴管理
- 管理者ダッシュボード
- ファイル添付機能（Amazon S3）
- リアルタイム通知

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. Amplify CLIのインストール
```bash
npm install -g @aws-amplify/cli
```

3. Amplifyプロジェクトの初期化
```bash
amplify init
```

4. バックエンドサービスの追加
```bash
amplify add auth
amplify add api
amplify add storage
```

5. デプロイ
```bash
amplify push
```

6. アプリケーションの起動
```bash
npm start
```

## 使用技術

- React 18
- AWS Amplify
- Amazon Cognito
- AWS AppSync (GraphQL)
- Amazon DynamoDB
- Amazon S3
- Amazon SES/SNS

## ディレクトリ構造

```
src/
├── components/     # 共通コンポーネント
├── pages/         # ページコンポーネント
├── graphql/       # GraphQL クエリ・ミューテーション
├── App.js         # メインアプリケーション
└── index.js       # エントリーポイント
```

## 権限管理

- 一般ユーザー: 相談投稿・履歴閲覧
- 管理者: 全相談閲覧・ステータス更新・コメント追加