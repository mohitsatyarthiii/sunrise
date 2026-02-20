'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const firstSample = product.sample_options?.[0] || { quantity: 1, price: 0, unit: 'piece' }

  return (
    <Card className="group overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          {product.is_featured && (
            <Badge className="absolute top-2 right-2 bg-yellow-500">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.short_description || product.description?.substring(0, 100)}
        </p>
        <div className="text-sm text-gray-500">
          Sample: {firstSample.quantity} {firstSample.unit} - AED {firstSample.price}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="flex-1"
          onClick={() => addToCart(product, firstSample, 1)}
        >
          Order Sample
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/enquiry?product=${product.slug}`}>
            Enquire Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}