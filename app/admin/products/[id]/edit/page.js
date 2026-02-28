'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import {
  Save,
  Loader2,
  ChevronLeft,
  Plus,
  Trash2,
  Upload,
  X,
  Eye,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id
 
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState('general')
  const [uploadingImage, setUploadingImage] = useState(null)
  
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

// ✅ Naya fetch categories function
const fetchCategories = async () => {
  try {
    const response = await fetch('/api/admin/products') // Reuse same endpoint
    
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

// ✅ Naya update product function
const updateProduct = async (id, data) => {
  setSaving(true)
  try {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    
    toast.success('Product updated successfully')
    router.push('/admin/products')
    router.refresh()
  } catch (error) {
    console.error('Error updating product:', error)
    toast.error(error.message || 'Failed to update product')
  } finally {
    setSaving(false)
  }
}

// ✅ Naya delete product function
const deleteProduct = async (id) => {
  setDeleting(true)
  try {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    
    toast.success('Product deleted successfully')
    router.push('/admin/products')
    router.refresh()
  } catch (error) {
    console.error('Error deleting product:', error)
    toast.error(error.message || 'Failed to delete product')
  } finally {
    setDeleting(false)
    setShowDeleteDialog(false)
  }
}

// ✅ Naya duplicate product function
const duplicateProduct = async (id) => {
  try {
    const response = await fetch(`/api/admin/products/${id}/duplicate`, {
      method: 'POST'
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    
    const newProduct = await response.json()
    toast.success('Product duplicated successfully')
    router.push(`/admin/products/${newProduct.id}/edit`)
  } catch (error) {
    console.error('Error duplicating product:', error)
    toast.error(error.message || 'Failed to duplicate product')
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
  // Fetch product data
  useEffect(() => {
  if (productId) {
    fetchProduct(productId)
    fetchCategories()
  }
}, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from name
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
    newSamples[index][field] = field === 'price' || field === 'quantity' ? parseFloat(value) || 0 : value
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

  setUploadingImage(index)
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file')
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size should be less than 5MB')
    }

    // ✅ Upload via API
    const imageUrl = await uploadImage(file)

    const newImages = [...formData.images]
    newImages[index] = imageUrl
    setFormData(prev => ({ ...prev, images: newImages }))
    
    toast.success('Image uploaded successfully')
  } catch (error) {
    console.error('Error uploading image:', error)
    toast.error(error.message || 'Failed to upload image')
  } finally {
    setUploadingImage(null)
  }
}

  const removeImage = (index) => {
    const newImages = [...formData.images]
    newImages[index] = ''
    setFormData(prev => ({ ...prev, images: newImages }))
    toast.success('Image removed')
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  await updateProduct(productId, formData)
}

  const handleDelete = async () => {
  await deleteProduct(productId)
}

  const handleDuplicate = async () => {
  await duplicateProduct(productId)
}
  const handleViewProduct = () => {
    window.open(`/products/${formData.slug}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-500 mt-1">
              {formData.name ? `Editing: ${formData.name}` : 'Update product information'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleViewProduct}>
            <Eye className="h-4 w-4 mr-2" />
            View Product
          </Button>
          <Button variant="outline" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => setShowDeleteDialog(true)}
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 text-sm">
            <Badge className={formData.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {formData.is_active ? 'Active' : 'Inactive'}
            </Badge>
            {formData.is_featured && (
              <Badge className="bg-yellow-100 text-yellow-700">Featured</Badge>
            )}
            <span className="text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="samples">Sample Options</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>

                  {/* General Tab */}
                  <TabsContent value="general" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Product Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Natural Moringa Leaf Powder"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">
                        Slug <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          placeholder="natural-moringa-powder"
                          required
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            navigator.clipboard.writeText(formData.slug)
                            toast.success('Slug copied!')
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
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
                        <Label htmlFor="origin">Country of Origin</Label>
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
                        rows={3}
                        placeholder="Brief description for product cards (max 150 characters)"
                      />
                      <p className="text-xs text-gray-500 text-right">
                        {formData.short_description?.length || 0}/150
                      </p>
                    </div>
                  </TabsContent>

                  {/* Description Tab */}
                  <TabsContent value="description" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Full Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={12}
                        placeholder="Detailed product description, features, benefits..."
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Specifications (JSON format)</Label>
                      <Textarea
                        value={JSON.stringify(formData.specifications, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value)
                            setFormData(prev => ({ ...prev, specifications: parsed }))
                          } catch {
                            // Invalid JSON, don't update
                          }
                        }}
                        rows={6}
                        className="font-mono text-sm"
                        placeholder='{
  "weight": "500g",
  "shelf_life": "24 months",
  "storage": "Cool dry place"
}'
                      />
                    </div>
                  </TabsContent>

                  {/* Images Tab */}
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
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8"
                                  onClick={() => window.open(formData.images[index], '_blank')}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="destructive"
                                  className="h-8 w-8"
                                  onClick={() => removeImage(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <Badge className="absolute top-2 left-2">
                                {index + 1}
                              </Badge>
                            </div>
                          ) : (
                            <label className="relative aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
                              {uploadingImage === index ? (
                                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                              ) : (
                                <>
                                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                                  <span className="text-xs text-gray-500">Upload</span>
                                  <span className="text-xs text-gray-400">Position {index + 1}</span>
                                </>
                              )}
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(index, e)}
                                disabled={uploadingImage !== null}
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Recommended image size: 800x800px. Max file size: 5MB
                    </p>
                  </TabsContent>

                  {/* Sample Options Tab */}
                  <TabsContent value="samples" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Sample Options <span className="text-red-500">*</span></Label>
                      <Button type="button" variant="outline" size="sm" onClick={addSampleOption}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {formData.sample_options.map((option, index) => (
                        <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-3 gap-2 flex-1">
                            <div>
                              <Label className="text-xs">Quantity</Label>
                              <Input
                                type="number"
                                value={option.quantity}
                                onChange={(e) => handleSampleChange(index, 'quantity', e.target.value)}
                                placeholder="Qty"
                                min="1"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Unit</Label>
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
                            </div>
                            <div>
                              <Label className="text-xs">Price (AED)</Label>
                              <Input
                                type="number"
                                value={option.price}
                                onChange={(e) => handleSampleChange(index, 'price', e.target.value)}
                                placeholder="Price"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          {formData.sample_options.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSampleOption(index)}
                              className="text-red-500 mt-6"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* SEO Tab */}
                  <TabsContent value="seo" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        placeholder="SEO title (optional)"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="SEO description (optional)"
                      />
                      <p className="text-xs text-gray-500 text-right">
                        Recommended: 150-160 characters
                      </p>
                    </div>

                    {/* SEO Preview */}
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-900 font-medium">
                          {formData.meta_title || formData.name || 'Product Title'}
                        </p>
                        <p className="text-xs text-green-700">
                          {window.location.origin}/products/{formData.slug || 'product-name'}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {formData.meta_description || formData.short_description || formData.description?.substring(0, 160) || 'Product description will appear here...'}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Status Card */}
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

                <Separator className="my-4" />

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Product ID</p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">
                    {productId}
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Category Info */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Category Info</h3>
                {formData.category_id ? (
                  <div>
                    <p className="text-sm font-medium">
                      {categories.find(c => c.id === formData.category_id)?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Category ID: {formData.category_id}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No category selected</p>
                )}
              </CardContent>
            </Card>

            {/* Sample Preview */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Sample Price Preview</h3>
                <div className="space-y-2">
                  {formData.sample_options
                    .filter(opt => opt.price > 0)
                    .map((opt, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span>{opt.quantity} {opt.unit}</span>
                        <Badge variant="outline" className="bg-blue-50">
                          AED {opt.price}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button 
              type="submit" 
              className="w-full"
              size="lg"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete Product
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{formData.name}</strong>? 
              This action cannot be undone. This will permanently delete the product
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Product'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}