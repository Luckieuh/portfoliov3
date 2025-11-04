'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MultiImageUpload from '@/app/components/MultiImageUpload';
import ImageGrid from '@/app/components/ImageGrid';

export default function CreateProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    link: '',
    youtubeUrl: '',
    videoUrl: '',
    categoryNames: [] as string[],
    tagNames: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; position: number }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('/api/categories');
        if (categoriesResponse.ok) {
          const categories = await categoriesResponse.json();
          setAvailableCategories(categories.map((c: { name: string }) => c.name));
        }

        const tagsResponse = await fetch('/api/tags');
        if (tagsResponse.ok) {
          const tags = await tagsResponse.json();
          setAvailableTags(tags.map((t: { name: string }) => t.name));
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryToggle = (categoryName: string) => {
    setFormData(prev => ({
      ...prev,
      categoryNames: prev.categoryNames.includes(categoryName)
        ? prev.categoryNames.filter(c => c !== categoryName)
        : [...prev.categoryNames, categoryName],
    }));
  };

  const handleTagToggle = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tagNames: prev.tagNames.includes(tagName)
        ? prev.tagNames.filter(t => t !== tagName)
        : [...prev.tagNames, tagName],
    }));
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory.toLowerCase() }),
      });
      if (response.ok) {
        const category = await response.json();
        setAvailableCategories([...availableCategories, category.name]);
        setNewCategory('');
        setFormData(prev => ({
          ...prev,
          categoryNames: [...prev.categoryNames, category.name],
        }));
      }
    } catch (error) {
      console.error('Erreur lors de la création de catégorie:', error);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTag.toLowerCase() }),
      });
      if (response.ok) {
        const tag = await response.json();
        setAvailableTags([...availableTags, tag.name]);
        setNewTag('');
        setFormData(prev => ({
          ...prev,
          tagNames: [...prev.tagNames, tag.name],
        }));
      }
    } catch (error) {
      console.error('Erreur lors de la création de tag:', error);
    }
  };

  const handleImagesUpload = (urls: string[]) => {
    const newImages = urls.map((url, idx) => ({
      url,
      position: uploadedImages.length + idx,
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleImagesReorder = (images: Array<{ url: string; position: number }>) => {
    setUploadedImages(images);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const submitData = {
        ...formData,
        newImages: uploadedImages,
      };

      const response = await fetch('/api/realisations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création');
      }

      setMessage({ type: 'success', text: 'Projet créé avec succès!' });
      setFormData({
        title: '',
        description: '',
        location: '',
        link: '',
        youtubeUrl: '',
        videoUrl: '',
        categoryNames: [],
        tagNames: [],
      });
      setUploadedImages([]);
      setTimeout(() => router.push('/admin/edit'), 1500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de la création',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
            Créer un nouveau projet
          </h1>
          <Link href="/admin" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Retour
          </Link>
        </div>

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
              placeholder="Titre du projet"
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
              placeholder="Description du projet"
            />
          </div>

          {/* Localisation */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Localisation (optionnel)
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              placeholder="Ex: Paris, France"
            />
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

          {/* URL YouTube */}
          <div>
            <label htmlFor="youtubeUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              URL YouTube (optionnel)
            </label>
            <input
              type="url"
              id="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          {/* URL Vidéo */}
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              URL Vidéo (optionnel)
            </label>
            <input
              type="url"
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
            />
          </div>

          {/* Images pour le carousel */}
          <div>
            <MultiImageUpload onImagesUpload={handleImagesUpload} uploadedCount={uploadedImages.length} />
          </div>

          {/* Grille d'images ordonnées */}
          {uploadedImages.length > 0 && (
            <div>
              <ImageGrid 
                images={uploadedImages}
                onImagesReorder={handleImagesReorder}
              />
            </div>
          )}

          {/* Catégories */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Catégories
            </label>
            <div className="mb-4 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-600 dark:border-neutral-500 dark:text-white"
                  placeholder="Nouvelle catégorie..."
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  + Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {availableCategories.map((category) => (
                  <label key={category} className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.categoryNames.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                    />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Tags/Mots-clés
            </label>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-600 dark:border-neutral-500 dark:text-white"
                  placeholder="Nouveau tag/mots-clé..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  + Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {availableTags.map((tag) => (
                  <label key={tag} className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.tagNames.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                    />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
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
            {isSubmitting ? 'Création en cours...' : 'Créer le projet'}
          </button>
        </form>
      </div>
    </div>
  );
}