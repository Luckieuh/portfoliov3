'use client';

import { useEffect, useState } from 'react';

const POLL_INTERVAL = 30000; // 30 secondes

interface DynamicImageProps {
  imageKey: string;
  fallback: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  isBackground?: boolean; // Si true, rend comme background-image au lieu d'img
}

/**
 * Composant générique pour charger une image dynamique depuis le backend
 * Avec polling automatique toutes les 30 secondes
 */
export function DynamicImage({
  imageKey,
  fallback,
  alt = 'Image',
  className = '',
  style = {},
  isBackground = false,
}: DynamicImageProps) {
  const [imageSrc, setImageSrc] = useState(fallback);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  const fetchImage = async () => {
    try {
      const response = await fetch(`/api/site-images?t=${Date.now()}`);
      const images = await response.json();
      if (images[imageKey]) {
        const newUrl = images[imageKey];
        if (newUrl !== imageSrc) {
          setImageSrc(newUrl);
          setLastUpdate(Date.now());
        }
      }
    } catch (error) {
      console.error(`Erreur lors du chargement de l'image ${imageKey}:`, error);
    }
  };

  useEffect(() => {
    fetchImage();
    const interval = setInterval(fetchImage, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [imageKey, imageSrc]);

  if (isBackground) {
    return (
      <div
        className={className}
        style={{
          backgroundImage: `url('${imageSrc}?v=${lastUpdate}')`,
          ...style,
        }}
      />
    );
  }

  return (
    <img
      src={`${imageSrc}?v=${lastUpdate}`}
      alt={alt}
      className={className}
      style={style}
    />
  );
}

/**
 * Composant spécialisé pour la bannière d'accueil
 */
export function DynamicBanner() {
  return (
    <DynamicImage
      imageKey="homepage_banner"
      fallback="/Banner.png"
      isBackground={true}
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat"
    />
  );
}

/**
 * Composant spécialisé pour la photo profil d'accueil
 */
export function DynamicProfileImage() {
  return (
    <DynamicImage
      imageKey="homepage_profile"
      fallback="/IMG_1949-2.png"
      alt="Lucas Thomassin"
      className="object-cover md:h-full rounded-xl md:mr-5 h-[60%] w-[80%]"
    />
  );
}

/**
 * Composant spécialisé pour la photo profil du footer
 */
export function DynamicFooterProfileImage() {
  return (
    <DynamicImage
      imageKey="footer_profile"
      fallback="/IMG_1949-2.png"
      alt="Lucas Thomassin"
      className="rounded-lg w-30 h-30 object-cover"
    />
  );
}
