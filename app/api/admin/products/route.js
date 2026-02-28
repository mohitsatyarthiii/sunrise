import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'
    
    const supabase = await createServerSupabaseClient()
    
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
    
    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }
    
    // Apply category filter
    if (category && category !== 'all') {
      query = query.eq('category_id', category)
    }
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' })
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(data || [])
    
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}