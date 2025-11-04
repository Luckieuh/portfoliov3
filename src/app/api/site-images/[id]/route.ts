import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// DELETE - Supprimer une image du site
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

    const image = await prisma.siteImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image non trouvée' },
        { status: 404 }
      );
    }

    await prisma.siteImage.delete({
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
