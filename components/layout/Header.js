'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Package,
  Settings,
  HelpCircle,
  Globe,
  ChevronDown,
  Search,
  X
} from 'lucide-react'

const categories = [
  { name: 'Textiles', href: '/categories/textiles' },
  { name: 'Spices', href: '/categories/spices' },
  { name: 'Handicrafts', href: '/categories/handicrafts' },
  { name: 'Leather Goods', href: '/categories/leather-goods' },
  { name: 'Dry Fruits', href: '/categories/dry-fruits' },
  { name: 'Herbal Products', href: '/categories/herbal' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth()
  const { cartCount } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsSearchOpen(false)
  }, [pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
    setIsSearchOpen(false)
  }

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U'
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-3 group-hover:rotate-6 transition-transform"></div>
              <div className="absolute inset-0 bg-indigo-600 rounded-lg -rotate-3 group-hover:-rotate-6 transition-transform"></div>
              <div className="relative h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-800">
              Sunrise <span className="text-blue-600">Impex</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" passHref legacyBehavior>
                  <NavigationMenuLink className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" passHref legacyBehavior>
                  <NavigationMenuLink className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    pathname === '/about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

          

              <NavigationMenuItem>
                <Link href="/products" passHref legacyBehavior>
                  <NavigationMenuLink className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    pathname === '/products' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}>
                    Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/news" passHref legacyBehavior>
                  <NavigationMenuLink className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    pathname === '/news' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}>
                   News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>


              <NavigationMenuItem>
                <Link href="/blog" passHref legacyBehavior>
                  <NavigationMenuLink className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    pathname === '/blog' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}>
                    Blogs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              

              <NavigationMenuItem>
                <Link href="/contact" passHref legacyBehavior>
                  <NavigationMenuLink className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    pathname === '/contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Button */}
            

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getInitials(profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block text-sm">
                      {profile?.full_name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="h-4 w-4 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{profile?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {profile?.is_admin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="cursor-pointer w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer w-full">
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/help" className="cursor-pointer w-full">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-8 w-8">
                          <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-3"></div>
                          <div className="absolute inset-0 bg-indigo-600 rounded-lg -rotate-3"></div>
                          <div className="relative h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Globe className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <span className="font-bold text-gray-800">Sunrise Impex</span>
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4">
                    {/* User Info for Mobile */}
                    {user && (
                      <div className="px-4 pb-4 mb-4 border-b">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {getInitials(profile?.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{profile?.full_name}</p>
                            <p className="text-sm text-gray-500">{profile?.email}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mobile Navigation Links */}
                    <nav className="space-y-1 px-2">
                      <Link
                        href="/"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          pathname === '/' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Home
                      </Link>
                      

                      <Link
                        href="/products"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          pathname === '/products' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Products
                      </Link>

                      <Link
                        href="/about"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          pathname === '/about' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        About Us
                      </Link>

                      <Link
                        href="/news"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          pathname === '/news' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        News
                      </Link>

                      <Link
                        href="/blog"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          pathname === '/blog' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Blogs
                      </Link>

                      <Link
                        href="/contact"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          pathname === '/contact' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Contact
                      </Link>

                      {user && (
                        <>
                          <div className="border-t my-4" />
                          
                          <Link
                            href="/profile"
                            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <User className="mr-3 h-4 w-4" />
                            My Profile
                          </Link>
                          
                          <Link
                            href="/orders"
                            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Package className="mr-3 h-4 w-4" />
                            My Orders
                          </Link>
                          
                          {profile?.is_admin && (
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Settings className="mr-3 h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          )}
                        </>
                      )}
                    </nav>
                  </div>

                  {/* Mobile Footer Actions */}
                  <div className="border-t p-4">
                    {!user ? (
                      <div className="space-y-2">
                        <Button asChild className="w-full">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={signOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-t shadow-lg p-4 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search products by name, category, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-24 py-6 text-lg"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Search
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              
              {/* Search Suggestions */}
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-500">
                  Press Enter to search
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}