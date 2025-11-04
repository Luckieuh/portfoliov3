'use client';

import { useState, useEffect } from 'react';

interface ImageWithPosition {
  id?: number;
  url: string;
  position: number;
}

interface ImageGridProps {
  images: ImageWithPosition[];
  onImagesReorder: (images: ImageWithPosition[]) => void;
  onImageRemove?: (imageId: number | undefined) => void;
}

export default function ImageGrid({ images, onImagesReorder, onImageRemove }: ImageGridProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [localImages, setLocalImages] = useState<ImageWithPosition[]>(images);

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedItem === null) return;

    const newImages = [...localImages];
    const draggedImage = newImages[draggedItem];
    
    // Supprimer l'image de sa position d'origine
    newImages.splice(draggedItem, 1);
    // Insérer à la nouvelle position
    newImages.splice(index, 0, draggedImage);

    // Mettre à jour les positions
    const reorderedImages = newImages.map((img, idx) => ({
      ...img,
      position: idx,
    }));

    setLocalImages(reorderedImages);
    onImagesReorder(reorderedImages);
    setDraggedItem(null);
  };

  const handleRemove = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    const reorderedImages = newImages.map((img, idx) => ({
      ...img,
      position: idx,
    }));
    setLocalImages(reorderedImages);
    onImagesReorder(reorderedImages);
    onImageRemove?.(localImages[index].id);
  };

  if (localImages.length === 0) {
    return <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">Aucune image</p>;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Ordonnez vos images (glissez-déposez)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {localImages.map((image, index) => (
          <div
            key={`${image.url}-${index}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`relative group cursor-move aspect-square rounded-lg overflow-hidden border-2 ${
              draggedItem === index
                ? 'border-orange-500 bg-orange-100 dark:bg-orange-900/20 opacity-50'
                : 'border-neutral-300 dark:border-neutral-600 hover:border-orange-500'
            }`}
          >
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Numéro de position */}
            <div className="absolute top-2 left-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>

            {/* Bouton supprimer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(index);
              }}
              onDragStart={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
            >
              ✕
            </button>

            {/* Overlay avec texte au survol */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-sm font-medium text-center">
                {draggedItem === index ? 'Repositionner' : 'Glissez pour réorganiser'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
