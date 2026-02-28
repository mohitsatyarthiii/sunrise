'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Users,
  FolderTree,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  DollarSign,
  TrendingUp
} from 'lucide-react'

const menuItems = [
  { 
    href: '/admin/dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    color: 'text-blue-500',
    bg: 'bg-blue-100'
  },
  { 
    href: '/admin/products', 
    label: 'Products', 
    icon: Package,
    color: 'text-purple-500',
    bg: 'bg-purple-100'
  },
  { 
    href: '/admin/orders', 
    label: 'Orders', 
    icon: ShoppingCart,
    color: 'text-green-500',
    bg: 'bg-green-100'
  },
  { 
    href: '/admin/enquiries', 
    label: 'Enquiries', 
    icon: MessageSquare,
    color: 'text-yellow-500',
    bg: 'bg-yellow-100'
  },
  { 
    href: '/admin/categories', 
    label: 'Categories', 
    icon: FolderTree,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100'
  },
  { 
    href: '/admin/users', 
    label: 'Users', 
    icon: Users,
    color: 'text-pink-500',
    bg: 'bg-pink-100'
  },
 
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { profile, signOut } = useAuth()

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'A'
  }

  return (
    <div className={`relative h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-72'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* Logo */}
      <div className={`p-6 border-b border-gray-700 ${collapsed ? 'text-center' : ''}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">ExportEcom</h2>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className={`p-4 border-b border-gray-700 ${collapsed ? 'text-center' : ''}`}>
        <Avatar className={`${collapsed ? 'mx-auto' : ''} h-12 w-12 border-2 border-blue-500`}>
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {getInitials(profile?.full_name)}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="mt-2">
            <p className="font-semibold truncate">{profile?.full_name || 'Admin'}</p>
            <p className="text-xs text-gray-400 truncate">{profile?.email}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-300px)]">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <div className={`${isActive ? '' : item.color}`}>
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
              </div>
              {!collapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Home className="h-5 w-5" />
          {!collapsed && <span className="text-sm">View Website</span>}
        </Link>
        
        <button
          onClick={signOut}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors mt-1 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  )
}