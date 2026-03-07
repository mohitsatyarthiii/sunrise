// app/terms/page.js
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Shield, 
  Scale,
  Clock,
  Globe,
  CreditCard,
  Truck,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge className="mb-4 bg-gray-100 text-gray-700 border-none px-4 py-2">
            <FileText className="h-4 w-4 mr-2" />
            Terms & Conditions
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
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
                <Scale className="h-5 w-5 text-gray-500" />
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to SunriseImpexLLC. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before placing an order.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definitions</h2>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-medium text-gray-900">"Company"</span> refers to UAE entity Sunrise Impex & General Trading FZ-LLC.</li>
                <li><span className="font-medium text-gray-900">"Customer"</span> refers to the individual or business placing an order.</li>
                <li><span className="font-medium text-gray-900">"Products"</span> refers to all goods offered for sale on our platform.</li>
              </ul>
            </div>

            {/* Orders */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                3. Orders & Acceptance
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                All orders are subject to acceptance and availability. We reserve the right to refuse any order without providing a reason. Once an order is placed, you will receive a confirmation email with order details.
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Pricing & Payment</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                All prices are in USD unless stated otherwise. Prices may change without notice. Payment must be received in full before shipment. We accept bank transfers, letters of credit, and major credit cards.
              </p>
            </div>

            {/* Shipping */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-gray-500" />
                5. Shipping & Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Shipping times are estimates and not guaranteed. Risk of loss passes to customer upon delivery to carrier. Customer is responsible for all import duties and taxes.
              </p>
            </div>

            {/* Returns */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Returns & Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Claims for damaged or defective goods must be reported within 48 hours of receipt. Returns accepted only with prior authorization. Refunds processed after inspection.
              </p>
            </div>

            {/* Quality */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-500" />
                7. Quality Assurance
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                All products meet international quality standards. Samples available before bulk orders. Final acceptance based on approved samples.
              </p>
            </div>

            {/* Liability */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Company liability is limited to invoice value. Not liable for indirect, incidental, or consequential damages. Force majeure events exempt liability.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-500" />
                9. Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                These terms are governed by the laws of UAE. Any disputes shall be resolved in RAK courts.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                For questions about these terms, contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    info@sunriseimpexllc.com
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    UAE: +971 58 238 1125
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    India: +91 70487 37392
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-100">
            <Button asChild variant="outline">
              <Link href="/privacy">
                Privacy Policy
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