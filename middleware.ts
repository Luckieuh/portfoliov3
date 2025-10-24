import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromCookie } from './src/lib/auth';

export function middleware(request: NextRequest) {
  // Protéger les routes /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = getTokenFromCookie(request.headers.get('cookie') || '');
    
    if (!token || !verifyToken(token)) {
      // Rediriger vers la page de login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Protéger les endpoints API sensibles
  if (request.nextUrl.pathname.startsWith('/api/admin') || 
      (request.nextUrl.pathname.startsWith('/api/realisations') && request.method !== 'GET')) {
    const token = getTokenFromCookie(request.headers.get('cookie') || '');
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/realisations/:path*'],
};
