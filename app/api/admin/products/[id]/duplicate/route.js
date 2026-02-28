import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request, { params }) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    // Get original product
    const { data: original, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (fetchError) {
      return NextResponse.json(
        { error: fetchError.message },
        { status: 400 }
      )
    }
    
    // Create duplicate
    const { name, slug, description, short_description, category_id, images, sample_options, specifications, origin, is_featured } = original
    
    const newSlug = `${slug}-copy-${Date.now()}`
    const newName = `${name} (Copy)`
    
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: newName,
        slug: newSlug,
        description,
        short_description,
        category_id,
        images: images || [],
        sample_options: sample_options || [],
        specifications: specifications || {},
        origin,
        is_featured: false,
        is_active: false, // Set inactive by default for review
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Duplicate error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}