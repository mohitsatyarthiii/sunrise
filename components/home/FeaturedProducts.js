'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, Eye } from 'lucide-react'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const supabase = createClient()

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(12)
      
      setProducts(data || [])
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <Card key={i}>
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No featured products available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const firstSample = product.sample_options?.[0] || { quantity: 1, price: 0, unit: 'piece' }
        
        return (
          <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="h-12 w-12" />
                </div>
              )}
              
              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" className="rounded-full">
                  <Eye className="h-4 w-4 mr-1" />
                  Quick View
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                {product.is_featured && (
                  <Badge className="bg-yellow-500">Featured</Badge>
                )}
                {product.origin && (
                  <Badge variant="outline" className="bg-white">
                    {product.origin}
                  </Badge>
                )}
              </div>
            </Link>

            <CardContent className="p-4">
              {/* Category */}
              {product.categories && (
                <Link 
                  href={`/categories/${product.categories.slug}`}
                  className="text-xs text-blue-600 hover:underline mb-1 block"
                >
                  {product.categories.name}
                </Link>
              )}

              {/* Title */}
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.short_description || product.description?.substring(0, 100)}
              </p>

              {/* Sample Info */}
              <div className="text-sm mb-3">
                <span className="text-gray-500">Sample: </span>
                <span className="font-medium">
                  {firstSample.quantity} {firstSample.unit} - AED {firstSample.price}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => addToCart(product, firstSample, 1)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Sample
                </Button>
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <Link href={`/enquiry?product=${product.slug}`}>
                    Enquire
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Add missing import
import { Package } from 'lucide-react'