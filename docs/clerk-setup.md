# Clerk 認証セットアップ

## 1. Clerkアカウントの作成

1. [Clerk](https://clerk.com)でアカウントを作成
2. 新しいアプリケーションを作成
   - アプリケーション名を入力
   - 認証方法を選択（Email、Google、その他）

## 2. APIキーの取得

1. ダッシュボードから「API Keys」を選択
2. 以下のキーをコピー:
   - **Publishable Key**: `pk_test_`で始まる文字列
   - **Secret Key**: `sk_test_`で始まる文字列

## 3. Google認証の有効化

1. ダッシュボードで「Social Connections」を選択
2. 「Google」を有効化
3. GoogleのOAuth設定:
   - [Google Cloud Console](https://console.cloud.google.com/)でプロジェクトを作成
   - OAuth 2.0クライアントIDを作成
   - 承認済みのリダイレクトURIに以下を追加:
     ```
     https://YOUR_CLERK_DOMAIN.accounts.dev/v1/oauth_callback
     ```
   - クライアントIDとクライアントシークレットをClerkに設定

詳細は[Clerk公式ガイド](https://clerk.com/docs/authentication/social-connections/google)を参照してください。
