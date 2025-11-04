import Header from './components/Header';
import Tore from './components/tore';
import Hole from './components/Hole';
import Footer from './components/Footer';
import LogoLoop from './components/LogoLoop';
import RecentRealisations from './components/RecentRealisations';
import ContactForm from './components/ContactForm';
import prisma from '../../lib/prisma';
import { DynamicBanner, DynamicProfileImage, DynamicRealisationsTitles } from './components/DynamicImages';
import BtnShadow from './components/BtnShadow';


const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/lucsar.tsn/' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/lucas-thomassin-7ba03634a/' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default async function Home() {
    // Récupérer les 3 dernières réalisations avec tri par date et ID
    let realisations: any[] = [];
    try {
        realisations = await prisma.realisations.findMany({
            include: {
                images: {
                    orderBy: { position: 'asc' },
                },
                categories: true,
                tags: true,
            },
        });
        
        // Trier par date (plus récente d'abord), puis par ID en cas de dates identiques
        realisations.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            if (dateA !== dateB) {
                return dateB - dateA;
            }
            return b.id - a.id;
        });
        
        // Prendre les 3 premiers
        realisations = realisations.slice(0, 3);
    } catch (err) {
        console.error('Prisma DB error on homepage:', err);
    }

    return (
        <div className="w-full min-h-screen overflow-hidden bg-white dark:bg-neutral-900">
                    <div className="relative w-full">
                        <DynamicBanner />

                        <Header />

                        {/* Boutons "Travaillons ensemble" et "Voir mes réalisations" */}
                        <div className='z-1 absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t dark:from-black to-transparent'></div>
                            <div className='flex-col sm:flex-row z-20 absolute bottom-0 sm:bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex  items-center gap-6'>
                                <a href="./contact" className="btn2 inline-flex items-center sm:px-8 sm:py-5 px-9 py-4 relative border-2 rounded-md border-white text-black leading-none overflow-hidden bg-white hover:text-orange-500 hover:scale-110 duration-500 text-xl whitespace-nowrap justify-center" type="button">
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
                                { text: "Montage vidéo" },
                                { text: "Retouche photo" },
                                { text: "Photographie" },
                                { text: "Cadrage" },
                                { text: "Shooting" },
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
                        <div className='relative w-full md:h-[35vh] bg-neutral-300 dark:bg-black flex justify-center items-start md:items-end flex-col md:flex-row pt-3 pb-6'>
                            <div className='z-10 h-full flex justify-center w-full md:w-auto py-8 md:py-0'> 
                                <img src='/IMG_1949-2.png' alt='Lucas Thomassin' className='object-cover md:h-full rounded-xl md:mr-5 ' />
                            </div>
                            <div className='z-10 flex flex-col justify-between h-full md:ml-6 md:px-0 mr-5 w-[80%] md:w-auto whitespace-nowrap relative md:left-0 left-[50%] md:translate-x-0 translate-x-[-50%]'>
                                <div> 
                                    <h1 className='text-4xl text-black dark:text-white font-medium'>Lucas</h1>
                                    <h1 className='text-6xl text-black dark:text-white font-bold mb-3'>Thomassin</h1>
                                    <div className='space-x-3 space-y-2'>
                                        <button className='bg-orange-400/40 text-white dark:text-white outline-orange-400 px-4.5 py-1 mb-2 rounded-2xl border-1 border-orange-400'>
                                            <img src='/localisation.svg' className='h-5 mb-1 inline-block mr-2'/>
                                            Angoulême
                                        </button>
                                        <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 bg-orange-700/80 border-orange-400 text-orange-300'>
                                            Cadrage
                                        </button>
                                        <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 bg-orange-700/80 border-orange-400 text-orange-300'>
                                            Montage
                                        </button>
                                        <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 bg-orange-700/80 border-orange-400 text-orange-300'>
                                            Photographie
                                        </button>
                                        <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 bg-orange-700/80 border-orange-400 text-orange-300'>
                                            Retouche photo
                                        </button>
                                    </div>
                                    <p className='mt-5 font-mono text-xl text-left mb-6 text-black dark:text-white'>
                                        Étudiant en BUT MMI à Angoulême, je suis passionné de vidéo et photo.
                                    </p>
                                    <div className='flex justify-start mb-2'> 
                                    <a href="./a-propos" className="btn2 inline-flex items-center px-8 py-3 relative border-2 rounded-md border-white text-black leading-none overflow-hidden bg-white hover:scale-110 duration-500 text-xl" type="button">
                                        En savoir plus
                                        <img src='/upright.png' className='h-4 inline-block ml-3'/>
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
                    <DynamicRealisationsTitles />











                    {/* Grille des 3 dernières réalisations */}
                    <RecentRealisations realisations={realisations} />
                    <div className='w-full flex justify-center'>
                        <BtnShadow
                            bgColor='#ff8a04d9'
                            borderColor='#FF8904'
                            img='/allReal.svg'
                            text='Voir toutes mes réalisations'
                            textColor='#FFFFFF'
                            link='/realisations'
                            classnamea='rounded-lg'
                            classname='hover:cursor-pointer'
                        />
                    </div>

                    <ContactForm />
    
            <Footer />
        </div>
    );
}