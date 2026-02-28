import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET single product
export async function GET(request, { params }) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PUT update product
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }
    
    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      )
    }
    
    if (!body.slug?.trim()) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      )
    }
    
    // Validate sample options
    const validSamples = body.sample_options?.filter(opt => opt.price > 0)
    if (!validSamples?.length) {
      return NextResponse.json(
        { error: 'At least one sample option with price > 0 is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerClient()
    
    // Check if slug is unique (excluding current product)
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', body.slug)
      .neq('id', id)
      .maybeSingle()
    
    if (existing) {
      return NextResponse.json(
        { error: 'Product slug already exists' },
        { status: 400 }
      )
    }
    
    const productData = {
      name: body.name.trim(),
      slug: body.slug.trim(),
      description: body.description?.trim() || null,
      short_description: body.short_description?.trim() || null,
      category_id: body.category_id || null,
      origin: body.origin?.trim() || null,
      images: body.images?.filter(img => img?.trim()) || [],
      sample_options: validSamples,
      specifications: body.specifications || {},
      is_featured: body.is_featured || false,
      is_active: body.is_active !== false,
      meta_title: body.meta_title?.trim() || null,
      meta_description: body.meta_description?.trim() || null,
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(productData)
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
    console.error('Product update error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerClient()
    
    // Check if product has orders
    const { data: orders, error: checkError } = await supabase
      .from('orders')
      .select('id')
      .contains('items', [{ productId: id }])
      .limit(1)
    
    if (checkError) {
      return NextResponse.json(
        { error: checkError.message },
        { status: 400 }
      )
    }
    
    if (orders?.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product with existing orders' },
        { status: 400 }
      )
    }
    
    // Check if product has enquiries
    const { data: enquiries, error: enquiriesCheck } = await supabase
      .from('enquiries')
      .select('id')
      .eq('product_id', id)
      .limit(1)
    
    if (enquiriesCheck) {
      return NextResponse.json(
        { error: enquiriesCheck.message },
        { status: 400 }
      )
    }
    
    if (enquiries?.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product with existing enquiries' },
        { status: 400 }
      )
    }
    
    const { error } = await supabase
      .from('products')
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
    console.error('Product delete error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}