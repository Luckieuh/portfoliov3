export function getYoutubeThumbnail(youtubeUrl: string): string {
  try {
    // Extraire l'ID de la vidéo YouTube à partir de l'URL
    let videoId = '';
    
    if (youtubeUrl.includes('youtube.com/watch')) {
      const url = new URL(youtubeUrl);
      videoId = url.searchParams.get('v') || '';
    } else if (youtubeUrl.includes('youtu.be')) {
      videoId = youtubeUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (youtubeUrl.includes('youtube.com/embed')) {
      videoId = youtubeUrl.split('/embed/')[1]?.split('?')[0] || '';
    }
    
    if (!videoId) return '';
    
    // Retourner l'URL de la miniature YouTube
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch (error) {
    console.error('Erreur lors de l\'extraction de l\'ID YouTube:', error);
    return '';
  }
}

/**
 * Extrait l'ID YouTube d'une URL
 */
export function extractYoutubeId(url: string): string | null {
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
