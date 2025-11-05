import prisma from '../lib/prisma';

async function checkDatabase() {
    console.log('🔍 Checking database connection and tables...\n');

    try {
        // Test connection
        await prisma.$connect();
        console.log('✅ Database connection: SUCCESS\n');

        // Check Realisations table
        console.log('📋 Checking Realisations table...');
        const realisationsCount = await prisma.realisations.count();
        console.log(`   Total realisations: ${realisationsCount}`);

        if (realisationsCount > 0) {
            const sample = await prisma.realisations.findFirst({
                include: {
                    images: true,
                    categories: true,
                    tags: true,
                }
            });
            console.log('   Sample realisation:', {
                id: sample?.id,
                title: sample?.title,
                hasImages: (sample?.images?.length || 0) > 0,
                categoriesCount: sample?.categories?.length || 0,
                tagsCount: sample?.tags?.length || 0,
            });
        }

        // Check Categories
        console.log('\n📋 Checking Category table...');
        const categoriesCount = await prisma.category.count();
        const categories = await prisma.category.findMany();
        console.log(`   Total categories: ${categoriesCount}`);
        console.log('   Categories:', categories.map(c => c.name).join(', '));

        // Check Tags
        console.log('\n📋 Checking Tag table...');
        const tagsCount = await prisma.tag.count();
        const tags = await prisma.tag.findMany();
        console.log(`   Total tags: ${tagsCount}`);
        console.log('   Tags:', tags.map(t => t.name).join(', '));

        // Check RealisationImage
        console.log('\n📋 Checking RealisationImage table...');
        const imagesCount = await prisma.realisationImage.count();
        console.log(`   Total images: ${imagesCount}`);

        // Check SiteImage
        console.log('\n📋 Checking SiteImage table...');
        const siteImagesCount = await prisma.siteImage.count();
        console.log(`   Total site images: ${siteImagesCount}`);

        // Check Admin
        console.log('\n📋 Checking admin table...');
        const adminsCount = await prisma.admin.count();
        console.log(`   Total admins: ${adminsCount}`);

        // Test the exact query from page.tsx
        console.log('\n🧪 Testing homepage query...');
        const homeRealisations = await prisma.realisations.findMany({
            include: {
                images: {
                    orderBy: { position: 'asc' },
                },
                categories: true,
                tags: true,
            },
        });
        console.log(`   Query result: ${homeRealisations.length} realisations`);
        console.log('   ✅ Homepage query: SUCCESS');

        console.log('\n✅ All checks passed!');

    } catch (error) {
        console.error('\n❌ Error:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();
