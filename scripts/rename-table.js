#!/usr/bin/env node

const prisma = require('../lib/prisma').default;

async function renameTable() {
  try {
    console.log('Renaming table Realisations -> Realisation...');
    await prisma.$queryRaw`ALTER TABLE "Realisations" RENAME TO "Realisation"`;
    console.log('✅ Table renamed successfully');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

renameTable();
