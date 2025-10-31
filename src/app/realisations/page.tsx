import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import RealisationTitle from '../components/Realisation';
import RealSVG from '../components/Realsvg';
import BtnShadow from '../components/BtnShadow';
import RealisationsClient from './RealisationsClient';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Realisation() {
    // Récupérer les projets depuis la base de données
    const projectsData = await prisma.realisation.findMany({
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
    const projects = projectsData.map(project => ({
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
    
    return (
        <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 overflow-x-hidden relative">
            {/* SVG en arrière-plan */}

            <h1>TEST</h1>
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
