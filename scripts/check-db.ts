/**
 * Script de vérification rapide de la base de données
 * À lancer depuis le terminal: npm run check:db
 */

import prisma from '../lib/prisma.js';

async function checkDatabase() {
  console.log('🔍 Vérification de la base de données...\n');
  
  try {
    // Test 1: Connexion
    console.log('1️⃣  Test de connexion...');
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Connexion OK\n');
    
    // Test 2: Tables
    console.log('2️⃣  Tables disponibles:');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log(tables);
    console.log('');
    
    // Test 3: Realisations table
    console.log('3️⃣  Vérification table "Realisations":');
    const realisationsCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM "Realisations"
    `;
    console.log(`✅ Table existe avec ${(realisationsCount as any)[0].count} lignes\n`);
    
    // Test 4: Migrations
    console.log('4️⃣  Migrations appliquées:');
    const migrations = await prisma.$queryRaw`
      SELECT name, finished_at FROM _prisma_migrations
      ORDER BY finished_at DESC
    `;
    console.log(migrations);
    console.log('');
    
    console.log('✅ Tous les tests sont passés!');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
