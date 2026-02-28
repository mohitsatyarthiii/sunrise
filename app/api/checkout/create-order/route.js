import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, orderNumber, items, total, shipping, notes } = body
    
    if (!userId || !orderNumber || !items || !total || !shipping) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_number: orderNumber,
        user_id: userId,
        status: 'pending',
        total_amount: total,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_country: shipping.country,
        shipping_phone: shipping.phone,
        items: items,
        payment_status: 'pending',
        notes: notes || ''
      }])
      .select()
      .single()
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      order: data 
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}