'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import { ShoppingCart, Send, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState as useReactState } from 'react'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSample, setSelectedSample] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { user } = useAuth()

  // ✅ Naya fetch function
const fetchProductBySlug = async (productSlug) => {
  setLoading(true)
  try {
    const response = await fetch(`/api/products/${productSlug}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        setProduct(null)
        return
      }
      const error = await response.json()
      throw new Error(error.error)
    }
    
    const data = await response.json()
    setProduct(data)
    
    if (data?.sample_options?.length > 0) {
      setSelectedSample(data.sample_options[0])
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    toast.error('Failed to load product details')
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
  if (slug) {
    fetchProductBySlug(slug)  // ✅ Naya function call
  }
}, [slug])  // ✅ Ab safe hai

  const handleEnquiry = () => {
    if (!user) {
      toast.error('Please login to send enquiry')
      return
    }
    // Redirect to enquiry form
    window.location.href = `/enquiry?product=${product.slug}`
  }

  const handleAddToCart = () => {
  if (!selectedSample) {
    toast.error('Please select a sample option')
    return
  }
  addToCart(product, selectedSample, quantity)
}

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  const images = product.images?.length ? product.images : ['/placeholder.jpg']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-blue-600 hover:underline flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() => setSelectedImage(prev => 
                    prev === 0 ? images.length - 1 : prev - 1
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() => setSelectedImage(prev => 
                    prev === images.length - 1 ? 0 : prev + 1
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            {product.categories && (
              <Link 
                href={`/categories/${product.categories.slug}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {product.categories.name}
              </Link>
            )}
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            {product.origin && (
              <p className="text-gray-600 mt-1">Origin: {product.origin}</p>
            )}
          </div>

          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          {/* Sample Options */}
          {product.sample_options?.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Sample Options</h3>
                <div className="space-y-3">
                  {product.sample_options.map((option, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                        selectedSample === option ? 'border-blue-600 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="sample"
                          checked={selectedSample === option}
                          onChange={() => setSelectedSample(option)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <div>
                          <span className="font-medium">{option.quantity} {option.unit}</span>
                          {option.unit === 'kg' && <span className="text-sm text-gray-500 ml-2">sample pack</span>}
                        </div>
                      </div>
                      <div className="font-bold text-lg">
                        AED {option.price}
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center border rounded-lg">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={!selectedSample}
            >
              <ShoppingCart className="h-5 w-5" />
              Order Sample
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={handleEnquiry}
            >
              <Send className="h-5 w-5" />
              Enquire Now
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4 border rounded-lg mt-2">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              {product.material && (
                <p><strong>Material:</strong> {product.material}</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 border rounded-lg mt-2">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-4 border rounded-lg mt-2">
            <p>Shipping information for samples and bulk orders...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}