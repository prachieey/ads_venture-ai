// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  return document.cookie.split('; ').some(cookie => cookie.startsWith('auth-token='))
}

// Get auth token
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  const match = document.cookie.match(/auth-token=([^;]+)/)
  return match ? match[1] : null
}

// Set auth token
export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return
  document.cookie = `auth-token=${token}; path=/; max-age=86400` // 1 day
}

// Remove auth token (logout)
export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return
  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

// Get user data (in a real app, this would be an API call)
export const getUserData = async (): Promise<{name: string; email: string} | null> => {
  if (!isAuthenticated()) return null
  
  // In a real app, you would fetch user data from your API
  // const response = await fetch('/api/auth/me')
  // return response.json()
  
  // For demo purposes, return mock data
  return {
    name: 'Demo User',
    email: 'demo@ventureai.com'
  }
}
