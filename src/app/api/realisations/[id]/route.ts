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
          orderBy: { createdAt: 'asc' },
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
    const { title, description, location, videoUrl, link, categories } = body;

    const realisation = await prisma.realisation.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        location: location || null,
        videoUrl: videoUrl || null,
        link: link || null,
        categories: categories || [],
      },
      include: {
        images: true,
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
