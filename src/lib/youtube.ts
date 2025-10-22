/**
 * Extrait l'ID YouTube d'une URL YouTube
 * Supporte les formats:
 * - https://www.youtube.com/watch?v=VIDEOID
 * - https://youtu.be/VIDEOID
 * - https://www.youtube.com/embed/VIDEOID
 */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;

  try {
    // Format: https://www.youtube.com/watch?v=VIDEOID
    const match1 = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match1 && match1[1]) {
      return match1[1];
    }

    // Format: https://youtu.be/VIDEOID
    const match2 = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (match2 && match2[1]) {
      return match2[1];
    }

    // Si c'est déjà un ID valide
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return url;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Génère une URL d'embed YouTube
 */
export function getYoutubeEmbedUrl(url: string): string | null {
  const videoId = extractYoutubeId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}
