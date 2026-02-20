'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ChevronLeft,
  Package,
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  Loader2
} from 'lucide-react'

// Cart Item Skeleton
const CartItemSkeleton = () => (
  <div className="flex gap-4 py-6">
    <Skeleton className="h-24 w-24 rounded-lg" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-4 w-24" />
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  </div>
)

// Cart Item Component
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.maxQuantity) return
    
    setIsUpdating(true)
    setQuantity(newQuantity)
    await onUpdateQuantity(item.id, newQuantity)
    setIsUpdating(false)
  }

  const itemTotal = item.price * item.quantity

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-100 last:border-0">
      {/* Product Image */}
      <Link href={`/products/${item.productSlug}`} className="sm:w-24 flex-shrink-0">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-100 group">
          {item.productImage ? (
            <Image
              src={item.productImage}
              alt={item.productName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div>
            <Link href={`/products/${item.productSlug}`} className="hover:text-blue-600 transition-colors">
              <h3 className="font-semibold text-gray-900">{item.productName}</h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{item.categoryName}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-gray-50">
                {item.sampleQuantity} {item.unit} sample
              </Badge>
              <span className="text-sm font-medium text-gray-900">
                AED {item.price} each
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">AED {itemTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdating}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <div className="relative">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (!isNaN(val) && val >= 1 && val <= item.maxQuantity) {
                    handleQuantityChange(val)
                  }
                }}
                className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min="1"
                max={item.maxQuantity}
                disabled={isUpdating}
              />
              {isUpdating && (
                <Loader2 className="h-3 w-3 animate-spin absolute right-1 top-1/2 -translate-y-1/2" />
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= item.maxQuantity || isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    isLoaded, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart()
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout', {
        description: 'You need to be logged in to place an order',
        action: {
          label: 'Login',
          onClick: () => router.push('/login?redirect=checkout')
        }
      })
      return
    }

    setIsCheckingOut(true)
    // Simulate checkout preparation
    setTimeout(() => {
      router.push('/checkout')
    }, 500)
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'SAVE10') {
      setPromoApplied(true)
      toast.success('Promo code applied!', {
        description: 'You saved 10% on your order'
      })
    } else {
      toast.error('Invalid promo code')
    }
    setPromoCode('')
  }

  // Calculate savings if promo applied
  const discount = promoApplied ? cartTotal * 0.1 : 0
  const finalTotal = cartTotal - discount
  const shipping = finalTotal > 0 ? 15 : 0 // Free shipping over certain amount?
  const grandTotal = finalTotal + shipping

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            Shopping Cart
            {cartCount > 0 && (
              <Badge className="bg-blue-600 text-white">{cartCount} items</Badge>
            )}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <Card className="border-0 shadow-sm bg-white p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-16 w-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/products">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/categories">
                    View Categories
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  {/* Cart Header */}
                  <div className="hidden sm:flex items-center justify-between text-sm font-medium text-gray-500 pb-4 border-b border-gray-100">
                    <span className="flex-1">Product</span>
                    <span className="w-32 text-center">Quantity</span>
                    <span className="w-24 text-right">Total</span>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>

                  {/* Cart Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6 pt-6 border-t border-gray-100">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                    
                    <Button asChild variant="link">
                      <Link href="/products" className="text-blue-600">
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Free Shipping</p>
                  <p className="text-xs text-gray-400">on orders over AED 500</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Secure Payment</p>
                  <p className="text-xs text-gray-400">100% protected</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Easy Returns</p>
                  <p className="text-xs text-gray-400">30-day policy</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm bg-white sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-gray-50"
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleApplyPromo}
                        disabled={!promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ SAVE10 applied (10% discount)
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                      <span className="font-medium text-gray-900">AED {cartTotal.toFixed(2)}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount (SAVE10)</span>
                        <span className="font-medium text-green-600">-AED {discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {shipping === 0 ? 'Free' : `AED ${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-blue-600">AED {grandTotal.toFixed(2)}</span>
                    </div>
                    
                    {cartTotal < 500 && (
                      <p className="text-xs text-gray-500 text-center">
                        Add AED {(500 - cartTotal).toFixed(2)} more to get free shipping
                      </p>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <Button 
                    size="lg" 
                    className="w-full mb-3"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Payment Methods */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">We accept</p>
                    <div className="flex justify-center gap-3">
                      <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">Visa</div>
                      <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">MC</div>
                      <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">AE</div>
                      <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">PP</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}