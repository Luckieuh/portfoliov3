'use client';

import Link from 'next/link';
import { getYoutubeThumbnail } from '@/lib/youtube';

type Realisation = {
  id: number;
  title: string;
  description: string;
  images: Array<{ id: number; url: string }>;
  videoUrl: string | null;
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
  createdAt: Date;
  youtubeUrl: string | null;
  location: string | null;
  link: string | null;
};

type RecentRealisationsProps = {
  realisations: Realisation[];
};

export default function RecentRealisations({ realisations }: RecentRealisationsProps) {
  return (
    <div className="w-full flex justify-center mt-15 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-[85%] max-w-6xl px-4">
        {realisations.map((realisation) => (
          <Link key={realisation.id} href={`/realisations/${realisation.id}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border-[2px] hover:scale-110 transition-all duration-400 ease-[cubic-bezier(.55,.12,.56,.9)] dark:bg-neutral-800 shadow-lg">
              <div className="relative w-full aspect-video bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                {realisation.youtubeUrl ? (
                  // Miniature YouTube
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                      style={{ backgroundImage: `url('${getYoutubeThumbnail(realisation.youtubeUrl)}')` }}
                    ></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={getYoutubeThumbnail(realisation.youtubeUrl) || ''} 
                        alt={realisation.title}
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
                ) : realisation.images.length > 0 ? (
                  <>
                    {/* Cas 1: Une seule image avec flou en arrière-plan */}
                    {realisation.images.length === 1 && (
                      <>
                        <div 
                          className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                          style={{ backgroundImage: `url('${realisation.images[0].url}')` }}
                        ></div>
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src={realisation.images[0].url} 
                            alt={realisation.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </>
                    )}

                    {/* Cas 2: Deux images */}
                    {realisation.images.length === 2 && (
                      <div className="relative w-full h-full grid grid-cols-2 gap-1">
                        {realisation.images.map((img) => (
                          <div key={img.id} className="relative flex items-center justify-center bg-neutral-900">
                            <img 
                              src={img.url} 
                              alt={realisation.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cas 3: Trois ou plus images - Layout 1x2 (1 à gauche, 2 à droite en colonne) */}
                    {realisation.images.length >= 3 && (
                      <div className="relative w-full h-full grid grid-cols-3 gap-1">
                        {/* Image gauche prenant toute la hauteur */}
                        <div className="col-span-2 row-span-2 relative flex items-center justify-center bg-neutral-900">
                          <img 
                            src={realisation.images[0].url} 
                            alt={realisation.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {/* Colonne droite avec 2 images en hauteur */}
                        <div className="col-span-1 row-span-2 flex flex-col gap-1">
                          {realisation.images.slice(1, 3).map((img) => (
                            <div key={img.id} className="relative flex-1 flex items-center justify-center bg-neutral-900">
                              <img 
                                src={img.url} 
                                alt={realisation.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : realisation.videoUrl ? (
                  <video 
                    src={realisation.videoUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    muted
                    loop
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800">
                    <span className="text-neutral-600 dark:text-neutral-300">Pas de contenu</span>
                  </div>
                )}
              </div>
              <div className="mt-2 p-2 rounded-b-lg">
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white duration-500 dark:group-hover:text-orange-500 group-hover:text-orange-500 transition-colors">
                  {realisation.title}
                </h3>
                <p className="group-hover:text-orange-400 dark:group-hover:text-orange-200 duration-300">
                  {realisation.description}
                </p>
                  <div className="flex items-end justify-between gap-2 min-h-[40px]">
                      
                      
                      {/* Mots-clés */}
                      {realisation.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                              {realisation.tags.map((tag) => (
                                  <span 
                                      key={tag.id}
                                      className="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-600 group-hover:bg-orange-500 dark:group-hover:bg-orange-800 border-1 border-neutral-600 dark:group-hover:border-orange-400 group-hover:border-orange-600 transition-colors dark:border-white text-neutral-600 dark:group-hover:text-orange-400 group-hover:text-neutral-200 dark:text-white rounded-full"
                                  >
                                      {tag.name}
                                  </span>
                              ))}
                          </div>
                      )}
                          
                      
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap ml-auto">
                          {new Date(realisation.createdAt).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                          })}
                      </span>
                  </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
