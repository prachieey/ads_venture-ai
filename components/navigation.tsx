"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Brain, BarChart3, Zap, Settings, LogOut, Home, Lightbulb, TrendingUp, User } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/predict", label: "Predict", icon: Zap },
  { href: "/visualize", label: "Visualize", icon: BarChart3 },
  { href: "/what-if", label: "What-If", icon: Settings },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
]

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useState<{name: string; email: string} | null>(null)

  useEffect(() => {
    setIsClient(true);
    
    const checkAuth = () => {
      const authToken = document.cookie.split('; ').find(row => row.startsWith('auth-token='));
      const userData = localStorage.getItem('user');
      
      if (authToken && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser({
            name: parsedUser.name || 'User',
            email: parsedUser.email || ''
          });
        } catch (err) {
          console.error('Failed to parse user data:', err);
          // Clear invalid data
          localStorage.removeItem('user');
          document.cookie = 'auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      }
    };
    
    checkAuth();
    
    // Check auth state every 30 seconds
    const interval = setInterval(checkAuth, 30000);
    
    return () => clearInterval(interval);
  }, [])

  const handleLogout = () => {
    // Clear the auth token
    document.cookie = 'auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    router.push('/login');
    // Force a page reload to reset all states
    window.location.reload();
  }

  return (
    <nav className="h-screen w-64 bg-[#7F00FF] text-white flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[#00FFE7]/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/20">
          <Brain className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold">VentureAI</span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              pathname === href ? "bg-white/20 border-l-2 border-[#00FFE7]" : "hover:bg-white/10"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* User Profile and Auth Buttons */}
      {isClient && (
        <div className="p-4 border-t border-[#00FFE7]/30">
          {user ? (
            // Logged in state
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-xs text-white/60 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            // Not logged in state
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-center transition flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                className="w-full py-2 px-4 rounded-lg bg-[#00FFE7] hover:bg-[#00e6cf] text-[#0a0a0a] font-medium text-center transition flex items-center justify-center gap-2"
              >
                <span>Sign Up</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
