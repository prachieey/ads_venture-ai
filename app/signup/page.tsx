"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const redirectTo = searchParams.get('from') || '/'

  const passwordStrength = formData.password.length >= 8 ? "strong" : formData.password.length >= 5 ? "medium" : "weak"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9FB] to-[#F0E6FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="text-[#7F00FF] hover:text-[#00FFE7] transition mb-8 block">
          ← Back to Home
        </Link>

        <div className="glass p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-[#2E2E3A] mb-2">Create Account</h1>
          <p className="text-[#2E2E3A]/60 mb-8">Join VentureAI and start predicting success</p>

          <form 
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setIsLoading(true)
              setError("")
              
              // Basic validation
              if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match")
                setIsLoading(false)
                return
              }
              
              if (formData.password.length < 8) {
                setError("Password must be at least 8 characters")
                setIsLoading(false)
                return
              }
              
              if (!agreeTerms) {
                setError("You must agree to the terms and conditions")
                setIsLoading(false)
                return
              }
              
              try {
                // Simulate API call for registration
                await new Promise(resolve => setTimeout(resolve, 1000))
                
                // For demo purposes, accept any non-empty form
                if (formData.name && formData.email && formData.password) {
                  // Set auth token in cookies
                  document.cookie = `auth-token=demo-token-${Date.now()}; path=/; max-age=86400`
                  
                  // Store user data in localStorage (in a real app, this would be handled by your auth provider)
                  const userData = {
                    name: formData.name,
                    email: formData.email,
                    // Don't store password in localStorage in a real app
                  }
                  localStorage.setItem('user', JSON.stringify(userData))
                  
                  // Redirect to home page or intended page
                  router.push(redirectTo === '/dashboard' ? '/' : redirectTo)
                } else {
                  setError("Please fill in all fields")
                }
              } catch (err) {
                setError("Failed to create account. Please try again.")
                console.error(err)
              } finally {
                setIsLoading(false)
              }
            }}
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A] placeholder-[#2E2E3A]/40 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A] placeholder-[#2E2E3A]/40 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <div className="mt-2 h-1 bg-[#00FFE7]/20 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${passwordStrength === "strong" ? "w-full bg-[#7F00FF]" : passwordStrength === "medium" ? "w-2/3 bg-[#FF6F61]" : "w-1/3 bg-red-500"}`}
                ></div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#2E2E3A] mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFE7]/30 focus:border-[#00FFE7] focus:outline-none bg-white text-[#2E2E3A] placeholder-[#2E2E3A]/40 transition"
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 rounded mt-1 accent-[#7F00FF]"
              />
              <span className="text-sm text-[#2E2E3A]/60">
                I agree to the <span className="text-[#7F00FF] hover:text-[#00FFE7]">Terms of Service</span> and{" "}
                <span className="text-[#7F00FF] hover:text-[#00FFE7]">Privacy Policy</span>
              </span>
            </label>

            {/* Signup Button */}
            {error && (
              <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={!agreeTerms || isLoading}
              className="w-full py-3 rounded-lg bg-[#7F00FF] text-white font-semibold hover:shadow-lg hover:shadow-[#7F00FF]/50 transition disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#2E2E3A]/60 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#7F00FF] hover:text-[#00FFE7] font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
