'use client';

import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

type RealisationImage = {
  id: number;
  url: string;
  position: number;
};

type FullscreenCarouselProps = {
  images: RealisationImage[];
  title: string;
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
};

export default function FullscreenCarousel({
  images,
  title,
  isOpen,
  currentIndex: initialIndex,
  onClose,
}: FullscreenCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Clavier - TOUJOURS exécuté (pas de condition à l'intérieur)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrevious, goToNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header avec fermer */}
      <div className="flex items-center justify-between p-4 bg-black/50 border-b border-white/10">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors p-2"
          aria-label="Fermer"
        >
          <X size={28} />
        </button>
      </div>

      {/* Zone d'affichage image principale */}
      <div className="flex-1 flex items-center justify-center relative group overflow-hidden p-8 bg-black">
        <img
          src={currentImage.url}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />

        {/* Navigation gauche */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Image précédente"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Navigation droite */}
            <button
              onClick={goToNext}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Image suivante"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Compteur */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Miniatures en bas */}
      {images.length > 1 && (
        <div className="bg-black/70 border-t border-white/10 p-4 overflow-x-auto">
          <div className="flex gap-3 pb-2 mx-auto justify-center">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-orange-400 scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info clavier */}
      <div className="px-4 py-2 bg-black/50 border-t border-white/10 text-center text-white/60 text-xs">
        Utilisez les flèches pour naviguer • Échap pour fermer
      </div>
    </div>
  );
}
