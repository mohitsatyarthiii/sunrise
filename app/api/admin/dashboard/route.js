import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Run all queries in parallel for better performance
    const [
      productsCount,
      ordersCount,
      pendingOrdersCount,
      enquiriesCount,
      usersCount,
      paidOrders,
      recentOrdersData,
      recentEnquiriesData,
      productsWithCategories
    ] = await Promise.all([
      // Products count
      supabase.from('products').select('*', { count: 'exact', head: true }),
      
      // Orders count
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      
      // Pending orders count
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      
      // Enquiries count
      supabase.from('enquiries').select('*', { count: 'exact', head: true }),
      
      // Users count
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      
      // Paid orders for revenue
      supabase.from('orders').select('total_amount').eq('payment_status', 'paid'),
      
      // Recent orders
      supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5),
      
      // Recent enquiries
      supabase
        .from('enquiries')
        .select(`
          *,
          products:product_id (
            name,
            slug
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5),
      
      // Products with categories for distribution
      supabase
        .from('products')
        .select(`
          id,
          categories (
            name
          )
        `)
    ])

    // Check for errors
    if (productsCount.error) throw productsCount.error
    if (ordersCount.error) throw ordersCount.error
    if (pendingOrdersCount.error) throw pendingOrdersCount.error
    if (enquiriesCount.error) throw enquiriesCount.error
    if (usersCount.error) throw usersCount.error
    if (paidOrders.error) throw paidOrders.error
    if (recentOrdersData.error) throw recentOrdersData.error
    if (recentEnquiriesData.error) throw recentEnquiriesData.error
    if (productsWithCategories.error) throw productsWithCategories.error

    // Calculate revenue
    const revenue = paidOrders.data?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

    // Calculate category distribution
    const categoryCounts = {}
    productsWithCategories.data?.forEach(p => {
      const catName = p.categories?.name || 'Uncategorized'
      categoryCounts[catName] = (categoryCounts[catName] || 0) + 1
    })

    const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value
    }))

    // Mock sales data (you can replace with actual sales data from database)
    const salesData = [
      { name: 'Jan', sales: 4000 },
      { name: 'Feb', sales: 3000 },
      { name: 'Mar', sales: 5000 },
      { name: 'Apr', sales: 4500 },
      { name: 'May', sales: 6000 },
      { name: 'Jun', sales: 5500 },
      { name: 'Jul', sales: 7000 },
    ]

    return NextResponse.json({
      stats: {
        products: productsCount.count || 0,
        orders: ordersCount.count || 0,
        enquiries: enquiriesCount.count || 0,
        users: usersCount.count || 0,
        revenue,
        pendingOrders: pendingOrdersCount.count || 0,
        lowStock: 5 // You can implement actual low stock query
      },
      recentOrders: recentOrdersData.data || [],
      recentEnquiries: recentEnquiriesData.data || [],
      categoryData,
      salesData
    })
    
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}