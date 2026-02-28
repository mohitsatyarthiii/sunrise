'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { Lock, Mail, Eye, EyeOff, Shield, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  // Check if already logged in as admin
  useEffect(() => {
    let mounted = true
    let timeoutId

    const checkAdmin = async () => {
      try {
        // Set a timeout to prevent hanging
        timeoutId = setTimeout(() => {
          if (mounted) setChecking(false)
        }, 5000)

        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          if (mounted) setChecking(false)
          return
        }

        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          if (mounted) setChecking(false)
          return
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        
        if (profile?.is_admin && mounted) {
          router.push('/admin/dashboard')
        }
      } catch (error) {
        console.error('Error checking admin:', error)
      } finally {
        if (mounted) {
          setChecking(false)
        }
        clearTimeout(timeoutId)
      }
    }
    
    checkAdmin()

    return () => {
      mounted = false
      clearTimeout(timeoutId)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Please enter both email and password')
      }

      // Simple network check without abort controller
      try {
        const response = await fetch('https://yfogpdtrsswcbijnqltl.supabase.co/rest/v1/', {
          method: 'HEAD',
          mode: 'cors',
          cache: 'no-cache',
        }).catch(() => null)
        
        if (!response) {
          throw new Error('Cannot connect to server. Please check your connection.')
        }
      } catch (netError) {
        throw new Error('Network connection issue. Please try again.')
      }

      // Attempt login
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password,
      })

      if (signInError) {
        throw new Error(signInError.message)
      }

      if (!data?.user) {
        throw new Error('Login failed - no user data')
      }

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        throw new Error('Failed to fetch user profile')
      }

      if (!profile?.is_admin) {
        // Sign out if not admin
        await supabase.auth.signOut()
        throw new Error('Not authorized as admin')
      }

      // Success
      toast.success('Welcome back, Admin!')
      router.push('/admin/dashboard')
      router.refresh()
      
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message || 'Invalid credentials')
      toast.error('Login failed', {
        description: error.message || 'Invalid credentials'
      })
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-300">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-0 bg-white/10 backdrop-blur-xl text-white shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription className="text-gray-300">
            Secure access for administrators only
          </CardDescription>
        </CardHeader>

        {error && (
          <CardContent>
            <Alert variant="destructive" className="bg-red-500/20 border-red-500/50 text-white">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        )}

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </div>
              ) : (
                'Login to Dashboard'
              )}
            </Button>
          </CardContent>
        </form>

        <CardContent className="text-center text-sm text-gray-400">
          <p>Demo: admin@exportecom.com / demo123456</p>
        </CardContent>
      </Card>
    </div>
  )
}