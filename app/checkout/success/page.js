'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from 'lucide-react'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  // ✅ Naya fetch order function
const fetchOrderByNumber = async (orderNum) => {
  setLoading(true)
  try {
    const response = await fetch(`/api/orders/${orderNum}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        setOrder(null)
        return
      }
      const error = await response.json()
      throw new Error(error.error)
    }
    
    const data = await response.json()
    setOrder(data)
  } catch (error) {
    console.error('Error fetching order:', error)
  } finally {
    setLoading(false)
  }
}
  

 useEffect(() => {
  if (orderId) {
    fetchOrderByNumber(orderId)  // ✅ Naya function call
  } else {
    setLoading(false)
  }
}, [orderId])  // ✅ Ab safe hai

if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-sm bg-white p-8 text-center">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </Card>
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-sm bg-white p-8 text-center">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We've received your payment.
          </p>
          
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-sm px-4 py-2 mb-6">
            Order Number: {orderId}
          </Badge>

          <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm text-gray-600 mb-2">What happens next?</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>We've sent a confirmation email to your inbox</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Your order is being processed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You'll receive shipping confirmation soon</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/orders">
                <Package className="mr-2 h-4 w-4" />
                View My Orders
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}