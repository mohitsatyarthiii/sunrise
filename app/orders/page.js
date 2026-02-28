'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Loader2
} from 'lucide-react'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200'
}

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle2,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle
}

const OrderCardSkeleton = () => (
  <Card className="border-0 shadow-sm bg-white mb-4">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </CardContent>
  </Card>
)

const OrderCard = ({ order }) => {
  const StatusIcon = statusIcons[order.status] || Package
  const firstItem = order.items?.[0] || {}

  return (
    <Link href={`/orders/${order.id}`}>
      <Card className="border-0 shadow-sm bg-white mb-4 hover:shadow-md transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">{order.order_number}</h3>
                <Badge variant="outline" className={`${statusColors[order.status]} border-0`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Calendar className="h-3 w-3" />
                {new Date(order.created_at).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold text-gray-900">AED {order.total_amount}</p>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="flex items-center gap-4 py-3 border-y border-gray-100">
            {firstItem?.productImage ? (
              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={firstItem.productImage}
                  alt={firstItem.productName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {firstItem.productName || 'Product'}
              </p>
              <p className="text-sm text-gray-500">
                {firstItem.quantity} x {firstItem.sampleQuantity} {firstItem.unit} • AED {firstItem.price} each
              </p>
              {order.items.length > 1 && (
                <p className="text-xs text-gray-400 mt-1">
                  +{order.items.length - 1} more item{order.items.length - 1 > 1 ? 's' : ''}
                </p>
              )}
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>

          {/* Shipping Info */}
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span>
                {order.shipping_address}, {order.shipping_city}, {order.shipping_country}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
 
  
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  // ✅ Ye naya function add karo
const fetchOrders = async (userId, status) => {
  try {
    const url = new URL('/api/orders', window.location.origin)
    url.searchParams.append('userId', userId)
    if (status && status !== 'all') {
      url.searchParams.append('status', status)
    }
    
    const response = await fetch(url.toString())
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const data = await response.json()
    setOrders(data)
  } catch (error) {
    console.error('Error fetching orders:', error)
    toast?.error?.(error.message || 'Failed to fetch orders')
  }
}

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=orders')
    }
  }, [user, authLoading, router])

  // Fetch orders
 // Fetch orders
useEffect(() => {
  if (!user) return

  const loadOrders = async () => {
    setLoading(true)
    await fetchOrders(user.id, activeTab)
    setLoading(false)
  }

  loadOrders()
}, [user, activeTab])  // ✅ Ab safe hai

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!user) return null

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">View and track all your sample orders</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="all" className="relative">
              All
              {orderCounts.all > 0 && (
                <Badge variant="secondary" className="ml-2 bg-gray-100">
                  {orderCounts.all}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {orderCounts.pending > 0 && (
                <Badge variant="secondary" className="ml-2 bg-yellow-100 text-yellow-700">
                  {orderCounts.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed
              {orderCounts.confirmed > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                  {orderCounts.confirmed}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="shipped">
              Shipped
              {orderCounts.shipped > 0 && (
                <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
                  {orderCounts.shipped}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Delivered
              {orderCounts.delivered > 0 && (
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                  {orderCounts.delivered}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Orders List */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <OrderCardSkeleton key={i} />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm bg-white p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No orders found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {activeTab === 'all' 
                      ? "You haven't placed any orders yet."
                      : `You don't have any ${activeTab} orders.`}
                  </p>
                  <Button asChild>
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Need Help */}
        <Card className="border-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white mt-8">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Need help with your order?</h3>
              <p className="text-blue-100 text-sm">Contact our support team for assistance</p>
            </div>
            <Button variant="secondary" asChild className="whitespace-nowrap">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}