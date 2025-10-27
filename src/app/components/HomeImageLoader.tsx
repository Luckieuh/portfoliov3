'use client';

import { useEffect, useState } from 'react';

interface HomeImageLoaderProps {
  showProfile?: boolean;
}

export default function HomeImageLoader({ showProfile = false }: HomeImageLoaderProps) {
  const [bannerImage, setBannerImage] = useState('/Banner.png');
  const [profileImage, setProfileImage] = useState('/IMG_1949-2.png');

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/api/site-images');
        if (response.ok) {
          const images = await response.json();
          if (images.homepage_banner) setBannerImage(images.homepage_banner);
          if (images.homepage_profile) setProfileImage(images.homepage_profile);
        }
      } catch (error) {
        console.error('Erreur chargement images:', error);
      }
    };
    loadImages();
  }, []);

  // Mode bannière (affiche la bannière + boutons)
  if (!showProfile) {
    return (
      <>
        <div className="w-full h-[90vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${bannerImage}')` }}></div>

        <Header />

        {/* Boutons "Travaillons ensemble" et "Voir mes réalisations" */}
        <div className='z-1 absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t dark:from-black to-transparent'></div>
        <div className='flex-col sm:flex-row z-20 absolute bottom-0 sm:bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6'>
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
      </>
    );
  }

  // Mode profil (affiche juste la photo)
  return (
    <>
      <div className='z-10 h-full flex justify-center w-full md:w-auto py-8 md:py-0'> 
        <img src={profileImage} alt='Lucas Thomassin' className='object-cover md:h-full rounded-xl md:mr-5 h-[60%] w-[80%]' />
      </div>
      <div className='z-10 flex h-full flex-col justify-between md:ml-6 md:px-0 mr-5 w-[80%] md:w-auto relative md:left-0 left-[50%] md:translate-x-0 translate-x-[-50%]'>
        <div> 
          <h1 className='text-4xl text-black dark:text-white font-medium'>Lucas</h1>
          <h1 className='text-6xl text-black dark:text-white font-bold mb-3'>Thomassin</h1>
          <div className='space-x-3 space-y-2'>
            <button className='bg-orange-400/40 text-black dark:text-white outline-orange-400 px-4.5 py-1 mb-2 rounded-2xl border-1 border-orange-400'>
              <img src='/location.svg' className='h-5 mb-1 inline-block mr-2'/>
              Angoulême
            </button>
            <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300'>
              Cadrage
            </button>
            <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300'>
              Montage
            </button>
            <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300'>
              Photographie
            </button>
            <button className='outline-orange-400 px-4.5 py-1 rounded-2xl border-1 border-orange-400 text-orange-300'>
              Retouche photo
            </button>
          </div>
          <p className='mt-5 font-mono text-xl text-left mb-6 text-black dark:text-white'>
            Étudiant en BUT MMI à Angoulême, je suis passionné de vidéo et photo.
          </p>
        </div>
        <div className='flex justify-start mb-2'> 
          <a href="./a-propos" className="btn2 inline-flex items-center px-8 py-3 relative border-2 rounded-md border-white text-black leading-none overflow-hidden bg-white hover:scale-110 duration-500 text-xl" type="button">
            En savoir plus
            <img src='/upright.png' className='h-4 inline-block ml-3'/>
          </a>
        </div>
      </div>
    </>
  );
}

// Import Header
import Header from './Header';
