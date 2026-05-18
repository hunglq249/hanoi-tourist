import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'ht-admin-token';
const VALID_TOKEN = 'hanoi-tourism-admin-secret-2024';

const intlMiddleware = createMiddleware({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    if (pathname.startsWith('/admin/login')) {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token === VALID_TOKEN) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token !== VALID_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // i18n locale routing for public pages
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|admin|xe|_next|_vercel|robots|sitemap|.*\\..*).*)'],
};
