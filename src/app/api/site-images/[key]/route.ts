import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import prisma from '@/lib/prisma';
import { r2Client, BUCKET_NAME, PUBLIC_URL } from '@/lib/cloudflare';
import { randomUUID } from 'crypto';

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    
    let image = await prisma.siteImage.findUnique({
      where: { key },
    });

    // Si l'image n'existe pas, retourner une erreur 404
    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error('Erreur API site-images/[key]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const contentType = request.headers.get('content-type') || '';
    
    let fileUrl: string;

    // Si c'est un multipart/form-data (fichier)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json(
          { error: 'Aucun fichier fourni' },
          { status: 400 }
        );
      }

      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Type de fichier non autorisé' },
          { status: 400 }
        );
      }

      // Générer un nom de fichier unique
      const fileExtension = file.name.split('.').pop();
      const fileName = `site-images/${key}/${randomUUID()}.${fileExtension}`;

      // Convertir le fichier en Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload vers Cloudflare R2
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      });

      await r2Client.send(command);

      // Construire l'URL publique
      fileUrl = `${PUBLIC_URL}/${fileName}`;
    } else {
      // Si c'est du JSON avec une URL directe
      const { url } = await request.json();

      if (!url) {
        return NextResponse.json(
          { error: 'URL ou fichier requis' },
          { status: 400 }
        );
      }

      fileUrl = url;
    }

    // Upsert: créer si n'existe pas, mettre à jour sinon
    let image = await prisma.siteImage.findUnique({
      where: { key },
    });

    if (!image) {
      image = await prisma.siteImage.create({
        data: {
          key,
          url: fileUrl,
        },
      });
    } else {
      image = await prisma.siteImage.update({
        where: { key },
        data: {
          url: fileUrl,
        },
      });
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error('Erreur API site-images/[key] PUT:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
