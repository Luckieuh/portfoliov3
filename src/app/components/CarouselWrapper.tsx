'use client';

import { useState } from 'react';
import ImageCarousel from '@/app/components/ImageCarousel';
import FullscreenCarousel from '@/app/components/FullscreenCarousel';

type Image = {
  id: number;
  url: string;
  position: number;
};

type CarouselWrapperProps = {
  images: Image[];
  title: string;
};

export default function CarouselWrapper({ images, title }: CarouselWrapperProps) {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const handleOpenFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setIsFullscreenOpen(true);
  };

  return (
    <>
      <ImageCarousel 
        images={images}
        title={title}
        onFullscreenOpen={handleOpenFullscreen}
      />
      <FullscreenCarousel
        images={images}
        title={title}
        isOpen={isFullscreenOpen}
        currentIndex={fullscreenIndex}
        onClose={() => setIsFullscreenOpen(false)}
      />
    </>
  );
}
