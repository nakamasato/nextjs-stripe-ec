# Production Environment Setup

## 1. Environment Variables Configuration

The following environment variables need to be set in production:

### Stripe Production Keys

1. Switch to production mode in Stripe dashboard
2. Obtain production API keys
3. Set production webhook signature secret

### Clerk Production Keys

1. Create production application in Clerk dashboard
2. Obtain production API keys
3. Configure production domain

### API URL Configuration

`NEXT_PUBLIC_API_URL` is a **required** environment variable in production:

- **Purpose**: URL for API calls during server-side rendering
- **Value**: Your Vercel domain (e.g., `https://your-project.vercel.app`)
- **Note**: Without this setting, product listing will not display and cause errors

## 2. Deploy to Vercel (Recommended)

### Environment Variables Setup

```
STRIPE_API_KEY=rk_live_your_production_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY=pk_live_your_production_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_key
```

### Deployment Steps

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

## 3. Security Checklist

- [ ] All API keys are changed to production versions
- [ ] HTTPS/SSL is enabled
- [ ] Clerk production domain is correctly configured
- [ ] Stripe webhook URL is set to production URL
- [ ] Test mode keys are not included
- [ ] **NEXT_PUBLIC_API_URL** is set to correct Vercel domain

## 4. Stripe Webhook Setup (Production)

1. Select "Developers" → "Webhooks" in Stripe dashboard
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.com/api/webhooks`
4. Select the following events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Set signature secret in environment variables

## 5. Functionality Verification

1. Verify user registration and login work in production
2. Verify product listing displays correctly
3. Verify test payments are processed correctly
4. Verify webhooks function properly
