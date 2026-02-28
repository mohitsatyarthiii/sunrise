import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  const supabase = createClient()

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentIntentSucceeded(event.data.object, supabase)
      break

    case 'payment_intent.payment_failed':
      await handlePaymentIntentFailed(event.data.object, supabase)
      break

    case 'payment_intent.created':
      console.log('Payment intent created:', event.data.object.id)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handlePaymentIntentSucceeded(paymentIntent, supabase) {
  try {
    const { orderId } = paymentIntent.metadata

    // Update payment status in database
    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        status: 'succeeded',
        stripe_payment_intent_id: paymentIntent.id,
        updated_at: new Date()
      })
      .eq('payment_intent_id', paymentIntent.id)

    if (paymentError) {
      console.error('Error updating payment:', paymentError)
    }

    // Update order status
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        updated_at: new Date()
      })
      .eq('order_number', orderId)

    if (orderError) {
      console.error('Error updating order:', orderError)
    }

    console.log(`Payment succeeded for order: ${orderId}`)

    // You can also send email notification here
    // await sendOrderConfirmationEmail(orderId)

  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentIntentFailed(paymentIntent, supabase) {
  try {
    // Update payment status
    const { error } = await supabase
      .from('payments')
      .update({
        status: 'failed',
        updated_at: new Date()
      })
      .eq('payment_intent_id', paymentIntent.id)

    if (error) {
      console.error('Error updating failed payment:', error)
    }

    console.log(`Payment failed for intent: ${paymentIntent.id}`)
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}