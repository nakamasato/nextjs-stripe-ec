# Tech Stack

## Technical Elements

- **Framework**: [Next.js](https://nextjs.org/)
- **Auth**:
  - [Clerk](https://clerk.com/): SaaS, free for 10,000 MAU
  - [Supabase Auth](https://supabase.com/docs/guides/auth): SaaS, free for 50,000 MAU
  - [Auth.js](https://authjs.dev/): Open source auth lib
- **DB**:
  - [Supabase](https://supabase.com/docs/guides/database/overview): free for 500MB
  - [Neon](https://neon.tech/): free for 0.5GB, $19/month for Pro
- **Payment**: [Stripe](https://stripe.com/en-jp)

## Implementation Patterns and Evaluation

### Evaluation Criteria

- Payment processing with Stripe
- Google login integration
- Future need for Org-Member relationships
- Keep the system as simple as possible
- Avoid usage-based pricing initially, consider it after scaling
- Risk of vendor lock-in (migration costs)
- Data query flexibility (search/analytics features)
- Performance with large datasets (1000+ users)

### 1. Recommended: Clerk + Stripe (No DB)

**Requirement Fit: ⭐⭐⭐⭐⭐ High**

| Item           | Rating | Details                                                                                 |
| -------------- | ------ | --------------------------------------------------------------------------------------- |
| Stripe Payment | ◎      | Native integration                                                                      |
| Google Login   | ◎      | Standard support                                                                        |
| Org-Members    | ◎      | Full support with Clerk Organizations feature                                           |
| Simplicity     | ◎      | Most simple (only 2 services)                                                           |
| Initial Cost   | ○      | Clerk free tier 10,000 MAU                                                              |
| Vendor Lock-in | △      | High Clerk dependency, requires auth and Org feature re-implementation during migration |

**Benefits**:

- Organization features built-in, significantly reducing implementation costs
- Initially sufficient without DB (user, organization, payment information all managed by Clerk/Stripe)
- Products, customers, orders all managed by Stripe
- Minimal management cost: No DB infrastructure needed
- **Dynamic authentication option management**: Add/remove authentication methods (email/password, OAuth, etc.) from dashboard without code changes (Supabase Auth requires implementation for new authentication methods)

**Constraints**:

- Difficult to store custom data (user settings, activity logs, etc.)
- Dependent on Stripe/Clerk data models
- Difficult to create complex queries or reports

**Reference Articles**:

- [Per-user licensing with Stripe and Clerk Organizations](https://clerk.com/blog/per-user-licensing-with-stripe-and-clerk-organizations)

### 2. Clerk + Supabase DB

**Requirement Fit: ⭐⭐⭐ Medium**

| Item           | Rating | Details                                                 |
| -------------- | ------ | ------------------------------------------------------- |
| Stripe Payment | ◎      | No issues                                               |
| Google Login   | ◎      | Standard support                                        |
| Org-Members    | ◎      | Extensible with Clerk Organizations + Supabase          |
| Simplicity     | △      | 3 services, webhook integration needed                  |
| Initial Cost   | △      | Cost for 2 services                                     |
| Vendor Lock-in | △      | Same migration effort for Clerk, DB part is independent |

**Benefits**:

- Custom data persistence possible
- Advanced authentication: Multi-factor authentication, device management, analytics
- Excellent UX: Polished UI/UX components
- Enterprise support: SAML, SCIM, and other enterprise features

**Drawbacks**:

- Complex webhook setup and ID management
- Cost for two services
- Latency due to separate authentication and DB services
- Implementation and maintenance effort for integration code

**Reference Articles**:

- [Build a task manager with Next.js, Supabase, and Clerk](https://clerk.com/blog/nextjs-supabase-clerk)
- [Clerk's Connect with Supabase](https://supabase.com/docs/guides/auth/third-party/clerk)

### 3. Clerk + Neon DB

**Requirement Fit: ⭐⭐⭐ Medium**

| Item           | Rating | Details                                                 |
| -------------- | ------ | ------------------------------------------------------- |
| Stripe Payment | ◎      | No issues                                               |
| Google Login   | ◎      | Standard support                                        |
| Org-Members    | ◎      | Extensible with Clerk Organizations + Neon              |
| Simplicity     | △      | 3 services, webhook integration needed                  |
| Initial Cost   | △      | Cost for 2 services                                     |
| Vendor Lock-in | △      | Same migration effort for Clerk, DB part is independent |

**Benefits**:

- PostgreSQL compatible with high performance
- Higher availability and scalability than Supabase
- Custom data persistence possible
- Excellent branching features (development/production environment separation)

**Drawbacks**:

- Complex webhook setup and ID management
- Cost for two services
- No integrated authentication features like Supabase

### 4. Stripe Metadata Integration (No DB)

**Requirement Fit: ⭐⭐⭐⭐ High (for small scale)**

| Item           | Rating | Details                                            |
| -------------- | ------ | -------------------------------------------------- |
| Stripe Payment | ◎      | Native integration                                 |
| Google Login   | ◎      | Standard support                                   |
| Org-Members    | ◎      | Full support with Clerk Organizations feature      |
| Simplicity     | ◎      | Most simple (no DB needed)                         |
| Initial Cost   | ○      | Clerk free tier 10,000 MAU                         |
| Vendor Lock-in | △      | High Stripe dependency, limited search performance |

**Benefits**:

- No database setup or management needed
- Minimal implementation for integration
- Stripe automatically manages data
- Minimal operational cost

**Drawbacks**:

- Metadata size limitations (50 keys, 500 characters each)
- Difficult complex search/queries
- Search performance degradation with large user base
- Data access dependent on Stripe API

**Implementation Example**:

```typescript
// When creating Stripe customer
const customer = await stripe.customers.create({
  email: user.primaryEmailAddress?.emailAddress,
  metadata: {
    clerk_user_id: user.id,
  },
});
```

### 5. Supabase Auth + Supabase DB

**Requirement Fit: ⭐⭐ Low**

| Item           | Rating | Details                                                                   |
| -------------- | ------ | ------------------------------------------------------------------------- |
| Stripe Payment | ○      | Integration possible but requires additional implementation               |
| Google Login   | ○      | Supported                                                                 |
| Org-Members    | ×      | Requires custom implementation (invitations, permission management, etc.) |
| Simplicity     | ○      | 2 services but large implementation effort for auth/Org features          |
| Initial Cost   | ◎      | Supabase free tier 500MB                                                  |
| Vendor Lock-in | ○      | PostgreSQL compatible, relatively easy migration                          |

**Benefits**:

- Integration: Authentication, DB, and API completed within one service
- Cost efficiency: Single service suffices
- Automatic RLS integration: Direct data access control with auth.uid()
- Performance: Authentication and DB within same infrastructure

**Drawbacks**:

- Large implementation effort for Organization features
- Custom authentication UI implementation needed
- Enterprise features: Limited

## Migration Strategy

**Gradual expansion from Clerk + Stripe**:

1. Initial: Start with Clerk + Stripe (minimal configuration)
2. Growth: Add Supabase when custom data becomes necessary
3. Migration: User data can be exported via Clerk API

## Pricing

### Clerk Organization Limitations

**Free Plan**:

- Development: Up to 50 MAOs (Monthly Active Organizations), max 5 members per MAO
- Production: Up to 100 MAOs, max 5 members per MAO

**Pro Plan** ($25 USD/month):

- Development: Unlimited MAOs, unlimited members
- Production: First 100 MAOs free, $1.00/month for 101st and beyond, unlimited members

### Clerk Plan Comparison

| Plan | Price  | MAU Limit      | Organization                | Notes                       |
| ---- | ------ | -------------- | --------------------------- | --------------------------- |
| Free | $0     | 10,000 MAU     | 100 MAOs (5 members/org)    | For personal/small projects |
| Pro  | $25/mo | 10,000 MAU inc | 100 MAOs free, $1/MAO after | For B2B SaaS                |

### Pricing Calculation Example

**B2B SaaS case** (Pro Plan):

- Base fee: $25/month
- For 200 organizations: $25 + (200-100) × $1 = $125/month
- No user limit (up to 10,000 MAU included in base fee)
