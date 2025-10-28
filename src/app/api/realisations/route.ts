import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET - Récupérer toutes les réalisations avec leurs images
export async function GET() {
  try {
    const realisations = await prisma.realisation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          // Order images first by explicit position (new), then by createdAt for backwards compatibility
          orderBy: [
            { position: 'asc' },
            { createdAt: 'asc' },
          ],
        },
        categories: true,
        tags: true,
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
    const { title, description, location, imageUrls = [], videoUrl, youtubeUrl, link, categories = [], tags = [], createdAt } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      );
    }

    // Valider que les catégories sont fournies et non vides
    if (!Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: 'Au moins une catégorie doit être sélectionnée' },
        { status: 400 }
      );
    }

    // Valider que imageUrls est un tableau
    const urls = Array.isArray(imageUrls) ? imageUrls : [];

    // Valider et parser la date si fournie
    let projectDate: Date | undefined;
    if (createdAt) {
      const parsedDate = new Date(createdAt);
      if (!isNaN(parsedDate.getTime())) {
        projectDate = parsedDate;
      }
    }

    const realisation = await prisma.realisation.create({
      data: {
        title,
        description,
        location: location || null,
        videoUrl: videoUrl || null,
        youtubeUrl: youtubeUrl || null,
        link: link || null,
        categories: {
          connect: categories.map((id: number) => ({ id }))
        },
        tags: tags.length > 0 ? {
          connect: tags.map((id: number) => ({ id }))
        } : undefined,
        ...(projectDate && { createdAt: projectDate }),
        images: {
          // create images and set their position according to the array index
          create: urls.map((url: string, idx: number) => ({ url, position: idx })),
        },
      },
      include: {
        images: true,
        categories: true,
        tags: true,
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
