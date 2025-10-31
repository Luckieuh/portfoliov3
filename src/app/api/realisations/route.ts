import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET - Récupérer toutes les réalisations
export async function GET() {
  try {
    const realisations = await prisma.realisation.findMany({
      orderBy: { createdAt: 'desc' },
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

// POST - Créer une nouvelle réalisation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, videoUrl, youtubeUrl, link, categories = [], tags = [] } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      );
    }

    const realisation = await prisma.realisation.create({
      data: {
        title,
        description,
        location: location || null,
        videoUrl: videoUrl || null,
        youtubeUrl: youtubeUrl || null,
        link: link || null,
        categories: categories.length > 0 ? { connect: categories.map((id: number) => ({ id })) } : undefined,
        tags: tags.length > 0 ? { connect: tags.map((id: number) => ({ id })) } : undefined,
      },
      include: {
        categories: true,
        tags: true,
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
