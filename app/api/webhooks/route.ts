import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
const stripe = new Stripe(process.env.STRIPE_API_KEY!)

export async function POST(request: NextRequest) {
    const sig = request.headers.get('stripe-signature')
    const body = await request.text()

    let event: Stripe.Event;
    try {
        if (!sig) throw new Error("No signature provided")
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (e) {
        const err = e instanceof Error ? e : new Error("Bad Request")
        console.log(err)
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` }, 
            { status: 400 }
        )
    }

    console.log(event)

    return NextResponse.json({ received: true })
}