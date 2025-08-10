# Next.js Stripe ECサイト

![デモ](docs/demo.gif)

このプロジェクトは、Next.jsとStripeを使用したシンプルなECサイトです。

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Stripeアカウントのセットアップ

1. [Stripe](https://stripe.com)でアカウントを作成
2. ダッシュボードにログイン
3. 左メニューから「開発者」→「APIキー」を選択
4. 「公開可能キー」をコピー
5. 「制限付きキーを作成」をクリックして、以下の権限のみを付与したRestricted Keyを作成:
   - Products: 読み取り
   - Prices: 読み取り
   - Checkout Sessions: 書き込み
6. 作成したRestricted Keyをコピー

### 3. 商品とPriceの作成

1. Stripeダッシュボードで「商品カタログ」→「商品」を選択
2. 「商品を追加」をクリック
3. 商品名、説明、画像を設定
4. 価格を設定（通貨：JPY）
5. 商品を保存し、商品IDとPrice IDをメモ

### 4. Webhookの設定（開発環境）

開発環境では、Stripe CLIを使用してWebhookをテストします：

1. Stripe CLIをインストール:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # その他のOSは https://stripe.com/docs/stripe-cli を参照
   ```

2. Stripe CLIにログイン:
   ```bash
   stripe login
   ```

3. Webhookイベントを転送:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks
   ```

4. 表示される署名シークレット（`whsec_`で始まる文字列）を`.env.local`に設定

### 5. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を追加:

```env
STRIPE_API_KEY=rk_test_your_restricted_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 6. 商品データの更新

`pages/api/products.ts`を編集し、Stripeで作成した商品データを設定してください。

## 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)でアプリケーションを確認できます。

## テスト用カード番号

Stripeのテストモードでは以下のカード番号が使用できます：

- **成功**: 4242 4242 4242 4242
- **失敗**: 4000 0000 0000 0002
- **CVV**: 任意の3桁の数字
- **有効期限**: 未来の日付

## プロジェクト構成

- `pages/index.tsx` - 商品一覧ページ
- `pages/success.tsx` - 決済完了ページ
- `pages/api/products.ts` - 商品データAPI
- `pages/api/checkout.ts` - チェックアウトセッション作成API
- `pages/api/webhooks.ts` - Stripe Webhook処理

## 主な機能

- 商品一覧の表示
- Stripe Checkoutによる決済処理
- 決済完了後のリダイレクト
- Webhook による決済状態の管理

## トラブルシューティング

### エラー: "Cannot read properties of undefined"
- `.env.local`ファイルが正しく設定されているか確認
- 開発サーバーを再起動

### 決済が失敗する
- Stripe APIキーが正しいか確認
- テスト用カード番号を使用しているか確認

### Webhookが動作しない
- Stripe CLIが実行中か確認（`stripe listen --forward-to http://localhost:3000/api/webhooks`）
- 署名シークレットが正しく設定されているか確認
- コンソールでWebhookイベントのログを確認

## 本番環境への展開

1. 本番用のStripe APIキーに変更
2. Webhook URLを本番環境のURLに変更
3. 環境変数を本番環境に設定
4. SSL証明書の設定

## 参考資料

このプロジェクトは以下の資料を参考に作成されました：

- [Next.jsとStripeではじめるシンプルなECサイト開発ワークショップ](https://zenn.dev/stripe/books/stripe-nextjs-use-shopping-cart) - 基本的な実装はこちらを参考にしています
