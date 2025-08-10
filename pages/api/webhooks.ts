import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
const stripe = new Stripe(process.env.STRIPE_API_KEY!)

export const config = {
    api: {
        bodyParser: false
    }
}
export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const sig = request.headers['stripe-signature'] as string;
    const buf = await buffer(request)

    let event: Stripe.Event;
    try {
        if (!sig) throw new Error("No signature provided")
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (e) {
        const err = e instanceof Error ? e : new Error("Bad Request")
        console.log(err)
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    console.log(event)

    return response.status(200).end()
}
