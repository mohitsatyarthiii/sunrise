// app/about/page.js
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  Globe, 
  Shield, 
  Truck, 
  Clock,
  Award,
  Users,
  Target,
  Eye,
  Heart,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Building2,
  TrendingUp,
  Handshake,
  Leaf,
  Factory,
  Ship,
  Warehouse,
  BarChart3,
  HeadphonesIcon,
  Sparkles,
  ChevronRight
} from 'lucide-react'

export default function AboutPage() {
  const [stats, setStats] = useState({
    years: 12,
    clients: 5000,
    countries: 35,
    shipments: 15000,
    products: 5000,
    satisfaction: 98
  })

  const milestones = [
    {
      year: "2012",
      title: "Company Founded",
      description: "Sunrise Impex established in Dubai, UAE",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      year: "2015",
      title: "Global Expansion",
      description: "Expanded operations to 15+ countries",
      icon: <Globe className="h-6 w-6" />
    },
    {
      year: "2018",
      title: "ISO Certification",
      description: "Achieved ISO 9001:2015 certification",
      icon: <Award className="h-6 w-6" />
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online sample ordering platform",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      year: "2022",
      title: "Major Milestone",
      description: "10,000+ successful shipments completed",
      icon: <Ship className="h-6 w-6" />
    },
    {
      year: "2024",
      title: "Global Leader",
      description: "Trusted partner in 35+ countries worldwide",
      icon: <Award className="h-6 w-6" />
    }
  ]

  const team = [
    {
      name: "Rajesh Mehta",
      position: "Founder & CEO",
      experience: "25+ years in international trade",
      image: "/team/rajesh.jpg",
      linkedin: "#"
    },
    {
      name: "Priya Sharma",
      position: "Director of Operations",
      experience: "18+ years in logistics",
      image: "/team/priya.jpg",
      linkedin: "#"
    },
    {
      name: "Ahmed Al Mansouri",
      position: "Head of Global Sales",
      experience: "20+ years in export management",
      image: "/team/ahmed.jpg",
      linkedin: "#"
    },
    {
      name: "Sarah Chen",
      position: "Quality Assurance Director",
      experience: "15+ years in quality control",
      image: "/team/sarah.jpg",
      linkedin: "#"
    }
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity",
      description: "We conduct business with unwavering honesty and transparency, building trust with every partnership."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service, from product quality to customer support."
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Partnership",
      description: "We believe in long-term relationships, growing together with our clients and suppliers."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously evolve with global trade trends and technology to serve you better."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description: "We're committed to ethical sourcing and environmentally responsible practices."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer-Centric",
      description: "Your success is our success. We put our clients' needs at the heart of everything we do."
    }
  ]

  const certifications = [
    { name: "ISO 9001:2024", icon: <Award className="h-8 w-8" /> },
    { name: "IATF 16949", icon: <Shield className="h-8 w-8" /> },
    { name: "REACH Compliant", icon: <Leaf className="h-8 w-8" /> },
    { name: "RoHS Certified", icon: <CheckCircle className="h-8 w-8" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              About Sunrise Impex
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Trusted Partner in
              <span className="block text-blue-300">Global Trade Since 2012</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We bridge continents through quality exports, building lasting partnerships 
              and delivering excellence to businesses worldwide.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { value: stats.years, label: "Years of Excellence", suffix: "+" },
              { value: stats.clients, label: "Happy Clients", suffix: "+" },
              { value: stats.countries, label: "Countries", suffix: "+" },
              { value: stats.shipments, label: "Shipments", suffix: "+" },
              { value: stats.products, label: "Products", suffix: "+" },
              { value: stats.satisfaction, label: "Satisfaction", suffix: "%" }
            ].map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
                Our Story
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                From Dubai to the World:{" "}
                <span className="text-blue-600">A Journey of Excellence</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2012 by Rajesh Mehta, Sunrise Impex began with a simple vision: 
                  to connect global businesses with premium export products from the UAE. What 
                  started as a small trading operation has grown into a trusted name in 
                  international trade.
                </p>
                <p>
                  Today, we serve over 5,000 clients across 35+ countries, offering a diverse 
                  portfolio of 5,000+ products. Our success is built on unwavering commitment 
                  to quality, transparent business practices, and deep understanding of global 
                  markets.
                </p>
                <p>
                  We believe in more than just transactions – we build partnerships that last. 
                  Every product we export carries our promise of quality, and every client 
                  relationship reflects our dedication to their success.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                <p className="text-lg italic text-gray-700">
                  "Our mission is to make global trade accessible, reliable, and profitable 
                  for businesses of all sizes. We're not just exporters – we're your growth 
                  partners."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    RM
                  </div>
                  <div>
                    <div className="font-semibold">Rajesh Mehta</div>
                    <div className="text-sm text-gray-500">Founder & CEO</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Dubai Port"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Cards */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Global Presence</div>
                        <div className="text-xl font-bold text-gray-900">35+ Countries</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold">12+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  To empower businesses worldwide with seamless access to premium export products, 
                  fostering sustainable growth through quality, reliability, and innovation in 
                  global trade.
                </p>
                <ul className="space-y-3">
                  {[
                    "Deliver uncompromising quality in every shipment",
                    "Build lasting partnerships through transparency",
                    "Innovate trade processes for efficiency",
                    "Promote sustainable and ethical sourcing"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  To become the world's most trusted bridge between markets, setting new 
                  standards in export excellence and creating a global community of successful 
                  trading partners.
                </p>
                <ul className="space-y-3">
                  {[
                    "Global leader in export solutions",
                    "Network of 100+ countries by 2030",
                    "Pioneer in sustainable trade practices",
                    "Most trusted brand in international trade"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Our Core Values
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              What Drives Us <span className="text-blue-600">Every Day</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every relationship we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Key <span className="text-blue-600">Milestones</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A decade of growth, achievements, and milestones that shaped our success
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-500 to-blue-200 hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden lg:block"></div>

                  {/* Content */}
                  <div className="lg:w-1/2">
                    <Card className={`border-0 shadow-xl hover:shadow-2xl transition-all ${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            {milestone.icon}
                          </div>
                          <div>
                            <Badge className="bg-blue-600 text-white border-none">
                              {milestone.year}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Our Certifications & Accreditations</h3>
            <p className="text-gray-600">We maintain the highest international standards</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600 group-hover:text-blue-700 group-hover:shadow-xl transition-all mb-3">
                  {cert.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Leadership Team
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Meet the <span className="text-blue-600">Experts</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Seasoned professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-blue-600 to-indigo-600">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm text-blue-100">{member.position}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 mb-4">{member.experience}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="w-10 p-0">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                Why Choose Us
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                The Sunrise Impex <span className="text-blue-200">Difference</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                What sets us apart in the competitive world of international trade
              </p>

              <div className="space-y-4">
                {[
                  "End-to-end quality control across all products",
                  "Dedicated account managers for personalized service",
                  "Competitive pricing through direct manufacturer partnerships",
                  "Flexible shipping solutions tailored to your needs",
                  "Real-time shipment tracking and updates",
                  "Comprehensive after-sales support"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-300 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/contact">
                    Partner With Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Truck className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-semibold mb-1">Express Shipping</h3>
                  <p className="text-sm text-blue-100">5-7 day delivery</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-semibold mb-1">Quality Assured</h3>
                  <p className="text-sm text-blue-100">100% inspection</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <HeadphonesIcon className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-semibold mb-1">24/7 Support</h3>
                  <p className="text-sm text-blue-100">Always available</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <Handshake className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h3 className="font-semibold mb-1">Best Prices</h3>
                  <p className="text-sm text-blue-100">Direct from source</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Export Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful businesses that trust Sunrise Impex for their global trade needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              <Link href="/products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-gray-300">
              <Link href="/contact">
                Contact Sales Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-400" />
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
          </div>
        </div>
      </section>
    </div>
  )
}