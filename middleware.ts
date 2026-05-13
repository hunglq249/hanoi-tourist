import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'ht-admin-token';
const VALID_TOKEN = 'hanoi-tourism-admin-secret-2024';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/login')) {
    // Already on login — if already authenticated redirect to /admin
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token === VALID_TOKEN) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token !== VALID_TOKEN) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
