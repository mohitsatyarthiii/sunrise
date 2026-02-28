import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { items, orderId, shippingDetails } = body
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents/paise
      currency: 'aed',
      metadata: {
        orderId,
        userId: shippingDetails.userId || 'guest'
      },
      shipping: {
        name: shippingDetails.fullName,
        phone: shippingDetails.phone,
        address: {
          line1: shippingDetails.address,
          city: shippingDetails.city,
          country: shippingDetails.country,
        }
      }
    })
    
    // Store payment intent in Supabase
    const supabase = await createServerSupabaseClient()
    
    await supabase
      .from('payments')
      .insert([{
        order_id: orderId,
        payment_intent_id: paymentIntent.id,
        amount: total,
        status: 'pending'
      }])
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
    
  } catch (error) {
    console.error('Payment intent error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    )
  }
}