'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MultiImageUpload from '@/app/components/MultiImageUpload';
import ImageUpload from '@/app/components/ImageUpload';
import { ArrowLeft, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
  createdAt: string;
}

export default function EditRealisationPage() {
  const router = useRouter();
  const params = useParams();
  const realisationId = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const isEditing = !!realisationId && realisationId !== 'new';

  // Debug
  useEffect(() => {
    console.log('Params:', params);
    console.log('RealisationId:', realisationId);
    console.log('IsEditing:', isEditing);
  }, [params]);

  // Charger les catégories disponibles
  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoadingCategories(true);
        const [categoriesResponse, tagsResponse] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/tags')
        ]);
        if (categoriesResponse.ok && tagsResponse.ok) {
          const [categoriesData, tagsData] = await Promise.all([
            categoriesResponse.json(),
            tagsResponse.json()
          ]);
          setAvailableCategories(categoriesData);
          setAvailableTags(tagsData);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des filtres:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadFilters();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrls: [] as string[],
    videoUrl: '',
    youtubeUrl: '',
    link: '',
    categories: [] as number[],
    tags: [] as number[],
    createdAt: new Date().toISOString().split('T')[0],
  });

  const [existingImages, setExistingImages] = useState<RealisationImage[]>([]);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [imageOrder, setImageOrder] = useState<number[]>([]);
  const [draggedImageId, setDraggedImageId] = useState<number | null>(null);
  const [draggedNewImageIndex, setDraggedNewImageIndex] = useState<number | null>(null);
  const [dragType, setDragType] = useState<'existing' | 'new' | null>(null);
  const [availableCategories, setAvailableCategories] = useState<Array<{id: number; name: string}>>([]);
  const [availableTags, setAvailableTags] = useState<Array<{id: number; name: string}>>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Charger les données si édition
  useEffect(() => {
    if (isEditing && realisationId) {
      loadRealisation();
    }
  }, [isEditing, realisationId]);

  const loadRealisation = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching realisation:', realisationId);
      const response = await fetch(`/api/realisations/${realisationId}`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.error || 'Erreur lors du chargement');
      }

      const data: Realisation = await response.json();
      console.log('Loaded data:', data);
      
      setFormData({
        title: data.title,
        description: data.description,
        location: data.location || '',
        imageUrls: [], // Les images existantes ne vont pas ici
        videoUrl: data.videoUrl || '',
        youtubeUrl: data.youtubeUrl || '',
        link: data.link || '',
        categories: data.categories.map(cat => cat.id),
        tags: data.tags.map(tag => tag.id),
        createdAt: data.createdAt.split('T')[0],
      });
      setExistingImages(data.images);
      setImageOrder(data.images.map(img => img.id));
      console.log('Form loaded successfully');
    } catch (error) {
      console.error('Error loading realisation:', error);
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

  const handleMoveImage = (imageId: number, direction: 'left' | 'right') => {
    console.log('Moving image:', imageId, 'Direction:', direction);
    const currentIndex = imageOrder.indexOf(imageId);
    console.log('Current index:', currentIndex, 'ImageOrder:', imageOrder);
    const newOrder = [...imageOrder];
    
    if (direction === 'left' && currentIndex > 0) {
      [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
      console.log('After left swap:', newOrder);
    } else if (direction === 'right' && currentIndex < newOrder.length - 1) {
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      console.log('After right swap:', newOrder);
    } else if (direction === 'right' && currentIndex === newOrder.length - 1 && formData.imageUrls.length > 0) {
      // Déplacer vers les images nouvelles
      const draggedImage = existingImages.find(img => img.id === imageId);
      if (draggedImage) {
        setImageOrder(newOrder.filter(id => id !== imageId));
        setFormData({ ...formData, imageUrls: [draggedImage.url, ...formData.imageUrls] });
      }
      return;
    } else {
      console.log('Move not possible - boundary reached');
    }
    
    setImageOrder(newOrder);
  };

  const handleMoveNewImage = (index: number, direction: 'left' | 'right') => {
    const newUrls = [...formData.imageUrls];
    
    if (direction === 'left' && index > 0) {
      [newUrls[index], newUrls[index - 1]] = [newUrls[index - 1], newUrls[index]];
    } else if (direction === 'right' && index < newUrls.length - 1) {
      [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
    } else if (direction === 'left' && index === 0 && getOrderedExistingImages().length > 0) {
      // Déplacer vers les images existantes
      const draggedUrl = newUrls[index];
      setFormData({ ...formData, imageUrls: newUrls.filter((_, i) => i !== index) });
      
      // Trouver l'ID correspondant dans existingImages ou créer une nouvelle entrée
      const lastExistingIndex = imageOrder.length - 1;
      setImageOrder([...imageOrder, draggedUrl as any]);
      return;
    } else {
      return;
    }
    
    setFormData({ ...formData, imageUrls: newUrls });
  };

  // Drag and drop functions
  const handleDragStartExisting = (e: React.DragEvent, imageId: number) => {
    setDraggedImageId(imageId);
    setDragType('existing');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverExisting = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropExisting = (e: React.DragEvent, targetImageId: number) => {
    e.preventDefault();
    
    // Si on drop une image nouvelle sur une existante
    if (dragType === 'new' && draggedNewImageIndex !== null) {
      const draggedUrl = formData.imageUrls[draggedNewImageIndex];
      const targetIndex = imageOrder.indexOf(targetImageId);
      
      if (targetIndex === -1) return;
      
      // Ajouter l'image aux existantes (virtuellement dans l'ordre)
      const newImageUrls = formData.imageUrls.filter((_, i) => i !== draggedNewImageIndex);
      setFormData({ ...formData, imageUrls: newImageUrls });
      
      // Insérer dans l'ordre des existantes
      const newOrder = [...imageOrder];
      newOrder.splice(targetIndex + 1, 0, draggedUrl as any);
      setImageOrder(newOrder);
      
      setDraggedImageId(null);
      setDraggedNewImageIndex(null);
      setDragType(null);
      return;
    }
    
    // Si on drop une image existante sur une autre existante
    if (dragType !== 'existing' || !draggedImageId || draggedImageId === targetImageId) return;
    
    const draggedIndex = imageOrder.indexOf(draggedImageId);
    const targetIndex = imageOrder.indexOf(targetImageId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    const newOrder = [...imageOrder];
    [newOrder[draggedIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[draggedIndex]];
    setImageOrder(newOrder);
    setDraggedImageId(null);
    setDragType(null);
  };

  const getOrderedExistingImages = () => {
    return imageOrder
      .map(id => existingImages.find(img => img.id === id))
      .filter((img): img is RealisationImage => img !== undefined);
  };

  const handleCategoryToggle = (categoryId: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleTagToggle = (tagId: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(t => t !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const handleAddTag = async () => {
    const input = document.getElementById('newTagInput') as HTMLInputElement;
    const tagName = input?.value.trim();

    if (!tagName) {
      setMessage({ type: 'error', text: 'Veuillez entrer un nom de mot-clé' });
      return;
    }

    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tagName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Erreur lors de la création du mot-clé (code: ${response.status})`);
      }

      const newTag = data;
      
      // Ajouter le nouveau tag à la liste des disponibles
      setAvailableTags(prev => [...prev, newTag]);
      
      // Sélectionner automatiquement le nouveau tag
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.id]
      }));

      // Réinitialiser l'input
      if (input) input.value = '';
      
      setMessage({ type: 'success', text: `Mot-clé "${tagName}" créé et sélectionné!` });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du tag:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Erreur lors de la création du mot-clé' 
      });
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    const tag = availableTags.find(t => t.id === tagId);
    if (!tag) return;

    if (!confirm(`Êtes-vous sûr de vouloir supprimer le mot-clé "${tag.name}"? Cela affectera tous les projets qui l'utilisent.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/tags/${tagId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression du mot-clé');
      }

      // Retirer le tag de la liste des disponibles
      setAvailableTags(prev => prev.filter(t => t.id !== tagId));
      
      // Retirer le tag des tags sélectionnés du projet (s'il était sélectionné)
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tagId)
      }));

      setMessage({ type: 'success', text: `Mot-clé supprimé avec succès` });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Erreur lors de la suppression du mot-clé' 
      });
    }
  };

  const handleImagesChange = (urls: string[]) => {
    setFormData(prev => ({ ...prev, imageUrls: urls }));
  };

  const handleDragStartNew = (e: React.DragEvent, index: number) => {
    setDraggedNewImageIndex(index);
    setDragType('new');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverNew = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropNew = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    // Si on drop une image existante sur une nouvelle
    if (dragType === 'existing' && draggedImageId !== null) {
      const targetUrl = formData.imageUrls[targetIndex];
      const draggedIndex = imageOrder.indexOf(draggedImageId);
      
      if (draggedIndex === -1) return;
      
      // Trouver l'image existante
      const draggedImage = existingImages.find(img => img.id === draggedImageId);
      if (!draggedImage) return;
      
      // Retirer de l'ordre existant
      const newOrder = imageOrder.filter(id => id !== draggedImageId);
      
      // Ajouter aux nouvelles images
      const newUrls = [...formData.imageUrls];
      newUrls.splice(targetIndex, 0, draggedImage.url);
      
      setImageOrder(newOrder);
      setFormData({ ...formData, imageUrls: newUrls });
      
      setDraggedImageId(null);
      setDraggedNewImageIndex(null);
      setDragType(null);
      return;
    }
    
    // Si on drop une image nouvelle sur une autre nouvelle
    if (dragType !== 'new' || draggedNewImageIndex === null || draggedNewImageIndex === targetIndex) return;
    
    const newUrls = [...formData.imageUrls];
    [newUrls[draggedNewImageIndex], newUrls[targetIndex]] = [newUrls[targetIndex], newUrls[draggedNewImageIndex]];
    setFormData({ ...formData, imageUrls: newUrls });
    setDraggedNewImageIndex(null);
    setDragType(null);
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
      // Validation des images
      if (formData.imageUrls.length === 0 && getOrderedExistingImages().length === 0) {
        throw new Error('Veuillez ajouter au moins une image');
      }

      // Validation des catégories (obligatoire)
      if (formData.categories.length === 0) {
        throw new Error('Veuillez sélectionner au moins une catégorie');
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

              {/* Upload nouvelles images */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Ajouter des images ({formData.imageUrls.length + existingImages.length} total)
                </label>
                <MultiImageUpload onImagesChange={handleImagesChange} />
              </div>

              {/* Toutes les images combinées - Affichage horizontal */}
              {(existingImages.length > 0 || formData.imageUrls.length > 0) && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                    Toutes les images ({existingImages.length + formData.imageUrls.length}) - Glissez-déposez ou utilisez les flèches pour réordonner
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 px-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {/* Images existantes */}
                    {getOrderedExistingImages().map((image, index) => {
                      const totalExisting = getOrderedExistingImages().length;
                      return (
                        <div
                          key={`existing-${image.id}`}
                          draggable
                          onDragStart={(e) => handleDragStartExisting(e, image.id)}
                          onDragOver={handleDragOverExisting}
                          onDrop={(e) => handleDropExisting(e, image.id)}
                          className="flex-shrink-0 relative group"
                        >
                          <img
                            src={image.url}
                            alt="Projet"
                            className="h-40 w-40 object-cover rounded-lg border-2 border-neutral-300 dark:border-neutral-600 cursor-move transition group-hover:opacity-60"
                          />
                          {/* Boutons d'action */}
                          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-70 rounded-lg transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                            {/* Flèche gauche */}
                            <button
                              type="button"
                              onClick={() => handleMoveImage(image.id, 'left')}
                              disabled={index === 0}
                              className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-full transition shadow-lg"
                              title="Déplacer à gauche"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            
                            {/* Flèche droite */}
                            <button
                              type="button"
                              onClick={() => handleMoveImage(image.id, 'right')}
                              disabled={index === totalExisting - 1 && formData.imageUrls.length === 0}
                              className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-full transition shadow-lg"
                              title="Déplacer à droite"
                            >
                              <ChevronRight size={18} />
                            </button>
                            
                            {/* Bouton supprimer */}
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(image.id)}
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow-lg"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Nouvelles images uploadées */}
                    {formData.imageUrls.map((url, index) => {
                      const totalExisting = getOrderedExistingImages().length;
                      return (
                        <div
                          key={`new-${url}`}
                          draggable
                          onDragStart={(e) => handleDragStartNew(e, index)}
                          onDragOver={handleDragOverNew}
                          onDrop={(e) => handleDropNew(e, index)}
                          className="flex-shrink-0 relative group"
                        >
                          <img
                            src={url}
                            alt="Nouvelle"
                            className="h-40 w-40 object-cover rounded-lg border-2 border-green-400 dark:border-green-700 cursor-move transition group-hover:opacity-60"
                          />
                          {/* Boutons d'action */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                            {/* Flèche gauche */}
                            <button
                              type="button"
                              onClick={() => handleMoveNewImage(index, 'left')}
                              disabled={index === 0 && totalExisting === 0}
                              className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-full transition shadow-lg"
                              title="Déplacer à gauche"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            
                            {/* Flèche droite */}
                            <button
                              type="button"
                              onClick={() => handleMoveNewImage(index, 'right')}
                              disabled={index === formData.imageUrls.length - 1}
                              className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white rounded-full transition shadow-lg"
                              title="Déplacer à droite"
                            >
                              <ChevronRight size={18} />
                            </button>
                            
                            {/* Bouton supprimer */}
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                imageUrls: formData.imageUrls.filter(u => u !== url)
                              })}
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow-lg"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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

              {/* Catégories - Obligatoire */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                  Catégories * <span className="text-xs text-red-500">(obligatoire)</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableCategories.map((category) => (
                    <label key={category.id} className="inline-flex items-center gap-2 cursor-pointer p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                      />
                      <span className="text-neutral-700 dark:text-neutral-300 capitalize">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.categories.length === 0 && (
                  <p className="text-xs text-red-500 mt-2">
                    ⚠️ Au moins une catégorie doit être sélectionnée
                  </p>
                )}
              </div>

              {/* Mots-clés - Optionnel */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                  Mots-clés <span className="text-xs text-neutral-500">(optionnel)</span>
                </label>
                
                {/* Ajouter un nouveau mot-clé */}
                <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600">
                  <h5 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                    Ajouter un nouveau mot-clé
                  </h5>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="newTagInput"
                      placeholder="Ex: minimaliste, moderne, design..."
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-600 dark:border-neutral-500 dark:text-white text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Liste des mots-clés disponibles à sélectionner */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                    Mots-clés disponibles
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {availableTags.length > 0 ? (
                      availableTags.map((tag) => (
                        <div key={tag.id} className="flex items-center gap-2 p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                          <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.tags.includes(tag.id)}
                              onChange={() => handleTagToggle(tag.id)}
                              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer"
                            />
                            <span className="text-neutral-700 dark:text-neutral-300 capitalize text-sm">
                              {tag.name}
                            </span>
                          </label>
                          <button
                            type="button"
                            onClick={() => handleDeleteTag(tag.id)}
                            className="ml-2 p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                            title="Supprimer ce mot-clé"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Aucun mot-clé disponible. Créez-en un ci-dessus!</p>
                    )}
                  </div>
                </div>

                {/* Mots-clés sélectionnés pour ce projet */}
                {formData.tags.length > 0 && (
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      <strong>{formData.tags.length}</strong> mot-clé{formData.tags.length > 1 ? 's' : ''} sélectionné{formData.tags.length > 1 ? 's' : ''} pour ce projet
                    </p>
                  </div>
                )}
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
