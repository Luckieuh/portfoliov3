#!/usr/bin/env node

import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔧 Outil de gestion du compte admin\n');

    // Vérifier s'il existe un admin
    const adminCount = await prisma.admin.count();
    
    if (adminCount > 0) {
      console.log('⚠️  Un compte admin existe déjà.');
      const admin = await prisma.admin.findFirst();
      console.log(`   Utilisateur: ${admin?.username}`);
      console.log('\n📋 Suppression de l\'admin existant...');
      
      await prisma.admin.deleteMany({});
      console.log('✅ Admin supprimé avec succès!\n');
    } else {
      console.log('ℹ️  Aucun compte admin trouvé.\n');
    }

    // Demander les nouvelles identifiants
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (query: string): Promise<string> => new Promise(resolve => rl.question(query, resolve));

    const username = await question('👤 Entrez le nom d\'utilisateur: ');
    const password = await question('🔐 Entrez le mot de passe (min 8 caractères): ');

    rl.close();

    if (!username || !password) {
      console.error('❌ Les identifiants sont requis!');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('❌ Le mot de passe doit contenir au moins 8 caractères!');
      process.exit(1);
    }

    // Hasher le mot de passe
    console.log('\n🔐 Hashage du mot de passe...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel admin
    console.log('📝 Création du nouvel admin...');
    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log('\n✅ Compte admin créé avec succès!');
    console.log(`   ID: ${newAdmin.id}`);
    console.log(`   Utilisateur: ${newAdmin.username}`);
    console.log('\n🚀 Vous pouvez maintenant vous connecter avec ces identifiants!');
    console.log('   URL: http://localhost:3000/auth/login\n');

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
