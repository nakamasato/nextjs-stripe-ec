# Clerk Authentication Setup

## 1. Create Clerk Account

1. Create an account at [Clerk](https://clerk.com)
2. Create a new application
   - Enter application name
   - Select authentication methods (Email, Google, others)

## 2. Obtain API Keys

1. Select "API Keys" from the dashboard
2. Copy the following keys:
   - **Publishable Key**: String starting with `pk_test_`
   - **Secret Key**: String starting with `sk_test_`

## 3. Enable Google Authentication

1. Select "Social Connections" in the dashboard
2. Enable "Google"
3. Google OAuth Configuration:
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 Client ID
   - Add the following to Authorized redirect URIs:
     ```
     https://YOUR_CLERK_DOMAIN.accounts.dev/v1/oauth_callback
     ```
   - Configure Client ID and Client Secret in Clerk

For details, please refer to the [Official Clerk Guide](https://clerk.com/docs/authentication/social-connections/google).
