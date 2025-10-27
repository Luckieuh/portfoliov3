import Header from '@/app/components/Header';
import WireframePropos from '../components/Wiframepropos';
import Experience from '../components/Experience';
import Outils from '../components/Outils';
import BtnShadow from '../components/BtnShadow';
import Parcours from '../components/Parcours';

export default function Propos() {
    return (
        <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 overflow-x-hidden pt-[10vh]">
            <Header />
            <WireframePropos />
            <div className='w-full h-[12vh]'></div>

            <div className='w-full flex flex-col lg:flex-row justify-center items-center lg:items-start px-4 md:px-8 lg:scale-100 scale-90 mb-16'>
                {/* Image */}
                <div className='w-full lg:w-auto max-w-[500px] mb-8 md:mb-0 flex justify-center'>
                    <img src="IMG_1949-2.png" className='object-cover rounded-xl w-full h-auto' alt="Lucas Thomassin devant un lac et des montagnes" />
                </div>
                
                {/* Séparateur étoile */}
                <div className='hidden lg:block ml-10'>
                </div>

                {/* Contenu texte */}
                <div className='w-fit md:ml-2 flex flex-col items-center md:items-start text-center lg:text-left mt-5'>
                    <div className='flex flex-row items-center space-x-3 mb-3'>
                        <img src='/star.svg' className='h-[45px]' alt='star'/>
                        <h2 className='text-3xl md:text-5xl whitespace-nowrap dark:text-white'>Hey ! Je suis</h2>
                    </div>
                    <h1 className='text-5xl lg:text-7xl text-orange-400 font-bold mb-3'>Lucas Thomassin</h1>
                    <div className='flex flex-row items-center w-full md:w-[85%] space-x-3 mb-6'>
                        <div className='bg-black dark:bg-white w-[60%] md:w-[85%] h-[2px]'></div>
                        <h3 className='whitespace-nowrap font-light text-lg md:text-xl dark:text-white'>Étudiant en BUT MMI</h3>
                    </div>
                    <div className='text-2xl lg:text-3xl xl:text-4xl w-full md:w-[80%] font-light space-y-4 md:space-y-2 dark:text-white'>
                        <p>
                            Après avoir obtenu le bac avec Mention Très Bien, je me suis lancé dans les études du <span className='text-orange-400 font-medium'>Multimédia et de l'Internet.</span>
                        </p>
                        <p>
                            C'est ici que je me suis découvert une passion pour la <span className='text-orange-400 font-medium'>photographie</span> et la <span className='text-orange-400 font-medium'>vidéo</span>.
                        </p>
                        <p>
                            Je m'inspire de mes voyages et expériences pour <span className='text-orange-400 font-medium'>créer du contenu photo et vidéo</span>, ayant pour objectif d'en faire ma carrière.
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-center space-x-52'>

                <div className='w-[90%] lg:w-[40%] flex flex-col pb-5 relative left-1/2 transform -translate-x-1/2 lg:left-0 lg:translate-x-0'>
                    <div className='ml-5 mb-5 scale-110'>
                        <Experience />
                    </div>
                    <div className='mt-2'>
                        <div className='flex right-0 border-b-5 border-orange-400 w-fit text-4xl font-bold'>
                            <p>Fév.-Avr. 2026</p>
                        </div>
                        <div className='border-2 border-orange-400 w-fit p-2'>
                        <div className='flex flex-row items-center space-x-2'>
                            <img src="/starwhite.svg" alt="star" className='h-5'/>
                            <p className='text-3xl text-orange-400 font-medium'>Stage au sein de l'entreprise Multyde</p>
                        </div>
                        <p className='text-2xl'>Cadrage, photographie, montage, retouche photo, community management</p>
                        </div>
                    </div>


                    <div className='ml-5 mb-5 scale-110 mt-15'>
                        <Parcours />
                    </div>
                    <div className='mt-5'>
                        <div className='flex right-0 border-b-5 border-orange-400 w-fit text-4xl font-bold'>
                            <p>2024 - Aujourd'hui</p>
                        </div>
                        <div className='border-2 border-orange-400 w-fit p-2'>
                        <div className='flex flex-row items-center space-x-2'>
                            <img src="/starwhite.svg" alt="star" className='h-5'/>
                            <p className='text-3xl text-orange-400 font-medium'>BUT Métiers du Multimédia et de l'Internet</p>
                        </div>
                        <p className='text-2xl'>Parcours création numérique</p>
                        <p className='text-2xl'>IUT d'Angoulême</p>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className='flex right-0 border-b-5 border-orange-400 w-fit text-4xl font-bold'>
                            <p>2024</p>
                        </div>
                        <div className='border-2 border-orange-400 w-fit p-2'>
                        <div className='flex flex-row items-center space-x-2'>
                            <img src="/starwhite.svg" alt="star" className='h-5'/>
                            <p className='text-3xl text-orange-400 font-medium'>Baccalauréat Général - Mention Très Bien</p>
                        </div>
                        <p className='text-2xl'>Spécialités Mathématiques, Physique-Chimie</p>
                        <p className='text-2xl'>Ingré</p>
                        </div>
                    </div>

                </div>


                <div className='mr-5 pb-5 w-[90%] lg:w-[40vw] relative mt-10 left-1/2 transform -translate-x-1/2 lg:left-0 lg:translate-x-0'>
                    <div className='scale-110 mb-5'>
                        <Outils />
                    </div>
                    <div className='box-shadow-glow-orange border-2 border-orange-400 w-fit p-2 space-y-5'>
                        {/* <div className='absolute fill-white right-20 bottom-[35%] rotate-90 scale-110'>
                            <CutSphere />
                        </div> */}

                        <div className='flex flex-row items-center space-x-2 mb-2'>
                            <img src="starwhite.svg" alt="star" className='h-6'/>
                            <p className='text-4xl font-bold text-orange-400'>Mon matériel</p>
                        </div>


                        <div className='flex flex-col h-fit space-y-3'>
                            <div className='flex flex-row space-x-2 items-center'>
                                <p className='vertical-text text-sm border-r-1 border-orange-400 text-orange-400'>Caméra</p>
                                <p className='text-3xl'>Canon EOS R10</p>
                            </div>
                            <div className='flex flex-row space-x-2 items-center'>
                                <p className='vertical-text text-sm border-r-1 border-orange-400 text-orange-400'>Objectif</p>
                                <p className='text-2xl'>Canon EFS 17-55mm f/2.8 IS USM</p>
                            </div>
                            <div className='flex flex-row space-x-2 items-center'>
                                <p className='vertical-text text-sm border-r-1 border-orange-400 text-orange-400'>Accessoires</p>
                                <div className='flex flex-col space-y-2'>
                                    <p className='text-2xl'>Bague d'adaptation EF-EOS R</p>
                                    <p className='text-2xl'>Carbon Fiber Pocket Tripod Kit</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex mb-2 flex-col space-y-2'>
                            <div className='flex flex-row-reverse items-center mb-3'>
                                <p className='text-4xl font-bold text-orange-400 px-1'>Mes logiciels</p>
                                <img src="starwhite.svg" alt="star" className='h-6'/>
                            </div>
                            <div className='flex flex-col items-end space-y-3'>
                                {/* Première ligne */}
                                <div className='flex flex-row space-x-4'>
                                    <BtnShadow 
                                        bgColor="rgba(29, 47, 66, 0.4)"
                                        borderColor="#60CA91"
                                        img="/Davinci.webp"
                                        text="Davinci Resolve"
                                        textColor="white"
                                    />

                                    <BtnShadow 
                                        bgColor="rgba(0, 30, 54, 0.65)"
                                        borderColor="#2B98E8"
                                        img="/LightRoom.png"
                                        text="LightRoom"
                                        textColor="white"
                                    />

                                    <BtnShadow 
                                        bgColor="rgba(0, 30, 54, 0.65)"
                                        borderColor="#2B98E8"
                                        img="/Photoshop.png"
                                        text="Photoshop"
                                        textColor="white"
                                    />
                                </div>
                                
                                {/* Deuxième ligne alignée à droite */}
                                <div className='flex flex-row space-x-4'>
                                    <BtnShadow 
                                        bgColor="rgb(42, 42, 42, 0.6)"
                                        borderColor="#A259FF"
                                        img="/Figma.png"
                                        text="Figma"
                                        textColor="white"
                                    />

                                    <BtnShadow 
                                        bgColor="rgba(51, 0, 0, 0.5)"
                                        borderColor="#FF9A00"
                                        img="/Illustrator.png"
                                        text="Illustrator"
                                        textColor="white"
                                    />

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className='w-[40%] px-10'>


            </div>
        </div>
    );
}