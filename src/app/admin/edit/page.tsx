'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MultiImageUpload from '@/app/components/MultiImageUpload';
import ImageUpload from '@/app/components/ImageUpload';
import { ArrowLeft, Trash2, X, ChevronUp, ChevronDown } from 'lucide-react';

interface RealisationImage {
  id: number;
  url: string;
  createdAt: string;
}

interface Realisation {
  id: number;
  title: string;
  description: string;
  location?: string;
  images: RealisationImage[];
  videoUrl?: string;
  youtubeUrl?: string;
  link?: string;
  categories: string[];
  createdAt: string;
}

export default function EditRealisationPage() {
  const router = useRouter();
  const params = useParams();
  const realisationId = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const isEditing = !!realisationId && realisationId !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrls: [] as string[],
    videoUrl: '',
    youtubeUrl: '',
    link: '',
    categories: [] as string[],
    createdAt: new Date().toISOString().split('T')[0],
  });

  const [existingImages, setExistingImages] = useState<RealisationImage[]>([]);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [imageOrder, setImageOrder] = useState<number[]>([]);

  const availableCategories = ['photo', 'video', 'design', 'voyage', 'architecture'];

  // Charger les données si édition
  useEffect(() => {
    if (isEditing && realisationId) {
      loadRealisation();
    }
  }, [isEditing, realisationId]);

  const loadRealisation = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/realisations/${realisationId}`);
      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data: Realisation = await response.json();
      
      setFormData({
        title: data.title,
        description: data.description,
        location: data.location || '',
        imageUrls: data.images.map(img => img.url),
        videoUrl: data.videoUrl || '',
        youtubeUrl: data.youtubeUrl || '',
        link: data.link || '',
        categories: data.categories || [],
        createdAt: data.createdAt.split('T')[0],
      });
      setExistingImages(data.images);
      setImageOrder(data.images.map(img => img.id));
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors du chargement du projet' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = (imageId: number) => {
    setImagesToDelete([...imagesToDelete, imageId]);
    setExistingImages(existingImages.filter(img => img.id !== imageId));
    setImageOrder(imageOrder.filter(id => id !== imageId));
  };

  const handleMoveImage = (imageId: number, direction: 'up' | 'down') => {
    const currentIndex = imageOrder.indexOf(imageId);
    const newOrder = [...imageOrder];
    
    if (direction === 'up' && currentIndex > 0) {
      [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
    } else if (direction === 'down' && currentIndex < newOrder.length - 1) {
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
    }
    
    setImageOrder(newOrder);
  };

  const getOrderedExistingImages = () => {
    return imageOrder
      .map(id => existingImages.find(img => img.id === id))
      .filter((img): img is RealisationImage => img !== undefined);
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleImagesChange = (urls: string[]) => {
    setFormData(prev => ({ ...prev, imageUrls: urls }));
  };

  const handleMoveNewImage = (index: number, direction: 'up' | 'down') => {
    const newUrls = [...formData.imageUrls];
    
    if (direction === 'up' && index > 0) {
      [newUrls[index], newUrls[index - 1]] = [newUrls[index - 1], newUrls[index]];
    } else if (direction === 'down' && index < newUrls.length - 1) {
      [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
    }
    
    setFormData({ ...formData, imageUrls: newUrls });
  };

  const handleVideoUpload = (result: string | string[]) => {
    const url = Array.isArray(result) ? result[0] : result;
    setFormData(prev => ({ ...prev, videoUrl: url }));
    setMessage({ type: 'success', text: 'Vidéo uploadée avec succès!' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (formData.imageUrls.length === 0 && getOrderedExistingImages().length === 0) {
        throw new Error('Veuillez ajouter au moins une image');
      }

      // Combiner l'ordre: images existantes d'abord (dans l'ordre), puis nouvelles images
      const allImageUrls = [
        ...getOrderedExistingImages().map(img => img.url),
        ...formData.imageUrls
      ];

      const url = isEditing ? `/api/realisations/${realisationId}` : '/api/realisations';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrls: allImageUrls,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur lors de la ${isEditing ? 'modification' : 'création'}`);
      }

      setMessage({ 
        type: 'success', 
        text: isEditing ? 'Projet modifié avec succès!' : 'Projet créé avec succès!' 
      });

      setTimeout(() => {
        router.push('/admin');
      }, 1500);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : `Erreur lors de la ${isEditing ? 'modification' : 'création'}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-neutral-700 dark:text-neutral-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">
              {isEditing ? 'Modifier le projet' : 'Créer un nouveau projet'}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              {isEditing ? 'Mettez à jour les informations de votre projet' : 'Remplissez les informations de votre nouveau projet'}
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section Informations de base */}
            <div className="border-b border-neutral-300 dark:border-neutral-700 pb-8">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-6">
                Informations de base
              </h2>

              {/* Titre */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="Titre du projet"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="Description détaillée du projet"
                />
              </div>

              {/* Localisation */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="Ex: Paris, Île-de-France"
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="createdAt" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Date du projet
                </label>
                <input
                  type="date"
                  id="createdAt"
                  value={formData.createdAt}
                  onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                />
              </div>
            </div>

            {/* Section Médias */}
            <div className="border-b border-neutral-300 dark:border-neutral-700 pb-8">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-6">
                Médias
              </h2>

              {/* Images existantes */}
              {existingImages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                    Images existantes ({existingImages.length}) - Cliquez sur les flèches pour réordonner
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getOrderedExistingImages().map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt="Projet"
                          className="w-full h-32 object-cover rounded-lg border border-neutral-300 dark:border-neutral-600"
                        />
                        {/* Boutons d'action */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition flex items-end justify-center pb-2 gap-1 opacity-0 group-hover:opacity-100">
                          {/* Bouton haut */}
                          <button
                            type="button"
                            onClick={() => handleMoveImage(image.id, 'up')}
                            disabled={index === 0}
                            className="p-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded transition"
                            title="Déplacer vers le haut"
                          >
                            <ChevronUp size={16} />
                          </button>
                          
                          {/* Bouton bas */}
                          <button
                            type="button"
                            onClick={() => handleMoveImage(image.id, 'down')}
                            disabled={index === getOrderedExistingImages().length - 1}
                            className="p-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded transition"
                            title="Déplacer vers le bas"
                          >
                            <ChevronDown size={16} />
                          </button>
                          
                          {/* Bouton supprimer */}
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(image.id)}
                            className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload nouvelles images */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Ajouter des images ({formData.imageUrls.length + existingImages.length} total)
                </label>
                <MultiImageUpload onImagesChange={handleImagesChange} />
              </div>

              {/* Nouvelles images uploadées */}
              {formData.imageUrls.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                    Nouvelles images ({formData.imageUrls.length}) - Cliquez sur les flèches pour réordonner
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={url} className="relative group">
                        <img
                          src={url}
                          alt="Nouvelle"
                          className="w-full h-32 object-cover rounded-lg border border-green-300 dark:border-green-700 border-2"
                        />
                        {/* Boutons d'action */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition flex items-end justify-center pb-2 gap-1 opacity-0 group-hover:opacity-100">
                          {/* Bouton haut */}
                          <button
                            type="button"
                            onClick={() => handleMoveNewImage(index, 'up')}
                            disabled={index === 0}
                            className="p-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded transition"
                            title="Déplacer vers le haut"
                          >
                            <ChevronUp size={16} />
                          </button>
                          
                          {/* Bouton bas */}
                          <button
                            type="button"
                            onClick={() => handleMoveNewImage(index, 'down')}
                            disabled={index === formData.imageUrls.length - 1}
                            className="p-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded transition"
                            title="Déplacer vers le bas"
                          >
                            <ChevronDown size={16} />
                          </button>
                          
                          {/* Bouton supprimer */}
                          <button
                            type="button"
                            onClick={() => setFormData({
                              ...formData,
                              imageUrls: formData.imageUrls.filter(u => u !== url)
                            })}
                            className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                            title="Supprimer"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vidéo */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Vidéo
                </label>
                <ImageUpload onUploadSuccess={handleVideoUpload} accept="video/*" />
                {formData.videoUrl && (
                  <div className="mt-3 p-3 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100 rounded-lg text-sm">
                    ✓ Vidéo uploadée: {formData.videoUrl.split('/').pop()}
                  </div>
                )}
              </div>

              {/* YouTube */}
              <div>
                <label htmlFor="youtubeUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  URL YouTube
                </label>
                <input
                  type="url"
                  id="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Utilisez le lien complet (https://www.youtube.com/watch?v=ID)
                </p>
              </div>
            </div>

            {/* Section Liens et catégories */}
            <div className="pb-8">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-6">
                Informations supplémentaires
              </h2>

              {/* Lien externe */}
              <div className="mb-6">
                <label htmlFor="link" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Lien externe
                </label>
                <input
                  type="url"
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="https://..."
                />
              </div>

              {/* Catégories */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                  Catégories
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableCategories.map((category) => (
                    <label key={category} className="inline-flex items-center gap-2 cursor-pointer p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                      />
                      <span className="text-neutral-700 dark:text-neutral-300 capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100' 
                  : 'bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100'
              }`}>
                {message.text}
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex gap-4 pt-4 border-t border-neutral-300 dark:border-neutral-700">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Sauvegarde en cours...' : (isEditing ? 'Modifier le projet' : 'Créer le projet')}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 font-semibold rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
