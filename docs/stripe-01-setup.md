# Stripe Account Setup

## 1. Account Creation

1. Create an account at [Stripe](https://stripe.com)
2. Log in to the dashboard

## 2. Obtain API Keys

### Publishable Key

1. Select "Developers" → "API keys" from the left menu
2. Copy the "Publishable key"

### Restricted Key

1. Click "Create restricted key"
2. Grant only the following permissions:
   - Products: Read
   - Prices: Read
   - Checkout Sessions: Write
3. Copy the created Restricted Key

## 3. Verify Test Mode

Always use test mode during development. Ensure test mode is ON in the upper right corner of the dashboard.
