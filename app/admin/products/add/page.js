'use client'

import ProductForm from '@/components/forms/ProductForm'

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Product</h1>
      <ProductForm />
    </div>
  )
}