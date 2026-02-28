'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Globe,
  Send
} from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ],
  products: [
    { name: 'All Products', href: '/products' },
    { name: 'Textiles', href: '/categories/textiles' },
    { name: 'Spices', href: '/categories/spices' },
    { name: 'Handicrafts', href: '/categories/handicrafts' },
    { name: 'Leather Goods', href: '/categories/leather-goods' },
  ],
  support: [
    { name: 'FAQs', href: '/faqs' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
]

const offices = [
  {
    country: 'UAE',
    address: 'Compass Building, Al Hamra Industrial Zone, RAK',
    phone: '+971 58 238 1125',
    email: 'uae@jaishnaviexports.com',
  },
  {
    country: 'India',
    address: 'Vishala Empire, Naroda, Ahmedabad, Gujarat 382330',
    phone: '+91 70487 37392',
    email: 'india@jaishnaviexports.com',
  },
  {
    country: 'USA',
    address: '8301 State Line RD. STE 220, Kansas City, Missouri 64114',
    phone: '+1 (816) 123-4567',
    email: 'usa@jaishnaviexports.com',
  }
]

export default function Footer() {

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    alert('Subscribed successfully!')
  }

  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#0b1b34] to-[#081226] text-gray-300">
      
      <div className="container mx-auto px-6 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-14 mb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-2xl text-white">
                Jaishnavi <span className="text-blue-400">Exports</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Supplying premium export products from UAE, India & USA to global markets with trust, quality and commitment.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4 text-gray-300" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {[ 
            { title: "Company", links: footerLinks.company },
            { title: "Products", links: footerLinks.products },
            { title: "Support", links: footerLinks.support }
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-6 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Offices Section */}
        <div className="border-t border-white/10 pt-14 grid grid-cols-1 md:grid-cols-3 gap-10">

          {offices.map((office, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <h4 className="text-white font-medium">{office.country}</h4>
              </div>

              <p className="text-sm text-gray-400 mb-4">
                {office.address}
              </p>

              <div className="text-sm space-y-1">
                <a href={`tel:${office.phone}`} className="block hover:text-blue-400">
                  {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="block hover:text-blue-400">
                  {office.email}
                </a>
              </div>
            </div>
          ))}

        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 mt-16 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <h4 className="text-white text-lg font-semibold mb-2">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-400">
                Subscribe to receive latest export updates & offers.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-r-none w-72"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-3">

          <p>© {new Date().getFullYear()} Jaishnavi Exports. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>
              Maintained by{" "}
              <a href="https://editvo.com" className="text-blue-400 hover:underline">
                Editvo
              </a>
            </span>
          </div>

        </div>
      </div>

    </footer>
  )
}