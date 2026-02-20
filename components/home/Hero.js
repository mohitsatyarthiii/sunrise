// components/home/Hero.js
'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Truck, Star, Sparkles, CheckCircle, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Premium Exporter Since 2012</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Global Trade 
              <span className="block text-blue-600">Simplified with</span>
              <span className="block text-blue-600">Sunrise Impex</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your trusted partner for high-quality export products from the UAE. 
              We connect businesses worldwide with premium products through our 
              sample-first approach.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base"
              >
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-base"
              >
                <Link href="/contact">
                  Talk to Expert
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">5000+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">35+</div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12+</div>
                <div className="text-sm text-gray-500">Years</div>
              </div>
            </div>

            {/* Feature List */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Free Samples</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Global Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Global Shipping Container"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              
              {/* Video Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Play className="h-5 w-5 text-white ml-1" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Watch Our Story</div>
                  <div className="text-xs text-gray-500">2 min video</div>
                </div>
              </div>
            </div>

            {/* Stats Card - Floating */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Express Delivery</div>
                  <div className="text-lg font-bold text-gray-900">5-7 Days</div>
                </div>
              </div>
            </div>

            {/* Trust Badge - Floating */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 hidden lg:block">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-xs text-gray-500">Quality</div>
                  <div className="text-sm font-bold text-gray-900">100% Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"></div>
    </section>
  )
}