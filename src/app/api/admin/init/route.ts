import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

// POST - Initialiser le compte admin
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Vérifier si un admin existe déjà
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Admin account already exists' },
        { status: 403 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer ou mettre à jour l'admin
    let admin;
    if (existingAdmin) {
      admin = await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: {
          username,
          password: hashedPassword,
        },
      });
    } else {
      admin = await prisma.admin.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
    }

    return NextResponse.json(
      { success: true, message: 'Admin account initialized', id: admin.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize admin account' },
      { status: 500 }
    );
  }
}
