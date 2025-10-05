'use client'

import ProtectedRoute from '../components/auth/ProtectedRoute'
import Sidebar from '../components/dashboard/Sidebar'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Dashboard</h1>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600">Select an option from the sidebar to get started.</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}