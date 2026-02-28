'use client'

import ProductForm from '@/components/admin/ProductForm'

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500 mt-1">Create a new product for your catalog</p>
      </div>
      <ProductForm />
    </div>
  )
}