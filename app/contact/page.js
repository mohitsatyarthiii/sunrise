// app/contact/page.js
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  Globe,
  HeadphonesIcon,
  MessageSquare,
  Building2,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  const offices = [
    {
      city: "Ras Al Khaimah (UAE Headquarters)",
      address: "SBAM0345, Compass Building, AL Sahara Road, Al Hamra Industrial Zone, FZ, RAK, UAE",
      phone: "+971 58 238 1125",
      email: "uae@jaishnaviexports.com",
      timing: "Sun - Thu: 9:00 AM - 6:00 PM",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      city: "Ahmedabad Office",
      address: "320/321/322 Vishala Empire, SP Ring Road Touch, Near Dehgam Ring Road Circle, Ranasan Toll Plaza, Naroda, Ahmedabad, Gujarat 382330 India",
      phone: "+91 70487 37392",
      email: "india@jaishnaviexports.com",
      timing: "Mon - Fri: 9:30 AM - 6:30 PM",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      city: "USA Office",
      address: "8301 State Line RD. STE 220 #2632 Kansas City, Missouri 64114 Jackson, Missouri, USA",
      phone: "+1 (816) 123-4567",
      email: "usa@jaishnaviexports.com",
      timing: "Mon - Fri: 9:00 AM - 5:30 PM (CST)",
      icon: <Building2 className="h-6 w-6" />
    }
  ]

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["UAE: +971 58 238 1125", "India: +91 70487 37392"],
      action: "tel:+971582381125",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["info@jaishnaviexports.com", "sales@jaishnaviexports.com"],
      action: "mailto:info@jaishnaviexports.com",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "24/7 Support",
      details: ["WhatsApp: +971 58 238 1125", "Live Chat Available"],
      action: "#",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    }
  ]

  const faqs = [
    {
      question: "How quickly can I get a response?",
      answer: "We typically respond within 2-4 hours during business hours. For urgent inquiries, please use WhatsApp at +971 58 238 1125."
    },
    {
      question: "Do you offer sample orders?",
      answer: "Yes! We offer sample orders for all our products. Contact us with your requirements and we'll arrange samples."
    },
    {
      question: "What's your minimum order quantity?",
      answer: "MOQs vary by product. Contact our sales team for specific product requirements and pricing."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Contact Us Banner"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Get in Touch
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Let's Talk About Your
                <span className="block text-blue-300">Export Needs</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Whether you have a question about products, pricing, or partnerships — our team is ready to help.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-10">
            {contactInfo.map((item, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-4 ${item.textColor}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="space-y-1 mb-4">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                  <Link 
                    href={item.action}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Contact Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Us a Message
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                Have Questions? 
                <span className="block text-blue-600">We're Here to Help</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                    <p className="text-green-600">
                      Thank you for contacting us. Our team will respond within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 58 238 1125"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company LLC"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <Input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="United Arab Emirates"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Product Inquiry"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={6}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * Required fields. We'll respond within 24 hours.
                  </p>
                </form>
              )}
            </div>

            {/* Right Side - Map & Info */}
            <div className="space-y-8">
              {/* Map */}
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className="relative h-[300px] bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1333&q=80"
                    alt="World Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/20"></div>
                  
                  {/* Location Pins */}
                  <div className="absolute top-1/4 left-1/4">
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                      <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0"></div>
                    </div>
                  </div>
                  <div className="absolute top-1/3 right-1/3">
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                      <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4">
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                      <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0"></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Business Hours</h3>
                      <p className="text-sm text-gray-500">We're available 24/7 for urgent queries</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Sunday - Thursday (UAE)</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Friday - Saturday</span>
                      <span className="font-semibold text-green-600">24/7 Support</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Emergency Support</span>
                      <span className="font-semibold text-blue-600">+971 58 238 1125</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <Link href="#" className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Twitter className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Instagram className="h-6 w-6" />
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-blue-100">
                    Follow us for updates, news, and industry insights
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Global Presence
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-blue-600">Offices</span> Worldwide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at any of our locations or reach out to our regional teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      {office.icon}
                    </div>
                    <h3 className="text-xl font-bold">{office.city}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                      <p className="text-sm text-gray-600">{office.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                      <p className="text-sm text-gray-600">{office.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400 shrink-0" />
                      <p className="text-sm text-gray-600">{office.timing}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Get Directions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
                FAQ
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked 
                <span className="block text-blue-600">Questions</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Can't find what you're looking for? Contact our support team directly.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/help">
                  View All FAQs
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Export Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team is ready to help you find the perfect products for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
              <Link href="/about">
                Learn About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom Contact Bar */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl">Jaishnavi Exports</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>UAE: +971 58 238 1125</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>info@jaishnaviexports.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>UAE · India · USA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}