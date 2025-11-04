'use client';

import { useEffect, useState } from 'react';

type SiteImage = {
  id: number;
  key: string;
  url: string;
  updatedAt: string;
};

const useSiteImage = (key: string, defaultUrl: string) => {
  const [imageUrl, setImageUrl] = useState(defaultUrl);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Ajouter un timestamp pour éviter le cache
        const response = await fetch(`/api/site-images?t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (response.ok) {
          const images: SiteImage[] = await response.json();
          const image = images.find(img => img.key === key);
          if (image) {
            setImageUrl(image.url);
          }
        }
      } catch (error) {
        console.error(`Erreur lors du chargement de l'image ${key}:`, error);
      }
    };

    // Fetch initial
    fetchImages();

    // Rafraîchir toutes les 5 secondes pour détecter les changements
    const interval = setInterval(fetchImages, 5000);

    return () => clearInterval(interval);
  }, [key]);

  return imageUrl;
};

export function DynamicBanner() {
  const bannerUrl = useSiteImage('hero-banner', '/Banner.png');

  return (
    <div 
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    ></div>
  );
}

export function DynamicProfileImage() {
  const imageUrl = useSiteImage('profile-image', '/IMG_1949-2.png');

  return (
    <img 
      src={imageUrl} 
      alt='Lucas Thomassin' 
      className='object-cover md:h-full rounded-xl md:mr-5 h-[60%] w-[80%]' 
    />
  );
}

export function DynamicFooterImages() {
  const imageUrl = useSiteImage('footer-profile-image', '/IMG_1949-2.png');

  return (
    <img src={imageUrl} className='rounded-lg w-30 h-30 object-cover' />
  );
}

export function DynamicFooterDecorations() {
  return (
    <>
      <img src='/footer1.svg' className='absolute top-0 left-[65%] sm:left-[55%] md:left-[35%] lg:left-[25%] h-[15%] sm:h-[20%] lg:h-[45%]'/>
      <img src='/footer2.svg' className='absolute bottom-0 right-0 h-[25%] sm:h-[48%] md:h-[40%]'/>
    </>
  );
}

export function DynamicRealisationsTitles() {
  return (
    <div className='w-full flex flex-row justify-center'>
      <img className='w-[80%] hidden dark:block' src='/lastreal.svg' alt='Mes dernières réalisations' />
      <img className='w-[80%] block dark:hidden' src='/darklastreal.svg' alt='Mes dernières réalisations' />
    </div>
  );
}
