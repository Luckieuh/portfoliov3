import { notFound } from 'next/navigation';
import prisma from '../../../../lib/prisma';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BtnShadow from '@/app/components/BtnShadow';
import ImageCarousel from '@/app/components/ImageCarousel';
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from '@/lib/youtube';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RealisationDetail({ params }: Props) {
  const { id } = await params;
  
  const project = await prisma.realisation.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: {
        orderBy: { createdAt: 'asc' },
      },
      categories: true,
      tags: true,
    },
  });

  if (!project) {
    notFound();
  }

  // Récupérer 3 autres réalisations aléatoires
  const otherProjects = await prisma.realisation.findMany({
    where: {
      id: {
        not: parseInt(id),
      },
    },
    take: 3,
    include: {
      images: {
        take: 1,
      },
    },
  });

  return (
    <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 pt-[10vh] relative overflow-x-hidden">
      <Header />
      <img className='absolute right-0 top-[35vh] scale-115 z-0 pointer-events-none opacity-40 dark:opacity-60' src="/RealidDark.svg" alt="" />
      <div className="relative z-20">
        <div className="container mx-auto px-4 pb-8 pt-4">

          <div className='mb-6'>
            <BtnShadow
                bgColor='#ff8a04a1'
                borderColor='#FF8904'
                img='/leave.svg'
                text='Retour aux réalisations'
                textColor='#FFFFFF'
                link='/realisations'
              />
          </div>

      <div className="z-10 flex flex-col lg:flex-row justify-center w-full space-x-6">

        <div className='w-1/2 flex justify-center w-full'>
          {/* Lecteur YouTube (prioritaire et unique) */}
          {project.youtubeUrl && (
            <div className="mb-6 w-full">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={getYoutubeEmbedUrl(project.youtubeUrl) || ''}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Carousel d'images (si pas de YouTube) */}
          {!project.youtubeUrl && project.images.length > 0 && (
            <ImageCarousel images={project.images} title={project.title} />
          )}

          {/* Vidéo uploadée (si pas de YouTube et pas d'images) */}
          {!project.youtubeUrl && project.videoUrl && project.images.length === 0 && (
            <div className="mb-6">
              <video 
                src={project.videoUrl}
                className="w-full rounded-lg"
                controls
              />
            </div>
          )}
        </div>


        <div className='w-1/2 flex-col w-full'>
          <h1 className="text-5xl font-bold text-orange-400 mb-2 cursor-default mb-4 ">
            {project.title}
          </h1>

          {/* Mots-clés et bouton Instagram - juste sous le titre */}
          {project.tags.length > 0 || (!project.youtubeUrl && !project.videoUrl && project.images.length > 0) ? (
            <div className='w-full flex items-center gap-6 mb-6'>
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: any) => (
                    <span 
                      key={tag.id}
                      className="px-3 py-1 cursor-default text-md font-medium bg-orange-300 border-1 border-neutral-600 dark:border-orange-700 border-orange-600 text-neutral-600 dark:text-orange-600 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {!project.youtubeUrl && !project.videoUrl && project.images.length > 0 && (
                <div className=''>
                  <BtnShadow
                    bgColor='#5C1742'
                    borderColor='#FF00E5'
                    img='/Instagram.webp'
                    text='Voir Instagram'
                    textColor='#FF00E5'
                    link='https://www.instagram.com/lucsar.tsn/'
                  />
                </div>
              )}
            </div>
          ) : null}

          {project.youtubeUrl && (
              <div className='mb-6'>
                  <BtnShadow
                      bgColor='#FF0000'
                      borderColor='#FF0000'
                      img='/Youtube.svg'
                      text='Voir sur YouTube'
                      textColor='#FFFFFF'
                      link={project.youtubeUrl}
                  />
              </div>
          )}

          <div className='w-full flex items-end gap-3 border-b border-transparent mb-6'>
              <svg width="38" height="43" viewBox="0 0 38 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.75 5.30556H7.95044C5.4302 5.30556 4.16915 5.30556 3.20654 5.80208C2.35981 6.23884 1.6719 6.93524 1.24047 7.79243C0.75 8.76691 0.75 10.0435 0.75 12.5949V14.4167M9.75 5.30556H27.75M9.75 5.30556V0.75M27.75 5.30556H29.5504C32.0707 5.30556 33.329 5.30556 34.2916 5.80208C35.1384 6.23884 35.8286 6.93524 36.26 7.79243C36.75 8.76596 36.75 10.041 36.75 12.5874V14.4167M27.75 5.30556V0.75M0.75 14.4167V34.4616C0.75 37.0129 0.75 38.2879 1.24047 39.2624C1.6719 40.1196 2.35981 40.8172 3.20654 41.254C4.1682 41.75 5.42774 41.75 7.94305 41.75H29.557C32.0723 41.75 33.33 41.75 34.2916 41.254C35.1384 40.8172 35.8286 40.1196 36.26 39.2624C36.75 38.2889 36.75 37.0156 36.75 34.4693V14.4167M0.75 14.4167H36.75M27.75 32.6389H27.7545H27.7456L27.7412 32.6388L27.75 32.6389ZM18.75 32.6389H18.7545L18.7544 32.6434L18.7412 32.6388L18.75 32.6389ZM9.75 32.6389H9.7545L9.75439 32.6434L9.75 32.6433V32.6389ZM27.7544 23.5278H27.7456L27.7412 23.5277V23.5232L27.7544 23.5278ZM18.75 23.5278H18.7545L18.7544 23.5323L18.75 23.5322V23.5278ZM9.75 23.5278H9.7545H9.74561L9.75 23.5322V23.5278Z" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
                <div className='w-full lg:w-[75%] flex justify-between text-2xl border-b border-orange-400 pb-2'>
                  <p className='font-bold'>
                    Date :
                  </p>
                  <p>
                    {project.createdAt.toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </div>
            </div>

              {project.location && (
              <div className='w-full flex items-end gap-3 border-b border-transparent mb-6'>
                <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18.596" cy="18.5961" r="7.13846" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M36.4423 18.15C36.4423 32.65 18.5962 47.15 18.5962 47.15C18.5962 47.15 0.75 32.65 0.75 18.15C0.75 8.54025 8.73999 0.75 18.5962 0.75C28.4523 0.75 36.4423 8.54025 36.4423 18.15Z" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <div className='w-full lg:w-[75%] flex justify-between text-2xl border-b border-orange-400 pb-2'>
                  <p className='font-bold'>
                    Lieu :
                  </p>
                  <a 
                    href={`https://www.google.com/maps/search/${encodeURIComponent(project.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-200 hover:text-orange-400 transition-colors"
                  >
                    {project.location}
                  </a>
                </div>
            </div>
              )}

            <div className='w-full flex items-end gap-3 border-b border-transparent mb-6'>
                {project.youtubeUrl || project.videoUrl ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5V10H15M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                ) : (
                  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.75 3.75C0.75 2.09314 2.09315 0.75 3.75 0.75H27.0417C28.6985 0.75 30.0417 2.09315 30.0417 3.75V27.0417C30.0417 28.6985 28.6985 30.0417 27.0417 30.0417H3.75C2.09314 30.0417 0.75 28.6985 0.75 27.0417V3.75Z" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M37.7502 8.45834V34.75C37.7502 36.4069 36.407 37.75 34.7502 37.75H8.4585" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M0.75 20.175L9.21752 12.1888C9.60277 11.8254 10.2045 11.8254 10.5898 12.1888L17.2266 18.4483M17.2266 18.4483L22.948 13.0521C23.3333 12.6888 23.935 12.6888 24.3203 13.0521L30.0417 18.4483M17.2266 18.4483L21.3457 22.3333" stroke="#FF9000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                )}

                <div className='w-full lg:w-[75%] flex justify-between text-2xl border-b border-orange-400 pb-2'>
                  <p className='font-bold'>
                    {project.youtubeUrl ? 'Vidéo :' : project.videoUrl ? 'Vidéo :' : `Image${project.images.length !== 1 ? 's' : ''} :`}
                  </p>
                  <p>
                    {project.youtubeUrl ? 'YouTube' : project.videoUrl ? 'Vidéo' : `${project.images.length} image${project.images.length !== 1 ? 's' : ''}`}
                  </p>
                </div>

            </div>

                <h2 className="text-3xl font-extrabold dark:text-orange-400 mb-2 mt-6 cursor-default">
                  Description :
                </h2>
                  <p className="text-2xl text-neutral-600 dark:text-neutral-100 mb-6 cursor-default border-l border-orange-400 pl-2">
                    {project.description}
                  </p>
                </div>
            </div>
        </div>



      </div>
    <div className='relative w-full bottom-0 mt-8'>
      {/* Section "Voir d'autres réalisations" */}
      {otherProjects.length > 0 && (
        <div className='container mx-auto px-4 pb-16'>
          <div className="flex justify-center mb-8">
            <img className='dark:block hidden' src="/otherReal.svg" alt="Voir d'autres réalisations" />
            <img className='block dark:hidden ' src="/otherRealDark.svg" alt="Voir d'autres réalisations" />
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {otherProjects.map((otherProject: any) => (
              <a 
                key={otherProject.id}
                href={`/realisations/${otherProject.id}`}
                className='group h-72 rounded-lg overflow-hidden bg-neutral-300 dark:bg-neutral-800 hover:shadow-lg transition-shadow relative'
              >
                {otherProject.images.length > 0 && (
                  <img
                    src={otherProject.images[0].url}
                    alt={otherProject.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                )}
                
                {/* Overlay avec titre */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end'>
                  <div className='p-4 w-full'>
                    <h3 className='text-xl font-bold text-white'>
                      {otherProject.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  </div>
  );
}
