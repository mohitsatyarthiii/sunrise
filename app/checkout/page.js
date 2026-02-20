'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  ArrowLeft,
  CreditCard,
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
  Building,
  User,
  CheckCircle2,
  Loader2
} from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const { cartItems, cartTotal, clearCart } = useCart()
  const supabase = createClient()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: 'UAE',
    notes: ''
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=checkout')
    }
  }, [user, router])

  // Load profile data
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        company: profile.company_name || '',
        address: profile.address || '',
        city: profile.city || '',
        country: profile.country || 'UAE'
      }))
    }
  }, [profile])

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      router.push('/cart')
    }
  }, [cartItems, router, orderPlaced])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateStep1 = () => {
    if (!formData.fullName) {
      toast.error('Please enter your full name')
      return false
    }
    if (!formData.email) {
      toast.error('Please enter your email')
      return false
    }
    if (!formData.phone) {
      toast.error('Please enter your phone number')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.address) {
      toast.error('Please enter your address')
      return false
    }
    if (!formData.city) {
      toast.error('Please enter your city')
      return false
    }
    if (!formData.country) {
      toast.error('Please enter your country')
      return false
    }
    return true
  }

  const handlePlaceOrder = async () => {
    if (!validateStep1() || !validateStep2()) return

    setLoading(true)

    try {
      // Generate order number
      const orderNum = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase()

      // Prepare order items
      const items = cartItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productSlug: item.productSlug,
        productImage: item.productImage,
        sampleQuantity: item.sampleQuantity,
        unit: item.unit,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      }))

      // Insert order into database
      const { error } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNum,
          user_id: user.id,
          status: 'pending',
          total_amount: cartTotal,
          shipping_address: formData.address,
          shipping_city: formData.city,
          shipping_country: formData.country,
          shipping_phone: formData.phone,
          items: items,
          payment_status: 'pending',
          notes: formData.notes
        }])

      if (error) throw error

      // Update profile with latest info
      await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          company_name: formData.company
        })
        .eq('id', user.id)

      // Clear cart and show success
      clearCart()
      setOrderNumber(orderNum)
      setOrderPlaced(true)
      
      toast.success('Order placed successfully!', {
        description: `Your order number is ${orderNum}`
      })

    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order', {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || cartItems.length === 0) {
    return null
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-sm bg-white p-8 text-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-4">Thank you for your order</p>
            
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-sm px-4 py-2 mb-6">
              Order Number: {orderNumber}
            </Badge>
            
            <p className="text-sm text-gray-500 mb-8">
              We've sent a confirmation email to {formData.email}. 
              You can track your order status in your dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/orders">View My Orders</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
                      ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      1
                    </div>
                    <span className={`ml-2 text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                      Contact
                    </span>
                  </div>
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                    <div className={`h-full bg-blue-600 transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`} />
                  </div>
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
                      ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      2
                    </div>
                    <span className={`ml-2 text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                      Shipping
                    </span>
                  </div>
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                    <div className={`h-full bg-blue-600 transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`} />
                  </div>
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
                      ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      3
                    </div>
                    <span className={`ml-2 text-sm font-medium ${step >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                      Payment
                    </span>
                  </div>
                </div>

                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="+971 50 123 4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6" 
                      onClick={() => validateStep1() && setStep(2)}
                    >
                      Continue to Shipping
                    </Button>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Street address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Dubai"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="UAE"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any special instructions for delivery?"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button 
                        className="flex-1" 
                        onClick={() => validateStep2() && setStep(3)}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                    
                    <Card className="border-2 border-blue-600 bg-blue-50">
                      <CardContent className="p-4 flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Pay on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </CardContent>
                    </Card>

                    <p className="text-sm text-gray-500 mt-4">
                      By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </p>

                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button 
                        className="flex-1" 
                        onClick={handlePlaceOrder}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Placing Order...
                          </>
                        ) : (
                          'Place Order'
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm bg-white sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Order</h2>
                
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.productImage ? (
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-gray-400 m-auto" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} x {item.sampleQuantity} {item.unit}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          AED {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">AED {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">AED {cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}