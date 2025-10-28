'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getYoutubeThumbnail } from '@/lib/youtube';
import BtnShadow from './../components/BtnShadow';

type Project = {
  id: number;
  title: string;
  description: string;
  location?: string | null;
  images: Array<{ id: number; url: string }>;
  videoUrl: string | null;
  youtubeUrl: string | null;
  link: string | null;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  createdAt: string;
};

type RealisationsClientProps = {
  projects: Project[];
};

type Filter = {
  [key: string]: boolean;
};

export default function RealisationsClient({ projects }: RealisationsClientProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Plus récent');
    const [selectedCategory, setSelectedCategory] = useState('Tous les types');
    const [searchQuery, setSearchQuery] = useState('');
    const [availableCategories, setAvailableCategories] = useState<Array<{id: number; name: string}>>([]);
    const [availableTags, setAvailableTags] = useState<Array<{id: number; name: string}>>([]);
    const [checkedTags, setCheckedTags] = useState<Filter>({});
    const [loadingFilters, setLoadingFilters] = useState(true);

    // Charger les catégories et tags depuis l'API
    useEffect(() => {
      const loadFilters = async () => {
        try {
          setLoadingFilters(true);
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
            
            // Initialiser les filtres pour les tags
            const initialTagFilters: Filter = {};
            
            tagsData.forEach((tag: { id: number; name: string }) => {
              initialTagFilters[tag.name] = false;
            });
            
            setCheckedTags(initialTagFilters);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des filtres:', error);
        } finally {
          setLoadingFilters(false);
        }
      };
      loadFilters();
    }, []);

    // Fermer les dropdowns quand on change la sélection du tri
    useEffect(() => {
        setIsCategoryDropdownOpen(false);
    }, [isDropdownOpen]);

    // Fermer les dropdowns en cliquant en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.category-dropdown-container') && !target.closest('.sort-dropdown-container')) {
                setIsDropdownOpen(false);
                setIsCategoryDropdownOpen(false);
            }
        };
        
        if (isDropdownOpen || isCategoryDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isDropdownOpen, isCategoryDropdownOpen]);

    // Fonction de réinitialisation
    const handleReset = () => {
        setSelectedSort('Plus récent');
        setSearchQuery('');
        setSelectedCategory('Tous les types');
        
        const resetTagFilters: Filter = {};
        
        availableTags.forEach((tag) => {
          resetTagFilters[tag.name] = false;
        });
        
        setCheckedTags(resetTagFilters);
    };


    const handleTagChange = (tagName: string) => {
        setCheckedTags(prev => ({
            ...prev,
            [tagName]: !prev[tagName]
        }));
    };

    // Filtrage et tri des projets
    const filteredAndSortedProjects = useMemo(() => {
        let filtered = [...projects];

        // Filtrage par recherche
        if (searchQuery) {
            filtered = filtered.filter(project => 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Filtrage par catégories
        if (selectedCategory && selectedCategory !== 'Tous les types') {
            filtered = filtered.filter(project => 
                project.categories.some(cat => cat.name === selectedCategory)
            );
        }

        // Filtrage par tags
        const activeTags = Object.entries(checkedTags)
            .filter(([_, isChecked]) => isChecked)
            .map(([key, _]) => key);

        if (activeTags.length > 0) {
            filtered = filtered.filter(project => 
                activeTags.some(tagName => 
                    project.tags.some(tag => tag.name === tagName)
                )
            );
        }

        // Tri
        switch (selectedSort) {
            case 'Plus récent':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'Plus ancien':
                filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'Ordre alphabétique':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return filtered;
    }, [projects, searchQuery, selectedCategory, checkedTags, selectedSort]);

    // Dernier projet
    const latestProject = projects.length > 0 
        ? projects.reduce((latest, project) => 
            new Date(project.createdAt) > new Date(latest.createdAt) ? project : latest
          )
        : null;

    return (
        <div className='w-full lg:px-20 flex justify-center flex-col mt-8'>
            {/* Conteneur supérieur: barre de recherche + dernier projet sur la même ligne */}
            <div className='w-full flex justify-center px-4 mb-8'>
                <div className='flex justify-center w-full max-w-[95%] gap-6 items-start'>
                    {/* Recherche et filtres */}
                    <div className='flex-1 flex flex-col sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px]'>
                        <div className='flex flex-row justify-between text-end mb-3'>
                            <BtnShadow 
                                bgColor='#FF8904'
                                borderColor='#FF8904'
                                img='/phone.svg'
                                text='ME CONTACTER'
                                textColor='#FFFFFF'
                                link='/a-propos'
                            />
                            <p className='text-2xl md:text-4xl font-extrabold text-neutral-800 dark:text-white'>
                                {filteredAndSortedProjects.length} RÉSULTAT{filteredAndSortedProjects.length >= 2 ? 'S' : ''}
                            </p>
                        </div>
                        <div className='h-[1px] bg-black dark:bg-white w-full mb-5'></div>
                        
                        <div>
                            <form className="w-full mx-auto mb-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex relative">
                                    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-neutral-900 sr-only">Recherche</label>
                                    
                                    {/* Bouton dropdown */}
                                    <div className="relative sort-dropdown-container">
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsDropdownOpen(!isDropdownOpen);
                                            }}
                                            className=" whitespace-nowrap shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-neutral-700 bg-white border-r-1 border-neutral-500 rounded-s-full outline-neutral-400 outline dark:outline-none hover:bg-neutral-100" 
                                            type="button"
                                        >
                                            {selectedSort}
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
                                                                setSelectedSort('Plus récent');
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
                                                                setSelectedSort('Plus ancien');
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
                                                                setSelectedSort('Ordre alphabétique');
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
                                        className="block p-2.5 w-full z-20 text-sm text-neutral-700 rounded-e-full bg-white dark:placeholder-neutral-400 dark:text-neutral-700 outline-neutral-400 outline dark:outline-none [&::-webkit-search-cancel-button]:hidden" 
                                        placeholder="Rechercher par mot-clé, lieu, titre..." 
                                    />
                                    <div className="absolute top-0 end-0 px-2.5 py-1 text-sm font-medium h-full text-white rounded-e-full flex items-center justify-center">
                                        <svg className='h-full w-full' viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.8333 19.8333L23.3749 23.375" stroke="#FF9000" stroke-width="2" stroke-linejoin="round"/>
                                            <path d="M23.2806 26.244C22.4621 25.4256 22.4621 24.0988 23.2806 23.2805C24.0988 22.4621 25.4257 22.4621 26.2441 23.2805L30.5529 27.5893C31.3713 28.4077 31.3713 29.7345 30.5529 30.5528C29.7346 31.3712 28.4078 31.3712 27.5893 30.5528L23.2806 26.244Z" stroke="#FF9000" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M22.6666 12.75C22.6666 7.27319 18.2268 2.83334 12.7499 2.83334C7.2731 2.83334 2.83325 7.27319 2.83325 12.75C2.83325 18.2268 7.2731 22.6667 12.7499 22.6667C18.2268 22.6667 22.6666 18.2268 22.6666 12.75Z" stroke="#FF9000" stroke-width="2" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='w-full flex flex-row justify-between whitespace-nowrap items-start gap-4'>
                        {/* Filtres */}
                        <div className=" w-[40%] flex flex-col gap-4">
                            {/* Catégories - Dropdown */}
                            <div>
                                <div className="w-full relative category-dropdown-container">
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                                        }}
                                        className="w-full whitespace-nowrap shrink-0 z-10 inline-flex justify-between items-center py-2.5 px-4 text-sm font-medium text-center text-black bg-white border border-neutral-300 rounded-full outline-neutral-400 outline dark:outline-none hover:bg-neutral-200 bg-white" 
                                        type="button"
                                    >
                                        {loadingFilters ? 'Chargement...' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                                        <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </button>
                                    
                                    {/* Menu déroulant des catégories */}
                                    {isCategoryDropdownOpen && !loadingFilters && (
                                        <div className="w-full absolute top-full mt-1 left-0 z-50 bg-white divide-y rounded-lg shadow-lg bg-white border border-neutral-300">
                                            <ul className="py-2 text-sm text-neutral-700">
                                                <li>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => {
                                                            setSelectedCategory('Tous les types');
                                                            setIsCategoryDropdownOpen(false);
                                                        }}
                                                        className="inline-flex w-full px-4 py-2 hover:bg-neutral-200 text-neutral-700 text-left transition-colors"
                                                    >
                                                        Tous les types
                                                    </button>
                                                </li>
                                                {availableCategories.map((category) => (
                                                    <li key={category.id}>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => {
                                                                setSelectedCategory(category.name);
                                                                setIsCategoryDropdownOpen(false);
                                                            }}
                                                            className="inline-flex w-full px-4 py-2 hover:bg-neutral-200 text-neutral-700 text-left transition-colors capitalize"
                                                        >
                                                            {category.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                        
                        {/* Bouton Réinitialiser */}
                        <button 
                            onClick={handleReset}
                            className='text-black bg-white outline-neutral-400 outline dark:outline-none px-4 py-2 rounded-full hover:bg-neutral-200 hover:cursor-pointer transition-colors whitespace-nowrap'
                        >
                            Réinitialiser
                        </button>
                    </div>
                    </div>

                    {/* Dernier projet - à droite sur la même ligne */}
                    {/* {latestProject && (
                        <div className='hidden lg:flex lg:w-[340px] flex-shrink-0'>
                            <Link href={`/realisations/${latestProject.id}`} className="block group w-full">
                                <div className='rounded-xl cursor-pointer transition-all duration-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700'>

                                    <div className="overflow-hidden rounded-xl">
                                        <div className="relative w-full aspect-video rounded-t-xl overflow-hidden"> */}
                                            {/* Miniature YouTube (prioritaire) */}
                                            {/* {latestProject.youtubeUrl && (
                                                <>
                                                    <div 
                                                        className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                                                        style={{ backgroundImage: `url('${getYoutubeThumbnail(latestProject.youtubeUrl)}')` }}
                                                    ></div>
                                                    <div className="relative w-full h-full flex items-center justify-center bg-neutral-900">
                                                        <img 
                                                            src={getYoutubeThumbnail(latestProject.youtubeUrl) || ''} 
                                                            alt={latestProject.title} 
                                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform ease-in-out duration-300"
                                                        /> */}
                                                        {/* Play button overlay */}
                                                        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                                            <svg className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </>
                                            )} */}
                                            {/* Images (si pas de YouTube) */}
                                            {/* {!latestProject.youtubeUrl && latestProject.images.length > 0 && (
                                                <> */}
                                                    {/* Cas 1: Une seule image avec flou en arrière-plan */}
                                                    {/* {latestProject.images.length === 1 && (
                                                        <>
                                                            <div 
                                                                className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                                                                style={{ backgroundImage: `url('${latestProject.images[0].url}')` }}
                                                            ></div>
                                                            <div className="relative w-full h-full flex items-center justify-center">
                                                                <img 
                                                                    src={latestProject.images[0].url} 
                                                                    alt={latestProject.title} 
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-in-out duration-300"
                                                                />
                                                            </div>
                                                        </>
                                                    )} */}

                                                    {/* Cas 2: Deux images */}
                                                    {/* {latestProject.images.length === 2 && (
                                                        <div className="relative w-full h-full grid grid-cols-2 gap-1">
                                                            {latestProject.images.map((img) => (
                                                                <div key={img.id} className="relative flex items-center justify-center bg-neutral-900">
                                                                    <img 
                                                                        src={img.url} 
                                                                        alt={latestProject.title} 
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-in-out duration-300"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )} */}

                                                    {/* Cas 3: Trois ou plus images - Layout 2x1 (2 à gauche en colonne, 1 à droite) */}
                                                    {/* {latestProject.images.length >= 3 && (
                                                        <div className="relative w-full h-full grid grid-cols-3 gap-1"> */}
                                                            {/* Colonne gauche avec 2 images en hauteur */}
                                                            {/* <div className="col-span-1 row-span-2 flex flex-col gap-1">
                                                                {latestProject.images.slice(0, 2).map((img) => (
                                                                    <div key={img.id} className="relative flex-1 flex items-center justify-center bg-neutral-900">
                                                                        <img 
                                                                            src={img.url} 
                                                                            alt={latestProject.title} 
                                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-in-out duration-300"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div> */}
                                                            {/* Image droite prenant toute la hauteur */}
                                                            {/* <div className="col-span-2 row-span-2 relative flex items-center justify-center bg-neutral-900">
                                                                <img 
                                                                    src={latestProject.images[2].url} 
                                                                    alt={latestProject.title} 
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-in-out duration-300"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div className="mt-1 px-5 py-1">
                                            <h2 className='w-full flex justify-center text-2xl font-black text-neutral-800 dark:text-white group-hover:text-orange-500 transition-colors'>
                                                DERNIER PROJET
                                            </h2>
                                            <h3 className="w-full flex justify-center text-2xl font-semibold text-neutral-600 dark:text-white group-hover:text-orange-400 transition-colors">
                                                {latestProject.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )} */}
                </div>
            </div>

            {/* Grille de réalisations - pleine largeur */}
            <div className='w-full flex justify-center px-4 mt-5'>
                <div className='flex w-full max-w-[95%]'>
                    {/* Grille de réalisations */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {filteredAndSortedProjects.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl text-neutral-600 dark:text-neutral-400">Aucune réalisation trouvée</p>
                            </div>
                        ) : (
                            filteredAndSortedProjects.map((project) => (
                                <Link key={project.id} href={`/realisations/${project.id}`} className="block group">
                                    <div className="overflow-hidden bg-zinc-200 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-xl cursor-pointer transition-all duration-300">
                                        <div className="relative w-full aspect-video rounded-t-xl overflow-hidden">
                                            {/* Miniature YouTube (prioritaire) */}
                                            {project.youtubeUrl && (
                                                <>
                                                    <div 
                                                        className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                                                        style={{ backgroundImage: `url('${getYoutubeThumbnail(project.youtubeUrl)}')` }}
                                                    ></div>
                                                    <div className="relative w-full h-full flex items-center justify-center bg-neutral-900">
                                                        <img 
                                                            src={getYoutubeThumbnail(project.youtubeUrl) || ''} 
                                                            alt={project.title} 
                                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
                                        
                                        <div className="px-5 py-2">
                                            <div className='flex items-center justify-between'>
                                            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white group-hover:text-orange-500 transition-colors">
                                                {project.title}
                                            </h3>
                                            {project.location && (
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    {project.location}
                                                </p>
                                            )}
                                        </div>

                                            <p className='group-hover:text-orange-400'>
                                                {project.description.length > 100
                                                    ? project.description.slice(0, 100) + '...'
                                                    : project.description
                                                }
                                            </p>
                                            <div className="flex items-center justify-between gap-2 mt-5">
                                                {project.categories.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {/* Catégories */}
                                                {project.categories.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.categories.map((category) => (
                                                            <span 
                                                                key={category.id}
                                                                className="px-2.5 py-1 text-xs font-medium bg-orange-700/20 text-orange-700 dark:text-orange-300 rounded-full"
                                                            >
                                                                {category.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                {/* Mots-clés */}
                                                {project.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tags.map((tag) => (
                                                            <span 
                                                                key={tag.id}
                                                                className="px-2.5 py-1 text-xs font-medium group-hover:bg-orange-800 border-1 border-neutral-600 group-hover:border-orange-400 transition-colors dark:border-white text-neutral-600 group-hover:text-orange-400 dark:text-white rounded-full"
                                                            >
                                                                {tag.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                    </div>
                                                )}
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
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