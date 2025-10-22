import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import RealisationTitle from '../components/Realisation';
import RealSVG from '../components/Realsvg';
import BtnShadow from '../components/BtnShadow';
import RealisationsClient from './RealisationsClient';
import prisma from '../../../lib/prisma';

export default async function Realisation() {
    // Récupérer les projets depuis la base de données
    const projectsData = await prisma.realisation.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            images: {
                orderBy: { createdAt: 'asc' },
            },
        },
    });

    // Transformer les données pour le client
    const projects = projectsData.map(project => ({
        ...project,
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
