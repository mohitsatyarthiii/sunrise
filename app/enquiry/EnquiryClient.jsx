"use client";

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function EnquiryClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')

  const { user, profile } = useAuth()
  
  // ✅ Ye naye functions add karo
const fetchProductBySlug = async (slug) => {
  try {
    const response = await fetch(`/api/products?slug=${slug}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    const data = await response.json()
    setProduct(data)
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

const submitEnquiry = async (data) => {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }
  
  return response.json()
}

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
    // ✅ Yeh change karo - fetchProductBySlug call karo
    fetchProductBySlug(productSlug)
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
    // ✅ Yeh change karo - submitEnquiry use karo
    await submitEnquiry({
      user_id: user?.id,
      product_id: product?.id,
      product_name: product?.name,
      ...formData
    })

    toast.success("Enquiry sent successfully!")
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
            {product ? `Enquiry for: ${product.name}` : "Fill the form below"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Name *" required />
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email *" required />
            <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <Input id="company" value={formData.company} onChange={handleChange} placeholder="Company" />
            <Textarea id="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Message *" required />
          </CardContent>

          <CardContent>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Enquiry"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
