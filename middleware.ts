import { NextResponse, NextRequest } from 'next/server'
import { verifySessionMiddleware } from './actions/auth/session'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const customerAccessToken = request.cookies.get('customerAuth')?.value
  const { isAuth } = await verifySessionMiddleware(customerAccessToken)

  if (pathname.startsWith('/account/orders') && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (pathname.startsWith('/account/address') && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (pathname.startsWith('/login') && isAuth) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (pathname.startsWith('/signup') && isAuth) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}

export const config = {
  matcher: ['/login/:path*', '/signup/:path*', '/account/orders/:path*', '/account/address/:path*'],
}
