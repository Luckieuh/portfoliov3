'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [canSetup, setCanSetup] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Vérifier si un admin existe déjà
    const checkAdminExists = async () => {
      try {
        const response = await fetch('/api/admin/check');
        const data = await response.json();
        
        if (data.exists) {
          setCanSetup(false);
          setMessage({
            type: 'error',
            text: 'Un compte admin existe déjà. La configuration n\'est plus possible. Veuillez vous connecter.'
          });
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        } else {
          setCanSetup(true);
        }
      } catch (error) {
        console.error('Error checking admin:', error);
        setCanSetup(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminExists();
  }, [router]);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (password.length < 8) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères');
      }

      const response = await fetch('/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la création du compte');
      }

      setMessage({ 
        type: 'success', 
        text: 'Compte admin créé avec succès! Redirection vers la connexion...' 
      });

      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Une erreur est survenue' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mb-2">
            Configuration Admin
          </h1>
          <p className="text-center text-neutral-600 dark:text-neutral-400 mb-8">
            Créez votre compte administrateur
          </p>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-neutral-600 dark:text-neutral-400">Vérification...</p>
            </div>
          ) : !canSetup ? (
            <div className={`p-4 rounded bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100`}>
              {message?.text}
            </div>
          ) : (
            <form onSubmit={handleSetup} className="space-y-6">
              {/* Nom d'utilisateur */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="Entrez un nom d'utilisateur"
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Mot de passe (minimum 8 caractères)
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="Entrez un mot de passe sécurisé"
                />
              </div>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded ${
                  message.type === 'success' 
                    ? 'bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100' 
                    : 'bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Bouton de création */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {isLoading ? 'Création en cours...' : 'Créer le compte'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
