'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getYoutubeThumbnail } from '@/lib/youtube';
import BtnShadow from '../components/BtnShadow';

type Project = {
  id: number;
  title: string;
  description: string;
  images: Array<{ id: number; url: string }>;
  videoUrl: string | null;
  youtubeUrl: string | null;
  link: string | null;
  categories: string[];
  tags: Array<{ id: number; name: string }>;
  createdAt: string;
};

type RealisationsClientProps = {
  projects: Project[];
};

export default function RealisationsClient({ projects }: RealisationsClientProps) {
    // Log des dates à l'arrivée des projets
    console.log('Dates des projets reçus:', projects.map(p => ({ id: p.id, date: p.createdAt })));

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Plus récent');
    const [searchQuery, setSearchQuery] = useState('');
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>(''); // Pour le SELECT
    const [selectedMediaType, setSelectedMediaType] = useState<string>('Tous'); // Photo, Vidéo, Tous
    const [loadingCategories, setLoadingCategories] = useState(true);

    // Charger les catégories depuis l'API
    useEffect(() => {
      const loadCategories = async () => {
        try {
          setLoadingCategories(true);
          const response = await fetch('/api/categories');
          if (response.ok) {
            const data = await response.json();
            const categoryNames = data.map((cat: { name: string }) => cat.name);
            setAvailableCategories(categoryNames);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des catégories:', error);
        } finally {
          setLoadingCategories(false);
        }
      };
      loadCategories();
    }, []);

    // Fonction de réinitialisation
    const handleReset = () => {
        setSelectedCategory('Plus récent');
        setSearchQuery('');
        setSelectedFilterCategory('');
        setSelectedMediaType('Tous');
    };

    // Filtrage et tri des projets
    const filteredAndSortedProjects = useMemo(() => {
        let filtered = [...projects];

        // Filtrage par recherche
        if (searchQuery) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filtrage par catégorie (SELECT dropdown)
        if (selectedFilterCategory) {
            filtered = filtered.filter(project =>
                project.categories.includes(selectedFilterCategory)
            );
        }

        // Filtrage par type de média
        if (selectedMediaType === 'Photo') {
            filtered = filtered.filter(project =>
                project.images && project.images.length > 0
            );
        } else if (selectedMediaType === 'Vidéo') {
            filtered = filtered.filter(project =>
                project.youtubeUrl || project.videoUrl
            );
        }

        // Tri simple et direct
        // Note: Si les dates sont identiques, on utilise l'ID comme critère secondaire
        switch (selectedCategory) {
            case 'Plus récent':
                filtered.sort((a, b) => {
                    const dateDiff = Date.parse(b.createdAt) - Date.parse(a.createdAt);
                    return dateDiff !== 0 ? dateDiff : b.id - a.id;
                });
                break;
            case 'Plus ancien':
                filtered.sort((a, b) => {
                    const dateDiff = Date.parse(a.createdAt) - Date.parse(b.createdAt);
                    return dateDiff !== 0 ? dateDiff : a.id - b.id;
                });
                break;
            case 'Ordre alphabétique':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }, [projects, searchQuery, selectedFilterCategory, selectedMediaType, selectedCategory]);

    // Dernier projet
    const latestProject = projects.length > 0 
        ? projects.reduce((latest, project) => 
            new Date(project.createdAt) > new Date(latest.createdAt) ? project : latest
          )
        : null;

    return (
        <div className='w-full'>
            <div className='w-full flex justify-center'>
                <div className='w-full max-w-7xl px-4 md:px-8 flex flex-col justify-center mt-5 mb-5'>
                    <div className='px-6 md:px-0'>
                        <div className='mb-3 flex-col sm:flex-row space-y-2 md:space-y-0 flex items-center justify-between'>
                            <BtnShadow 
                                bgColor='#FF8904'
                                borderColor= ''
                                img='/phone.svg'
                                text='ME CONTACTER'
                                textColor='text-white'
                                link='./#contact'
                                classnamea='rounded-full'
                            />
                            <p className='text-4xl font-black text-neutral-800 dark:text-white'>
                                {filteredAndSortedProjects.length} RÉSULTAT{filteredAndSortedProjects.length > 1 ? 'S' : ''}
                            </p>
                        </div>
                        <div className='h-[1px] bg-black dark:bg-white w-full mb-5'></div>

                        <div>
                            <form className="w-full mx-auto mb-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex relative">
                                    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-neutral-900 sr-only">Recherche</label>
                                    {/* Bouton dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsDropdownOpen(!isDropdownOpen);
                                            }}
                                            className="whitespace-nowrap shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-neutral-700 bg-white border-r-1 border-neutral-500 rounded-s-full outline-neutral-400 outline dark:outline-none hover:bg-neutral-100"
                                            type="button"
                                        >
                                            {selectedCategory}
                                            <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                            </svg>
                                        </button>

                                        {/* Menu déroulant */}
                                        {isDropdownOpen && (
                                            <div className="absolute top-full mt-1 left-0 z-50 bg-white divide-y rounded-lg shadow-lg w-44">
                                                <ul className="py-2 text-sm text-neutral-700">
                                                    <li>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCategory('Plus récent');
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="inline-flex w-full px-4 py-2 hover:bg-neutral-200 text-neutral-700 text-left"
                                                        >
                                                            Plus récent
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCategory('Plus ancien');
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="inline-flex w-full px-4 py-2 hover:bg-neutral-200 text-neutral-700 text-left"
                                                        >
                                                            Plus ancien
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCategory('Ordre alphabétique');
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="inline-flex w-full px-4 py-2 hover:bg-neutral-200 text-neutral-700 text-left"
                                                        >
                                                            Ordre alphabétique
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            type="search"
                                            id="search-dropdown"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="block p-2.5 w-full z-20 text-sm text-neutral-700 rounded-e-full bg-white dark:placeholder-neutral-400 dark:text-neutral-700 outline-neutral-400 outline dark:outline-none"
                                            placeholder="Rechercher une réalisation par lieu, titre..."
                                        />
                                        <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-full flex items-center justify-center">
                                            <div>
                                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.8333 19.8333L23.3749 23.375" stroke="#FF9000" strokeWidth="2" strokeLinejoin="round"/>
                                                <path d="M23.2806 26.244C22.4621 25.4256 22.4621 24.0988 23.2806 23.2805C24.0988 22.4621 25.4257 22.4621 26.2441 23.2805L30.5529 27.5893C31.3713 28.4077 31.3713 29.7345 30.5529 30.5528C29.7346 31.3712 28.4078 31.3712 27.5893 30.5528L23.2806 26.244Z" stroke="#FF9000" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M22.6666 12.75C22.6666 7.27319 18.2268 2.83334 12.7499 2.83334C7.2731 2.83334 2.83325 7.27319 2.83325 12.75C2.83325 18.2268 7.2731 22.6667 12.7499 22.6667C18.2268 22.6667 22.6666 18.2268 22.6666 12.75Z" stroke="#FF9000" strokeWidth="2" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        

                        <div className='w-full flex flex-col md:flex-row md:justify-between items-center gap-4 flex-wrap'>
                            {/* Dropdown Catégories personnalisé */}
                            <div className="flex flex-wrap gap-3 items-center w-full md:w-fit">
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                                        }}
                                        className="whitespace-nowrap shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-neutral-700 bg-white border-r-1 border-neutral-500 rounded-full outline-neutral-400 outline dark:outline-none hover:bg-neutral-100"
                                        type="button"
                                    >
                                        {selectedFilterCategory ? selectedFilterCategory.charAt(0).toUpperCase() + selectedFilterCategory.slice(1) : 'Toutes les catégories'}
                                        <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isCategoryDropdownOpen && (
                                        <div className="absolute top-full mt-1 left-0 z-50 bg-white divide-y dark:divide-neutral-700 rounded-lg shadow-lg min-w-[200px]">
                                            <ul className="py-2 text-sm text-neutral-700 dark:text-neutral-300">
                                                <li>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedFilterCategory('');
                                                            setIsCategoryDropdownOpen(false);
                                                        }}
                                                        className="inline-flex w-full px-4 py-2 hover:bg-neutral-200 text-neutral-700 text-left"
                                                    >
                                                        Toutes les catégories
                                                    </button>
                                                </li>
                                                {loadingCategories ? (
                                                    <li className="px-4 py-2 text-neutral-500 dark:text-neutral-400">Chargement...</li>
                                                ) : (
                                                    availableCategories.map((category) => (
                                                        <li key={category}>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedFilterCategory(category);
                                                                    setIsCategoryDropdownOpen(false);
                                                                }}
                                                                className="inline-flex w-full px-4 py-2 hover:bg-neutral-200 text-neutral-700 text-left"
                                                            >
                                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                                            </button>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bouton Réinitialiser */}
                            <button
                                onClick={handleReset}
                                className='text-neutral-700 bg-white outline-neutral-400 outline dark:outline-none px-4 py-2 rounded-full hover:bg-neutral-100 hover:cursor-pointer hover:text-neutral-600 transition-colors whitespace-nowrap'
                            >
                                Réinitialiser
                            </button>
                        </div>
                    </div>

                    {/* Grille de réalisations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {filteredAndSortedProjects.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl text-neutral-600 dark:text-neutral-400">Aucune réalisation trouvée</p>
                            </div>
                        ) : (
                            filteredAndSortedProjects.map((project) => (
                                <Link key={project.id} href={`/realisations/${project.id}`} className="block group">
                                    <div className="group cursor-pointer overflow-hidden rounded-lg border-[1.5px] shadow-lg border-neutral-300 dark:border-neutral-600 hover:scale-110 transition-all duration-400 ease-[cubic-bezier(.55,.12,.56,.9)] dark:bg-neutral-800 h-full flex flex-col">
                                        <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                                            {/* Miniature YouTube (prioritaire) */}
                                            {project.youtubeUrl && (
                                                <>
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center blur-lg scale-110 aspect-video"
                                                        style={{ backgroundImage: `url('${getYoutubeThumbnail(project.youtubeUrl)}')` }}
                                                    ></div>
                                                    <div className="relative w-full h-full flex items-center justify-center bg-neutral-900">
                                                        <img
                                                            src={getYoutubeThumbnail(project.youtubeUrl) || ''}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        {/* Play button overlay */}
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                                            <svg className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {/* Images (si pas de YouTube) */}
                                            {!project.youtubeUrl && project.images.length > 0 && (
                                                <>
                                                    {/* Cas 1: Une seule image avec flou en arrière-plan */}
                                                    {project.images.length === 1 && (
                                                        <>
                                                            <div
                                                                className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                                                                style={{ backgroundImage: `url('${project.images[0].url}')` }}
                                                            ></div>
                                                            <div className="relative w-full h-full flex items-center justify-center">
                                                                <img
                                                                    src={project.images[0].url}
                                                                    alt={project.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Cas 2: Deux images */}
                                                    {project.images.length === 2 && (
                                                        <div className="relative w-full h-full grid grid-cols-2 gap-1">
                                                            {project.images.map((img) => (
                                                                <div key={img.id} className="relative flex items-center justify-center bg-neutral-900">
                                                                    <img
                                                                        src={img.url}
                                                                        alt={project.title}
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Cas 3: Trois ou plus images - Layout 1x2 (1 à gauche, 2 à droite en colonne) */}
                                                    {project.images.length >= 3 && (
                                                        <div className="relative w-full h-full grid grid-cols-3 gap-1">
                                                            {/* Image gauche prenant toute la hauteur */}
                                                            <div className="col-span-2 row-span-2 relative flex items-center justify-center bg-neutral-900">
                                                                <img
                                                                    src={project.images[0].url}
                                                                    alt={project.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            {/* Colonne droite avec 2 images en hauteur */}
                                                            <div className="col-span-1 row-span-2 flex flex-col gap-1">
                                                                {project.images.slice(1, 3).map((img) => (
                                                                    <div key={img.id} className="relative flex-1 flex items-center justify-center bg-neutral-900">
                                                                        <img
                                                                            src={img.url}
                                                                            alt={project.title}
                                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                            {/* Vidéo uploadée (si pas de YouTube et pas d'images) */}
                                            {!project.youtubeUrl && project.videoUrl && project.images.length === 0 && (
                                                <video
                                                    src={project.videoUrl}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    muted
                                                    loop
                                                />
                                            )}
                                        </div>

                                        <div className="p-1 flex flex-col h-[120px]">
                                            <h3 className="text-2xl pt-1 px-2 font-bold text-neutral-800 dark:text-white duration-500 dark:group-hover:text-orange-500 group-hover:text-orange-500 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                            <p className="group-hover:text-orange-400 px-2 dark:group-hover:text-orange-200 duration-300 line-clamp-2 flex-grow">
                                                {project.description}
                                            </p>
                                            <div className="flex items-end justify-between gap-2 mt-">
                                                {project.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tags.map((tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-600 group-hover:bg-orange-300 dark:group-hover:bg-orange-300 border-1 border-neutral-600 dark:group-hover:border-orange-700 group-hover:border-orange-600 transition-colors dark:border-white text-neutral-600 dark:group-hover:text-neutral-800 group-hover:text-neutral-800 dark:text-white rounded-full duration-400"
                                                            >
                                                                {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap ml-auto">
                                                    {new Date(project.createdAt).toLocaleDateString('fr-FR', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
