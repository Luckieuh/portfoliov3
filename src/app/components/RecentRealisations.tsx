'use client';

import Link from 'next/link';

type Realisation = {
  id: number;
  title: string;
  description: string;
  images: Array<{ id: number; url: string }>;
  videoUrl: string | null;
};

type RecentRealisationsProps = {
  realisations: Realisation[];
};

export default function RecentRealisations({ realisations }: RecentRealisationsProps) {
  return (
    <div className="w-full flex justify-center mt-15 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[85%] max-w-6xl px-4">
        {realisations.map((realisation) => (
          <Link key={realisation.id} href={`/realisations/${realisation.id}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg">
              <div className="relative w-full aspect-video bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                {realisation.images.length > 0 ? (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
                      style={{ backgroundImage: `url('${realisation.images[0].url}')` }}
                    ></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={realisation.images[0].url} 
                        alt={realisation.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
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
              <div className="mt-3 p-2">
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white truncate">
                  {realisation.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {realisation.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
