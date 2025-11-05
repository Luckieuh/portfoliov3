import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import bcrypt from 'bcryptjs';

// Token unique généré au démarrage du serveur
const STARTUP_TOKEN = Math.random().toString(36).substring(2) + Date.now().toString(36);

export async function POST(request: NextRequest) {
  console.log('🔑 [API] Login endpoint called');
  
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('🔑 [API] Received credentials:');
    console.log('🔑 [API] Username:', username);
    console.log('🔑 [API] Password provided:', !!password);
    console.log('🔑 [API] Password length:', password?.length || 0);

    if (!username || !password) {
      console.log('🔑 [API] Missing username or password');
      return NextResponse.json(
        { error: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      );
    }

    console.log('🔑 [API] Checking database for admin user...');
    // Chercher l'utilisateur admin
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    console.log('🔑 [API] Admin found:', !!admin);
    if (admin) {
      console.log('🔑 [API] Admin details:', {
        id: admin.id,
        username: admin.username,
        hasPassword: !!admin.password,
        passwordLength: admin.password?.length || 0
      });
    }

    if (!admin) {
      console.log('🔑 [API] No admin found with username:', username);
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    console.log('🔑 [API] Comparing passwords...');
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('🔑 [API] Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('🔑 [API] Invalid password for user:', username);
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    console.log('🔑 [API] Login successful! Creating response...');
    const response = NextResponse.json({ 
      success: true, 
      message: 'Connexion réussie' 
    });

    // Définir le cookie de session (httpOnly pour la sécurité)
    console.log('🔑 [API] Setting adminSession cookie...');
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
    console.log('🔑 [API] Setting serverStartup cookie...');
    response.cookies.set('serverStartup', STARTUP_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 heures
    });

    console.log('🔑 [API] Login complete, returning response');
    return response;
  } catch (error) {
    console.error('🔑 [API] ERROR during login:', error);
    console.error('🔑 [API] Error details:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack
    });
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
