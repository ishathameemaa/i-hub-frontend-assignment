'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../../schemas/auth'
import { useAuth } from '../../contexts/AuthContext'
import { mockLogin } from '../../lib/mockApi'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const { setUser, setToken } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await mockLogin(data)
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      {/* Test Credentials Section */}
      <div className="hidden md:block max-w-md w-full p-8 mr-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">Test Credentials</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <p className="font-semibold text-lg">Admin User</p>
              <p className="text-white/80">Email: admin@example.com</p>
              <p className="text-white/80">Password: password</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <p className="font-semibold text-lg">Employee User</p>
              <p className="text-white/80">Email: employee@example.com</p>
              <p className="text-white/80">Password: password</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <p className="font-semibold text-lg">Super Admin User</p>
              <p className="text-white/80">Email: superadmin@example.com</p>
              <p className="text-white/80">Password: password</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl transform transition-all hover:scale-[1.01]">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                {...register('email')}
                type="email"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                {...register('password')}
                type="password"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}