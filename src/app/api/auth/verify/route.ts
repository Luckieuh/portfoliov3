import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// Générer un token unique au démarrage du serveur
const STARTUP_TOKEN = Math.random().toString(36).substring(2) + Date.now().toString(36);

export async function POST(request: NextRequest) {
  try {
    // Vérifier si c'est juste une vérification de session
    const body = await request.json();
    
    if (body.verify) {
      const sessionToken = request.cookies.get('adminSession')?.value;
      const startupToken = request.cookies.get('serverStartup')?.value;

      if (!sessionToken || !startupToken || startupToken !== STARTUP_TOKEN) {
        return NextResponse.json(
          { valid: false },
          { status: 401 }
        );
      }

      return NextResponse.json({ valid: true });
    }

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Retourner le token de démarrage du serveur actuel
  const response = NextResponse.json({ startupToken: STARTUP_TOKEN });
  
  response.cookies.set('serverStartup', STARTUP_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 heures
  });

  return response;
}
