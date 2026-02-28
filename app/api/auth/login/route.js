import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    const supabase = await createServerSupabaseClient()
    
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    })
    
    if (error) {
      console.error('Login error:', error)
      
      if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
    
    if (!data?.user) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      )
    }
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin, full_name')
      .eq('id', data.user.id)
      .single()
    
    if (profileError) {
      console.error('Profile fetch error:', profileError)
      // Don't fail login if profile fetch fails
    }
    
    return NextResponse.json({ 
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        ...profile
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}