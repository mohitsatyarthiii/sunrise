import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// PUT update user (admin status)
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { is_admin } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    // Check if user exists
    const { data: existing, error: checkError } = await supabase
      .from('profiles')
      .select('id, is_admin')
      .eq('id', id)
      .single()
    
    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: checkError.message },
        { status: 400 }
      )
    }
    
    // Prevent removing last admin (optional safety)
    if (existing.is_admin && is_admin === false) {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_admin', true)
      
      if (count === 1) {
        return NextResponse.json(
          { error: 'Cannot remove the last admin user' },
          { status: 400 }
        )
      }
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        is_admin,
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
    console.error('User update error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}