// app/privacy/page.js
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Lock,
  Eye,
  Mail,
  Phone,
  Globe,
  ArrowRight
} from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge className="mb-4 bg-gray-100 text-gray-700 border-none px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Policy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-gray max-w-none">
            {/* Introduction */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-gray-500" />
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Sunrise Impex & General Trading FZ-LLC, we respect your privacy. This policy explains how we collect, use, and protect your personal information when you use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Name, email, phone number, company details</li>
                <li>Shipping and billing addresses</li>
                <li>Order history and preferences</li>
                <li>Communication records with our team</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Process and fulfill your orders</li>
                <li>Communicate about your orders and inquiries</li>
                <li>Improve our products and services</li>
                <li>Send updates and offers (with consent)</li>
                <li>Comply with legal requirements</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We do not sell your personal information. We may share with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Shipping partners for delivery</li>
                <li>Payment processors for transactions</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-500" />
                5. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your data. All transactions are encrypted using SSL technology.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website uses cookies to improve user experience. You can disable cookies in your browser settings.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>

            {/* Changes to Policy */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this policy periodically. Changes will be posted on this page with an updated revision date.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                For privacy-related questions, contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    info@sunriseimpexllc.com
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    +971 58 238 1125
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Globe className="h-4 w-4 text-gray-400" />
                    www.sunriseimpexllc.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-100">
            <Button asChild variant="outline">
              <Link href="/terms">
                Terms & Conditions
              </Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}