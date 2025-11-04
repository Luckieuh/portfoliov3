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
  videoDuration?: string | null;
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
  videoDuration,
}: MediaInfoProps) {
  // Déterminer le type de contenu
  const hasVideo = videoCount > 0;
  const hasImages = imageCount > 0;
  
  // Adapter le libellé et la valeur selon le type de contenu
  let contentLabel = 'Contenu';
  let contentValue = '';
  
  if (hasVideo) {
    contentLabel = 'Durée';
    contentValue = videoDuration || 'N/A';
  } else if (hasImages) {
    contentLabel = 'Contenu';
    contentValue = `${imageCount} image${imageCount > 1 ? 's' : ''}`;
  } else {
    contentLabel = 'Contenu';
    contentValue = 'Aucun contenu';
  }

  const createdDate = new Date(createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Fonction pour capitaliser la première lettre
  const capitalize = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-3">
      {/* Titre et description */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-white">
          {title}
        </h1>

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

      {/* Boutons réseaux sociaux selon le type de contenu */}
      <div className="flex gap-4">
        {hasVideo ? (
          // Bouton YouTube
            <a href="https://www.youtube.com/@LucsarTsn" className="group cursor-pointer w-fit h-fit relative py-1 items-center justify-center overflow-hidden rounded-lg border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default" style={{ backgroundColor: '#db0700d0', borderColor: '#b30e08ff', color: '#FFFFFF' }}>
              <img src='/Youtube.svg' className='h-5 mb-1 inline-block mr-2 scale-90' alt='Youtube'/>
              Youtube
              <svg className="ml-[5px]" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.56005 1.5H9.07045L0.219668 11.061C0.097918 11.1828 0.0267781 11.336 0.00624806 11.4945C0.00207806 11.5266 -1.84774e-06 11.559 -1.84774e-06 11.5914C-1.84774e-06 11.7833 0.073218 11.9753 0.219668 12.1217C0.512558 12.4146 0.987428 12.4146 1.28033 12.1217L10.1312 2.56065V7.07101C10.1312 7.48531 10.467 7.82101 10.8812 7.82101C11.2954 7.82101 11.6312 7.48531 11.6312 7.07101V0.74999C11.6312 0.33578 11.2954 0 10.8812 0H4.56005C4.48235 0 4.40745 0.0118 4.33705 0.03371C4.03175 0.12867 3.81005 0.41345 3.81005 0.75C3.81005 0.77588 3.81135 0.80147 3.81395 0.82668C3.85235 1.20487 4.17175 1.5 4.56005 1.5Z" fill="white"/>
              </svg>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </a>
        ) : hasImages ? (
          // Bouton Instagram
            <a href="https://www.instagram.com/lucsar.tsn/" className="group cursor-pointer w-fit h-fit relative py-1 items-center justify-center overflow-hidden rounded-lg border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default" style={{ backgroundColor: '#5C1742', borderColor: '#FF00E5', color: '#FF00E5' }}>
              <img src='/Instagram.webp' className='h-5 mb-1 inline-block mr-2' alt='Instagram'/>
              Instagram
              <svg className="ml-[5px]" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.56005 1.5H9.07045L0.219668 11.061C0.097918 11.1828 0.0267781 11.336 0.00624806 11.4945C0.00207806 11.5266 -1.84774e-06 11.559 -1.84774e-06 11.5914C-1.84774e-06 11.7833 0.073218 11.9753 0.219668 12.1217C0.512558 12.4146 0.987428 12.4146 1.28033 12.1217L10.1312 2.56065V7.07101C10.1312 7.48531 10.467 7.82101 10.8812 7.82101C11.2954 7.82101 11.6312 7.48531 11.6312 7.07101V0.74999C11.6312 0.33578 11.2954 0 10.8812 0H4.56005C4.48235 0 4.40745 0.0118 4.33705 0.03371C4.03175 0.12867 3.81005 0.41345 3.81005 0.75C3.81005 0.77588 3.81135 0.80147 3.81395 0.82668C3.85235 1.20487 4.17175 1.5 4.56005 1.5Z" fill="#FF00E5"/>
              </svg>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </a>
        ) : null}
      </div>
      </div>

      {/* Catégories */}
      {categories.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium"
              >
                {capitalize(tag.name)}
              </span>
            ))}
          </div>
        </div>
      )}      

      {/* Infos principales */}
      <div className="space-y-4">

      {/* Localisation */}
        {location && (
          <div className="flex items-center gap-3">
            <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18.596" cy="18.5961" r="7.13846" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M36.4423 18.15C36.4423 32.65 18.5962 47.15 18.5962 47.15C18.5962 47.15 0.75 32.65 0.75 18.15C0.75 8.54025 8.73999 0.75 18.5962 0.75C28.4523 0.75 36.4423 8.54025 36.4423 18.15Z" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="flex justify-between w-full items-end border-b border-orange-400">
              <p className="text-4xl text-neutral-500 dark:text-neutral-200 font-bold">Localisation</p>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors cursor-pointer"
              >
                {location}
              </a>
            </div>
          </div>
        )}

        <div className="flex gap-3 items-center">
            <svg width="38" height="43" viewBox="0 0 38 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.75 5.30556H7.95044C5.4302 5.30556 4.16915 5.30556 3.20654 5.80208C2.35981 6.23884 1.6719 6.93524 1.24047 7.79243C0.75 8.76691 0.75 10.0435 0.75 12.5949V14.4167M9.75 5.30556H27.75M9.75 5.30556V0.75M27.75 5.30556H29.5504C32.0707 5.30556 33.329 5.30556 34.2916 5.80208C35.1384 6.23884 35.8286 6.93524 36.26 7.79243C36.75 8.76596 36.75 10.041 36.75 12.5874V14.4167M27.75 5.30556V0.75M0.75 14.4167V34.4616C0.75 37.0129 0.75 38.2879 1.24047 39.2624C1.6719 40.1196 2.35981 40.8172 3.20654 41.254C4.1682 41.75 5.42774 41.75 7.94305 41.75H29.557C32.0723 41.75 33.33 41.75 34.2916 41.254C35.1384 40.8172 35.8286 40.1196 36.26 39.2624C36.75 38.2889 36.75 37.0156 36.75 34.4693V14.4167M0.75 14.4167H36.75M27.75 32.6389H27.7545H27.7456L27.7412 32.6388L27.75 32.6389ZM18.75 32.6389H18.7545L18.7544 32.6434L18.7412 32.6388L18.75 32.6389ZM9.75 32.6389H9.7545L9.75439 32.6434L9.75 32.6433V32.6389ZM27.7544 23.5278H27.7456L27.7412 23.5277V23.5232L27.7544 23.5278ZM18.75 23.5278H18.7545L18.7544 23.5323L18.75 23.5322V23.5278ZM9.75 23.5278H9.7545H9.74561L9.75 23.5322V23.5278Z" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          <div className="flex justify-between w-full items-end border-b border-orange-400">
            <p className="text-4xl text-neutral-500 dark:text-neutral-200 font-bold">Date</p>
            <p className="text-3xl text-neutral-800 dark:text-white">{createdDate}</p>
          </div>
        </div>




        <div className="flex items-center gap-3">
            {hasVideo ? (
              // SVG vidéo (play button)
            <svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.3348 7.91796C33.7253 7.5276 34.3584 7.52749 34.7489 7.91796C35.1392 8.30845 35.1392 8.94154 34.7489 9.33203L32.2069 11.874C31.8164 12.2643 31.1833 12.2643 30.7928 11.874C30.4023 11.4835 30.4025 10.8505 30.7928 10.46L33.3348 7.91796Z" fill="#FF9000"/>
              <path d="M23.875 0C24.4271 0.000175712 24.875 0.447824 24.875 1C24.875 1.55218 24.4271 1.99982 23.875 2H13.708C13.1557 2 12.708 1.55228 12.708 1C12.708 0.447715 13.1557 0 13.708 0H23.875Z" fill="#FF9000"/>
              <path d="M35.583 26.417C35.583 17.1433 28.0656 9.62518 18.792 9.625C9.51821 9.625 2 17.1432 2 26.417C2.00018 35.6906 9.51832 43.208 18.792 43.208C28.0655 43.2078 35.5828 35.6905 35.583 26.417ZM37.583 26.417C37.5828 36.7951 29.1701 45.2078 18.792 45.208C8.41375 45.208 0.000176266 36.7952 0 26.417C0 16.0386 8.41364 7.625 18.792 7.625C29.1702 7.62518 37.583 16.0388 37.583 26.417Z" fill="#FF9000"/>
              <path d="M17.7915 26.4167V18.7917C17.7915 18.2394 18.2392 17.7917 18.7915 17.7917C19.3438 17.7917 19.7915 18.2394 19.7915 18.7917V26.4167C19.7915 26.9689 19.3438 27.4167 18.7915 27.4167C18.2392 27.4167 17.7915 26.9689 17.7915 26.4167Z" fill="#FF9000"/>
            </svg>
            ) : (
              // SVG image (photos)
              <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 3.75C0.75 2.09314 2.09315 0.75 3.75 0.75H27.0417C28.6985 0.75 30.0417 2.09315 30.0417 3.75V27.0417C30.0417 28.6985 28.6985 30.0417 27.0417 30.0417H3.75C2.09314 30.0417 0.75 28.6985 0.75 27.0417V3.75Z" stroke="#FF9000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M37.7502 8.45831V34.75C37.7502 36.4068 36.407 37.75 34.7502 37.75H8.4585" stroke="#FF9000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M0.75 20.175L9.21752 12.1888C9.60277 11.8254 10.2045 11.8254 10.5898 12.1888L17.2266 18.4483M17.2266 18.4483L22.948 13.0521C23.3333 12.6888 23.935 12.6888 24.3203 13.0521L30.0417 18.4483M17.2266 18.4483L21.3457 22.3333" stroke="#FF9000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          <div className="flex justify-between w-full items-end border-b border-orange-400">
            <p className="text-4xl text-neutral-500 dark:text-neutral-200 font-bold">{contentLabel}</p>
            <p className="text-3xl text-neutral-800 dark:text-white">{contentValue}</p>
          </div>
        </div>
      </div>

        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {description}
        </p>



      
    </div>
  );
}
