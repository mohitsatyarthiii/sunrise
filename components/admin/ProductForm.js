'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import {
  Plus,
  Trash2,
  Upload,
  X,
  Save,
  Loader2,
  ChevronLeft
} from 'lucide-react'

export default function ProductForm({ productId = null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    category_id: '',
    origin: '',
    images: ['', '', '', ''],
    sample_options: [
      { quantity: 1, unit: 'kg', price: 0 }
    ],
    specifications: {},
    is_featured: false,
    is_active: true,
    meta_title: '',
    meta_description: ''
  })

  // ✅ Naya fetch categories function
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/products')
      
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

  // ✅ Naya fetch product function
  const fetchProduct = async (id) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/products/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found')
        }
        const error = await response.json()
        throw new Error(error.error)
      }
      
      const data = await response.json()
      
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        short_description: data.short_description || '',
        category_id: data.category_id || '',
        origin: data.origin || '',
        images: data.images?.length 
          ? [...data.images, ...Array(Math.max(0, 4 - data.images.length)).fill('')]
          : ['', '', '', ''],
        sample_options: data.sample_options?.length 
          ? data.sample_options 
          : [{ quantity: 1, unit: 'kg', price: 0 }],
        specifications: data.specifications || {},
        is_featured: data.is_featured || false,
        is_active: data.is_active !== false,
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || ''
      })
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error(error.message || 'Failed to load product')
      router.push('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Naya image upload function
  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/admin/products/upload', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    
    const data = await response.json()
    return data.url
  }

  // ✅ Naya save product function
  const saveProduct = async (data) => {
    setSaving(true)
    try {
      const filteredImages = data.images.filter(img => img && img.trim())
      const filteredSamples = data.sample_options.filter(opt => opt.price > 0)

      const productData = {
        name: data.name.trim(),
        slug: data.slug.trim(),
        description: data.description?.trim() || null,
        short_description: data.short_description?.trim() || null,
        category_id: data.category_id || null,
        origin: data.origin?.trim() || null,
        images: filteredImages,
        sample_options: filteredSamples,
        specifications: data.specifications || {},
        is_featured: data.is_featured || false,
        is_active: data.is_active !== false,
        meta_title: data.meta_title?.trim() || null,
        meta_description: data.meta_description?.trim() || null
      }

      let response
      if (productId) {
        response = await fetch(`/api/admin/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
      } else {
        response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
      }
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      
      toast.success(productId ? 'Product updated successfully' : 'Product created successfully')
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error(error.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    if (productId) {
      fetchProduct(productId)
    }
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      }))
    }
  }

  const handleSampleChange = (index, field, value) => {
    const newSamples = [...formData.sample_options]
    newSamples[index][field] = value
    setFormData(prev => ({ ...prev, sample_options: newSamples }))
  }

  const addSampleOption = () => {
    setFormData(prev => ({
      ...prev,
      sample_options: [...prev.sample_options, { quantity: 1, unit: 'kg', price: 0 }]
    }))
  }

  const removeSampleOption = (index) => {
    if (formData.sample_options.length > 1) {
      setFormData(prev => ({
        ...prev,
        sample_options: prev.sample_options.filter((_, i) => i !== index)
      }))
    }
  }

  const handleImageUpload = async (index, e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = await uploadImage(file)

      const newImages = [...formData.images]
      newImages[index] = imageUrl
      setFormData(prev => ({ ...prev, images: newImages }))
      
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error(error.message || 'Failed to upload image')
    }
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]
    newImages[index] = ''
    setFormData(prev => ({ ...prev, images: newImages }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await saveProduct(formData)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {productId ? 'Update Product' : 'Create Product'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="samples">Samples</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      URL: /products/{formData.slug || 'product-name'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category_id">Category</Label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin</Label>
                      <Input
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        placeholder="e.g., India"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="short_description">Short Description</Label>
                    <Textarea
                      id="short_description"
                      name="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Brief description for product cards"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="description" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={10}
                      placeholder="Detailed product description..."
                    />
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <Label>Product Images (Max 4)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="relative">
                        {formData.images[index] ? (
                          <div className="relative aspect-square rounded-lg overflow-hidden border group">
                            <Image
                              src={formData.images[index]}
                              alt={`Product ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
                            <Upload className="h-6 w-6 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500">Upload</span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(index, e)}
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="samples" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Sample Options</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addSampleOption}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.sample_options.map((option, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="grid grid-cols-3 gap-2 flex-1">
                          <Input
                            type="number"
                            value={option.quantity}
                            onChange={(e) => handleSampleChange(index, 'quantity', parseInt(e.target.value))}
                            placeholder="Qty"
                            min="1"
                          />
                          <Select
                            value={option.unit}
                            onValueChange={(value) => handleSampleChange(index, 'unit', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="piece">piece</SelectItem>
                              <SelectItem value="pack">pack</SelectItem>
                              <SelectItem value="box">box</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            value={option.price}
                            onChange={(e) => handleSampleChange(index, 'price', parseFloat(e.target.value))}
                            placeholder="Price"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        {formData.sample_options.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSampleOption(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active">Active</Label>
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_featured">Featured</Label>
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Quick Preview</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Product URL:</p>
                <code className="text-xs bg-gray-100 p-2 rounded block">
                  /products/{formData.slug || 'product-name'}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}