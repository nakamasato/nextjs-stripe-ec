# 本番環境構築

## 1. 環境変数の設定

本番環境では以下の環境変数を設定する必要があります:

### Stripe本番キー

1. Stripeダッシュボードで本番モードに切り替え
2. 本番用のAPIキーを取得
3. 本番用のWebhook署名シークレットを設定

### Clerk本番キー

1. Clerkダッシュボードで本番用アプリケーションを作成
2. 本番用のAPIキーを取得
3. 本番ドメインを設定

### API URL設定

`NEXT_PUBLIC_API_URL`は本番環境で**必須**の環境変数です：

- **目的**: サーバーサイドレンダリング時のAPI呼び出し用URL
- **設定値**: あなたのVercelドメイン（例：`https://your-project.vercel.app`）
- **注意**: 設定しないと商品一覧が表示されずエラーになります

## 2. Vercelへのデプロイ（推奨）

### 環境変数の設定

```
STRIPE_API_KEY=rk_live_your_production_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY=pk_live_your_production_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_key
```

### デプロイ手順

1. GitHubにコードをプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

## 3. セキュリティチェックリスト

- [ ] すべてのAPIキーが本番用に変更されている
- [ ] HTTPS/SSLが有効になっている
- [ ] Clerkの本番ドメインが正しく設定されている
- [ ] StripeのWebhook URLが本番URLに設定されている
- [ ] テストモードのキーが含まれていない
- [ ] **NEXT_PUBLIC_API_URL**が正しいVercelドメインに設定されている

## 4. Stripe Webhook設定（本番環境）

1. Stripeダッシュボードで「開発者」→「Webhook」を選択
2. 「エンドポイントを追加」をクリック
3. エンドポイントURL: `https://your-domain.com/api/webhooks`
4. 以下のイベントを選択:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. 署名シークレットを環境変数に設定

## 5. 動作確認

1. 本番環境でユーザー登録・ログインができることを確認
2. 商品一覧が表示されることを確認
3. テスト決済が正常に処理されることを確認
4. Webhook が正常に動作することを確認
