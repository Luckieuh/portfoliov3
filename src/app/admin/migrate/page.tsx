'use client';

import { useState } from 'react';

export default function MigrationPage() {
  const [token, setToken] = useState('mig_2024_production_secure_token_change_this');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleMigrate = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/db/migrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erreur');
        setResult(data);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Erreur de connexion: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/db/migrate', {
        method: 'GET',
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Erreur de connexion: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">🗄️ Migration Prisma</h1>
          <p className="text-slate-400 text-sm mb-6">Exécuter les migrations de base de données</p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Token de migration
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleMigrate}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                {loading ? '⏳ En cours...' : '▶️ Exécuter les migrations'}
              </button>

              <button
                onClick={handleStatus}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                {loading ? '⏳ En cours...' : '📊 Vérifier le statut'}
              </button>
            </div>
          </div>

          {result && (
            <div className="p-4 bg-slate-700/50 border border-slate-600 rounded text-slate-200 text-sm font-mono overflow-auto max-h-96">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="/" className="text-blue-400 hover:text-blue-300 text-sm">
              ← Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
