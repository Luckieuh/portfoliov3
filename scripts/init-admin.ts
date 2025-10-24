import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin && !process.argv.includes('--reset')) {
      console.log('✓ Un compte admin existe déjà:');
      console.log(`  - ID: ${existingAdmin.id}`);
      console.log(`  - Username: ${existingAdmin.username}`);
      console.log('\nPour réinitialiser, exécutez:');
      console.log('  npm run init-admin -- --reset');
      process.exit(0);
    }

    // Créer le compte admin par défaut
    const defaultUsername = 'admin';
    const defaultPassword = 'admin123';
    
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    let admin;
    if (existingAdmin && process.argv.includes('--reset')) {
      // Réinitialiser le compte existant
      admin = await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: {
          username: defaultUsername,
          password: hashedPassword,
        },
      });
      console.log('✓ Compte admin réinitialisé!');
    } else {
      // Créer un nouveau compte
      admin = await prisma.admin.create({
        data: {
          username: defaultUsername,
          password: hashedPassword,
        },
      });
      console.log('✓ Compte admin créé avec succès!');
    }

    console.log('\nIdentifiants:');
    console.log(`  - Username: ${defaultUsername}`);
    console.log(`  - Password: ${defaultPassword}`);
    console.log('\nVous pouvez maintenant accéder à: http://localhost:3000/auth/login');
    console.log('\n⚠️  IMPORTANT: Changez le mot de passe après la première connexion!');
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
