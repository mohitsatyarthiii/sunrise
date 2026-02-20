// app/page.js
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ChevronRight, 
  Globe, 
  Shield, 
  Truck, 
  Clock,
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Package,
  Award,
  TrendingUp,
  Users,
  Leaf,
  Sparkles,
  Heart,
  CheckCircle,
  Sun,
  Droplets,
  Factory,
  Ship,
  Warehouse,
  BarChart3,
  HeadphonesIcon,
  Gift,
  ThumbsUp,
  Coffee,
  Zap,
  ShieldCheck,
  Lock,
  RefreshCw,
  DollarSign
} from 'lucide-react'
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [stats, setStats] = useState({
    products: 0,
    clients: 0,
    countries: 0,
    years: 0,
    shipments: 0,
    satisfaction: 0
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch featured products
        const { data: products } = await supabase
          .from('products')
          .select(`
            *,
            categories (
              name,
              slug
            )
          `)
          .eq('is_featured', true)
          .eq('is_active', true)
          .limit(8)
        
        setFeaturedProducts(products || [])

        // Fetch categories with product count and images
        const { data: cats } = await supabase
          .from('categories')
          .select(`
            *,
            products:products (count)
          `)
          .eq('is_active', true)
          .limit(8)
        
        // Add placeholder images for categories (in production, these would come from your database)
        const categoriesWithImages = (cats || []).map((cat, index) => ({
          ...cat,
          image: `/images/categories/cat-${index + 1}.jpg` // Replace with actual image URLs
        }))
        
        setCategories(categoriesWithImages)

        // Fetch testimonials (you'd have a testimonials table in production)
        const mockTestimonials = [
          {
            id: 1,
            name: "Ahmed Al Mansouri",
            company: "Gulf Traders LLC",
            location: "Dubai, UAE",
            rating: 5,
            comment: "Sunrise Impex has been our trusted partner for over 5 years. Their quality control and timely delivery are unmatched in the industry.",
            image: "/images/testimonials/client1.jpg"
          },
          {
            id: 2,
            name: "Sarah Johnson",
            company: "EuroMart International",
            location: "London, UK",
            rating: 5,
            comment: "The sample ordering process is seamless. We've built a strong partnership and their products consistently exceed expectations.",
            image: "/images/testimonials/client2.jpg"
          },
          {
            id: 3,
            name: "Rajesh Kumar",
            company: "Asian Exports Ltd",
            location: "Mumbai, India",
            rating: 5,
            comment: "Outstanding product range and professional service. They understand the export business inside out.",
            image: "/images/testimonials/client3.jpg"
          },
          {
            id: 4,
            name: "Maria Garcia",
            company: "Iberia Trading Co.",
            location: "Madrid, Spain",
            rating: 5,
            comment: "The team at Sunrise Impex goes above and beyond. Their market knowledge and support are invaluable.",
            image: "/images/testimonials/client4.jpg"
          }
        ]
        
        setTestimonials(mockTestimonials)

        // Get total products count
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        // Get total users count (clients)
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        setStats({
          products: productsCount || 0,
          clients: usersCount || 0,
          countries: 35, // Updated
          years: 12, // Updated
          shipments: 5000, // Mock data
          satisfaction: 98 // Mock data
        })
      } catch (error) {
        console.error('Error fetching home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-gray-600">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">ISO 9001:2024 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Lock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">100% Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <RefreshCw className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HeadphonesIcon className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-700 border-none px-4 py-2">
                <Star className="h-4 w-4 mr-2 fill-amber-500" />
                Hand-Picked Selection
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Premium quality products trusted by global buyers
              </p>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="mt-4 md:mt-0 border-2 hover:bg-blue-50 group"
              asChild
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <FeaturedProducts />

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.products}+</div>
              <div className="text-gray-600">Active Products</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.shipments}+</div>
              <div className="text-gray-600">Successful Shipments</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.satisfaction}%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.countries}+</div>
              <div className="text-gray-600">Export Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Sunrise Impex */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              Why Global Traders Trust Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Sunrise Impex <span className="text-blue-300">Advantage</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Delivering excellence in export since 2012 with unwavering commitment to quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8" />,
                title: "Premium Quality",
                description: "Rigorous quality checks at every stage",
                features: ["ISO Certified", "Lab Tested", "Premium Grade"]
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Network",
                description: "Strong presence in 35+ countries",
                features: ["Worldwide Shipping", "Customs Expertise", "Local Support"]
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure Trading",
                description: "Safe and transparent transactions",
                features: ["Escrow Service", "Secure Payments", "Trade Protection"]
              },
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Logistics Excellence",
                description: "Efficient supply chain management",
                features: ["Express Shipping", "Real-time Tracking", "Warehousing"]
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Expert Team",
                description: "Dedicated export professionals",
                features: ["24/7 Support", "Trade Advisors", "Multi-lingual"]
              },
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Sustainable Sourcing",
                description: "Ethical and eco-friendly practices",
                features: ["Eco-certified", "Fair Trade", "Green Logistics"]
              },
              {
                icon: <Factory className="h-8 w-8" />,
                title: "Direct Partnerships",
                description: "Working with top manufacturers",
                features: ["Factory Audited", "Direct Sourcing", "Best Pricing"]
              },
              {
                icon: <Ship className="h-8 w-8" />,
                title: "Bulk Shipping",
                description: "Flexible shipping solutions",
                features: ["FCL/LCL", "Air Freight", "Door-to-Door"]
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4 text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-blue-100">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-none px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Simple 3-Step Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Start Your Export Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From sample order to bulk shipping - we make it easy
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: "01",
                  title: "Browse & Select",
                  description: "Explore our extensive catalog of premium products across multiple categories",
                  icon: <Package className="h-12 w-12" />,
                  features: ["1000+ Products", "Filter by Category", "Compare Items"]
                },
                {
                  step: "02",
                  title: "Order Samples",
                  description: "Test quality with sample orders before committing to bulk purchases",
                  icon: <Gift className="h-12 w-12" />,
                  features: ["Express Sampling", "Quality Check", "Bulk Discounts"]
                },
                {
                  step: "03",
                  title: "Scale Your Business",
                  description: "Move to bulk orders with our seamless export and logistics support",
                  icon: <TrendingUp className="h-12 w-12" />,
                  features: ["Bulk Pricing", "Global Shipping", "Ongoing Support"]
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <Card className="relative bg-white border-2 hover:border-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                      {/* Step Number */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      
                      {/* Features */}
                      <ul className="space-y-2">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/how-it-works">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-none px-4 py-2">
              <Star className="h-4 w-4 mr-2 fill-purple-500" />
              Client Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Trusted by Global Partners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join 5000+ satisfied clients who've grown their business with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-gray-200 group-hover:text-blue-100 transition-colors">
                    <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-6 line-clamp-4 relative z-10">
                    "{testimonial.comment}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                      <p className="text-xs text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Users className="h-6 w-6" />, value: "5000+", label: "Happy Clients" },
              { icon: <Globe className="h-6 w-6" />, value: "35+", label: "Countries" },
              { icon: <ThumbsUp className="h-6 w-6" />, value: "98%", label: "Satisfaction" },
              { icon: <Award className="h-6 w-6" />, value: "12+", label: "Years" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

  

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Start Your Export Journey Today
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Scale Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of successful exporters who've partnered with Sunrise Impex for premium products and reliable service
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg group" asChild>
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
              <Link href="/contact">
                Talk to an Expert
              </Link>
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Truck className="h-5 w-5" />, text: "Free Shipping on Samples" },
              { icon: <Shield className="h-5 w-5" />, text: "Money-back Guarantee" },
              { icon: <Clock className="h-5 w-5" />, text: "24/7 Support" },
              { icon: <DollarSign className="h-5 w-5" />, text: "Best Price Guarantee" }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-sm text-blue-100">
                {benefit.icon}
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Mail className="h-4 w-4 mr-2" />
              Stay Updated
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Get weekly updates on new products, market trends, and exclusive offers
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10 py-6 text-lg border-2 focus:border-blue-500"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg">
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <p className="text-sm text-gray-500">
              Join 10,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-yellow-400" />
              <span className="font-bold text-xl">Sunrise Impex</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>info@sunriseimpex.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Dubai, UAE</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}