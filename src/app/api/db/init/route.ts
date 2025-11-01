import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Simple auth check - vous pouvez ajouter une clé secrète
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.ADMIN_TOKEN || 'dev-token';

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Essayer de créer une catégorie test pour vérifier que les tables existent
    const testCategory = await prisma.category.upsert({
      where: { name: 'test' },
      update: {},
      create: { name: 'test' },
    });

    // Si ça marche, les tables existent
    return NextResponse.json({
      success: true,
      message: 'Database is initialized and working correctly',
      testCategory,
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      {
        error: 'Database error',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    );
  }
}
