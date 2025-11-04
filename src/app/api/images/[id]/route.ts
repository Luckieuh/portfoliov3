import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// GET - Récupérer une image spécifique (pour tester)
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

    const image = await prisma.realisationImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'image' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour la position d'une image
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
    const { position } = body;

    if (typeof position !== 'number') {
      return NextResponse.json(
        { error: 'Position invalide' },
        { status: 400 }
      );
    }

    const image = await prisma.realisationImage.update({
      where: { id },
      data: { position },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'image:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'image' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une image
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

    const image = await prisma.realisationImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image non trouvée' },
        { status: 404 }
      );
    }

    await prisma.realisationImage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Image supprimée avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'image' },
      { status: 500 }
    );
  }
}
