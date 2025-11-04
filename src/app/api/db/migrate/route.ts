import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import path from 'path';

/**
 * Endpoint pour exécuter les migrations Prisma
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

    // Exécuter les migrations
    console.log('Exécution des migrations Prisma...');
    
    try {
      const output = execSync('npx prisma migrate deploy', {
        cwd: process.cwd(),
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      console.log('Migrations exécutées avec succès:', output);

      return NextResponse.json({
        success: true,
        message: 'Migrations Prisma exécutées avec succès',
        output: output,
      });
    } catch (migrationError: any) {
      console.error('Erreur lors de l\'exécution des migrations:', migrationError);

      // Si l'erreur est "no migrations to apply", c'est bon
      if (migrationError.stdout?.includes('no migrations to apply')) {
        return NextResponse.json({
          success: true,
          message: 'Aucune migration à appliquer (déjà à jour)',
          output: migrationError.stdout,
        });
      }

      return NextResponse.json(
        {
          error: 'Erreur lors de l\'exécution des migrations',
          details: migrationError.message,
          stdout: migrationError.stdout?.toString(),
          stderr: migrationError.stderr?.toString(),
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
 * Endpoint GET pour vérifier l'état des migrations (sans exécuter)
 */
export async function GET(request: NextRequest) {
  try {
    const output = execSync('npx prisma migrate status', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    return NextResponse.json({
      success: true,
      message: 'État des migrations',
      output: output,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la vérification du statut',
      output: error.stdout?.toString() || error.message,
    });
  }
}
