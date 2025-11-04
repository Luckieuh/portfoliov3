'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type SiteImage = {
  id: number;
  key: string;
  url: string;
  updatedAt: string;
};

const DYNAMIC_IMAGES = [
  { key: 'hero-banner', label: 'Bannière Hero', defaultUrl: '/Banner.png', section: 'Page d\'accueil' },
  { key: 'profile-image', label: 'Image de Profil (Accueil)', defaultUrl: '/IMG_1949-2.png', section: 'Page d\'accueil' },
  { key: 'footer-profile-image', label: 'Image de Profil (Footer)', defaultUrl: '/IMG_1949-2.png', section: 'Footer' },
];

export default function SiteImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);

  // Charger les images
  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/site-images');
        if (response.ok) {
          setImages(await response.json());
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setMessage({ type: 'error', text: 'Erreur lors du chargement des images' });
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleAddImage = async () => {
    if (!newKey.trim() || !newFile) {
      setMessage({ type: 'error', text: 'La clé et le fichier sont requises' });
      return;
    }

    try {
      setUploadingKey('new');
      setMessage(null);

      // 1. Upload le fichier vers Cloudflare
      const formData = new FormData();
      formData.append('file', newFile);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Erreur lors de l\'upload du fichier');
      }

      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.url;

      // 2. Sauvegarde l'URL dans la base de données
      const dbResponse = await fetch('/api/site-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newKey, url: fileUrl }),
      });

      if (dbResponse.ok) {
        const newImage = await dbResponse.json();
        setImages([...images, newImage]);
        setNewKey('');
        setNewFile(null);
        setMessage({ type: 'success', text: 'Image ajoutée avec succès!' });
        // Réinitialiser les inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
          const inputElement = input as HTMLInputElement;
          inputElement.value = '';
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de l\'ajout',
      });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const response = await fetch(`/api/site-images/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setImages(images.filter(img => img.id !== id));
        setMessage({ type: 'success', text: 'Image supprimée avec succès!' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de la suppression',
      });
    }
  };

  const handleFileUpload = async (key: string, file: File) => {
    if (!file) return;

    try {
      setUploadingKey(key);
      setMessage(null);

      // 1. Upload le fichier vers Cloudflare
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Erreur lors de l\'upload du fichier');
      }

      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.url;

      // 2. Sauvegarde l'URL dans la base de données
      const dbResponse = await fetch('/api/site-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, url: fileUrl }),
      });

      if (dbResponse.ok) {
        const updatedImage = await dbResponse.json();
        // Met à jour la liste locale
        const existingIndex = images.findIndex(img => img.key === key);
        if (existingIndex >= 0) {
          const newImages = [...images];
          newImages[existingIndex] = updatedImage;
          setImages(newImages);
        } else {
          setImages([...images, updatedImage]);
        }
        setMessage({ type: 'success', text: `Image "${key}" mise à jour avec succès!` });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de la mise à jour',
      });
    } finally {
      setUploadingKey(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xl text-neutral-600 dark:text-neutral-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
            Images du Site
          </h1>
          <Link href="/admin" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Retour au dashboard
          </Link>
        </div>

        {/* Section Images Principales */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6">
            📷 Images Principales
          </h2>
          <p className="text-sm text-blue-700 dark:text-blue-200 mb-8">
            Sélectionne une image de ton ordinateur pour remplacer l'image actuelle sur le site.
          </p>

          {/* Grouper par section */}
          {['Page d\'accueil', 'Footer'].map((section) => (
            <div key={section} className="mb-8">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 pb-2 border-b border-blue-300 dark:border-blue-600">
                {section}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DYNAMIC_IMAGES.filter(img => img.section === section).map((dynamicImg) => {
                  const dbImage = images.find(img => img.key === dynamicImg.key);
                  const displayUrl = dbImage?.url || dynamicImg.defaultUrl;
                  const isUploading = uploadingKey === dynamicImg.key;
                  
                  return (
                    <div key={dynamicImg.key} className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                      <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 text-lg">
                        {dynamicImg.label}
                      </h4>

                      {/* Aperçu de l'image */}
                      <div className="mb-4">
                        <div className="w-full h-32 rounded border border-neutral-300 dark:border-neutral-600 overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                          <img
                            src={displayUrl}
                            alt={dynamicImg.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Input file */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Choisir une image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(dynamicImg.key, file);
                              // Réinitialiser l'input
                              e.target.value = '';
                            }
                          }}
                          disabled={isUploading}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white disabled:opacity-50 cursor-pointer"
                        />
                      </div>

                      {isUploading && (
                        <div className="text-center py-2">
                          <p className="text-sm text-orange-500 font-medium">Upload en cours...</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded ${
            message.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Section Autres Images */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">
            Autres Images ({images.filter(img => !DYNAMIC_IMAGES.find(d => d.key === img.key)).length})
          </h2>

          {/* Ajouter une nouvelle image */}
          <div className="mb-8 pb-8 border-b border-neutral-300 dark:border-neutral-600">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
              Ajouter une nouvelle image
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Clé (identifiant unique)
                </label>
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder="Ex: mon-image, banner-2..."
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleAddImage}
              disabled={uploadingKey === 'new'}
              className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {uploadingKey === 'new' ? 'Upload en cours...' : 'Ajouter l\'image'}
            </button>
          </div>

          {/* Liste des autres images */}
          {images.filter(img => !DYNAMIC_IMAGES.find(d => d.key === img.key)).length === 0 ? (
            <p className="text-neutral-500 dark:text-neutral-400">Aucune autre image</p>
          ) : (
            <div className="space-y-4">
              {images.filter(img => !DYNAMIC_IMAGES.find(d => d.key === img.key)).map((image) => (
                <div key={image.id} className="border border-neutral-300 dark:border-neutral-600 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-800 dark:text-white mb-2">
                      {image.key}
                    </h3>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">URL:</p>
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:text-orange-600 break-all text-sm"
                        >
                          {image.url}
                        </a>
                      </div>
                      {image.url && (
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={image.url}
                            alt={image.key}
                            className="w-full h-full object-cover rounded border border-neutral-300 dark:border-neutral-600"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}