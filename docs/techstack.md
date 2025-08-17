# Tech Stack

## 技術要素

- **Framework**: [Next.js](https://nextjs.org/)
- **Auth**:
  - [Clerk](https://clerk.com/): SaaS, free for 10,000 MAU
  - [Supabase Auth](https://supabase.com/docs/guides/auth): SaaS, free for 50,000 MAU
  - [Auth.js](https://authjs.dev/): Open source auth lib
- **DB**: [Supabase](https://supabase.com/docs/guides/database/overview): free for 500MB
- **Payment**: [Stripe](https://stripe.com/en-jp)

## 実装パターンと評価

### 評価基準

- Stripeで決済する
- Googleでログインする
- 将来的にはOrg-Membersの関係も必要
- なるべくシステムはシンプルにしたい
- SaaSで従量課金系は最初は避けたい、ある程度スケールしたら仕方ない
- ベンダーロックインに関するリスク（移行工数）

### 1. 推奨: Clerk + Stripe (DBなし)

**要件適合度: ⭐⭐⭐⭐⭐ 高**

| 項目               | 評価 | 詳細                                             |
| ------------------ | ---- | ------------------------------------------------ |
| Stripe決済         | ◎    | ネイティブ統合                                   |
| Googleログイン     | ◎    | 標準サポート                                     |
| Org-Members        | ◎    | Clerk Organizations機能で完全対応                |
| シンプルさ         | ◎    | 最もシンプル（2サービスのみ）                    |
| 初期コスト         | ○    | Clerk無料枠10,000 MAU                            |
| ベンダーロックイン | △    | Clerk依存度高、移行時は認証とOrg機能の再実装必要 |

**利点**:

- Organization機能が組み込み済みで、実装工数を大幅削減
- 初期段階ではDBなしでも十分（ユーザー、組織、決済情報は全てClerk/Stripeが管理）
- 商品・顧客・注文は全てStripe側で管理
- 管理コスト最小: DBインフラ不要

**制約**:

- カスタムデータ（ユーザー設定、アクティビティログ等）の保存が困難
- Stripe/Clerkのデータモデルに依存
- 複雑なクエリやレポート作成が困難

**参考記事**:

- [Per-user licensing with Stripe and Clerk Organizations](https://clerk.com/blog/per-user-licensing-with-stripe-and-clerk-organizations)

### 2. Clerk + Supabase DB

**要件適合度: ⭐⭐⭐ 中**

| 項目               | 評価 | 詳細                                     |
| ------------------ | ---- | ---------------------------------------- |
| Stripe決済         | ◎    | 問題なし                                 |
| Googleログイン     | ◎    | 標準サポート                             |
| Org-Members        | ◎    | Clerk Organizations + Supabaseで拡張可能 |
| シンプルさ         | △    | 3サービス、Webhook連携必要               |
| 初期コスト         | △    | 2サービス分の料金                        |
| ベンダーロックイン | △    | Clerk移行時の工数は同じ、DB部分は独立    |

**利点**:

- カスタムデータの永続化が可能
- 高機能認証: 多要素認証、デバイス管理、分析
- 優れたUX: 洗練されたUI/UXコンポーネント
- エンタープライズ対応: SAML、SCIM等の企業向け機能

**欠点**:

- Webhook設定、ID管理が複雑
- 2つのサービス料金
- 認証とDBが別サービスによるレイテンシ
- 連携コードの実装・メンテナンス工数

**参考記事**:

- [Build a task manager with Next.js, Supabase, and Clerk](https://clerk.com/blog/nextjs-supabase-clerk)
- [Clerk's Connect with Supabase](https://supabase.com/docs/guides/auth/third-party/clerk)

### 3. Supabase Auth + Supabase DB

**要件適合度: ⭐⭐ 低**

| 項目               | 評価 | 詳細                                     |
| ------------------ | ---- | ---------------------------------------- |
| Stripe決済         | ○    | 連携は可能だが追加実装必要               |
| Googleログイン     | ○    | サポートあり                             |
| Org-Members        | ×    | 自前実装が必要（招待、権限管理等）       |
| シンプルさ         | ○    | 2サービスだが、認証・Org機能の実装工数大 |
| 初期コスト         | ◎    | Supabase無料枠500MB                      |
| ベンダーロックイン | ○    | PostgreSQL互換、移行は比較的容易         |

**利点**:

- 統合性: 認証・DB・APIが一つのサービスで完結
- コスト効率: 単一サービスで済む
- RLS自動連携: auth.uid()で直接データアクセス制御
- パフォーマンス: 認証とDBが同一インフラ内

**欠点**:

- Organization機能の実装工数が大きい
- 認証UIをカスタム実装が必要
- エンタープライズ機能: 限定的

## 移行戦略

**Clerk + Stripeからの段階的拡張**:

1. 初期: Clerk + Stripeでスタート（最小構成）
2. 成長期: カスタムデータが必要になったらSupabaseを追加
3. 移行時: ユーザーデータはClerk APIでエクスポート可能
