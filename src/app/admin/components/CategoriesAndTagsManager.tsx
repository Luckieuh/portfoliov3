import { useState, useEffect } from 'react';

type Category = {
    id: number;
    name: string;
    createdAt: string;
};

type Tag = {
    id: number;
    name: string;
    createdAt: string;
};

export default function CategoriesAndTagsManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newTagName, setNewTagName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [categoriesRes, tagsRes] = await Promise.all([
                fetch('/api/categories'),
                fetch('/api/tags')
            ]);

            if (categoriesRes.ok && tagsRes.ok) {
                const [categoriesData, tagsData] = await Promise.all([
                    categoriesRes.json(),
                    tagsRes.json()
                ]);

                setCategories(categoriesData);
                setTags(tagsData);
            }
        } catch (error) {
            setError('Erreur lors du chargement des données');
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCategoryName }),
            });

            if (res.ok) {
                await loadData();
                setNewCategoryName('');
                setSuccess('Catégorie ajoutée avec succès');
            } else {
                const data = await res.json();
                setError(data.error || 'Erreur lors de l\'ajout de la catégorie');
            }
        } catch (error) {
            setError('Erreur lors de l\'ajout de la catégorie');
        }
    };

    const handleAddTag = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newTagName }),
            });

            if (res.ok) {
                await loadData();
                setNewTagName('');
                setSuccess('Tag ajouté avec succès');
            } else {
                const data = await res.json();
                setError(data.error || 'Erreur lors de l\'ajout du tag');
            }
        } catch (error) {
            setError('Erreur lors de l\'ajout du tag');
        }
    };

    const handleDeleteTag = async (id: number) => {
        try {
            const res = await fetch(`/api/tags?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await loadData();
                setSuccess('Tag supprimé avec succès');
            } else {
                setError('Erreur lors de la suppression du tag');
            }
        } catch (error) {
            setError('Erreur lors de la suppression du tag');
        }
    };

    return (
        <div className="space-y-8">
            {/* Messages */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    {success}
                </div>
            )}

            {/* Gestionnaire de catégories */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Catégories</h2>
                <form onSubmit={handleAddCategory} className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Nouvelle catégorie"
                            className="flex-1 p-2 border rounded dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded flex items-center justify-between"
                        >
                            <span className="dark:text-white capitalize">{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gestionnaire de tags */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Tags</h2>
                <form onSubmit={handleAddTag} className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            placeholder="Nouveau tag"
                            className="flex-1 p-2 border rounded dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {tags.map((tag) => (
                        <div
                            key={tag.id}
                            className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded flex items-center justify-between"
                        >
                            <span className="dark:text-white capitalize">{tag.name}</span>
                            <button
                                onClick={() => handleDeleteTag(tag.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}