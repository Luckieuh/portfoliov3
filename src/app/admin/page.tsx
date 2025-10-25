'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit, LogOut, Plus } from 'lucide-react';

interface Realisation {
  id: number;
  title: string;
  description: string;
  location?: string;
  images?: { url: string }[];
  videoUrl?: string;
  youtubeUrl?: string;
  link?: string;
  categories: string[];
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification en appelant un endpoint protégé
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Important: inclure les cookies
        });

        if (response.status === 401 || !response.ok) {
          // Pas authentifié, rediriger vers login
          router.push('/auth/login');
          return;
        }

        // Authentifié, charger les réalisations
        setIsAuthenticated(true);
        loadRealisations();
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  const loadRealisations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/realisations');
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setRealisations(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement des réalisations' });
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

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      const response = await fetch(`/api/realisations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setMessage({ type: 'success', text: 'Projet supprimé avec succès!' });
      loadRealisations();
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
            Administration
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
              Réalisations ({realisations.length})
            </h2>
            <button
              onClick={() => router.push('/admin/edit/new')}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Plus size={18} />
              Nouveau Projet
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

          {isLoading ? (
            <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
              Chargement des réalisations...
            </div>
          ) : realisations.length === 0 ? (
            <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
              Aucune réalisation. Commencez par en créer une !
            </div>
          ) : (
            <div className="space-y-4">
              {realisations.map((realisation) => (
                <div
                  key={realisation.id}
                  className="border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition flex justify-between items-start"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-800 dark:text-white text-lg">
                      {realisation.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                      {realisation.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {realisation.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-100 px-2 py-1 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    {realisation.images && realisation.images.length > 0 && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                        📷 {realisation.images.length} image(s)
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => router.push(`/admin/edit/${realisation.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"
                      title="Éditer"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(realisation.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
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
