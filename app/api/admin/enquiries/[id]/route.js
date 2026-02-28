import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// PUT update enquiry
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, ...otherData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Enquiry ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    const updateData = {
      ...otherData,
      updated_at: new Date().toISOString()
    }
    
    // Only add status if provided
    if (status) {
      updateData.status = status
    }
    
    const { data, error } = await supabase
      .from('enquiries')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        products:product_id (
          name,
          slug
        )
      `)
      .single()
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Enquiry update error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE enquiry
export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Enquiry ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerClient()
    
    const { error } = await supabase
      .from('enquiries')
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
    console.error('Enquiry delete error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}