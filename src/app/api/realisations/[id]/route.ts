import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// GET - Récupérer une réalisation spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
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

    // Traiter les catégories et tags séquentiellement
    let categoryIds: number[] = [];
    if (Array.isArray(categoryNames) && categoryNames.length > 0) {
      const categoryPromises = categoryNames.map(async (name: string) => {
        const category = await prisma.category.findUnique({ where: { name } });
        return category?.id;
      });
      const ids = await Promise.all(categoryPromises);
      categoryIds = ids.filter((id): id is number => id !== undefined);
    }

    let tagIds: number[] = [];
    if (Array.isArray(tagNames) && tagNames.length > 0) {
      const tagPromises = tagNames.map(async (name: string) => {
        const tag = await prisma.tag.findUnique({ where: { name } });
        return tag?.id;
      });
      const ids = await Promise.all(tagPromises);
      tagIds = ids.filter((id): id is number => id !== undefined);
    }

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
          set: categoryIds.map(id => ({ id })),
        },
        tags: {
          set: tagIds.map(id => ({ id })),
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
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { error: `Erreur lors de la mise à jour de la réalisation: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une réalisation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
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
