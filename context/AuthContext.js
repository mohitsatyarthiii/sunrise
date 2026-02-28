'use client'

import { createContext, useContext, useEffect, useState } from 'react'
// ❌ Ye line hatao: import { createClient } from '@/lib/supabase/client'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

// ✅ Helper to notify auth changes
export const notifyAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'))
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  // ❌ Ye line hatao: const supabase = createClient()

  // ✅ Naya fetch user function
  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/user')
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      
      const data = await response.json()
      setUser(data.user)
      setProfile(data.profile)
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Naya signOut function
  const signOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      
      setUser(null)
      setProfile(null)
      
      // Redirect to home
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // ✅ Updated useEffect
  useEffect(() => {
    fetchUser()
    
    // Listen for auth changes
    window.addEventListener('auth-change', fetchUser)
    
    return () => {
      window.removeEventListener('auth-change', fetchUser)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}