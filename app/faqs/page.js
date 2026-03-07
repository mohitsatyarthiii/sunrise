// app/faqs/page.js
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  Package,
  Truck,
  Shield,
  CreditCard,
  Globe,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const faqCategories = [
  { id: 'all', name: 'All Questions', icon: HelpCircle },
  { id: 'orders', name: 'Orders & Pricing', icon: Package },
  { id: 'shipping', name: 'Shipping & Delivery', icon: Truck },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'products', name: 'Products & Quality', icon: Shield },
  { id: 'company', name: 'Company', icon: Globe },
]

const faqs = [
  {
    id: 1,
    question: "What products do you export?",
    answer: "We export a wide range of products including textiles, spices, handicrafts, leather goods, agricultural products, and more. Visit our Products page to see our full catalog.",
    category: 'products'
  },
  {
    id: 2,
    question: "Do you offer sample orders?",
    answer: "Yes! We offer sample orders for all our products. Sample costs are typically deducted from the final order amount. Contact our sales team with your requirements.",
    category: 'orders'
  },
  {
    id: 3,
    question: "What is your minimum order quantity (MOQ)?",
    answer: "MOQs vary by product category. Generally, we accept orders starting from 100 units for most products. Contact us for specific product MOQs.",
    category: 'orders'
  },
  {
    id: 4,
    question: "Which countries do you ship to?",
    answer: "We ship worldwide! Our primary markets include UAE, India, USA, UK, Canada, Africa, and Europe. Contact us for shipping to your specific location.",
    category: 'shipping'
  },
  {
    id: 5,
    question: "How long does shipping take?",
    answer: "Shipping times vary by destination: UAE (2-3 days), USA/UK/Europe (5-7 days), Africa (7-10 days), Rest of World (10-14 days). Express shipping options available.",
    category: 'shipping'
  },
  {
    id: 6,
    question: "What shipping methods do you use?",
    answer: "We offer air freight, sea freight, and courier services (DHL, FedEx, UPS). The best method depends on your order size and urgency.",
    category: 'shipping'
  },
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer: "We accept Bank Transfer (TT), Letter of Credit (LC), PayPal, and Credit Cards. For large orders, we offer flexible payment terms.",
    category: 'payments'
  },
  {
    id: 8,
    question: "Do you offer trade credit?",
    answer: "Yes, for established clients with good payment history, we offer credit terms. Please contact our finance team to discuss.",
    category: 'payments'
  },
  {
    id: 9,
    question: "How do you ensure product quality?",
    answer: "We have strict quality control measures at every stage - from raw material inspection to final product testing. All products meet international standards.",
    category: 'products'
  },
  {
    id: 10,
    question: "Do you provide quality certificates?",
    answer: "Yes, we provide quality certificates, test reports, and compliance documentation for all shipments as required.",
    category: 'products'
  },
  {
    id: 11,
    question: "Are your products sustainable?",
    answer: "We're committed to sustainability. We source eco-friendly materials, ensure fair trade practices, and work with certified suppliers.",
    category: 'products'
  },
  {
    id: 12,
    question: "Where are your offices located?",
    answer: "We have offices in UAE (RAK), India (Ahmedabad), and USA (Kansas City, Missouri). Our UAE entity is Sunrise Impex & General Trading FZ-LLC.",
    category: 'company'
  },
  {
    id: 13,
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard.",
    category: 'shipping'
  },
  {
    id: 14,
    question: "What if my order is damaged?",
    answer: "We carefully package all shipments. In case of damage, contact us within 48 hours of receipt with photos, and we'll resolve it quickly.",
    category: 'shipping'
  },
  {
    id: 15,
    question: "Do you offer customized products?",
    answer: "Yes! We offer customization for many products including packaging, labeling, and product specifications. Minimum quantities apply.",
    category: 'products'
  }
]

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaqs, setOpenFaqs] = useState([])

  const toggleFaq = (id) => {
    setOpenFaqs(prev => 
      prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]
    )
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimal */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to common questions about our products, shipping, payments, and more
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {faqCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                      {openFaqs.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaqs.includes(faq.id) && (
                      <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            {faqCategories.find(c => c.id === faq.category)?.name}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="tel:+971582381125">
                <Phone className="mr-2 h-4 w-4" />
                Call Us: +971 58 238 1125
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}