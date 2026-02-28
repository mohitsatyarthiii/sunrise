'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Toaster } from '@/components/ui/sonner'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    const checkAdmin = async () => {
      try {
        // Don't check on login page
        if (pathname === '/admin/login') {
          setLoading(false)
          return
        }

        // Get session first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          router.push('/admin/login')
          return
        }

        if (!session) {
          // No session, redirect to login
          router.push('/admin/login')
          return
        }

        // Now get user from session
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          console.error('User error:', userError)
          router.push('/admin/login')
          return
        }

        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Profile error:', profileError)
          router.push('/admin/login')
          return
        }

        if (!profile?.is_admin) {
          // Not an admin, sign out and redirect
          await supabase.auth.signOut()
          router.push('/admin/login')
          return
        }

        if (mounted) {
          setIsAdmin(true)
          setLoading(false)
        }
        
      } catch (error) {
        console.error('Error checking admin:', error)
        if (mounted) {
          router.push('/admin/login')
        }
      } finally {
        if (mounted && pathname !== '/admin/login') {
          setLoading(false)
        }
      }
    }

    checkAdmin()

    return () => {
      mounted = false
    }
  }, [pathname, router])

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return children
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  )
}