import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createServerSupabaseClient } from '@/lib/supabase/server' // This is server-side

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

    // Store payment intent in Supabase for tracking (server-side)
    const supabase = createServerSupabaseClient()
    const { error } = await supabase
      .from('payments')
      .insert([{
        order_number: orderId,
        payment_intent_id: paymentIntent.id,
        amount: amount,
        currency: 'aed',
        status: 'pending',
        metadata: {
          items: items,
          shipping: shippingDetails
        }
      }])

    if (error) {
      console.error('Error storing payment:', error)
      // Don't throw - we still want to return the client secret
    }

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