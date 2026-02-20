// app/blog/page.js
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Calendar,
  Clock,
  User,
  Eye,
  MessageCircle,
  Search,
  ArrowRight,
  ChevronRight,
  Sparkles,
  TrendingUp,
  BookOpen,
  Tag,
  Filter,
  X
} from 'lucide-react'
import { blogs, categories, popularTags } from './data/blogs'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleBlogs, setVisibleBlogs] = useState(6)

  // Filter blogs based on category and search
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const displayedBlogs = filteredBlogs.slice(0, visibleBlogs)
  const hasMore = visibleBlogs < filteredBlogs.length

  const loadMore = () => {
    setVisibleBlogs(prev => prev + 3)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
  }

  // Get featured blog (first one)
  const featuredBlog = blogs[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Blog Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
                <BookOpen className="h-4 w-4 mr-2" />
                Insights & Updates
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Trade Insights
                <span className="block text-blue-300">Blog</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Expert insights, market trends, and guides for successful international trade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && !searchQuery && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>

            <Link href={`/blog/${featuredBlog.slug}`}>
              <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-[300px] md:h-full">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white border-none">
                        {featuredBlog.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredBlog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredBlog.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{featuredBlog.author}</p>
                          <p className="text-sm text-gray-500">{featuredBlog.authorRole}</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="group">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.slice(0, 10).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
                          onClick={() => setSearchQuery(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">Subscribe to Newsletter</h3>
                    <p className="text-sm text-blue-100 mb-4">
                      Get latest insights and updates directly in your inbox
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

            {/* Blog Grid */}
            <div className="lg:col-span-3">
              {/* Active Filters */}
              {(selectedCategory !== "All" || searchQuery) && (
                <div className="mb-6 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {selectedCategory !== "All" && (
                    <Badge className="bg-blue-600 text-white">
                      {selectedCategory}
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge className="bg-blue-600 text-white">
                      Search: {searchQuery}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500"
                  >
                    Clear all
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <p className="text-gray-600 mb-6">
                Showing {displayedBlogs.length} of {filteredBlogs.length} articles
              </p>

              {/* Blog Cards */}
              <div className="space-y-6">
                {displayedBlogs.map((blog) => (
                  <Link key={blog.id} href={`/blog/${blog.slug}`}>
                    <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-72 h-48 md:h-auto">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className="absolute top-4 left-4 bg-blue-600 text-white border-none">
                            {blog.category}
                          </Badge>
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {blog.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {blog.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="text-sm font-medium">{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {blog.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {blog.comments}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-8">
                  <Button
                    onClick={loadMore}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Load More Articles
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* No Results */}
              {displayedBlogs.length === 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Share your expertise with our community of trade professionals
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">
              Write for Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}