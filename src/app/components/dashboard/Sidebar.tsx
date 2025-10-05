'use client'

import { useAuth } from '../../../contexts/AuthContext'
import { useNavigation } from '../../../hooks/useNavigation'
import Link from 'next/link'
import { useState } from 'react'

export default function Sidebar() {
  const { user, logout } = useAuth()
  const { data: navigationItems, isLoading } = useNavigation(user?.role || 'employee')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <>
      
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* sidebr */}
      <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static top-0 left-0 h-screen w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out z-40`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <div className="mt-4">
              <p className="text-gray-300">{user?.name}</p>
              <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="block px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={logout}
              className="w-full px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-150"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}