import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const images = await prisma.siteImage.findMany();
    
    // Retourner les images sous forme d'objet avec clé comme clé
    const imageMap: { [key: string]: string } = {};
    images.forEach((img: any) => {
      imageMap[img.key] = img.url;
    });
    
    return NextResponse.json(imageMap);
  } catch (error) {
    console.error('Erreur API site-images:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des images' },
      { status: 500 }
    );
  }
}
