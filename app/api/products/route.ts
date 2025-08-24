import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
    const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
        apiVersion: '2025-07-30.basil',
        maxNetworkRetries: 3
    })
    
    const products = await stripe.products.list()
    if (!products.data || products.data.length < 1) {
        return NextResponse.json([])
    }
    
    const response = await Promise.all(products.data.map(async (product) => {
        const prices = await stripe.prices.list({
            product: product.id,
        })
        return {
            id: product.id,
            description: product.description,
            name: product.name,
            images: product.images,
            unit_label: product.unit_label,
            prices: prices.data.map(price => {
                return {
                    id: price.id,
                    currency: price.currency,
                    transform_quantity: price.transform_quantity,
                    unit_amount: price.unit_amount,
                }
            })
        }
    }))
    
    return NextResponse.json(response)
}