import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import RealisationTitle from '../components/Realisation';
import RealSVG from '../components/Realsvg';
import BtnShadow from '../components/BtnShadow';
import RealisationsClient from './RealisationsClient';
import prisma from '../../../lib/prisma';

// Empêcher le prerendering statique (la page dépend de la BD)
export const dynamic = 'force-dynamic';

export default async function Realisation() {
    // Récupérer les projets depuis la base de données en ordre chronologique décroissant
    const projectsData = await prisma.realisations.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            description: true,
            videoUrl: true,
            youtubeUrl: true,
            link: true,
            location: true,
            createdAt: true,
            RealisationImage: {
                select: {
                    id: true,
                    url: true,
                    position: true,
                },
                orderBy: { position: 'asc' },
            },
            Category: {
                select: {
                    name: true,
                },
            },
            Tag: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    // Convertir les dates en chaînes pour éviter les problèmes de sérialisation
    const projects = projectsData.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        videoUrl: project.videoUrl,
        youtubeUrl: project.youtubeUrl,
        link: project.link,
        location: project.location,
        categories: project.Category.map((cat) => cat.name),
        tags: project.Tag,
        images: project.RealisationImage,
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
