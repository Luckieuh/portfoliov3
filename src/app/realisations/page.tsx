import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import RealisationTitle from '../components/Realisation';
import RealSVG from '../components/Realsvg';
import BtnShadow from '../components/BtnShadow';
import RealisationsClient from './RealisationsClient';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    videoUrl: string | null;
    link: string | null;
    categories: string[];
    tags: any[];
    images: any[];
    location: string | null;
    youtubeUrl: string | null;
    createdAt: string;
}

export default async function Realisation() {
    let projects: Project[] = [];
    let error: string | null = null;

    try {
        // Récupérer les projets depuis la base de données
        const projectsData = await prisma.realisations.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                images: {
                    orderBy: { createdAt: 'asc' },
                },
                categories: true,
                tags: true,
            },
        });

        // Convertir les données au format attendu par le composant
        projects = projectsData.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            imageUrl: project.images && project.images.length > 0 ? project.images[0].url : null,
            videoUrl: project.videoUrl,
            link: project.link,
            categories: project.categories.map(cat => cat.name),
            tags: project.tags,
            images: project.images,
            location: project.location,
            youtubeUrl: project.youtubeUrl,
            createdAt: project.createdAt.toISOString(),
        }));
    } catch (err) {
        console.error('Erreur lors de la récupération des réalisations:', err);
        error = err instanceof Error ? err.message : 'Erreur inconnue';
    }
    
    return (
        <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 overflow-x-hidden relative">
            {/* SVG en arrière-plan */}

            <div className='absolute w-full h-full'>
                <RealSVG />
            </div>

            {/* Contenu principal au-dessus */}
            <div className='w-full relative z-10'>
                <Header />
                
                {error && (
                    <div className='mx-4 mt-4 p-4 bg-red-900 text-red-100 rounded-lg'>
                        <p className='font-bold'>Erreur Base de Données:</p>
                        <p className='text-sm'>{error}</p>
                    </div>
                )}
                
                <div className='w-full h-[10vh]'></div>

                <div className='flex justify-center w-full'>
                    <RealisationTitle />
                </div>

                <div className='w-full flex gap-3 whitespace-nowrap mt-5 ml-4 mb-3'>
                    <BtnShadow 
                        bgColor='#FF8904'
                        borderColor='#FF8904'
                        img='/phone.svg'
                        text='ME CONTACTER'
                        textColor='#FFFFFF'
                        link='/a-propos'
                    />
                    <BtnShadow 
                        bgColor=''
                        borderColor='#FFFFFF'
                        img='/camera.svg'
                        text='MON MATÉRIEL'
                        textColor='#FFFFFF'
                        link='/a-propos.pdf'
                    />
                </div>

                <RealisationsClient projects={projects} />
                
                <Footer />
            </div>
        </div>
    )
}
