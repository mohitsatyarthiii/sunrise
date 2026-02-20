"use client";

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const verified = searchParams.get('verified')
  const redirectTo = searchParams.get('redirect') || '/'

  // ✅ IMPORTANT: toast render me nahi, effect me
  useEffect(() => {
    if (verified === 'true') {
      toast.success('Email verified! Please login.')
    }
  }, [verified])

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!password) {
      setError('Password is required')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password,
      })

      if (error) throw new Error(error.message)

      if (data?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin, full_name')
          .eq('id', data.user.id)
          .single()

        toast.success(`Welcome back${profile?.full_name ? ', ' + profile.full_name : ''}!`)

        if (profile?.is_admin) router.push('/admin/dashboard')
        else router.push(redirectTo)

        router.refresh()
      }
    } catch (error) {
      setError(error.message)
      toast.error('Login Failed', { description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (role) => {
    setEmail(role === 'admin' ? 'admin@exportecom.com' : 'user@exportecom.com')
    setPassword('demo123456')

    setTimeout(() => {
      document.getElementById('login-form')?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }, 100)
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Login to your account to manage orders and samples
          </CardDescription>
        </CardHeader>

        {error && (
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        )}

        {verified === 'false' && (
          <CardContent>
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Please check your email for verification link.
              </AlertDescription>
            </Alert>
          </CardContent>
        )}

        <form id="login-form" onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="pl-10" disabled={loading}/>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} className="pl-10 pr-10" disabled={loading}/>
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
                  {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="grid grid-cols-2 gap-2 w-full">
              <Button type="button" variant="outline" size="sm" onClick={()=>handleDemoLogin('user')} disabled={loading}>Demo User</Button>
              <Button type="button" variant="outline" size="sm" onClick={()=>handleDemoLogin('admin')} disabled={loading}>Demo Admin</Button>
            </div>

            <p className="text-sm text-center text-gray-600">
              Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
