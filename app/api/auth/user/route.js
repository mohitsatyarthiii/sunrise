// ✅ Sahi import - exported name use karo
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // ✅ Sahi function call
    const supabase = await createServerSupabaseClient()
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      return NextResponse.json(
        { error: sessionError.message },
        { status: 400 }
      )
    }
    
    if (!session) {
      return NextResponse.json({ user: null, profile: null })
    }
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Profile fetch error:', profileError)
    }
    
    return NextResponse.json({ 
      user: session.user,
      profile: profile || null
    })
    
  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}