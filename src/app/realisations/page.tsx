import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import RealisationTitle from '../components/Realisation';
import RealSVG from '../components/Realsvg';
import BtnShadow from '../components/BtnShadow';
import RealisationsClient from './RealisationsClient';
import ContactForm from '../components/ContactForm';
import prisma from '../../../lib/prisma';

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

    // Transformer les données pour le client
    const projects = projectsData.map((project: any) => ({
        ...project,
        createdAt: project.createdAt.toISOString(),
    }));
    
    return (
        <>
            <Header />
            <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 relative pt-[10vh]">
                {/* SVG en arrière-plan */}
                <div className='absolute inset-0 pointer-events-none'>
                    <RealSVG />
                </div>

                {/* Contenu principal au-dessus */}
                <div className='w-full relative z-10'>
                    
                    <div className='flex justify-center px-10 mb-8'>
                        <img src="/real.svg" alt="" className='hidden dark:block'/>
                        <img src="/darkreal.svg" alt="" className='block dark:hidden'/>
                    </div>

                    <RealisationsClient projects={projects} />
                    <div id='contact'>
                        <ContactForm />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
