import { notFound } from 'next/navigation';
import prisma from '../../../../lib/prisma';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BtnShadow from '@/app/components/BtnShadow';

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
      <div className="">

        <h1 className="text-5xl font-bold text-neutral-800 dark:text-white mb-4">
          {project.title}
        </h1>
        
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
          {project.description}
        </p>

        {project.images && project.images.length > 0 && (
          <div className="mb-6">
            {project.images.map((image) => (
              <img 
                key={image.id}
                src={image.url} 
                alt={project.title}
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg mb-4"
              />
            ))}
          </div>
        )}

        {project.videoUrl && (
          <div className="mb-6">
            <video 
              src={project.videoUrl}
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
              controls
            />
          </div>
        )}

        {project.youtubeUrl && (
          <div className="mb-6">
            <iframe
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg aspect-video"
              src={project.youtubeUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

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

      <Footer />
    </div>
    </div>
  );
}
