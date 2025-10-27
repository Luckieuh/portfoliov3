import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Vérifier et créer les images par défaut
    const imagesToCreate = [
      { key: 'homepage_banner', url: '/Banner.png' },
      { key: 'homepage_profile', url: '/IMG_1949-2.png' },
    ];

    for (const image of imagesToCreate) {
      const exists = await prisma.siteImage.findUnique({
        where: { key: image.key },
      });

      if (!exists) {
        await prisma.siteImage.create({
          data: image,
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Images initialisées' });
  } catch (error) {
    console.error('Erreur initialisation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const images = await prisma.siteImage.findMany();
    return NextResponse.json(images);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}
