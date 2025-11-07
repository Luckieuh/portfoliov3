import { notFound } from 'next/navigation';
import prisma from '../../../../lib/prisma';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BtnShadow from '@/app/components/BtnShadow';
import CarouselWrapper from '@/app/components/CarouselWrapper';
import RealisationInfoClient from '@/app/components/RealisationInfoClient';
import Link from 'next/link';

// Empêcher le prerendering statique (la page dépend de la BD)
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

export default async function RealisationDetail({ params }: Props) {
  const { id } = await params;
  
  const projectData = await prisma.realisations.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      title: true,
      description: true,
      videoUrl: true,
      youtubeUrl: true,
      link: true,
      location: true,
      createdAt: true,
      RealisationImage: {
        select: {
          id: true,
          url: true,
          position: true,
        },
        orderBy: { position: 'asc' },
      },
      Category: {
        select: {
          id: true,
          name: true,
        },
      },
      Tag: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!projectData) {
    notFound();
  }

  // Mapper les données pour correspondre au format attendu
  const project = {
    ...projectData,
    images: projectData.RealisationImage,
    categories: projectData.Category,
    tags: projectData.Tag,
  };

  // Récupérer 6 autres réalisations (exclure la current)
  const otherProjectsData = await prisma.realisations.findMany({
    where: {
      id: { not: parseInt(id) },
    },
    take: 6,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      youtubeUrl: true,
      RealisationImage: {
        select: {
          id: true,
          url: true,
        },
        take: 1,
        orderBy: { position: 'asc' },
      },
      Tag: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  // Mapper les données des autres projets
  const otherProjects = otherProjectsData.map((proj) => ({
    ...proj,
    images: proj.RealisationImage,
    tags: proj.Tag,
  }));

  return (
    <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100  overflow-x-hidden">
      <div className='w-full h-[8vh] bg-neutral-100 dark:bg-neutral-900'></div>
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-2">
        {/* Bouton retour */}
        <BtnShadow
          bgColor='#ff9b04d2'
          borderColor='#FF8904'
          img='/leave.svg'
          text='Retour aux réalisations'
          textColor='#FFFFFF'
          link='/realisations'
          classnamea='rounded-lg cursor-pointer'
        />

        <img className='absolute right-0 z-0 pointer-events-none opacity-50 scale-120 -top-[2%]' src="/realidDark.svg" alt="Wireframe" />

        {/* Layout 2 colonnes ÉQUILIBRÉES */}
        <div className="grid relative z-10 grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
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

          {/* COLONNE DROITE - Infos (50%) - rendu côté client pour mise à jour automatique de la durée YouTube */}
          <div>

            <RealisationInfoClient
              title={project.title}
              description={project.description}
              createdAt={project.createdAt}
              location={project.location}
              imageCount={project.images.length}
              videoCount={project.videoUrl || project.youtubeUrl ? 1 : 0}
              tags={project.tags}
              categories={project.categories}
              projectLink={project.link}
              youtubeUrl={project.youtubeUrl ?? null}
            />
          </div>
        </div>

        {/* AUTRES RÉALISATIONS */}
        {otherProjects.length > 0 && (
          <div className="mt-2">

            <img className='absolute  right-0 z-0 pointer-events-none opacity-50' src="/RealidDark2.svg" alt="Wireframe" />

            <div className="mb-8 flex justify-center z-10 relative">
              <img src="/otherReal.svg" alt="Voir d'autres réalisations" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
              {otherProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/realisations/${project.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg bg-neutral-300 dark:bg-neutral-700 aspect-video hover:scale-105 transition-transform duration-500">
                    {project.images.length > 0 ? (
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : project.youtubeUrl ? (
                      // Miniature YouTube
                      <img
                        src={`https://img.youtube.com/vi/${extractYoutubeId(project.youtubeUrl)}/hqdefault.jpg`}
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
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag.id}
                            className="bg-orange-400 text-white text-xs px-2 py-1 rounded"
                          >
                            {capitalize(tag.name)}
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
