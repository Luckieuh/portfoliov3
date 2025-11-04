import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import RealisationTitle from '../components/Realisation';
import RealSVG from '../components/Realsvg';
import BtnShadow from '../components/BtnShadow';
import RealisationsClient from './RealisationsClient';
import prisma from '../../../lib/prisma';

export default async function Realisation() {
    // Récupérer les projets depuis la base de données
    const projectsData = await prisma.realisations.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            images: {
                orderBy: { position: 'asc' },
            },
            categories: true,
            tags: true,
        },
    });

    // Convertir les dates en chaînes pour éviter les problèmes de sérialisation
    const projects = projectsData.map((project: any) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        videoUrl: project.videoUrl,
        youtubeUrl: project.youtubeUrl,
        link: project.link,
        location: project.location,
        categories: project.categories.map((cat: any) => cat.name),
        tags: project.tags,
        images: project.images,
        createdAt: project.createdAt.toISOString(),
    }));
    
    return (
        <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 relative">
            {/* SVG en arrière-plan */}
            <div className='absolute w-full h-full'>
                <RealSVG />
            </div>

            {/* Contenu principal au-dessus */}
            <div className='w-full relative z-10'>
                <Header />
                
                <div className='w-full h-[10vh]'></div>

                <div className='flex justify-center w-full'>
                    <RealisationTitle />
                </div>

                <RealisationsClient projects={projects} />
                
                <Footer />
            </div>
        </div>
    )
}
