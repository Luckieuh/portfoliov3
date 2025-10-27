'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ChevronLeft, Upload } from 'lucide-react';

interface SiteImage {
  key: string;
  fallback: string;
  label: string;
  description: string;
}

const SITE_IMAGES: SiteImage[] = [
  { 
    key: 'header_logo_light', 
    fallback: '/white-logo.png', 
    label: 'Logo Header (Clair)',
    description: 'Logo affichable en mode clair' 
  },
  { 
    key: 'header_logo_dark', 
    fallback: '/dark-logo.png', 
    label: 'Logo Header (Sombre)',
    description: 'Logo affiché en mode sombre' 
  },
  { 
    key: 'footer_profile', 
    fallback: '/IMG_1949-2.png', 
    label: 'Photo Profil Footer',
    description: 'Photo de profil dans le footer' 
  },
  { 
    key: 'homepage_banner', 
    fallback: '/Banner.png', 
    label: 'Bannière Accueil',
    description: 'Bannière de la page d\'accueil' 
  },
  { 
    key: 'homepage_profile', 
    fallback: '/IMG_1949-2.png', 
    label: 'Photo Profil Accueil',
    description: 'Photo de profil sur la page d\'accueil' 
  },
];

export default function SiteImagesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401 || !response.ok) {
          router.push('/auth/login');
          return;
        }

        setIsAuthenticated(true);
        loadImages();
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  const loadImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/site-images');
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement des images' });
    } finally {
      setLoading(false);
    }
  };

  const initializeImages = async () => {
    try {
      const response = await fetch('/api/site-images/init', {
        method: 'POST',
      });
      if (response.ok) {
        setMessage({ type: 'success', text: 'Images initialisées avec succès!' });
        loadImages();
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'initialisation' });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(imageKey);
      const formData = new FormData();
      formData.append('file', file);

      // Upload et mise à jour directement via l'endpoint site-images
      const updateResponse = await fetch(`/api/site-images/${imageKey}`, {
        method: 'PUT',
        body: formData,
      });

      if (!updateResponse.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      const updatedImage = await updateResponse.json();

      setImages(prev => ({
        ...prev,
        [imageKey]: updatedImage.url
      }));

      setMessage({ type: 'success', text: 'Image mise à jour avec succès!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Erreur lors de l\'upload' });
    } finally {
      setUploading(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition"
              title="Retour"
            >
              <ChevronLeft size={24} className="text-neutral-800 dark:text-white" />
            </button>
            <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
              Gestion des Images
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              message.type === 'success'
                ? 'bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100'
                : 'bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={initializeImages}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            🔄 Réinitialiser aux valeurs par défaut
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-neutral-600 dark:text-neutral-400">Chargement des images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SITE_IMAGES.map((image) => (
                <div
                  key={image.key}
                  className="border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden flex flex-col"
                >
                  {/* Aperçu de l'image */}
                  <div className="w-full h-40 bg-neutral-200 dark:bg-neutral-700 overflow-hidden relative">
                    <img
                      src={images[image.key] || image.fallback}
                      alt={image.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = image.fallback;
                      }}
                    />
                  </div>

                  {/* Informations */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-neutral-800 dark:text-white">
                      {image.label}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 flex-1">
                      {image.description}
                    </p>

                    {/* Statut de l'image */}
                    <div className="mb-4 p-2 bg-neutral-100 dark:bg-neutral-700 rounded text-xs">
                      {images[image.key] ? (
                        <div>
                          <p className="text-green-700 dark:text-green-100 font-semibold mb-1">✓ Image custom</p>
                          <p className="text-neutral-600 dark:text-neutral-400 break-all">{images[image.key]}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-blue-700 dark:text-blue-100 font-semibold mb-1">ℹ Par défaut</p>
                          <p className="text-neutral-600 dark:text-neutral-400 break-all">{image.fallback}</p>
                        </div>
                      )}
                    </div>

                    {/* Bouton d'upload */}
                    <label className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer">
                      <Upload size={18} />
                      {uploading === image.key ? 'Upload...' : 'Changer'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, image.key)}
                        disabled={uploading === image.key}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
