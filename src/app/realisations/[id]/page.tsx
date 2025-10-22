import { notFound } from 'next/navigation';
import prisma from '../../../../lib/prisma';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BtnShadow from '@/app/components/BtnShadow';
import ImageCarousel from '@/app/components/ImageCarousel';

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
      <div className="">

        <h1 className="text-5xl font-bold text-neutral-800 dark:text-white mb-4">
          {project.title}
        </h1>

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

        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
          {project.description}
        </p>

        {/* Carousel d'images */}
        {project.images.length > 0 && (
          <ImageCarousel images={project.images} title={project.title} />
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
