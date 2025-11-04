'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      // Clear any auth tokens if stored in localStorage
      localStorage.removeItem('adminToken');
      // Redirect to home
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
            Administration
          </h1>
          <button
            onClick={handleLogout}
            className="hover:cursor-pointer px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte: Créer un projet */}
          <Link href="/admin/create" className="group">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow h-full flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
              <div className="mb-4">
                <svg className="w-16 h-16 text-orange-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                Créer un projet
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Ajouter une nouvelle réalisation
              </p>
            </div>
          </Link>

          {/* Carte: Éditer les projets */}
          <Link href="/admin/edit" className="group">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow h-full flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
              <div className="mb-4">
                <svg className="w-16 h-16 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                Éditer les projets
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Modifier ou supprimer des réalisations
              </p>
            </div>
          </Link>

          {/* Carte: Gérer les catégories */}
          <Link href="/admin/categories" className="group">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow h-full flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
              <div className="mb-4">
                <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21H4a2 2 0 01-2-2V9.414a1 1 0 010-1.414l7-7a1 1 0 011.414 0l7 7a1 1 0 010 1.414V19a2 2 0 01-2 2h-3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                Gérer les catégories
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Ajouter, modifier ou supprimer des catégories
              </p>
            </div>
          </Link>

          {/* Carte: Gérer les images */}
          <Link href="/admin/site-images" className="group">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow h-full flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
              <div className="mb-4">
                <svg className="w-16 h-16 text-purple-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                Gérer les images
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Organiser et modifier les images
              </p>
            </div>
          </Link>

          {/* Carte: Gérer les tags */}
          <Link href="/admin/tags" className="group">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow h-full flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
              <div className="mb-4">
                <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                Gérer les tags
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Ajouter, modifier ou supprimer des tags/mots-clés
              </p>
            </div>
          </Link>

          {/* Carte: Retour */}
          <Link href="/" className="group">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow h-full flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform">
              <div className="mb-4">
                <svg className="w-16 h-16 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                Retour à l'accueil
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Revenir au site public
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
