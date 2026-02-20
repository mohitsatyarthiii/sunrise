'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function EnquiryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')
  const { user, profile } = useAuth()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  useEffect(() => {
    if (user && profile) {
      setFormData({
        name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        company: profile.company_name || '',
        message: ''
      })
    }

    if (productSlug) {
      const fetchProduct = async () => {
        const { data } = await supabase
          .from('products')
          .select('id, name')
          .eq('slug', productSlug)
          .single()
        setProduct(data)
      }
      fetchProduct()
    }
  }, [user, profile, productSlug])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([{
          user_id: user?.id,
          product_id: product?.id,
          product_name: product?.name,
          ...formData
        }])

      if (error) throw error

      toast.success('Enquiry sent successfully! We\'ll get back to you soon.')
      router.push('/')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Send Enquiry</CardTitle>
          <CardDescription>
            {product ? `Enquiry for: ${product.name}` : 'Fill the form below and we\'ll get back to you'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Please provide details about your enquiry..."
                required
              />
            </div>
          </CardContent>
          
          <CardContent>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Enquiry'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}