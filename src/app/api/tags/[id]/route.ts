import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE - Supprimer un tag par ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { error: "L'ID du tag est invalide" },
        { status: 400 }
      );
    }

    // Vérifier si le tag existe
    const tag = await prisma.tag.findUnique({
      where: { id: parsedId },
    });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le tag (les relations seront cascadées selon le schéma)
    await prisma.tag.delete({
      where: { id: parsedId },
    });

    return NextResponse.json(
      { success: true, message: 'Tag supprimé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression du tag:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du tag' },
      { status: 500 }
    );
  }
}
