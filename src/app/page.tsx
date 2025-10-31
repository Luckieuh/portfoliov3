import Header from './components/Header';
import Tore from './components/tore';
import Hole from './components/Hole';
import Footer from './components/Footer';
import LogoLoop from './components/LogoLoop';
import RecentRealisations from './components/RecentRealisations';
import ContactForm from './components/ContactForm';
import prisma from '../../lib/prisma';
import { DynamicBanner, DynamicProfileImage } from './components/DynamicImages';
import BtnShadow from './components/BtnShadow';


const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/lucsar.tsn/' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/lucas-thomassin-7ba03634a/' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default async function Home() {
    // Récupérer les 3 dernières réalisations
    let realisations = [];
    try {
        realisations = await prisma.realisation.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            include: {
                images: {
                    orderBy: { createdAt: 'asc' },
                },
                categories: true,
                tags: true,
            },
        });
    } catch (err) {
        // Si la DB est indisponible, on affiche une UI de secours lisible
        console.error('Prisma DB error on homepage:', err);
        return (
            <div className="w-full min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <div className="max-w-2xl text-center p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Impossible de charger les réalisations</h2>
                    <p className="mb-4 text-neutral-600 dark:text-neutral-300">La connexion à la base de données est indisponible pour le moment. Vérifiez votre configuration ou réessayez plus tard.</p>
                    <div className="flex justify-center gap-4">
                        <a href="/realisations" className="px-4 py-2 rounded bg-orange-500 text-white">Réessayer</a>
                        <a href="/a-propos" className="px-4 py-2 rounded border">Contact</a>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen overflow-hidden bg-white dark:bg-neutral-900">
                    <Header />
                    <div className="relative w-full">
                        <DynamicBanner />

                        {/* Boutons "Travaillons ensemble" et "Voir mes réalisations" */}
                        <div className='z-1 absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-black to-transparent'></div>
                            <div className='flex-col sm:flex-row z-20 absolute bottom-0 sm:bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex  items-center gap-6'>
                                <a href="./a-propos" className="btn2 inline-flex items-center sm:px-8 sm:py-5 px-9 py-4 relative border-2 rounded-md border-white text-black leading-none overflow-hidden bg-white hover:text-orange-500 hover:scale-110 duration-500 text-xl whitespace-nowrap justify-center" type="button">
                                            Travaillons ensemble
                                </a>
                                <a href="./realisations" className="btn2 group inline-flex items-center sm:px-8 sm:py-5 px-5 py-4 relative border-2 rounded-md border-white leading-none overflow-hidden hover:scale-110 duration-500 text-xl whitespace-nowrap justify-center" type="button">
                                    <span className="absolute inset-0 bg-white"></span>
                                    <span className="inset-0 inline-flex items-center gap-3 text-white group-hover:text-orange-400 transition-all ease-in-out duration-300"> 
                                            Voir mes réalisations
                                        <svg className="w-5 h-5 scale-140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                    </div>

                        {/* Bandeau défilant des compétences */}
                        <div className='carousel flex h-[7vh] items-center bg-neutral-300 dark:bg-black overflow-hidden'>
                            <LogoLoop 
                            items={[
                                { text: "Photographie" },
                                { text: "Cadrage" },
                                { text: "Montage vidéo" },
                                { text: "Retouche photo" },
                                { text: "Création numérique" },
                                { text: "Communication" },
                                { src: "/star.svg", alt: "star" }
                            ]}
                            textClassName="text-xl md:text-3xl font-normal"
                            starIcon="/star.svg"
                            gap={32}
                            logoHeight={28}
                            fadeOut={false}
                            className='overflow-hidden'
                            />
                        </div>

                        {/* Section principale avec l'image et le texte */}
                        <div className='relative w-full lg:h-fit bg-neutral-300 dark:bg-black flex justify-center items-start flex-col md:flex-row pt-3 pb-6 mx-auto'>
                            <div className='z-10 h-full flex justify-center w-full md:w-auto py-8 md:py-0'> 
                                <DynamicProfileImage />
                            </div>
                            <div className='z-10 flex h-full flex-col justify-between md:px-0 mr-5 w-[80%] md:w-auto relative md:left-0 left-[50%] md:translate-x-0 translate-x-[-50%]'>
                                <div> 
                                    <h1 className='text-4xl text-black dark:text-white font-medium'>Lucas</h1>
                                    <h1 className='text-6xl text-black dark:text-white font-bold mb-3'>Thomassin</h1>
                                    <div className='space-x-3 space-y-2'>
                                        <a className='hover:cursor-pointer group' href="https://www.google.com/maps/place/Angoul%C3%AAme,+France/@45.6411533,0.0861775,12z/data=!4m6!3m5!1s0x47fe2d85032bc499:0x405d39260eec0f0!8m2!3d45.6488766!4d0.1567288!16zL20vMGxneV8?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D">
                                            <button className='hover:cursor-pointer bg-orange-400/40 text-white outline-orange-400 px-4.5 py-1 mb-2 rounded-2xl border-1 border-orange-400 relative overflow-hidden'>
                                                {/* SVG Localisation - visible par défaut, caché au hover */}
                                                <img 
                                                  src='/localisation.svg' 
                                                  className='h-5 mb-1 inline-block mr-2 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2 group-hover:scale-75'
                                                  alt='localisation'
                                                />
                                                {/* SVG Flèche - caché par défaut, visible au hover */}
                                                <svg 
                                                  className='h-5 mb-1 inline-block mr-2 absolute opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-5 -translate-x-2 pr-2 group-hover:scale-100 scale-75'
                                                  viewBox="0 0 24 24" 
                                                  fill="none" 
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                >
                                                  <line x1="5" y1="19" x2="19" y2="5" />
                                                  <polyline points="10 5 19 5 19 14" />
                                                </svg>
                                                Angoulême
                                            </button>
                                        </a>

                                        <button className='outline-orange-400 bg-orange-800/60 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300 '>
                                            Cadrage
                                        </button>
                                        <button className='outline-orange-400 bg-orange-800/60 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300'>
                                            Montage
                                        </button>
                                        <button className='outline-orange-400 bg-orange-800/60 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300'>
                                            Photographie
                                        </button>
                                        <button className='outline-orange-400 bg-orange-800/60 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300'>
                                            Retouche photo
                                        </button>
                                    </div>
                                    <p className='mt-5 font-mono text-xl text-left mb-6 text-black dark:text-white'>
                                        Étudiant en BUT MMI à Angoulême, je suis passionné de vidéo et photo.
                                    </p>
                                    <div className='flex justify-start mb-2'> 
                                    <a href="./a-propos" className="btn2 group inline-flex items-center px-8 py-3 relative border-2 rounded-md border-white text-black hover:text-orange-400 leading-none overflow-hidden bg-white hover:scale-110 duration-500 text-xl" type="button">
                                        En savoir plus
                                        <svg 
                                            className='h-5 inline-block stroke-black relative bottom-0 mr-2 pr-2 scale-85 group-hover:stroke-orange-400 transition-all ease-in-out duration-500'
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="5" y1="19" x2="19" y2="5" />
                                            <polyline points="10 5 19 5 19 14" />
                                        </svg>                                    
                                    </a>
                                </div>
                                </div>

                            </div>
                                <Hole />
                                <Tore />


                        {/* Dégradé vers le bas */}
                        </div>
                        <div className='w-full h-[8vh] bg-gradient-to-b dark:from-black from-neutral-300 to-transparent'></div>

                        {/* Titres "Mes dernières réalisations" */}
                        <div className='w-full flex flex-row justify-center'>
                                    <img className='w-[80%] hidden dark:block' src='/lastreal.svg' alt='Mes dernières réalisations' />
                                    <img className='w-[80%] block dark:hidden' src='/darklastreal.svg' alt='Mes dernières réalisations' />
                        </div>

                        {/* Grille des 3 dernières réalisations */}
                        <RecentRealisations realisations={realisations} />
                            <a href="/realisations" className="flex justify-center mb-10">
                                <BtnShadow
                                    bgColor='#ff8a04d9'
                                    borderColor='#FF8904'
                                    img='/allReal.svg'
                                    text='Voir toutes mes réalisations'
                                    textColor='#FFFFFF'
                                    link='/realisations'
                                />
                            </a>
                        <ContactForm />
                            
            <Footer />
        </div>
    );
}