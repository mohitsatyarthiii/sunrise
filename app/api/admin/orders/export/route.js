import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const status = searchParams.get('status')
    
    const supabase = await createServerSupabaseClient()
    
    let query = supabase
      .from('orders')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email,
          phone,
          address,
          city,
          country
        )
      `)
      .order('created_at', { ascending: false })
    
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    if (format === 'csv') {
      // Convert to CSV
      const csv = convertToCSV(data)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=orders.csv'
        }
      })
    }
    
    return NextResponse.json(data || [])
    
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

function convertToCSV(orders) {
  const headers = ['Order Number', 'Customer', 'Email', 'Total', 'Status', 'Payment', 'Date']
  const rows = orders.map(order => [
    order.order_number,
    order.profiles?.full_name || '',
    order.profiles?.email || '',
    order.total_amount,
    order.status,
    order.payment_status,
    new Date(order.created_at).toLocaleDateString()
  ])
  
  return [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')
}