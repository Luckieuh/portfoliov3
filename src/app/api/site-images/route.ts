import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '../../../../generated/prisma/client';

// GET - Récupérer toutes les images du site
export async function GET() {
  try {
    const images = await Prisma.siteImage.findMany({
      orderBy: { key: 'asc' },
    });

    const response = NextResponse.json(images);
    
    // Désactiver le cache pour les images du site
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des images' },
      { status: 500 }
    );
  }
}

// POST - Créer ou mettre à jour une image du site
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, url } = body;

    if (!key || !key.trim() || !url || !url.trim()) {
      return NextResponse.json(
        { error: 'La clé et l\'URL sont requises' },
        { status: 400 }
      );
    }

    // Vérifier si l'image existe déjà
    const existingImage = await prisma.siteImage.findUnique({
      where: { key: key.toLowerCase() },
    });

    if (existingImage) {
      // Mettre à jour l'image existante
      const updatedImage = await prisma.siteImage.update({
        where: { key: key.toLowerCase() },
        data: { url },
      });
      return NextResponse.json(updatedImage);
    }

    // Créer une nouvelle image
    const image = await prisma.siteImage.create({
      data: {
        key: key.toLowerCase(),
        url,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création/mise à jour de l\'image:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création/mise à jour de l\'image' },
      { status: 500 }
    );
  }
}
