import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET - Récupérer toutes les catégories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des catégories' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle catégorie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Le nom de la catégorie est requis' },
        { status: 400 }
      );
    }

    // Vérifier si la catégorie existe déjà
    const existingCategory = await prisma.category.findUnique({
      where: { name: name.toLowerCase() },
    });

    if (existingCategory) {
      return NextResponse.json(existingCategory);
    }

    const category = await prisma.category.create({
      data: {
        name: name.toLowerCase(),
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la catégorie' },
      { status: 500 }
    );
  }
}
