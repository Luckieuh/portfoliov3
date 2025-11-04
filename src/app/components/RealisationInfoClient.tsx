'use client';

import React, { useState } from 'react';
import MediaInfo from './MediaInfo';
import YouTubeDuration from './YouTubeDuration';

type Tag = { id: number; name: string };
type Category = { id: number; name: string };

type Props = {
  title: string;
  description: string;
  createdAt: string | Date;
  location?: string | null;
  imageCount: number;
  videoCount: number;
  tags: Tag[];
  categories: Category[];
  projectLink?: string | null;
  youtubeUrl?: string | null;
};

export default function RealisationInfoClient({
  title,
  description,
  createdAt,
  location,
  imageCount,
  videoCount,
  tags,
  categories,
  projectLink,
  youtubeUrl,
}: Props) {
  const [videoDuration, setVideoDuration] = useState<string | null>(null);

  return (
    <>
      <MediaInfo
        title={title}
        description={description}
        createdAt={typeof createdAt === 'string' ? new Date(createdAt) : createdAt}
        location={location}
        imageCount={imageCount}
        videoCount={videoCount}
        tags={tags}
        categories={categories}
        projectLink={projectLink}
        videoDuration={videoDuration || undefined}
      />

      {/* Si c'est une vidéo YouTube, récupérer la durée côté client sans clé API */}
      {youtubeUrl && (
        <YouTubeDuration youtubeUrl={youtubeUrl} onDuration={(d) => setVideoDuration(d)} />
      )}
    </>
  );
}
