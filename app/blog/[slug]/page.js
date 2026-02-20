// app/blog/[slug]/page.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar,
  Clock,
  User,
  Eye,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  Heart,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  Tag
} from 'lucide-react'
import { blogs } from '../data/blogs'
import { Input } from '@/components/ui/input'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    // Find current blog
    const currentBlog = blogs.find(b => b.slug === params.slug)
    if (!currentBlog) {
      router.push('/blog')
      return
    }
    setBlog(currentBlog)

    // Find related posts (same category, excluding current)
    const related = blogs
      .filter(b => b.category === currentBlog.category && b.id !== currentBlog.id)
      .slice(0, 3)
    setRelatedPosts(related)
  }, [params.slug, router])

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 py-12">
            <Link 
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <Badge className="bg-blue-600 text-white border-none mb-4">
              {blog.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                        {blog.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{blog.author}</h3>
                      <p className="text-gray-500">{blog.authorRole}</p>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag className="h-5 w-5 text-gray-400" />
                      {blog.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="hover:bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">Share this article:</span>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Facebook className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Twitter className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Linkedin className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Mail className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((post) => (
                          <Link key={post.id} href={`/blog/${post.slug}`}>
                            <div className="group flex gap-3">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                  {post.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Newsletter */}
                <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">Subscribe to Newsletter</h3>
                    <p className="text-sm text-blue-100 mb-4">
                      Get latest insights directly in your inbox
                    </p>
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="mb-3 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                    />
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}