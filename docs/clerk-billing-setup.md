# Clerk Billing Setup Guide

This guide explains how to set up subscription billing using Clerk Billing, eliminating the need for custom Stripe integration code.

## Overview

Clerk Billing provides a complete subscription management solution with:

- **Zero payment integration code** - No Stripe API calls needed
- **Pre-built UI components** - Ready-to-use pricing tables and billing portals
- **Automatic synchronization** - Subscription status synced with user data
- **Development gateway** - Shared test Stripe account for easy development

## Setup Steps

### 1. Enable Clerk Billing

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Configure > Billing**
3. Click **"Enable Billing"** button
4. Select **Development Gateway** for testing (no Stripe account needed)

### 2. Create Subscription Plans

1. In Clerk Dashboard, go to **Configure > Subscription Plans**
2. Choose the plan type:
   - **User Plans (B2C)** - For individual user subscriptions
   - **Organization Plans (B2B)** - For company/team subscriptions
3. Click **"Add User Plan"** or **"Add Organization Plan"** to create new subscription plans:

   **For B2C (User Plans):**

   **Example Plans:**
   - **Free Plan**
     - Name: `free`
     - Price: $0/month
     - Description: Always free
   - **Pro Plan**
     - Name: `pro`
     - Price: $20/month
     - Description: For professionals
     - Mark as: Active/Popular
   - **Max Plan**
     - Name: `max`
     - Price: $100/month
     - Description: Maximum features

4. For each plan, add **Features**:
   - Click **"Add Feature"** for each plan

   **Free Plan Features:**
   - No features included (basic access only)

   **Pro Plan Features:**
   - monitoring
   - free delivery

   **Max Plan Features:**
   - Chat Support
   - monitoring
   - free delivery

5. **Publish** all plans to make them available

### 3. Important Notes on Plan Types

- **B2C (User Plans)**:
  - Subscriptions tied to individual users
  - Billing appears in user's personal account settings
  - Use `<clerk-billing-portal />` in user account pages
- **B2B (Organization Plans)**:
  - Subscriptions tied to organizations/teams
  - Billing appears in organization settings
  - Requires organization context for subscription management

For this guide, we're focusing on **B2C (User Plans)** for individual subscriptions.

### 4. Implement Pricing Page (User Plans - B2C)

The pricing page for **B2C User Plans** uses the `<PricingTable />` component:

```typescript
// pages/pricing.tsx
import { PricingTable } from '@clerk/nextjs';
import { Container } from '@/components/ui/container';

export default function PricingPage() {
  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your team.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <PricingTable />
      </div>
    </Container>
  );
}
```

### 5. Add User Account Billing (User Plans - B2C)

Create an account page with **B2C billing management** for individual users:

```typescript
// pages/account.tsx
import { useUser } from '@clerk/nextjs';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountPage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Billing & Subscription</CardTitle>
            <CardDescription>Manage your subscription and billing information</CardDescription>
          </CardHeader>
          <CardContent>
            <clerk-billing-portal />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
```

### 6. Control Access with Features, Plans, and Permissions (User Plans - B2C)

Implement access control based on user subscriptions and features:

#### Server-Side Access Control

```typescript
// app/premium-content/page.tsx (App Router)
import { auth } from '@clerk/nextjs/server'

export default async function PremiumContentPage() {
  const { has } = await auth()

  // Check if user has specific plan
  const hasProPlan = has({ plan: 'pro' })
  const hasMaxPlan = has({ plan: 'max' })

  // Check if user has specific feature
  const hasChatSupport = has({ feature: 'chat_support' })

  if (!hasProPlan && !hasMaxPlan) {
    return (
      <div>
        <h1>Premium Content</h1>
        <p>This content is only available for Pro and Max subscribers.</p>
        <a href="/pricing">Upgrade to Pro</a>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome to Premium Content!</h1>
      {hasChatSupport && <p>Need help? Access our chat support!</p>}
    </div>
  )
}
```

