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
  Sparkles
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

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "We maintain stringent quality control measures to ensure all products meet international standards. From raw materials to finished goods, every item is carefully inspected."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability & Ethics",
      description: "We promote sustainable practices from sourcing eco-friendly materials to ensuring fair trade, operating with strong environmental and social responsibility."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description: "Our extensive logistics network allows us to serve clients across the globe, ensuring timely deliveries and efficient operations worldwide."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer-Centric",
      description: "We prioritize building long-term relationships by offering personalized solutions that cater to our clients' unique requirements."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Our dedication to quality and customer satisfaction ensures we meet the highest standards in every market we serve."
    },
    {
      icon: <Ship className="h-8 w-8" />,
      title: "Global Reach",
      description: "From UAE to Africa, USA, UK, Canada, and beyond - we deliver excellence worldwide through our entity Sunrise Impex & General Trading FZ-LLC."
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
              About Sunrise Impex
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Trusted Partner in
              <span className="block text-blue-300">Global Trade & Commerce</span>
            </h1>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              With a broad portfolio of diverse products, we cater to industries ranging 
              from construction and health to agriculture and toys, delivering excellence worldwide.
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
                A Trusted Name in{" "}
                <span className="text-blue-600">International Trade</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Jaishnavi Exports, we pride ourselves on being a trusted and reliable partner 
                  in the world of international trade. With a broad portfolio of diverse products, 
                  we cater to industries ranging from construction and health to agriculture and toys.
                </p>
                <p>
                  We are committed to delivering excellence, ensuring that our clients worldwide 
                  receive high-quality goods that meet their specific needs. Our global reach and 
                  dedication to quality make us a leader in the import-export sector.
                </p>
                <p>
                  We at Jaishnavi Exports have an UAE entity by the name of <strong>Sunrise Impex & 
                  General Trading FZ-LLC</strong>. We have coverage in UAE from where we export 
                  products to other parts of the world like Africa, USA, UK, Canada and the rest 
                  of the world.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Fair Trade Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Global Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Global Trade"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Cards */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">UAE Entity</div>
                        <div className="text-xl font-bold text-gray-900">Sunrise Impex FZ-LLC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Our Commitment to{" "}
              <span className="text-blue-600">Excellence</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedication to quality, sustainability, and customer satisfaction ensures that 
              we meet the highest standards in every market we serve.
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
      <section className="py-20 bg-gray-50">
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
                  To deliver excellence in international trade by providing high-quality products 
                  that meet our clients' specific needs, while maintaining the highest standards 
                  of quality, sustainability, and customer satisfaction.
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
                  To be the most trusted partner in global trade, bridging markets worldwide 
                  through our UAE entity and beyond, while promoting sustainable and ethical 
                  business practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our global network of satisfied clients and experience the Jaishnavi Exports difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              <Link href="/products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border-2 border-white text-white hover:bg-white/10">
              <Link href="/contact">
                Contact Us Today
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
              <span className="font-bold text-xl">Jaishnavi Exports</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>info@jaishnaviexports.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>UAE & Global</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}