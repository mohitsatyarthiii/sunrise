'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
      
      // Update counts
      const count = cartItems.reduce((acc, item) => acc + item.quantity, 0)
      const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
      
      setCartCount(count)
      setCartTotal(total)
    }
  }, [cartItems, isLoaded])

  const addToCart = (product, sampleOption, quantity = 1) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === product.id && 
      item.sampleQuantity === sampleOption.quantity
    )

    if (existingItemIndex > -1) {
      // Update existing item
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      }
      setCartItems(updatedItems)
      toast.success('Cart updated!', {
        description: `${product.name} quantity increased`
      })
    } else {
      // Add new item
      setCartItems([...cartItems, {
        id: `${product.id}-${sampleOption.quantity}-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.images?.[0] || null,
        categoryName: product.categories?.name || 'Product',
        sampleQuantity: sampleOption.quantity,
        unit: sampleOption.unit,
        price: sampleOption.price,
        quantity: quantity,
        maxQuantity: 100 // You can set this based on stock
      }])
      toast.success('Added to cart!', {
        description: `${product.name} added to your cart`
      })
    }
  }

  const removeFromCart = (itemId) => {
    const item = cartItems.find(i => i.id === itemId)
    setCartItems(cartItems.filter(item => item.id !== itemId))
    toast.success('Item removed', {
      description: item?.productName || 'Item removed from cart'
    })
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }

    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared', {
      description: 'All items have been removed from your cart'
    })
  }

  const getCartItem = (itemId) => {
    return cartItems.find(item => item.id === itemId)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      isLoaded,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItem
    }}>
      {children}
    </CartContext.Provider>
  )
}