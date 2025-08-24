# Stripe Webhook Configuration (Development Environment)

In development environment, we use Stripe CLI to test webhooks.

## 1. Install Stripe CLI

### macOS

```bash
brew install stripe/stripe-cli/stripe
```

### Windows

Download the latest version from [Stripe CLI download page](https://github.com/stripe/stripe-cli/releases)

### Other OS

Refer to [Stripe CLI official documentation](https://stripe.com/docs/stripe-cli)

## 2. Login to Stripe CLI

```bash
stripe login
```

A browser will open. Please authorize login with your Stripe account.

## 3. Forward Webhook Events

With the development server running, execute the following command:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks
```

## 4. Obtain Signature Secret

Set the signature secret (string starting with `whsec_`) displayed after running the command in your `.env.local` file.

## 5. Verify Functionality

When you make a payment, webhook event logs will be displayed in the terminal. This confirms that payment completion processing is working correctly.

## Notes

- Keep Stripe CLI running while the development server is active
- You need to run the `stripe listen` command each time you resume development
