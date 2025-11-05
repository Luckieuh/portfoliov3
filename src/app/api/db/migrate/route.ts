import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

/**
 * Endpoint pour créer les tables Prisma directement via SQL
 * À utiliser UNE SEULE FOIS après le déploiement sur Vercel
 * 
 * Utilisation: POST /api/db/migrate
 * Body: { "token": "valeur_de_MIGRATION_TOKEN_dans_.env" }
 */

export async function POST(request: NextRequest) {
  try {
    // Vérifier le token de sécurité
    const migrationToken = process.env.MIGRATION_TOKEN;
    
    if (!migrationToken) {
      return NextResponse.json(
        { error: 'MIGRATION_TOKEN non configuré dans les variables d\'environnement' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { token } = body;

    if (!token || token !== migrationToken) {
      return NextResponse.json(
        { error: 'Token de migration invalide' },
        { status: 401 }
      );
    }

    // Exécuter les migrations via SQL directement
    console.log('Création des tables via Prisma...');
    
    try {
      // Créer la table admin
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "admin" (
          "id" SERIAL PRIMARY KEY,
          "username" TEXT NOT NULL UNIQUE,
          "password" TEXT NOT NULL
        );
      `);

      // Créer la table Category
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Category" (
          "id" SERIAL PRIMARY KEY,
          "name" TEXT NOT NULL UNIQUE
        );
      `);

      // Créer la table Tag
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Tag" (
          "id" SERIAL PRIMARY KEY,
          "name" TEXT NOT NULL UNIQUE
        );
      `);

      // Créer la table Realisations
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Realisations" (
          "id" SERIAL PRIMARY KEY,
          "title" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "location" TEXT,
          "imageUrl" TEXT,
          "videoUrl" TEXT,
          "youtubeUrl" TEXT,
          "link" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Créer la table RealisationImage
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "RealisationImage" (
          "id" SERIAL PRIMARY KEY,
          "url" TEXT NOT NULL,
          "position" INTEGER NOT NULL DEFAULT 0,
          "realisationId" INTEGER NOT NULL,
          CONSTRAINT "RealisationImage_realisationId_fkey" 
            FOREIGN KEY ("realisationId") 
            REFERENCES "Realisations"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        );
      `);

      // Créer la table SiteImage
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "SiteImage" (
          "id" SERIAL PRIMARY KEY,
          "key" TEXT NOT NULL UNIQUE,
          "url" TEXT NOT NULL,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Créer les tables de relation many-to-many
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "_CategoryToRealisations" (
          "A" INTEGER NOT NULL,
          "B" INTEGER NOT NULL,
          CONSTRAINT "_CategoryToRealisations_A_fkey" 
            FOREIGN KEY ("A") 
            REFERENCES "Category"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
          CONSTRAINT "_CategoryToRealisations_B_fkey" 
            FOREIGN KEY ("B") 
            REFERENCES "Realisations"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        );
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "_CategoryToRealisations_AB_unique" 
        ON "_CategoryToRealisations"("A", "B");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "_CategoryToRealisations_B_index" 
        ON "_CategoryToRealisations"("B");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "_RealisationsToTag" (
          "A" INTEGER NOT NULL,
          "B" INTEGER NOT NULL,
          CONSTRAINT "_RealisationsToTag_A_fkey" 
            FOREIGN KEY ("A") 
            REFERENCES "Realisations"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
          CONSTRAINT "_RealisationsToTag_B_fkey" 
            FOREIGN KEY ("B") 
            REFERENCES "Tag"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        );
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "_RealisationsToTag_AB_unique" 
        ON "_RealisationsToTag"("A", "B");
      `);

      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "_RealisationsToTag_B_index" 
        ON "_RealisationsToTag"("B");
      `);

      console.log('Tables créées avec succès!');

      return NextResponse.json({
        success: true,
        message: 'Tables créées avec succès! Votre base de données est prête.',
        tables: [
          'admin',
          'Category',
          'Tag',
          'Realisations',
          'RealisationImage',
          'SiteImage',
          '_CategoryToRealisations',
          '_RealisationsToTag'
        ],
      });
    } catch (dbError: any) {
      console.error('Erreur lors de la création des tables:', dbError);

      // Si les tables existent déjà, c'est bon
      if (dbError.message?.includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: 'Les tables existent déjà (base de données déjà initialisée)',
        });
      }

      return NextResponse.json(
        {
          error: 'Erreur lors de la création des tables',
          details: dbError.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Endpoint GET pour vérifier si les tables existent
 */
export async function GET(request: NextRequest) {
  try {
    // Vérifier si la table Realisations existe
    const result = await prisma.$queryRawUnsafe(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Realisations'
      );
    `) as any[];

    const tablesExist = result[0]?.exists || false;

    if (tablesExist) {
      return NextResponse.json({
        success: true,
        message: 'Les tables existent dans la base de données',
        status: 'initialized',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Les tables n\'existent pas encore. Exécutez les migrations.',
        status: 'not_initialized',
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la vérification',
      error: error.message,
    });
  }
}
