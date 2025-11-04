import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET - Récupérer tous les tags
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Erreur lors de la récupération des tags:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des tags' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau tag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Le nom du tag est requis' },
        { status: 400 }
      );
    }

    // Vérifier si le tag existe déjà
    const existingTag = await prisma.tag.findUnique({
      where: { name: name.toLowerCase() },
    });

    if (existingTag) {
      return NextResponse.json(existingTag);
    }

    const tag = await prisma.tag.create({
      data: {
        name: name.toLowerCase(),
      },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du tag:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du tag' },
      { status: 500 }
    );
  }
}
