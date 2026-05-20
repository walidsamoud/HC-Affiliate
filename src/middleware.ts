import createMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {locales, defaultLocale} from './lib/locales';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  if (response instanceof NextResponse) {
    response.headers.set('x-pathname', request.nextUrl.pathname);
    return response;
  }
  const next = NextResponse.next();
  next.headers.set('x-pathname', request.nextUrl.pathname);
  return next;
}

export const config = {
  matcher: ['/', '/(en|tr|fr|hi|ru)/:path*'],
};
