'use client';

import { useState } from 'react';

type Image = {
  id: number;
  url: string;
  position: number;
};

interface ImageCarouselProps {
  images: Image[];
  title: string;
  onFullscreenOpen?: (index: number) => void;
}

export default function ImageCarousel({ images, title, onFullscreenOpen }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400">Aucune image disponible</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    onFullscreenOpen?.(currentIndex);
  };

  return (
    <div className="w-full">
      {/* Image principale */}
      <div 
        className="relative w-full aspect-video bg-neutral-900 rounded-lg overflow-hidden group cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={currentImage.url}
          alt={`${title} - ${currentIndex + 1}`}
          className="w-full h-full object-cover group-hover:brightness-75 transition-brightness duration-300"
        />

        {/* Logo fullscreen en haut à droite */}
        <div className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5 text-white" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6C18 6.55229 17.5523 7 17 7C16.4477 7 16 6.55229 16 6V2H12C11.4477 2 11 1.55229 11 1C11 0.44772 11.4477 0 12 0H17C17.5523 0 18 0.44772 18 1V6Z" fill="white"/>
        <path d="M2 12C2 11.4477 1.55229 11 1 11C0.44772 11 0 11.4477 0 12V17C0 17.5523 0.44772 18 1 18H6C6.55229 18 7 17.5523 7 17C7 16.4477 6.55229 16 6 16H2V12Z" fill="white"/>
        <path d="M16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12V17C18 17.5523 17.5523 18 17 18H12C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16H16V12Z" fill="white"/>
        <path d="M1 7C1.55229 7 2 6.55229 2 6V2H6C6.55229 2 7 1.55229 7 1C7 0.44772 6.55229 0 6 0H1C0.44772 0 0 0.44772 0 1V6C0 6.55229 0.44772 7 1 7Z" fill="white"/>
        </svg>

        </div>

        {/* Flèches de navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Image précédente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Image suivante"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicateurs de points */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
              {/* Points du carousel */}
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`rounded-full transition-all cursor-pointer pointer-events-auto ${
                    idx === currentIndex
                      ? 'bg-orange-500 w-2.5 h-2.5'
                      : 'bg-white/40 hover:bg-white/70 w-2 h-2'
                  }`}
                  aria-label={`Aller à l'image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-orange-500 scale-105'
                  : 'border-neutral-300 dark:border-neutral-600 hover:border-orange-400'
              }`}
            >
              <img
                src={img.url}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
