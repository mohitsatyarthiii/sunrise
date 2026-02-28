import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { role } = body
    
    if (!role || !['admin', 'user'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    // Demo credentials (you should create these users in your DB)
    const email = role === 'admin' ? 'admin@exportecom.com' : 'user@exportecom.com'
    const password = 'demo123456'
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    
    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin, full_name')
      .eq('id', data.user.id)
      .single()
    
    return NextResponse.json({ 
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        ...profile
      }
    })
    
  } catch (error) {
    console.error('Demo login error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}