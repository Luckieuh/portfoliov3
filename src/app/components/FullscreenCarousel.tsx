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

  // Désactiver le scroll quand le carousel est ouvert
  useEffect(() => {
    if (!isOpen) return;

    // Désactiver le scroll
    document.body.style.overflow = 'hidden';

    // Cacher le header
    const header = document.querySelector('header');
    const originalDisplay = header?.style.display;
    if (header) {
      header.style.display = 'none';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (header) {
        header.style.display = originalDisplay || '';
      }
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex flex-col">
      {/* Zone d'affichage image principale */}
      <div className="flex-1 flex items-center justify-center relative group overflow-hidden p-8 bg-black/20">
        <img
          src={currentImage.url}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="max-w-full h-[80vh] object-contain"
        />

        {/* Bouton fermer (au-dessus du contenu) */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors p-2 cursor-pointer z-50"
          aria-label="Fermer"
        >
          <X size={32} />
        </button>

        {/* Info clavier */}
        <div className="absolute top-8 left-8 px-4 py-2 text-white/60 text-xs z-40">
          Utilisez les flèches pour naviguer • Échap pour fermer
        </div>

        {/* Navigation gauche */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
              aria-label="Image précédente"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Navigation droite */}
            <button
              onClick={goToNext}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
              aria-label="Image suivante"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Compteur */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/20 text-white px-4 py-2 rounded-lg text-sm font-medium z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
