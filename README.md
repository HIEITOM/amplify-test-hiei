# パワハラ対策Webアプリケーション

AWS Amplifyを活用したパワハラ相談・管理システム

## 機能

- ユーザー認証（Amazon Cognito）
- パワハラ相談フォーム
- 相談履歴管理
- 管理者ダッシュボード
- ファイル添付機能（Amazon S3）
- リアルタイム通知

## セットアップ（Amplify Gen2）

1. 依存関係のインストール
```bash
npm install
```

2. Amplify Gen2 CLIのインストール
```bash
npm install -g @aws-amplify/backend-cli
```

3. サンドボックス環境の起動
```bash
npx ampx sandbox
```

4. アプリケーションの起動
```bash
npm start
```

5. 本番デプロイ
```bash
npx ampx pipeline-deploy --branch main
```

## 使用技術

- React 18
- AWS Amplify
- Amazon Cognito
- AWS AppSync (GraphQL)
- Amazon DynamoDB
- Amazon S3
- Amazon SES/SNS

## ディレクトリ構造（Gen2）

```
amplify/
├── auth/           # 認証設定
├── data/           # GraphQLスキーマ
├── storage/        # ストレージ設定
└── backend.ts      # バックエンド設定

src/
├── components/     # 共通コンポーネント
├── pages/         # ページコンポーネント
├── App.js         # メインアプリケーション
└── index.js       # エントリーポイント
```

## 権限管理

- 一般ユーザー: 相談投稿・履歴閲覧
- 管理者: 全相談閲覧・ステータス更新・コメント追加