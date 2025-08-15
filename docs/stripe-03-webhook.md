# Stripe Webhookの設定（開発環境）

開発環境では、Stripe CLIを使用してWebhookをテストします。

## 1. Stripe CLIのインストール

### macOS

```bash
brew install stripe/stripe-cli/stripe
```

### Windows

[Stripe CLI ダウンロードページ](https://github.com/stripe/stripe-cli/releases)から最新版をダウンロード

### その他のOS

[Stripe CLI公式ドキュメント](https://stripe.com/docs/stripe-cli)を参照

## 2. Stripe CLIへのログイン

```bash
stripe login
```

ブラウザが開くので、Stripeアカウントでログインを承認してください。

## 3. Webhookイベントの転送

開発サーバーが起動している状態で、以下のコマンドを実行:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks
```

## 4. 署名シークレットの取得

コマンド実行後に表示される署名シークレット（`whsec_`で始まる文字列）を`.env.local`ファイルに設定してください。

## 5. 動作確認

決済を行うと、ターミナルにWebhookイベントのログが表示されます。これで決済完了の処理が正しく動作していることを確認できます。

## 注意事項

- Stripe CLIは開発サーバーが起動している間、実行したままにしてください
- 開発を再開するたびに`stripe listen`コマンドを実行する必要があります
