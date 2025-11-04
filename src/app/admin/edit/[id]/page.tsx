'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageGrid from '../../../components/ImageGrid';
import MultiImageUpload from '../../../components/MultiImageUpload';

type ProjectData = {
  id: number;
  title: string;
  description: string;
  location: string | null;
  link: string | null;
  youtubeUrl: string | null;
  videoUrl: string | null;
  createdAt: string;
  images: Array<{ id: number; url: string; position: number }>;
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
};

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [formData, setFormData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        // Récupérer le projet
        const projectResponse = await fetch(`/api/realisations/${projectId}`);
        if (!projectResponse.ok) {
          throw new Error('Projet non trouvé');
        }
        const project = await projectResponse.json();
        setFormData(project);

        // Récupérer les catégories disponibles
        const categoriesResponse = await fetch('/api/categories');
        if (categoriesResponse.ok) {
          const categories = await categoriesResponse.json();
          setAvailableCategories(categories.map((c: { name: string }) => c.name));
        }

        // Récupérer les tags disponibles
        const tagsResponse = await fetch('/api/tags');
        if (tagsResponse.ok) {
          const tags = await tagsResponse.json();
          setAvailableTags(tags.map((t: { name: string }) => t.name));
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Erreur lors du chargement',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const handleCategoryToggle = (categoryName: string) => {
    if (!formData) return;
    const isSelected = formData.categories.some(c => c.name === categoryName);
    if (isSelected) {
      setFormData({
        ...formData,
        categories: formData.categories.filter(c => c.name !== categoryName),
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, { id: 0, name: categoryName }],
      });
    }
  };

  const handleTagToggle = (tagName: string) => {
    if (!formData) return;
    const isSelected = formData.tags.some(t => t.name === tagName);
    if (isSelected) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(t => t.name !== tagName),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, { id: 0, name: tagName }],
      });
    }
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
        if (formData) {
          setFormData(prev => prev ? {
            ...prev,
            categories: [...prev.categories, { id: 0, name: category.name }],
          } : null);
        }
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
        if (formData) {
          setFormData(prev => prev ? {
            ...prev,
            tags: [...prev.tags, { id: 0, name: tag.name }],
          } : null);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la création de tag:', error);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }

      if (formData) {
        const updatedImages = formData.images.filter(img => img.id !== imageId);
        setFormData({
          ...formData,
          images: updatedImages,
        });
      }

      setMessage({ type: 'success', text: 'Image supprimée avec succès!' });
      
      // Recharger les données du projet après 500ms pour s'assurer que la BD est à jour
      setTimeout(async () => {
        try {
          const projectResponse = await fetch(`/api/realisations/${projectId}`);
          if (projectResponse.ok) {
            const updatedProject = await projectResponse.json();
            setFormData(updatedProject);
          }
        } catch (error) {
          console.error('Erreur lors du rechargement:', error);
        }
      }, 500);
    } catch (error) {
      console.error('Erreur suppression image:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de la suppression',
      });
    }
  };

  const handleImagesReorder = async (reorderedImages: Array<{ id: number; url: string; position: number }>) => {
    if (!formData) return;

    try {
      // Mettre à jour les positions localement
      setFormData({
        ...formData,
        images: reorderedImages,
      });

      // Mettre à jour les positions dans la base de données
      for (const image of reorderedImages) {
        await fetch(`/api/images/${image.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ position: image.position }),
        });
      }

      setMessage({ type: 'success', text: 'Ordre des images mis à jour!' });
    } catch (error) {
      console.error('Erreur lors du réordonnancement:', error);
      setMessage({
        type: 'error',
        text: 'Erreur lors du réordonnancement des images',
      });
    }
  };

  const handleImagesUpload = (urls: string[]) => {
    const newImages = urls.map((url, index) => ({
      url,
      position: (uploadedImages.length || 0) + index,
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
    setMessage({ type: 'success', text: `${urls.length} image(s) ajoutée(s)!` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const submitData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        link: formData.link,
        youtubeUrl: formData.youtubeUrl,
        videoUrl: formData.videoUrl,
        createdAt: formData.createdAt,
        categoryNames: formData.categories.map(c => c.name),
        tagNames: formData.tags.map(t => t.name),
        newImages: uploadedImages,
      };

      const response = await fetch(`/api/realisations/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la mise à jour');
      }

      setMessage({ type: 'success', text: 'Projet mis à jour avec succès!' });
      setUploadedImages([]);
      setTimeout(() => router.push('/admin/edit'), 1500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Erreur lors de la mise à jour',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-neutral-600 dark:text-neutral-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-neutral-600 dark:text-neutral-400">Projet non trouvé</p>
          <Link href="/admin/edit" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
            Modifier le projet
          </h1>
          <Link href="/admin/edit" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Retour à la liste
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
              value={formData.location || ''}
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
              value={formData.link || ''}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              placeholder="https://..."
            />
          </div>

          {/* Date de création */}
          <div>
            <label htmlFor="createdAt" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Date de création (optionnel)
            </label>
            <input
              type="datetime-local"
              id="createdAt"
              value={formData.createdAt ? new Date(formData.createdAt).toISOString().slice(0, 16) : ''}
              onChange={(e) => setFormData({ ...formData, createdAt: e.target.value ? new Date(e.target.value).toISOString() : formData.createdAt })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
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
              value={formData.youtubeUrl || ''}
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
              value={formData.videoUrl || ''}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
            />
          </div>

          {/* Ajouter de nouvelles images */}
          <div>
            <MultiImageUpload onImagesUpload={handleImagesUpload} uploadedCount={(uploadedImages.length || 0) + (formData?.images?.length || 0)} />
          </div>

          {/* Grille des nouvelles images uploadées */}
          {uploadedImages.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Nouvelles images ({uploadedImages.length})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`New image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-neutral-300 dark:border-neutral-600"
                    />
                    <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      +
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Supprimer cette image"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images existantes */}
          {formData.images && formData.images.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Images existantes ({formData.images.length}) - Glissez pour réordonner
              </label>
              <ImageGrid 
                images={formData.images}
                onImagesReorder={handleImagesReorder}
                onImageRemove={handleDeleteImage}
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
                      checked={formData?.categories.some(c => c.name === category) || false}
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
                      checked={formData?.tags.some(t => t.name === tag) || false}
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
            {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour le projet'}
          </button>
        </form>
      </div>
    </div>
  );
}
