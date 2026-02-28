import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request) {
  try {
    const { items, orderId, shippingDetails } = await request.json()

    // Calculate total amount
    const amount = items.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)

    // Create payment intent with order metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents/fils
      currency: 'aed',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderId,
        customerEmail: shippingDetails.email,
        customerName: shippingDetails.fullName,
        itemsCount: items.length.toString(),
        totalAmount: amount.toString(),
      },
      receipt_email: shippingDetails.email,
    })

    // Store payment intent in Supabase for tracking
    const supabase = createClient()
    await supabase
      .from('payments')
      .insert([{
        order_id: orderId,
        payment_intent_id: paymentIntent.id,
        amount: amount,
        currency: 'aed',
        status: 'pending',
        metadata: {
          items: items,
          shipping: shippingDetails
        }
      }])

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    )
  }
}