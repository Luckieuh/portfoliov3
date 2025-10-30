import BtnShadow from './BtnShadow';
import { DynamicFooterProfileImage } from './DynamicImages';

export default function Footer() {
    return (
            <footer className='w-full min-h-fit bottom-0 relative flex flex-col md:flex-row bg-black justify-between pt-4 text-white pb-8 px-4 lg:px-12 space-x-4'>
                <div className='h-fit w-full md:w-[50%] mb-6 lg:mb-0'>
                    <div className='flex flex-row w-fit'>
                        <DynamicFooterProfileImage />
                        <div className='ml-5 h-fit'>
                            <p className='text-xl sm:text-3xl font-bold -mb-1 text-orange-400'>Lucas</p>
                            <p className='text-2xl sm:text-4xl font-extrabold text-orange-400'>Thomassin</p>
                            <p className='text-lg sm:text-xl mb-4 hidden sm:block'>Étudiant passionné par la vidéo et la photo.</p>
                        </div>
                    </div>

                    <div className='flex flex-row flex-wrap gap-3 mt-4'>
                        <BtnShadow
                            bgColor='#5C1742'
                            borderColor='#FF00E5'
                            img='/Instagram.webp'
                            text='Instagram'
                            textColor='#FF00E5'
                            link='https://www.instagram.com/lucsar.tsn/'
                        />
                        <BtnShadow
                            bgColor='#162C42'
                            borderColor='#0037FF'
                            img='/LinkedIn.webp'
                            text='LinkedIn'
                            textColor='#0037FF'
                            link='https://www.linkedin.com/in/lucas-thomassin-7ba03634a/'
                        />
                        <BtnShadow
                            bgColor='#db0700d0'
                            borderColor='#b30e08ff'
                            img='/Youtube.svg'
                            className='scale-80'
                            text='Youtube'
                            textColor='#FFFFFF'
                            link='https://www.youtube.com/@LucsarTsn'
                        />
                        <BtnShadow
                            bgColor='#575757'
                            borderColor='#FFFFFF'
                            img='/mail.svg'
                            text='lucas2.thom@gmail.com'
                            textColor='#FFFFFF'
                            link='https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlGTfLNZftfhhqBCpvBrZPsfSznPdZxqwvhFgxcvTQkptZRGhvpvkxpwskPnjzrKwjkcQB'
                        />
                    </div>
                </div>

                <div className='flex flex-col md:text-end justify-center mt-5 md:mt-0'>
                    <div className='mb-8'>
                        <div className='space-x-5 mb-1'>
                            <a href='/'>Accueil</a>
                            <a href='/a-propos'>A propos</a>
                            <a href='/realisations'>Mes réalisations</a>
                        </div>
                        <div className='space-x-5'>
                            <a href='/'>Mentions légales</a>
                            <a href='/'>Politique de confidentialité</a>
                        </div>
                    </div>
                    <div>
                        <p className='mb-1'>© Lucas Thomassin - Tous droits reservés</p>

                        <p>Site web designé sur <a href="https://www.figma.com/" className='font-bold'>Figma</a> et développé avec <a href='https://nextjs.org/' className='font-bold'>Next.js</a> par Lucas Thomassin </p>
                    </div>
                </div>
                <img src='/footer2.svg' className='absolute bottom-0 right-0 hidden md:block sm:h-[48%] md:h-[40%]'/>    
            </footer>
    );
}