import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// GET - Récupérer une réalisation spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    const realisation = await prisma.realisations.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
        images: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!realisation) {
      return NextResponse.json(
        { error: 'Réalisation non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(realisation);
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la réalisation' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une réalisation
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, location, videoUrl, youtubeUrl, link, createdAt, categoryNames = [], tagNames = [], newImages = [] } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      );
    }

    // Vérifier qu'il y a au moins du contenu: images, vidéo YouTube ou vidéo uploadée
    const hasVideo = (videoUrl && videoUrl.trim()) || (youtubeUrl && youtubeUrl.trim());
    const existingImages = (await prisma.realisationImage.count({ where: { realisationId: id } })) > 0;
    const hasNewImages = Array.isArray(newImages) && newImages.length > 0;
    const hasContent = hasVideo || existingImages || hasNewImages;
    
    if (!hasContent) {
      return NextResponse.json(
        { error: 'Au moins une vidéo YouTube, une vidéo uploadée ou une image est requise' },
        { status: 400 }
      );
    }

    // Obtenir la position maximale actuelle des images
    const maxPosition = await prisma.realisationImage.aggregate({
      where: { realisationId: id },
      _max: { position: true },
    });
    const nextPosition = (maxPosition._max.position || -1) + 1;

    const realisation = await prisma.realisations.update({
      where: { id },
      data: {
        title,
        description,
        location: location || null,
        videoUrl: videoUrl || null,
        youtubeUrl: youtubeUrl || null,
        link: link || null,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        images: {
          create: hasNewImages
            ? newImages.map((img: { url: string; position: number }, index: number) => ({
                url: img.url,
                position: nextPosition + index,
              }))
            : [],
        },
        categories: {
          set: Array.isArray(categoryNames) && categoryNames.length > 0
            ? await Promise.all(
                categoryNames.map(async (name: string) => {
                  const category = await prisma.category.findUnique({ where: { name } });
                  return { id: category?.id || 0 };
                })
              ).then(cats => cats.filter(c => c.id !== 0))
            : [],
        },
        tags: {
          set: Array.isArray(tagNames) && tagNames.length > 0
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
        categories: true,
        tags: true,
        images: {
          orderBy: { position: 'asc' },
        },
      },
    });

    return NextResponse.json(realisation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la réalisation' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une réalisation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    await prisma.realisations.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Réalisation supprimée avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la réalisation' },
      { status: 500 }
    );
  }
}
