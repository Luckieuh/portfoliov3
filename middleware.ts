import { NextRequest, NextResponse } from 'next/server';

function getTokenFromCookie(cookieHeader?: string): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const authCookie = cookies.find(c => c.startsWith('auth='));
  if (!authCookie) return null;
  return authCookie.split('=')[1];
}

export function middleware(request: NextRequest) {
  // Protéger les routes /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = getTokenFromCookie(request.headers.get('cookie') || '');
    
    if (!token) {
      // Rediriger vers la page de login si pas de token
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Protéger les endpoints API sensibles
  if (request.nextUrl.pathname.startsWith('/api/admin') || 
      (request.nextUrl.pathname.startsWith('/api/realisations') && request.method !== 'GET')) {
    const token = getTokenFromCookie(request.headers.get('cookie') || '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*', '/api/realisations/:path*'],
};
