'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  link: string | null;
  categories: string[];
  tags?: { id: number; name: string; createdAt: Date }[];
  images?: { id: number; url: string; position: number; realisationId: number; createdAt: Date }[];
  location?: string | null;
  youtubeUrl?: string | null;
  createdAt: string; // Changé de Date à string
};

type RealisationsClientProps = {
  projects: Project[];
};

export default function RealisationsClient({ projects }: RealisationsClientProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Plus récent');
    const [searchQuery, setSearchQuery] = useState('');
    const [checkedFilters, setCheckedFilters] = useState({
        photo: false,
        video: false,
        design: false,
        voyage: false,
        architecture: false
    });

    // Fonction de réinitialisation
    const handleReset = () => {
        setSelectedCategory('Plus récent');
        setSearchQuery('');
        setCheckedFilters({
            photo: false,
            video: false,
            design: false,
            voyage: false,
            architecture: false
        });
    };

    // Fonction pour gérer les changements de checkbox
    const handleCheckboxChange = (filter: keyof typeof checkedFilters) => {
        setCheckedFilters(prev => ({
            ...prev,
            [filter]: !prev[filter]
        }));
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

        // Filtrage par catégories
        const activeFilters = Object.entries(checkedFilters)
            .filter(([_, isChecked]) => isChecked)
            .map(([key, _]) => key);

        if (activeFilters.length > 0) {
            filtered = filtered.filter(project => 
                activeFilters.some(filter => 
                    project.categories.includes(filter)
                )
            );
        }

        // Tri
        switch (selectedCategory) {
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
    }, [projects, searchQuery, checkedFilters, selectedCategory]);

    // Dernier projet
    const latestProject = projects.length > 0 
        ? projects.reduce((latest, project) => 
            new Date(project.createdAt) > new Date(latest.createdAt) ? project : latest
          )
        : null;

    return (
        <div className='w-full flex justify-center'>
            <div className='flex w-full mt-5 mb-5 max-w-[95%]'>
                <div className='w-full lg:w-[65%] flex flex-col'>
                    <div className='text-end mb-3'>
                        <p className='text-2xl md:text-4xl font-black text-neutral-800 dark:text-white'>
                            {filteredAndSortedProjects.length} RÉSULTAT{filteredAndSortedProjects.length !== 1 ? 'S' : ''}
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
                                        <img src="/search.svg" alt="Icône de recherche" className="w-8 h-8" />
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='w-full flex flex-col md:flex-row justify-between items-start gap-4'>
                        {/* Liste de checkboxes */}
                        <div className="flex flex-wrap gap-4">
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={checkedFilters.photo}
                                    onChange={() => handleCheckboxChange('photo')}
                                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer" 
                                />
                                <span className="text-neutral-700 dark:text-neutral-300">Photo</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={checkedFilters.video}
                                    onChange={() => handleCheckboxChange('video')}
                                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer" 
                                />
                                <span className="text-neutral-700 dark:text-neutral-300">Vidéo</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={checkedFilters.design}
                                    onChange={() => handleCheckboxChange('design')}
                                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer" 
                                />
                                <span className="text-neutral-700 dark:text-neutral-300">Design</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={checkedFilters.voyage}
                                    onChange={() => handleCheckboxChange('voyage')}
                                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer" 
                                />
                                <span className="text-neutral-700 dark:text-neutral-300">Voyage</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={checkedFilters.architecture}
                                    onChange={() => handleCheckboxChange('architecture')}
                                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 cursor-pointer" 
                                />
                                <span className="text-neutral-700 dark:text-neutral-300">Architecture</span>
                            </label>
                        </div>
                        
                        {/* Bouton Réinitialiser */}
                        <button 
                            onClick={handleReset}
                            className='text-neutral-700 bg-white outline-neutral-400 outline dark:outline-none px-4 py-2 rounded-full hover:bg-neutral-100 hover:cursor-pointer hover:text-neutral-600 transition-colors whitespace-nowrap'
                        >
                            Réinitialiser
                        </button>
                    </div>

                    {/* Grille de réalisations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {filteredAndSortedProjects.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl text-neutral-600 dark:text-neutral-400">Aucune réalisation trouvée</p>
                            </div>
                        ) : (
                            filteredAndSortedProjects.map((project) => (
                                <div key={project.id} className="overflow-hidden">
                                    <Link href={`/realisations/${project.id}`} className="block">
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] duration-300">
                                            {project.imageUrl && (
                                                <>
                                                    <div 
                                                        className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                                                        style={{ backgroundImage: `url('${project.imageUrl}')` }}
                                                    ></div>
                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                        <img 
                                                            src={project.imageUrl} 
                                                            alt={project.title} 
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                            {project.videoUrl && !project.imageUrl && (
                                                <video 
                                                    src={project.videoUrl}
                                                    className="w-full h-full object-cover"
                                                    muted
                                                    loop
                                                />
                                            )}
                                        </div>
                                    </Link>
                                    
                                    <div className="mt-2">
                                        <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                                            {project.title}
                                        </h3>
                                        {project.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {project.categories.map((category, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className="px-2 py-1 text-xs font-medium border-1 border-white text-white rounded-full"
                                                    >
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar - Dernier projet */}
                {latestProject && (
                    <div className='hidden lg:block w-[30%] mx-6 scale-90'>
                        <div className='box-shadow-glow-orange p-3 rounded-xl'>
                            <h2 className='w-full flex justify-center text-3xl font-black text-neutral-800 dark:text-white mb-4'>
                                DERNIER PROJET
                            </h2>
                            <div className="overflow-hidden">
                                <Link href={`/realisations/${latestProject.id}`} className="block">
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] duration-300">
                                        {latestProject.imageUrl && (
                                            <>
                                                <div 
                                                    className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                                                    style={{ backgroundImage: `url('${latestProject.imageUrl}')` }}
                                                ></div>
                                                <div className="relative w-full h-full flex items-center justify-center">
                                                    <img 
                                                        src={latestProject.imageUrl} 
                                                        alt={latestProject.title} 
                                                        className="max-w-full max-h-full object-contain"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Link>
                                <div className="mt-2">
                                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
                                        {latestProject.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
