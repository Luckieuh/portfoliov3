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
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-20">

      <BtnShadow
          bgColor=''
          borderColor='#FF8904'
          img=''
          text='← Retour aux réalisations'
          textColor='#FFFFFF'
          link='/realisations'
        />
      <div className="flex flex-col lg:flex-row justify-center w-full space-x-6">

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
          <h1 className="text-5xl font-bold text-neutral-800 dark:text-white mb-4 cursor-default">
            {project.title}
          </h1>

          {project.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 cursor-default">
                  {project.categories.map((category, idx) => (
                      <span 
                          key={idx}
                          className="px-3 py-1 text-xs font-medium border-1 border-white text-white rounded-full"
                      >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                  ))}
              </div>
          )}

          <p className="text-3xl text-neutral-600 dark:text-neutral-300 mb-6 cursor-default">
            {project.description}
          </p>

          <div className='flex w-full lg:w-[75%] justify-between text-2xl border-b border-orange-400 mb-4'>
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

          <div className='flex w-full lg:w-[75%] justify-between text-2xl border-b border-orange-400 mb-4'>
            <p className='font-bold'>
              Lieu :
            </p>
            {project.location ? (
              <a 
                href={`https://www.google.com/maps/search/${encodeURIComponent(project.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-200 hover:text-orange-400 transition-colors"
              >
                {project.location}
              </a>
            ) : (
              <p className="text-neutral-500">-</p>
            )}
          </div>

        </div>
        





        {project.link && (
          <a 
            href={project.link}
            className="inline-block bg-orange-400 text-white px-6 py-3 rounded-full hover:bg-orange-500 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le projet →
          </a>
        )}


      </div>

    </div>
    <div className='relative w-full bottom-0'>
      <Footer />
    </div>
  </div>
  );
}
