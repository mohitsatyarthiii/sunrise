import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// PUT update category
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, slug, description, is_active } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('categories')
      .update({
        name,
        slug,
        description,
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
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
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE category
export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerClient()
    
    // Check if category has products
    const { data: products, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('category_id', id)
      .limit(1)
    
    if (checkError) {
      return NextResponse.json(
        { error: checkError.message },
        { status: 400 }
      )
    }
    
    if (products && products.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with existing products' },
        { status: 400 }
      )
    }
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}