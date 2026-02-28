'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe/client'
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
  Loader2,
  AlertCircle,
  Lock
} from 'lucide-react'

// Checkout Form Component with Stripe
function CheckoutForm({ orderData, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setErrorMessage('')

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        throw new Error(submitError.message)
      }

      // Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?order_id=${orderData.orderNumber}`,
          receipt_email: orderData.email,
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      // Payment succeeded
      onSuccess()
      
    } catch (error) {
      console.error('Payment error:', error)
      setErrorMessage(error.message || 'Payment failed. Please try again.')
      toast.error('Payment failed', {
        description: error.message || 'Please try again'
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Lock className="h-4 w-4" />
          <span>Payments are secure and encrypted</span>
        </div>
        
        <PaymentElement />
      </div>

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full"
        size="lg"
      >
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Pay AED {orderData.total.toFixed(2)}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-gray-500">
        By completing this payment, you agree to our{' '}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  )
}

// Main Checkout Page
export default function CheckoutPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const { cartItems, cartTotal, clearCart } = useCart()
  const supabase = createClient()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState('')
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
    if (cartItems.length === 0 && step !== 3) {
      router.push('/cart')
    }
  }, [cartItems, router, step])

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
      setOrderNumber(orderNum)

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

      // Create order in database
      const { error: orderError } = await supabase
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

      if (orderError) throw orderError

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          orderId: orderNum,
          shippingDetails: formData
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment')
      }

      setClientSecret(data.clientSecret)
      setPaymentIntentId(data.paymentIntentId)

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

      // Move to payment step
      setStep(3)
      
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order', {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    clearCart()
    router.push(`/checkout/success?order_id=${orderNumber}`)
  }

  if (!user || cartItems.length === 0) {
    return null
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
                      <Label htmlFor="fullName">Full Name *</Label>
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
                      <Label htmlFor="email">Email *</Label>
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
                      <Label htmlFor="phone">Phone Number *</Label>
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
                      <Label htmlFor="address">Address *</Label>
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
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Dubai"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
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
                        onClick={handlePlaceOrder}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Proceed to Payment'
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment with Stripe */}
                {step === 3 && clientSecret && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
                    
                    <Elements 
                      stripe={getStripe()} 
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            colorPrimary: '#2563eb',
                            colorBackground: '#ffffff',
                            colorText: '#1f2937',
                            colorDanger: '#ef4444',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            spacingUnit: '4px',
                            borderRadius: '8px',
                          },
                        },
                      }}
                    >
                      <CheckoutForm 
                        orderData={{
                          orderNumber,
                          total: cartTotal,
                          email: formData.email
                        }}
                        onSuccess={handlePaymentSuccess}
                      />
                    </Elements>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm bg-white sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">Included</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">AED {cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}