'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Users, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  MoreHorizontal,
  ArrowRight,
  Calendar,
  Download,
  RefreshCw,
  FolderTree
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    enquiries: 0,
    users: 0,
    revenue: 0,
    pendingOrders: 0,
    lowStock: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [recentEnquiries, setRecentEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [salesData, setSalesData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Products count
      const { count: products } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
      
      // Orders count
      const { count: orders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
      
      // Pending orders count
      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
      
      // Enquiries count
      const { count: enquiries } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
      
      // Users count
      const { count: users } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      // Total revenue
      const { data: ordersData } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('payment_status', 'paid')
      
      const revenue = ordersData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

      // Recent orders
      const { data: recent } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      // Recent enquiries
      const { data: enquiries_data } = await supabase
        .from('enquiries')
        .select(`
          *,
          products:product_id (
            name,
            slug
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      // Category distribution
      const { data: productsWithCategories } = await supabase
        .from('products')
        .select(`
          id,
          categories (
            name
          )
        `)

      const categoryCounts = {}
      productsWithCategories?.forEach(p => {
        const catName = p.categories?.name || 'Uncategorized'
        categoryCounts[catName] = (categoryCounts[catName] || 0) + 1
      })

      const catData = Object.entries(categoryCounts).map(([name, value]) => ({
        name,
        value
      }))

      // Mock sales data for demo
      const mockSales = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 5000 },
        { name: 'Apr', sales: 4500 },
        { name: 'May', sales: 6000 },
        { name: 'Jun', sales: 5500 },
        { name: 'Jul', sales: 7000 },
      ]

      setStats({
        products: products || 0,
        orders: orders || 0,
        enquiries: enquiries || 0,
        users: users || 0,
        revenue,
        pendingOrders: pendingOrders || 0,
        lowStock: 5 // Mock data
      })
      setRecentOrders(recent || [])
      setRecentEnquiries(enquiries_data || [])
      setCategoryData(catData)
      setSalesData(mockSales)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500',
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      link: '/admin/products',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      bg: 'bg-green-100',
      text: 'text-green-600',
      link: '/admin/orders',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      link: '/admin/orders?status=pending',
      change: '-3%',
      trend: 'down'
    },
    {
      title: 'Enquiries',
      value: stats.enquiries,
      icon: MessageSquare,
      color: 'bg-purple-500',
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      link: '/admin/enquiries',
      change: '+24%',
      trend: 'up'
    },
    {
      title: 'Total Users',
      value: stats.users,
      icon: Users,
      color: 'bg-pink-500',
      bg: 'bg-pink-100',
      text: 'text-pink-600',
      link: '/admin/users',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Revenue (AED)',
      value: `AED ${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-indigo-500',
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      link: '/admin/analytics',
      change: '+32%',
      trend: 'up'
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchDashboardData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link href={stat.link} key={index}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${stat.text}`} />
                    </div>
                    <Badge variant="outline" className={stat.trend === 'up' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}>
                      {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sales Overview</CardTitle>
              <Badge variant="outline">Last 7 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/orders">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <Link href={`/admin/orders/${order.id}`} key={order.id}>
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-600">
                            {order.order_number}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.profiles?.full_name} • AED {order.total_amount}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {order.status}
                        </Badge>
                        <Eye className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent orders</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Enquiries */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Enquiries</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/enquiries">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enquiry) => (
                  <Link href={`/admin/enquiries?id=${enquiry.id}`} key={enquiry.id}>
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-purple-600">
                            {enquiry.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {enquiry.products?.name || 'General Enquiry'} • {new Date(enquiry.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        enquiry.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                        enquiry.status === 'read' ? 'bg-blue-100 text-blue-700' :
                        enquiry.status === 'replied' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }>
                        {enquiry.status}
                      </Badge>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent enquiries</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
              <p className="text-blue-100">Manage your store efficiently with these quick actions</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" asChild>
                <Link href="/admin/products/add">
                  <Package className="h-4 w-4 mr-2" />
                  Add Product
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/admin/categories/add">
                  <FolderTree className="h-4 w-4 mr-2" />
                  Add Category
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/admin/orders">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Orders
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}