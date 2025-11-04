'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  accept?: string;
  maxSize?: number; // en MB
}

export default function ImageUpload({ 
  onUploadSuccess, 
  accept = 'image/*,video/*',
  maxSize = 10 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Le fichier doit faire moins de ${maxSize}MB`);
      return;
    }

    setError(null);
    setIsUploading(true);

    // Créer une preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'upload');
      }

      const data = await response.json();
      onUploadSuccess(data.url);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <label 
          htmlFor="dropzone-file" 
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {preview ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-48 object-contain mb-4"
              />
            ) : (
              <>
                <svg 
                  className="w-8 h-8 mb-4 text-neutral-500 dark:text-neutral-400" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 20 16"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Images ou vidéos (MAX. {maxSize}MB)
                </p>
              </>
            )}
          </div>
          <input 
            id="dropzone-file" 
            type="file" 
            className="hidden" 
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      
      {isUploading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Upload en cours...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
