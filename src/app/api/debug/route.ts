import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    
    // Protection simple par authorization header
    if (!authHeader?.includes('Bearer debug')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Test 1: Vérifier la connexion à la base de données
        const dbConnection = await prisma.$queryRaw`SELECT 1`;
        console.log('Database connection: OK');

        // Test 2: Lister toutes les tables
        const tables = await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `;
        console.log('Tables:', tables);

        // Test 3: Vérifier si Realisations table existe
        const realisationsTableExists = await prisma.$queryRaw`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'Realisations'
            )
        `;
        console.log('Realisations table exists:', realisationsTableExists);

        // Test 4: Vérifier les migrations
        const migrations = await prisma.$queryRaw`
            SELECT name FROM _prisma_migrations
            ORDER BY finished_at DESC
            LIMIT 10
        `;
        console.log('Last 10 migrations:', migrations);

        return NextResponse.json({
            status: 'ok',
            database: 'connected',
            tables,
            realisationsTableExists,
            migrations,
            environment: {
                hasDirectUrl: !!process.env.DIRECT_URL,
                hasDatabaseUrl: !!process.env.DATABASE_URL,
                node_env: process.env.NODE_ENV,
                vercel_env: process.env.VERCEL_ENV,
            }
        });
    } catch (error) {
        console.error('Debug endpoint error:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
