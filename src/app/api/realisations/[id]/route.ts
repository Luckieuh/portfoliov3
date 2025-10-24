import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// GET - Récupérer une réalisation spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    const realisation = await prisma.realisation.findUnique({
      where: { id: parsedId },
      include: {
        images: {
          orderBy: [
            { position: 'asc' },
            { createdAt: 'asc' },
          ],
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
    const { id } = await params;
    const parsedId = parseInt(id);
    
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

  const body = await request.json();
  const { title, description, location, videoUrl, youtubeUrl, link, categories, createdAt, imageUrls = [] } = body;

    // Valider et parser la date si fournie
    let projectDate: Date | undefined;
    if (createdAt) {
      const parsedDate = new Date(createdAt);
      if (!isNaN(parsedDate.getTime())) {
        projectDate = parsedDate;
      }
    }

    // We'll update the main fields, remove existing images and recreate images in the requested order.
    // This keeps ordering simple: client sends ordered array of image URLs (existing and/or new) as imageUrls.

    const updateData: any = {
      title,
      description,
      location: location || null,
      videoUrl: videoUrl || null,
      youtubeUrl: youtubeUrl || null,
      link: link || null,
      categories: categories || [],
      ...(projectDate && { createdAt: projectDate }),
    };

    // Use a transaction: update fields, delete old images, then create new images with positions
    await prisma.$transaction([
      prisma.realisation.update({ where: { id: parsedId }, data: updateData }),
      prisma.realisationImage.deleteMany({ where: { realisationId: parsedId } }),
      // recreate images in requested order
      prisma.realisationImage.createMany({
        data: imageUrls.map((url: string, idx: number) => ({ url, realisationId: parsedId, position: idx }))
      })
    ]);

    // Fetch and return the updated realisation with ordered images
    const updated = await prisma.realisation.findUnique({
      where: { id: parsedId },
      include: {
        images: { orderBy: [ { position: 'asc' }, { createdAt: 'asc' } ] },
      },
    });

    return NextResponse.json(updated);
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    await prisma.realisation.delete({
      where: { id: parsedId },
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
