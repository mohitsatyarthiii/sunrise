import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sunrise Impex - Premium Export Products from UAE',
  description: 'Discover high-quality export products from UAE. Order samples, get quotes, and start your export journey with us.',
  keywords: 'export, uae, dubai, products, textiles, spices, handicrafts, leather goods',
  openGraph: {
    title: 'ExportEcom - Premium Export Products from UAE',
    description: 'Discover high-quality export products from UAE. Order samples, get quotes, and start your export journey with us.',
    url: 'https://exportecom.com',
    siteName: 'ExportEcom',
    images: [
      {
        url: 'https://exportecom.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster 
              richColors 
              position="top-right"
              toastOptions={{
                duration: 3000,
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}