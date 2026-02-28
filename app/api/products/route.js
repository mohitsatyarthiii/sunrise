import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'featured'
    
    const supabase = await createServerSupabaseClient()
    
    let query = supabase
      .from('products')
      .select(`
        *,
        categories!inner (
          id,
          name,
          slug
        )
      `)
      .eq('is_active', true)
    
    // Category filter
    if (category && category !== 'All') {
      // Pehle category ID find karo
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single()
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id)
      }
    }
    
    // Search filter
    if (search && search.trim()) {
      const searchTerm = search.trim()
      query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    }
    
    // Sorting
    if (sortBy === 'az') {
      query = query.order('name', { ascending: true })
    } else if (sortBy === 'za') {
      query = query.order('name', { ascending: false })
    } else {
      query = query
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
    }
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(data || [])
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}