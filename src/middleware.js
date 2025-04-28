// middleware.js
import { NextResponse } from 'next/server'
import useAuthStore from '@/stores/authStore';
import Cookies from 'js-cookie';

const PUBLIC_PATHS = ['/login', '/register']

export function middleware(request) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('token')?.value
  const isPublic = PUBLIC_PATHS.includes(pathname)

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
// middleware.js continued
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/profile/:path*',
    '/login',
    '/register'
  ],
}
