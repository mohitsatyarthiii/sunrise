// app/about/page.js
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Globe, 
  Shield, 
  Truck, 
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
  Leaf,
  Ship,
  HeadphonesIcon,
  Sparkles,
  Briefcase,
  Network,
  TrendingUp
} from 'lucide-react'

export default function AboutPage() {
  const [stats, setStats] = useState({
    years: 8,
    clients: 2500,
    countries: 25,
    shipments: 8000,
    products: 3000,
    satisfaction: 98
  })

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "We maintain stringent quality control measures to ensure all products meet international standards. Every shipment is carefully inspected before dispatch."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description: "Committed to eco-friendly practices and ethical sourcing, we ensure our operations benefit both communities and the environment."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description: "Strategic location in UAE gives us access to world-class logistics, serving markets across Middle East, Africa, Europe, and Americas."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Client Focus",
      description: "We build lasting partnerships through personalized solutions, understanding each client's unique requirements and market needs."
    },
    {
      icon: <Ship className="h-8 w-8" />,
      title: "Logistics Excellence",
      description: "End-to-end shipping solutions with reliable partners ensure timely delivery to any destination worldwide."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Expertise",
      description: "Deep understanding of global trade dynamics helps clients navigate complex international markets successfully."
    }
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
              Welcome to Sunrise Impex
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to
              <span className="block text-blue-300">Global Trade Excellence</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Based in the heart of UAE's trading hub, we connect businesses worldwide 
              with quality products, reliable logistics, and unmatched market expertise.
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
              { value: stats.countries, label: "Countries Served", suffix: "+" },
              { value: stats.shipments, label: "Shipments Delivered", suffix: "+" },
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

      {/* Who We Are Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
                Who We Are
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-blue-600">Sunrise Impex</span> – Your Trusted 
                <span className="block">Trade Partner in UAE</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>Sunrise Impex & General Trading FZ-LLC</strong> is a premier trading company 
                  based in the United Arab Emirates, strategically positioned in one of the world's 
                  most dynamic trading hubs. We specialize in bridging markets across the globe, 
                  offering a diverse portfolio of products ranging from agricultural commodities 
                  and spices to health supplements and industrial goods.
                </p>
                <p>
                  Our UAE base provides us with unparalleled access to world-class logistics, 
                  banking, and trade infrastructure, enabling us to serve clients across the 
                  Middle East, Africa, Europe, Asia, and the Americas with efficiency and reliability.
                </p>
                <p>
                  As part of our commitment to serving diverse markets, we operate through our 
                  subsidiary, <strong>Jaishnavi Exports</strong>, which handles specific regional 
                  requirements and specialized product categories. This dual-entity structure 
                  allows us to offer comprehensive solutions while maintaining focused expertise 
                  in each segment.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">UAE Free Zone Company</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Global Trade License</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Multi-Industry Expertise</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">24/7 Client Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Dubai Skyline - UAE Trading Hub"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Floating Cards */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Headquarters</div>
                        <div className="text-lg font-bold text-gray-900">Sunrise Impex FZ-LLC</div>
                        <div className="text-xs text-gray-500">Dubai, United Arab Emirates</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Structure Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-none px-4 py-2">
              <Network className="h-4 w-4 mr-2" />
              Our Group Structure
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Integrated Network, <span className="text-purple-600">Unified Vision</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Sunrise Impex FZ-LLC</h3>
                <p className="text-sm text-blue-600 mb-4">(Parent Company - UAE)</p>
                <p className="text-gray-600">
                  Our flagship entity based in Dubai, handling global operations, 
                  international logistics, and serving as the primary trading hub for 
                  markets across Middle East, Africa, Europe, and Americas.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-700">Global Trading</Badge>
                  <Badge className="bg-blue-100 text-blue-700">Logistics Hub</Badge>
                  <Badge className="bg-blue-100 text-blue-700">Strategic Location</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-600 to-teal-600"></div>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Jaishnavi Exports</h3>
                <p className="text-sm text-green-600 mb-4">(Subsidiary - India Operations)</p>
                <p className="text-gray-600">
                  Our specialized subsidiary focused on specific regional requirements, 
                  handling product sourcing, quality control, and serving niche markets 
                  with dedicated expertise and local market knowledge.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-700">Product Sourcing</Badge>
                  <Badge className="bg-green-100 text-green-700">Quality Control</Badge>
                  <Badge className="bg-green-100 text-green-700">Regional Focus</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Why Choose Sunrise Impex
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              What Makes Us <span className="text-blue-600">Different</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our strategic location, comprehensive network, and commitment to excellence 
              set us apart in the competitive world of international trade.
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
                <p className="text-gray-600 leading-relaxed">
                  To empower global trade by providing seamless connectivity between markets, 
                  delivering quality products with integrity, and fostering lasting partnerships 
                  built on trust and mutual growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the most trusted bridge between Eastern and Western markets, 
                  recognized for excellence, innovation, and our commitment to sustainable 
                  and ethical trade practices worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Global Trade Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let Sunrise Impex be your trusted partner in navigating international markets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              <Link href="/products">
                Explore Our Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border-2 border-white text-white hover:bg-white/10">
              <Link href="/contact">
                Get in Touch
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
              <div>
                <span className="font-bold text-xl">Sunrise Impex & General Trading FZ-LLC</span>
                <span className="text-sm text-gray-400 block">Your Global Trade Partner</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>info@sunriseimpex.ae</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-4">
            Jaishnavi Exports is a subsidiary of Sunrise Impex & General Trading FZ-LLC
          </div>
        </div>
      </section>
    </div>
  )
}