import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    if (!session) {
      return NextResponse.json({ user: null })
    }
    
    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin, full_name, phone, company_name')
      .eq('id', session.user.id)
      .single()
    
    return NextResponse.json({ 
      user: {
        id: session.user.id,
        email: session.user.email,
        ...profile
      }
    })
    
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}