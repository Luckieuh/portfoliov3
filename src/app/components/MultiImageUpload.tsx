'use client';

import { useState } from 'react';

interface MultiImageUploadProps {
  onImagesUpload: (urls: string[]) => void;
  uploadedCount?: number;
}

export default function MultiImageUpload({ onImagesUpload, uploadedCount = 0 }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setIsUploading(true);
    setUploadError(null);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de l'upload de ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      onImagesUpload(uploadedUrls);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Erreur lors de l\'upload');
    } finally {
      setIsUploading(false);
      e.currentTarget.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Ajouter des images ({uploadedCount})
      </label>
      <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          id="multi-image-upload"
        />
        <label
          htmlFor="multi-image-upload"
          className="cursor-pointer"
        >
          <div className="text-neutral-600 dark:text-neutral-400">
            {isUploading ? (
              <p>Upload en cours...</p>
            ) : (
              <>
                <p className="font-medium">Cliquez pour sélectionner des images</p>
                <p className="text-sm">ou glissez-déposez</p>
              </>
            )}
          </div>
        </label>
        {uploadError && (
          <p className="text-red-500 text-sm mt-2">{uploadError}</p>
        )}
      </div>
    </div>
  );
}
