'use client';

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface MediaInfoProps {
  title: string;
  description: string;
  createdAt: Date;
  location?: string | null;
  imageCount: number;
  videoCount: number;
  tags: Tag[];
  categories: Category[];
  projectLink?: string | null;
}

export default function MediaInfo({
  title,
  description,
  createdAt,
  location,
  imageCount,
  videoCount,
  tags,
  categories,
  projectLink,
}: MediaInfoProps) {
  const mediaType = videoCount > 0 ? 'Vidéo' : `${imageCount} image${imageCount > 1 ? 's' : ''}`;
  const createdDate = new Date(createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Titre et description */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Infos principales */}
      <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-lg space-y-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Date</p>
            <p className="text-neutral-800 dark:text-white font-medium">{createdDate}</p>
          </div>
        </div>

        {location && (
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Localisation</p>
              <p className="text-neutral-800 dark:text-white font-medium">{location}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Contenu</p>
            <p className="text-neutral-800 dark:text-white font-medium">{mediaType}</p>
          </div>
        </div>
      </div>

      {/* Catégories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-3 uppercase tracking-wide">
            Catégories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tags/Mots-clés */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-3 uppercase tracking-wide">
            Mots-clés
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bouton projet */}
      {projectLink && (
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
        >
          Voir le projet →
        </a>
      )}
    </div>
  );
}
