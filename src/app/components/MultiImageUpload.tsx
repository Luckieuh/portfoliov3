'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

interface MultiImageUploadProps {
  onImagesChange: (urls: string[]) => void;
}

export default function MultiImageUpload({ onImagesChange }: MultiImageUploadProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageUpload = (result: string | string[]) => {
    const urls = Array.isArray(result) ? result : [result];
    const newUrls = [...imageUrls, ...urls];
    setImageUrls(newUrls);
    onImagesChange(newUrls);
  };

  const handleRemoveImage = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    onImagesChange(newUrls);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Ajouter des images (plusieurs fichiers possibles)
        </h3>
        <ImageUpload onUploadSuccess={handleImageUpload} accept="image/*" multiple={true} />
      </div>

      {imageUrls.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Images ajoutées ({imageUrls.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-neutral-300 dark:border-neutral-600"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Supprimer cette image"
                >
                  ×
                </button>
                <div className="mt-1">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {url.split('/').pop()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
