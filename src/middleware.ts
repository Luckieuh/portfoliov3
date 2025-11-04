import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Vérifier si c'est une route protégée
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminSession')?.value;
    
    if (!token) {
      // Rediriger vers la page de login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
