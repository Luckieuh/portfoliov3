import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET - Récupérer toutes les réalisations avec leurs images
export async function GET() {
  try {
    const realisations = await prisma.realisation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return NextResponse.json(realisations);
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des réalisations' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle réalisation avec images
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, imageUrls = [], videoUrl, link, categories } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      );
    }

    // Valider que imageUrls est un tableau
    const urls = Array.isArray(imageUrls) ? imageUrls : [];

    const realisation = await prisma.realisation.create({
      data: {
        title,
        description,
        location: location || null,
        videoUrl: videoUrl || null,
        link: link || null,
        categories: categories || [],
        images: {
          create: urls.map((url: string) => ({ url })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(realisation, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réalisation' },
      { status: 500 }
    );
  }
}