#### Client-Side Access Control

```typescript
// components/PremiumFeature.tsx
import { Protect } from '@clerk/nextjs'

export function PremiumFeature() {
  return (
    <>
      {/* Only visible to users with Pro or Max plan */}
      <Protect has={{ plan: ['pro', 'max'] }}>
        <div>
          <h2>Premium Analytics Dashboard</h2>
          {/* Premium content here */}
        </div>
      </Protect>

      {/* Show upgrade prompt for free users */}
      <Protect has={{ plan: 'free' }}>
        <div>
          <p>Upgrade to Pro to access analytics</p>
          <a href="/pricing">View Plans</a>
        </div>
      </Protect>
    </>
  )
}
```

#### API Route Protection

```typescript
// pages/api/premium-data.ts (Pages Router)
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { has } = getAuth(req);

  // Check if user has premium access
  const hasPremiumAccess = has({ plan: ["pro", "max"] });

  if (!hasPremiumAccess) {
    return res.status(403).json({ error: "Premium subscription required" });
  }

  // Return premium data
  return res.status(200).json({ data: "Premium content here" });
}
```

## File Structure

With Clerk Billing, you need minimal files:

- `/pages/pricing.tsx` - Pricing page with `<PricingTable />` component
- `/pages/account.tsx` - User account with billing management
- No API routes needed (Clerk handles everything)
- No webhook setup required for basic functionality

## Testing in Development

### Development Gateway

Clerk automatically provides a shared test Stripe account:

1. **No Stripe setup required** - Development gateway handles payments
2. **Test cards automatically work** - Use `4242 4242 4242 4242`
3. **Immediate testing** - Click "Subscribe to a plan" to test flow

### Test Scenarios

1. **Subscribe to a plan**:
   - Click "Subscribe to a plan" button in user billing section
   - Use test card: `4242 4242 4242 4242`
   - CVV: Any 3 digits
   - Expiry: Any future date

2. **View subscription status**:
   - Check user account billing section
   - Subscription should show as active

3. **Access control**:

   ```typescript
   import { has } from "@clerk/nextjs";

   // Check if user has specific plan
   const hasProfessionalPlan = has({ plan: "professional" });

   // Check if user has specific feature
   const hasAdvancedFeatures = has({ feature: "advanced_features" });
   ```

## Debugging

### Console Logging

Add error handling to components:

```typescript
<PricingTable
  onError={(error) => console.error('PricingTable error:', error)}
  onLoad={() => console.log('PricingTable loaded successfully')}
/>
```

### Common Issues

1. **Plans not showing**: Check if plans are published in Clerk Dashboard
2. **Billing section empty**: Ensure billing is enabled and B2C is configured
3. **Subscription button not working**: Check browser console for errors

## Production Deployment

### Connect Stripe Account

1. In Clerk Dashboard, go to **Configure > Billing**
2. Switch from **Development Gateway** to **Stripe Account**
3. Connect your production Stripe account
4. Verify webhook endpoints are configured

### Environment Variables

No environment variables needed for basic Clerk Billing setup.

## Benefits Over Custom Stripe Integration

- ✅ **Zero code** - No API routes, webhooks, or payment handling
- ✅ **Security** - PCI compliance handled by Clerk/Stripe
- ✅ **Updates** - UI components automatically updated
- ✅ **Testing** - Development gateway for instant testing
- ✅ **Maintenance** - No custom payment logic to maintain

## Access Control

Use Clerk's built-in methods for feature gating:

```typescript
import { Protect, has } from '@clerk/nextjs';

// Component-level protection
<Protect has={{ plan: 'professional' }}>
  <PremiumFeature />
</Protect>

// Programmatic checking
const canAccessFeature = has({ feature: 'advanced_analytics' });
```

## Next Steps

1. Create plans in Clerk Dashboard
2. Test subscription flow with development gateway
3. Implement access control based on subscription status
4. Connect production Stripe account when ready to launch
