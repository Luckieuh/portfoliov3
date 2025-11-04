'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
};

type Tag = {
  id: number;
  name: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTagName, setNewTagName] = useState('');

  // Charger les catégories et tags
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/tags'),
        ]);

        if (categoriesRes.ok) {
          setCategories(await categoriesRes.json());
        }
        if (tagsRes.ok) {
          setTags(await tagsRes.json());
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setMessage({ type: 'error', text: 'Erreur lors du chargement des données' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.toLowerCase() }),
      });

      if (response.ok) {
        const category = await response.json();
        setCategories([...categories, category]);
        setNewCategoryName('');
        setMessage({ type: 'success', text: 'Catégorie ajoutée avec succès!' });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout de la catégorie' });
    }
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTagName.toLowerCase() }),
      });

      if (response.ok) {
        const tag = await response.json();
        setTags([...tags, tag]);
        setNewTagName('');
        setMessage({ type: 'success', text: 'Tag ajouté avec succès!' });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout du tag' });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat.id !== id));
        setMessage({ type: 'success', text: 'Catégorie supprimée avec succès!' });
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

  const handleDeleteTag = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce tag ?')) return;

    try {
      const response = await fetch(`/api/tags/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTags(tags.filter(tag => tag.id !== id));
        setMessage({ type: 'success', text: 'Tag supprimé avec succès!' });
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
            Gestion des Catégories et Tags
          </h1>
          <Link href="/admin" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Retour au dashboard
          </Link>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Catégories */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">Catégories</h2>

            {/* Ajouter une catégorie */}
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                placeholder="Nouvelle catégorie..."
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              />
              <button
                onClick={handleAddCategory}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Ajouter
              </button>
            </div>

            {/* Liste des catégories */}
            <div className="space-y-2">
              {categories.length === 0 ? (
                <p className="text-neutral-500 dark:text-neutral-400">Aucune catégorie</p>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded">
                    <span className="text-neutral-800 dark:text-white">
                      {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-6">Tags/Mots-clés</h2>

            {/* Ajouter un tag */}
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Nouveau tag..."
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              />
              <button
                onClick={handleAddTag}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Ajouter
              </button>
            </div>

            {/* Liste des tags */}
            <div className="space-y-2">
              {tags.length === 0 ? (
                <p className="text-neutral-500 dark:text-neutral-400">Aucun tag</p>
              ) : (
                tags.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded">
                    <span className="text-neutral-800 dark:text-white">
                      {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                    </span>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
