# Next.js Stripe ECサイト

![デモ](docs/demo.gif)

Clerk認証とStripe決済を使用したモダンなECサイトです。

## セットアップ手順

### 1. Stripe Setup (決済と商品設定)

- [Stripeアカウントセットアップ](docs/stripe-01-setup.md)
- [商品とPriceの作成](docs/stripe-02-product-and-price.md)
- [Webhookの設定](docs/stripe-03-webhook.md)

### 2. Clerk Setup (認証機能)

- [Clerk認証セットアップ](docs/clerk-setup.md)

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を追加:

```env
# Stripe Configuration
STRIPE_API_KEY=rk_test_your_restricted_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# API URL (required in production)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
```

### 5. 商品データの更新

`pages/api/products.ts`を編集し、Stripeで作成した商品データを設定してください。

## Local開発

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)でアプリケーションを確認できます。

### コード品質チェック

```bash
npm run lint        # ESLintでコード品質チェック
npx tsc --noEmit    # TypeScript型チェック
npm run build       # 本番ビルド
```

## 主な機能

### ページ構成

- **`/` (ホームページ)**
  - 未認証時: スタイリッシュなランディングページ（新規登録・ログインボタン）
  - 認証済み: 商品一覧ページ

- **`/sign-in` / `/sign-up`**
  - Clerkによる認証ページ（モーダル表示）
  - Google OAuth対応

- **`/success`**
  - 決済完了ページ
  - Stripeからのリダイレクト先

### API エンドポイント

- **`/api/products`**: 商品データ取得
- **`/api/checkout`**: チェックアウトセッション作成（認証必須）
- **`/api/webhooks`**: Stripe Webhook処理

### 認証・決済機能

- Clerkによるユーザー認証
  - Email/Password認証
  - Google OAuth認証
  - セッション管理
- Stripe Checkoutによる安全な決済
- Webhookによる決済状態の自動更新

## テスト用情報

### Stripeテストカード番号

- **成功**: 4242 4242 4242 4242
- **失敗**: 4000 0000 0000 0002
- **CVV**: 任意の3桁の数字
- **有効期限**: 未来の日付

## 本番環境構築

[本番環境セットアップガイド](docs/production-setup.md)を参照してください。

## 参考資料

- Framework: [Nextjs](https://nextjs.org/)
- Auth: [Clerk](https://clerk.com/docs/quickstarts/nextjs)
- Payment: [Stripe](https://docs.stripe.com/)
- Deployment: [Vercel](https://vercel.com/)
- Blog
  - [Next.jsとStripeではじめるシンプルなECサイト開発ワークショップ](https://zenn.dev/stripe/books/stripe-nextjs-use-shopping-cart)
