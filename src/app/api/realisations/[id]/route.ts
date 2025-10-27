import { NextRequest, NextResponse } from 'next/server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import prisma from '@/lib/prisma';
import { r2Client, BUCKET_NAME, PUBLIC_URL } from '@/lib/cloudflare';

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

    // Récupérer la réalisation avec toutes ses images AVANT suppression
    const realisation = await prisma.realisation.findUnique({
      where: { id: parsedId },
      include: {
        images: true,
      },
    });

    if (!realisation) {
      return NextResponse.json(
        { error: 'Réalisation non trouvée' },
        { status: 404 }
      );
    }

    // Supprimer les fichiers de Cloudflare R2
    // Les images seront supprimées automatiquement par la cascade de Prisma
    console.log(`Suppression de ${realisation.images.length} images pour la réalisation ${parsedId}`);

    // Supprimer la réalisation de la BD (cascade supprimera aussi les images)
    await prisma.realisation.delete({
      where: { id: parsedId },
    });

    // Supprimer asynchronement les fichiers de Cloudflare
    // (ne pas attendre pour la réponse, mais logger les erreurs)
    realisation.images.forEach(image => {
      deleteCloudflareFile(image.url).catch(error => {
        console.error(`Erreur suppression Cloudflare ${image.url}:`, error);
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Réalisation et ses fichiers supprimés avec succès',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la réalisation' },
      { status: 500 }
    );
  }
}

/**
 * Supprime un fichier de Cloudflare depuis son URL
 */
async function deleteCloudflareFile(url: string): Promise<void> {
  try {
    if (!url || url.startsWith('/')) return; // Ignorer les URLs locales

    // Extraire le nom du fichier depuis l'URL
    const fileName = url.replace(PUBLIC_URL + '/', '').split('?')[0];
    if (!fileName) return;

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    });

    await r2Client.send(command);
    console.log(`✓ Fichier supprimé de R2: ${fileName}`);
  } catch (error) {
    console.error(`✗ Erreur suppression R2:`, error);
    // Continuer malgré l'erreur
  }
}
