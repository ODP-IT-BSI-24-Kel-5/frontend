// middleware.js
import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/register']

export function middleware(request) {
  // const { pathname } = request.nextUrl
  // const token = request.cookies.get('token')?.value

  // const isPublic = PUBLIC_PATHS.includes(pathname)

  // // If not logged in and trying to access a private route
  // if (!token && !isPublic) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // // If logged in and trying to access public pages
  // if (token && isPublic) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }

  // Proceed normally
  return NextResponse.next()
}

// middleware.js continued
// export const config = {
//   matcher: [
//     '/',
//     '/dashboard/:path*',
//     '/profile/:path*',
//     '/login',
//     '/register'
//   ],
// }
