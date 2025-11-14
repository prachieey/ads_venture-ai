"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, Loader2, Github, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const redirectTo = searchParams.get('redirect') || '/'
  
  // If user is already logged in and tries to access /login, redirect them to home
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const authToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
      
      if (authToken && redirectTo) {
        router.push(redirectTo)
      }
    }
    
    checkAuth()
  }, [router, redirectTo])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Basic validation
      if (!email || !password) {
        setError('Please enter both email and password')
        setIsLoading(false)
        return
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo, accept any non-empty email/password
      if (email && password) {
        // Set auth token in cookies (1 day expiry)
        document.cookie = `auth-token=demo-token-${Date.now()}; path=/; max-age=86400`
        
        // Store user data in localStorage
        const userData = {
          email,
          name: email.split('@')[0], // For demo, use part of email as name
          lastLogin: new Date().toISOString()
        }
        localStorage.setItem('user', JSON.stringify(userData))
        
        // Redirect to home page or intended page
        router.push(redirectTo === '/dashboard' ? '/' : redirectTo)
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link href="/" className="text-[#7F00FF] hover:text-[#00FFE7] transition mb-8 block">
          ← Back to Home
        </Link>

        {/* Login Card */}
        <div className="glass p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-[#2E2E3A] mb-2">Welcome Back</h1>
          <p className="text-[#2E2E3A]/60 mb-8">Sign in to your VentureAI account</p>

          <form 
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A] placeholder-[#2E2E3A]/40 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A] placeholder-[#2E2E3A]/40 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2E2E3A]/60 hover:text-[#7F00FF]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-[#2E2E3A]/60">Remember me</span>
              </label>
              <Link href="#" className="text-[#7F00FF] hover:text-[#00FFE7] transition">
                Forgot?
              </Link>
            </div>

            {/* Login Button */}
            {error && (
              <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#7F00FF] to-[#00FFE7] text-white font-medium rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6 pt-6 border-t border-[#00FFE7]/20">
            <p className="text-center text-sm text-[#2E2E3A]/60 mb-4">Or continue with</p>
            <div className="flex gap-3">
              <button
                onClick={() => signIn('google', { callbackUrl: redirectTo })}
                className="flex-1 py-2 rounded-lg border-2 border-[#FF6F61]/30 hover:border-[#FF6F61] text-[#2E2E3A] transition flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Google
              </button>
              <button
                onClick={() => signIn('github', { callbackUrl: redirectTo })}
                className="flex-1 py-2 rounded-lg border-2 border-[#FF6F61]/30 hover:border-[#FF6F61] text-[#2E2E3A] transition flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[#2E2E3A]/60 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#7F00FF] hover:text-[#00FFE7] font-medium transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
