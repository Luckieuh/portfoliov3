import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// DELETE - Supprimer un tag
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

    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag non trouvé' },
        { status: 404 }
      );
    }

    await prisma.tag.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Tag supprimé avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du tag:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du tag' },
      { status: 500 }
    );
  }
}
