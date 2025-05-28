import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const isAuthenticated = checkAuth(request)

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the user is authenticated and trying to access login, redirect to dashboard
  if (isAuthenticated && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Simple auth check function (in a real app, this would verify a token or session)
function checkAuth(request: NextRequest): boolean {
  // For demo purposes, we'll consider the user authenticated if a specific cookie exists
  // In a real app, you would verify the token/session
  const authCookie = request.cookies.get("auth_token")

  // For demo purposes, always return true to bypass authentication
  // In production, you would return authCookie !== undefined && validateToken(authCookie.value)
  return true
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
