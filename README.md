# Next.js Stripe ECサイト

![デモ](docs/demo.gif)

**Clerk認証とStripe決済を統合したサブスクリプション対応のモダンなECサイト**

SaaS向けの機能を含む本格的なECプラットフォームです。

## セットアップ手順

### 1. Stripe Setup (決済と商品設定)

- [Stripeアカウントセットアップ](docs/stripe-01-setup.md)
- [商品とPriceの作成](docs/stripe-02-product-and-price.md)
- [Webhookの設定](docs/stripe-03-webhook.md)

### 2. Clerk Setup (認証・ユーザー管理)

- [Clerk認証セットアップ](docs/clerk.md)
- [Clerk Billing セットアップ](docs/clerk-billing-setup.md)

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

**Note**: 開発サーバーはTurbopackを使用して高速化されています。

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

- **`/pricing`**
  - サブスクリプションプランの表示
  - Clerkの料金テーブルコンポーネントを使用
  - 14日間の無料トライアル対応

- **`/account`**
  - ユーザープロフィール管理
  - サブスクリプション・請求設定
  - 認証が必要

- **`/monitoring`**
  - プレミアム機能: ビジネス分析ダッシュボード
  - 機能ベースのアクセス制御
  - アップグレードプロンプト表示

- **`/sign-in` / `/sign-up`**
  - Clerkによる認証ページ（モーダル表示）
  - Google OAuth対応

- **`/success`**
  - 決済完了ページ
  - Stripeからのリダイレクト先

- **`/subscription-success`**
  - サブスクリプション完了ページ

### API エンドポイント

- **`/api/products`**: 商品データ取得
- **`/api/checkout`**: チェックアウトセッション作成（認証必須）
- **`/api/create-subscription`**: サブスクリプション作成（認証必須）
- **`/api/webhooks`**: Stripe Webhook処理

### 核となる機能

#### 🔐 認証・ユーザー管理 (Clerk)

- **多様な認証方式**: Email/Password、Google OAuth
- **ユーザー管理**: プロフィール、アカウント設定
- **セッション管理**: 安全で持続的なログイン
- **組織管理**: チーム・組織対応（Organization機能）

#### 💳 決済・サブスクリプション (Stripe)

- **一回購入**: Stripe Checkoutによる安全な決済
- **サブスクリプション**: 定期課金プラン対応
- **請求管理**: Clerkの課金ポータル統合
- **Webhook処理**: リアルタイムでの決済状態更新

#### 🛡️ セキュリティ・認可

- **ルートガード**: 認証が必要なページの保護
- **機能ベース認可**: プレミアム機能へのアクセス制御
- **APIセキュリティ**: 認証必須エンドポイントの保護

## テスト用情報

### Stripeテストカード番号

- **成功**: 4242 4242 4242 4242
- **失敗**: 4000 0000 0000 0002
- **CVV**: 任意の3桁の数字
- **有効期限**: 未来の日付

## 本番環境構築

[本番環境セットアップガイド](docs/production-setup.md)を参照してください。

## 技術スタック

### フレームワーク・ライブラリ

- **Frontend**: [Next.js 15](https://nextjs.org/) (with Turbopack)
- **React**: v19.1.1
- **TypeScript**: 型安全な開発環境
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/) + [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

### 認証・決済

- **認証**: [Clerk](https://clerk.com/docs/quickstarts/nextjs) - 現代的なユーザー管理
- **決済**: [Stripe](https://docs.stripe.com/) - 安全で柔軟な決済処理

### 開発・品質管理

- **コード品質**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **開発体験**: Turbopack（高速開発サーバー）

## アーキテクチャの特徴

### 🚀 SaaS Ready

- サブスクリプションモデル対応
- 機能ベースアクセス制御
- 組織・チーム管理対応

### 🔧 開発者体験

- TypeScript完全対応
- 自動リント・フォーマット
- Hot Reload（Turbopack）

### 📈 スケーラビリティ

- **Clerk + Stripe**: 認証と決済の統合アーキテクチャ
- **無料枠**: Clerk 10,000 MAU、豊富な機能
- **詳細**: [技術スタック比較](docs/techstack.md)

## 参考資料

- Framework: [Next.js](https://nextjs.org/)
- Auth: [Clerk Documentation](https://clerk.com/docs/quickstarts/nextjs)
- UI: [ShadCN/UI](https://ui.shadcn.com/)
- Payment: [Stripe Documentation](https://docs.stripe.com/)
- Deployment: [Vercel](https://vercel.com/)
- Blog: [Next.jsとStripeではじめるシンプルなECサイト開発ワークショップ](https://zenn.dev/stripe/books/stripe-nextjs-use-shopping-cart)
