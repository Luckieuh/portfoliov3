'use client';

import { useState } from 'react';
import MultiImageUpload from '@/app/components/MultiImageUpload';
import ImageUpload from '@/app/components/ImageUpload';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrls: [] as string[],
    videoUrl: '',
    link: '',
    categories: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const availableCategories = ['photo', 'video', 'design', 'voyage', 'architecture'];

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

  const handleVideoUpload = (url: string) => {
    setFormData(prev => ({ ...prev, videoUrl: url }));
    setMessage({ type: 'success', text: 'Vidéo uploadée avec succès!' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (formData.imageUrls.length === 0) {
        throw new Error('Veuillez ajouter au moins une image');
      }

      const response = await fetch('/api/realisations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: 'Réalisation créée avec succès!' });
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        imageUrls: [],
        videoUrl: '',
        link: '',
        categories: [],
      });

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Erreur lors de la création' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-white mb-8">
          Administration - Nouvelle Réalisation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
          {/* Titre */}
          <div>
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
              placeholder="Titre de la réalisation"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              placeholder="Description de la réalisation"
            />
          </div>

          {/* Upload Images multiples */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Images * (vous pouvez ajouter plusieurs images)
            </label>
            <MultiImageUpload onImagesChange={handleImagesChange} />
          </div>

          {/* Upload Video */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Vidéo (optionnel)
            </label>
            <ImageUpload onUploadSuccess={handleVideoUpload} accept="video/*" />
            {formData.videoUrl && (
              <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
                ✓ Vidéo uploadée: {formData.videoUrl}
              </div>
            )}
          </div>

          {/* Lien */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Lien (optionnel)
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
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Catégories
            </label>
            <div className="flex flex-wrap gap-3">
              {availableCategories.map((category) => (
                <label key={category} className="inline-flex items-center gap-2 cursor-pointer">
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

          {/* Message */}
          {message && (
            <div className={`p-4 rounded ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Bouton Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Création en cours...' : 'Créer la réalisation'}
          </button>
        </form>
      </div>
    </div>
  );
}
