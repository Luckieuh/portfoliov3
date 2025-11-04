'use client';

import { useEffect, useRef } from 'react';
import { extractYoutubeId } from '../../lib/youtube';

type Props = {
  youtubeUrl?: string | null;
  onDuration: (duration: string | null) => void;
};

export default function YouTubeDuration({ youtubeUrl, onDuration }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!youtubeUrl) return;

    const videoId = extractYoutubeId(youtubeUrl);
    if (!videoId) {
      onDuration(null);
      return;
    }

    let mounted = true;

    const ensureYouTubeApi = () =>
      new Promise<void>((resolve) => {
        if (typeof window === 'undefined') return resolve();
        // @ts-ignore
        if (window.YT && window.YT.Player) return resolve();

        const existing = document.getElementById('youtube-iframe-api');
        if (existing) {
          const check = () => {
            // @ts-ignore
            if (window.YT && window.YT.Player) resolve();
            else setTimeout(check, 50);
          };
          check();
          return;
        }

        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.body.appendChild(script);

        // The API will call window.onYouTubeIframeAPIReady
        // Set a temporary hook to resolve when ready
        // @ts-ignore
        const prev = (window as any).onYouTubeIframeAPIReady;
        // @ts-ignore
        (window as any).onYouTubeIframeAPIReady = () => {
          if (typeof prev === 'function') prev();
          resolve();
        };
      });

    ensureYouTubeApi().then(() => {
      if (!mounted) return;
      try {
        // Create a hidden player to get duration
        const container = containerRef.current;
        if (!container) return;

        // Ensure a unique id
        const playerId = `yt-player-${videoId}-${Math.random().toString(36).slice(2, 8)}`;
        const div = document.createElement('div');
        div.id = playerId;
        div.style.position = 'absolute';
        div.style.width = '1px';
        div.style.height = '1px';
        div.style.left = '-9999px';
        div.style.top = '-9999px';
        container.appendChild(div);

        // @ts-ignore
        playerRef.current = new window.YT.Player(playerId, {
          videoId,
          events: {
            onReady: (event: any) => {
              try {
                const dur = event.target.getDuration();
                // Durée peut être 0 si l'info non disponible tout de suite -> attendre un peu
                if (dur && dur > 0) {
                  const formatted = formatSeconds(dur);
                  onDuration(formatted);
                } else {
                  // retry polling a few times
                  let attempts = 0;
                  const poll = () => {
                    attempts += 1;
                    const d = event.target.getDuration();
                    if (d && d > 0) {
                      onDuration(formatSeconds(d));
                    } else if (attempts < 10) {
                      setTimeout(poll, 300);
                    } else {
                      onDuration(null);
                    }
                  };
                  poll();
                }
              } catch (err) {
                onDuration(null);
              }
            },
            onError: () => onDuration(null),
          },
          playerVars: {
            // minimal footprint, do not show controls
            controls: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
          },
        });
      } catch (e) {
        onDuration(null);
      }
    });

    return () => {
      mounted = false;
      try {
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      } catch (e) {
        // ignore
      }
    };
  }, [youtubeUrl, onDuration]);

  return <div ref={containerRef} aria-hidden style={{ position: 'relative', width: 0, height: 0 }} />;
}

function formatSeconds(seconds: number): string {
  seconds = Math.floor(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
