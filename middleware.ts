import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Define the paths that require authentication
const protectedPaths = ['/predict', '/dashboard', '/analytics', '/insights', '/what-if', '/visualize']
const authPaths = ['/login', '/signup']
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  // If trying to access protected path without token
  if (isProtectedPath && !token) {
    // Store the intended URL to redirect back after login
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If already logged in and trying to access auth pages
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
