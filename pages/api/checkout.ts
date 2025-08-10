import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY!)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { priceId } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/`,
    })

    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
