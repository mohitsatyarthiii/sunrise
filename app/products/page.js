'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { 
  Search, 
  X, 
  ArrowUpDown,
  Package,
  Filter,
  ImageOff
} from 'lucide-react'

// Shadcn Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

// Product Card Component with Image Error Handling
const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false)
  const firstSample = product.sample_options?.[0] || { quantity: 1, unit: 'kg', price: 0 }
  
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white rounded-2xl">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {!imageError && product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <ImageOff className="h-8 w-8 text-gray-300 mb-1" />
              <span className="text-xs text-gray-400">No image</span>
            </div>
          )}
          
          {product.is_featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0">
              Featured
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
              {product.categories?.name || 'Product'}
            </span>
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-xs text-gray-500">Sample from</span>
              <p className="font-bold text-gray-900">
                AED {firstSample.price}
                <span className="text-xs font-normal text-gray-500 ml-1">
                  /{firstSample.quantity} {firstSample.unit}
                </span>
              </p>
            </div>
            
            <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700">
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Skeleton Loader
const ProductSkeleton = () => (
  <Card className="overflow-hidden border-0 bg-white rounded-2xl">
    <Skeleton className="aspect-square w-full" />
    <CardContent className="p-4">
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-6 w-full mb-2" />
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
    </CardContent>
  </Card>
)

export default function ProductsPage() {
  // State
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  
 // ✅ Naya fetch functions
const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const data = await response.json()
    setCategories(data || [])
  } catch (error) {
    console.error('Error fetching categories:', error)
    toast.error('Failed to load categories')
  }
}

const fetchProducts = async (filters) => {
  setLoading(true)
  try {
    const url = new URL('/api/products', window.location.origin)
    
    if (filters.category && filters.category !== 'All') {
      url.searchParams.append('category', filters.category)
    }
    if (filters.search) {
      url.searchParams.append('search', filters.search)
    }
    if (filters.sortBy) {
      url.searchParams.append('sortBy', filters.sortBy)
    }
    
    const response = await fetch(url.toString())
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const data = await response.json()
    setProducts(data || [])
  } catch (error) {
    console.error('Error fetching products:', error)
    toast.error('Failed to load products')
  } finally {
    setLoading(false)
  }
}

  

  // Fetch categories
  useEffect(() => {
  fetchCategories()  // ✅ Naya function call
}, []) 

  // Fetch products
  useEffect(() => {
  fetchProducts({
    category: activeCategory,
    search: query,
    sortBy: sortBy
  })
}, [activeCategory, query, sortBy]) 

  // Handle category count
 const getCategoryCount = useCallback((categoryName) => {
  if (categoryName === 'All') return products.length
  return products.filter(p => p.categories?.name === categoryName).length
}, [products])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-white border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
                Global Export Catalogue
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Explore Our Products
              </h1>
              <p className="text-lg text-gray-600">
                Discover premium quality products for global export.
              </p>
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <Button
                      variant={activeCategory === 'All' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveCategory('All')
                        setMobileFiltersOpen(false)
                      }}
                    >
                      All Products ({products.length})
                    </Button>
                    {categories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={activeCategory === cat.name ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => {
                          setActiveCategory(cat.name)
                          setMobileFiltersOpen(false)
                        }}
                      >
                        {cat.name} ({getCategoryCount(cat.name)})
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search and Sort */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 py-6 bg-white border-gray-200 rounded-xl"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white border-gray-200 rounded-xl">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="az">Name: A to Z</SelectItem>
                <SelectItem value="za">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-1">
                    <Button
                      variant={activeCategory === 'All' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveCategory('All')}
                    >
                      <span>All Products</span>
                      <Badge variant="secondary" className="ml-auto">
                        {products.length}
                      </Badge>
                    </Button>
                    {categories.map((cat) => (
                      <Button
                        key={cat.id}
                        variant={activeCategory === cat.name ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveCategory(cat.name)}
                      >
                        <span>{cat.name}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {getCategoryCount(cat.name)}
                        </Badge>
                      </Button>
                    ))}
                  </div>

                  {(activeCategory !== 'All' || query) && (
                    <Button
                      variant="outline"
                      className="w-full mt-6"
                      onClick={() => {
                        setActiveCategory('All')
                        setQuery('')
                        setSortBy('featured')
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{products.length}</span> products
              </p>
              {query && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Search: {query}
                </Badge>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm bg-white p-12 text-center">
                <div className="max-w-md mx-auto">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter.
                  </p>
                  <Button
                    onClick={() => {
                      setActiveCategory('All')
                      setQuery('')
                      setSortBy('featured')
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}