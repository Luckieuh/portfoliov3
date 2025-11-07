import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET - Récupérer toutes les réalisations
export async function GET() {
  try {
    const realisations = await prisma.realisations.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        RealisationImage: {
          orderBy: { position: 'asc' },
        },
        Category: true,
        Tag: true,
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

// POST - Créer une nouvelle réalisation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, videoUrl, youtubeUrl, link, categoryNames = [], tagNames = [], newImages = [] } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      );
    }

    // Vérifier qu'il y a au moins du contenu: images, vidéo YouTube ou vidéo uploadée
    const hasVideo = (videoUrl && videoUrl.trim()) || (youtubeUrl && youtubeUrl.trim());
    const hasImages = Array.isArray(newImages) && newImages.length > 0;
    const hasContent = hasVideo || hasImages;
    
    if (!hasContent) {
      return NextResponse.json(
        { error: 'Au moins une vidéo YouTube, une vidéo uploadée ou une image est requise' },
        { status: 400 }
      );
    }

    const realisation = await prisma.realisations.create({
      data: {
        title,
        description,
        location: location || null,
        videoUrl: videoUrl || null,
        youtubeUrl: youtubeUrl || null,
        link: link || null,
        RealisationImage: {
          create: Array.isArray(newImages) && newImages.length > 0
            ? newImages.map((img: { url: string; position: number }) => ({
                url: img.url,
                position: img.position,
              }))
            : [],
        },
        Category: {
          connect: Array.isArray(categoryNames) && categoryNames.length > 0
            ? await Promise.all(
                categoryNames.map(async (name: string) => {
                  const category = await prisma.category.findUnique({ where: { name } });
                  return { id: category?.id || 0 };
                })
              ).then(cats => cats.filter(c => c.id !== 0))
            : [],
        },
        Tag: {
          connect: Array.isArray(tagNames) && tagNames.length > 0
            ? await Promise.all(
                tagNames.map(async (name: string) => {
                  const tag = await prisma.tag.findUnique({ where: { name } });
                  return { id: tag?.id || 0 };
                })
              ).then(tags => tags.filter(t => t.id !== 0))
            : [],
        },
      },
      include: {
        RealisationImage: {
          orderBy: { position: 'asc' },
        },
        Category: true,
        Tag: true,
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
