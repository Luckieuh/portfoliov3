import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import bcrypt from 'bcryptjs';

// Token unique généré au démarrage du serveur
const STARTUP_TOKEN = Math.random().toString(36).substring(2) + Date.now().toString(36);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      );
    }

    // Chercher l'utilisateur admin
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ 
      success: true, 
      message: 'Connexion réussie' 
    });

    // Définir le cookie de session (httpOnly pour la sécurité)
    response.cookies.set('adminSession', JSON.stringify({
      adminId: admin.id,
      loginTime: Date.now()
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 heures
    });

    // Définir le token de démarrage du serveur comme cookie séparé
    response.cookies.set('serverStartup', STARTUP_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 heures
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
