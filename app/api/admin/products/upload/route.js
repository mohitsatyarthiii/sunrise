import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Please upload an image file' },
        { status: 400 }
      )
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image size should be less than 5MB' },
        { status: 400 }
      )
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = path.join(process.cwd(), 'public/uploads/products', fileName)
    
    // Ensure directory exists
    await mkdir(path.dirname(filePath), { recursive: true })
    
    // Save file
    await writeFile(filePath, buffer)
    
    // Return public URL
    const publicUrl = `/uploads/products/${fileName}`
    
    // Optional: Upload to Supabase Storage instead
    /*
    const supabase = await createServerClient()
    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600'
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)
    */
    
    return NextResponse.json({ url: publicUrl })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    )
  }
}