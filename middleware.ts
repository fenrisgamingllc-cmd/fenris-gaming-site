import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { redirectDestination } from '@/lib/legacy-redirects';

export function middleware(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  const target = redirectDestination(host, request.nextUrl.pathname, request.nextUrl.search);
  if (!target) return NextResponse.next();
  return NextResponse.redirect(target, 301);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
