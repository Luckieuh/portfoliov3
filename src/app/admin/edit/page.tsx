'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

export default function EditProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/realisations');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des projets');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/realisations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">
            Éditer les projets
          </h1>
          <Link href="/admin" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Retour
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-600 dark:text-neutral-400">Chargement...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">Aucun projet trouvé</p>
            <Link href="/admin/create" className="text-orange-500 hover:text-orange-600 font-medium">
              Créer un nouveau projet
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">
                    Titre
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id} className={`border-b border-neutral-200 dark:border-neutral-700 ${index % 2 === 0 ? 'bg-neutral-900 dark:bg-neutral-750' : 'bg-white dark:bg-neutral-800'}`}>
                    <td className="px-6 py-4 text-neutral-900 dark:text-white font-medium">
                      {project.title}
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {project.description}
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                      {new Date(project.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2 flex items-center justify-center">
                      <Link
                        href={`/admin/edit/${project.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition-colors"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
