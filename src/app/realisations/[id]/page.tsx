import { notFound } from 'next/navigation';
import prisma from '../../../../lib/prisma';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BtnShadow from '@/app/components/BtnShadow';
import CarouselWrapper from '@/app/components/CarouselWrapper';
import MediaInfo from '@/app/components/MediaInfo';
import Link from 'next/link';

function extractYoutubeId(url: string): string | null {
  const regexps = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const regexp of regexps) {
    const match = url.match(regexp);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RealisationDetail({ params }: Props) {
  const { id } = await params;
  
  const project = await prisma.realisations.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: {
        orderBy: { position: 'asc' },
      },
      categories: true,
      tags: true,
    },
  });

  if (!project) {
    notFound();
  }

  // Récupérer 6 autres réalisations (exclure la current)
  const otherProjects = await prisma.realisations.findMany({
    where: {
      id: { not: parseInt(id) },
    },
    take: 6,
    include: {
      images: {
        take: 1,
        orderBy: { position: 'asc' },
      },
      categories: true,
    },
  });

  return (
    <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Bouton retour */}
        <BtnShadow
          bgColor='#ff9b04d2'
          borderColor='#FF8904'
          img='/leave.svg'
          text='Retour aux réalisations'
          textColor='#FFFFFF'
          link='/realisations'
          classnamea='rounded-lg'
        />

        {/* Layout 2 colonnes ÉQUILIBRÉES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* COLONNE GAUCHE - Média (50%) */}
          <div>
            {project.youtubeUrl ? (
              // Lecteur YouTube
              <div className="w-full rounded-lg shadow-lg overflow-hidden bg-black aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractYoutubeId(project.youtubeUrl)}`}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : project.videoUrl ? (
              // Lecteur vidéo
              <div className="w-full rounded-lg shadow-lg overflow-hidden bg-black aspect-video">
                <video 
                  src={project.videoUrl}
                  className="w-full h-full"
                  controls
                />
              </div>
            ) : project.images.length > 0 ? (
              // Carousel d'images avec fullscreen
              <CarouselWrapper 
                images={project.images}
                title={project.title}
              />
            ) : (
              // Aucun média
              <div className="w-full aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500 dark:text-neutral-400">Aucun média disponible</p>
              </div>
            )}
          </div>

          {/* COLONNE DROITE - Infos (50%) */}
          <div>
            <MediaInfo
              title={project.title}
              description={project.description}
              createdAt={project.createdAt}
              location={project.location}
              imageCount={project.images.length}
              videoCount={project.videoUrl ? 1 : 0}
              tags={project.tags}
              categories={project.categories}
              projectLink={project.link}
            />
          </div>
        </div>

        {/* AUTRES RÉALISATIONS */}
        {otherProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-8">
              Autres réalisations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/realisations/${project.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg h-48 bg-neutral-300 dark:bg-neutral-700">
                    {project.images.length > 0 ? (
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-neutral-500 dark:text-neutral-400">Pas d'image</p>
                      </div>
                    )}
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-lg">{project.title}</h3>
                      <div className="flex gap-2 mt-2">
                        {project.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat.id}
                            className="bg-orange-400 text-white text-xs px-2 py-1 rounded"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
