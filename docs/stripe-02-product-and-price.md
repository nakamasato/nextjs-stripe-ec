# Create Stripe Products and Prices

## 1. Create Products

1. Select "Product catalog" → "Products" in Stripe dashboard
2. Click "Add product"
3. Enter the following information:
   - **Product name**: Display name for the product
   - **Description**: Detailed product description
   - **Image**: Upload product image

## 2. Configure Pricing

1. Set pricing information on the product creation screen:
   - **Pricing model**: Select "Standard pricing"
   - **Price**: Enter the amount
   - **Currency**: Select JPY (Japanese Yen)
   - **Billing period**: Select "One time"

2. Save the product

## 3. Obtain Product ID and Price ID

After saving, note the following IDs:

- **Product ID**: String starting with `prod_`
- **Price ID**: String starting with `price_`

These IDs will be used in `pages/api/products.ts`.

## 4. Create Multiple Products

Repeat the above steps for as many products as you want to display on your EC site.
