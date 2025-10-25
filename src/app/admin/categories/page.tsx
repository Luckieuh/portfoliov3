'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, LogOut, ChevronLeft } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification en appelant un endpoint protégé
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
        loadCategories();
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement des catégories' });
    } finally {
      setIsLoading(false);
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

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) {
      setMessage({ type: 'error', text: 'Le nom de la catégorie ne peut pas être vide' });
      return;
    }

    try {
      setIsAdding(true);
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'ajout');
      }

      setMessage({ type: 'success', text: 'Catégorie ajoutée avec succès!' });
      setNewCategoryName('');
      loadCategories();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Erreur lors de l\'ajout' });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setMessage({ type: 'success', text: 'Catégorie supprimée avec succès!' });
      loadCategories();
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Erreur lors de la suppression' });
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
      <div className="max-w-4xl mx-auto">
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
              Gestion des Catégories
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

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
          {/* Formulaire d'ajout */}
          <div className="mb-8 pb-8 border-b border-neutral-300 dark:border-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
              Ajouter une nouvelle catégorie
            </h2>
            <form onSubmit={handleAddCategory} className="flex gap-2">
              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-800 dark:text-white"
                disabled={isAdding}
              />
              <button
                type="submit"
                disabled={isAdding}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <Plus size={18} />
                Ajouter
              </button>
            </form>
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

          {/* Liste des catégories */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
              Catégories existantes ({categories.length})
            </h2>

            {isLoading ? (
              <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                Chargement des catégories...
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                Aucune catégorie. Commencez par en créer une !
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition flex justify-between items-center"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-800 dark:text-white text-lg capitalize">
                        {category.name}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                        {new Date(category.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition flex-shrink-0 ml-2"
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
