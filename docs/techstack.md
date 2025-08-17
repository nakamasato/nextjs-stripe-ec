# Tech Stack

- Nextjs: Web framework
- Auth
  - [Clerk](https://clerk.com/): SaaS, free for 50,000 MAU
  - [Supbase Auth](https://supabase.com/docs/guides/auth): SaaS, free for 50,00 MAU
  - [Auth.js](https://authjs.dev/): Open source auth lib
- DB
  - [Supabase](https://supabase.com/docs/guides/database/overview): free for 50,000 MAU
- Payment
  - [Stripe](https://stripe.com/en-jp)

Patterns

- Clerk (Auth) + Supabase (DB)
  - [Build a task manager with Next.js, Supabase, and Clerk](https://clerk.com/blog/nextjs-supabase-clerk)
  - [Clerk's Connect with Supabase](https://supabase.com/docs/guides/auth/third-party/clerk)
- Supabase Auth + Supabase Database

Supabase Auth + DB vs Clerk + Supabase DB 比較

Supabase Auth + Supabase DB

✅ Pros

- 統合性: 認証・DB・APIが一つのサービスで完結
- コスト効率: 単一サービスで済む
- RLS自動連携: auth.uid()で直接データアクセス制御
- 開発効率: Webhook設定不要、ID管理がシンプル
- パフォーマンス: 認証とDBが同一インフラ内
- 型安全性: DB型定義と認証が統合

❌ Cons

- 認証機能制限: Clerkほど高機能ではない
- UI/UX: 認証UIをカスタム実装が必要
- エンタープライズ機能: 限定的
- ベンダーロックイン: Supabase依存度が高い

Clerk + Supabase DB

✅ Pros

- 高機能認証: 多要素認証、デバイス管理、分析
- 優れたUX: 洗練されたUI/UXコンポーネント
- エンタープライズ対応: SAML、SCIM等の企業向け機能
- 専門性: 認証に特化したサービス
- 柔軟性: DB選択の自由度

❌ Cons

- 複雑性: Webhook設定、ID管理が複雑
- コスト: 2つのサービス料金
- レイテンシ: 認証とDBが別サービス
- 統合工数: 連携コードの実装・メンテナンス
- 障害リスク: 複数サービス間の依存関係
