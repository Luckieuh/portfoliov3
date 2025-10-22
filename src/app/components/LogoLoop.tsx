'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export type TextItem = {
  text: string;
  href?: string;
  title?: string;
};

export type SequenceItem = LogoItem | TextItem;

const isTextItem = (item: SequenceItem): item is TextItem => 'text' in item;

export interface LogoLoopProps {
  logos?: LogoItem[];
  items?: SequenceItem[];
  starIcon?: string;
  speed?: number;
  direction?: 'left' | 'right';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  textClassName?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const useResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]);
};

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    items,
    starIcon = '/star.svg',
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = 'Partner logos',
    className,
    textClassName,
    style
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Utiliser items si fournis, sinon utiliser logos pour compatibilité rétroactive
    const itemsToRender = items || logos || [];

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = direction === 'left' ? 1 : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, []);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [itemsToRender, gap, logoHeight]);

    useImageLoader(seqRef, updateDimensions, [itemsToRender, gap, logoHeight]);

    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

    const cssVariables = useMemo(
      () =>
        ({
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logoHeight': `${logoHeight}px`,
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
        }) as React.CSSProperties,
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          'relative overflow-x-hidden group',
          '[--logoloop-gap:32px]',
          '[--logoloop-logoHeight:28px]',
          '[--logoloop-fadeColorAuto:#ffffff]',
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
          className
        ),
      [scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsHovered(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

    const renderLogoItem = useCallback(
      (item: SequenceItem, key: React.Key) => {
        // Si c'est un item texte
        if (isTextItem(item)) {
          const textContent = (
            <span
              className={cx(
                'inline-flex items-center px-2 font-medium',
                'motion-reduce:transition-none',
                scaleOnHover &&
                  'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120',
                textClassName || 'text-sm sm:text-base'
              )}
            >
              {item.text}
            </span>
          );

          const textInner = item.href ? (
            <a
              className={cx(
                'inline-flex items-center no-underline rounded',
                'transition-opacity duration-200 ease-linear',
                'hover:opacity-80',
                'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
              )}
              href={item.href}
              title={item.title}
              target="_blank"
              rel="noreferrer noopener"
            >
              {textContent}
            </a>
          ) : (
            textContent
          );

          return (
            <li
              className={cx(
                'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',
                scaleOnHover && 'overflow-visible group/item'
              )}
              key={key}
              role="listitem"
            >
              {textInner}
            </li>
          );
        }

        // Si c'est un item logo/image
        const logoItem = item as LogoItem;
        const isNodeItem = 'node' in logoItem;

        const content = isNodeItem ? (
          <span
            className={cx(
              'inline-flex items-center',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            aria-hidden={!!(logoItem as any).href && !(logoItem as any).ariaLabel}
          >
            {(logoItem as any).node}
          </span>
        ) : (
          <img
            className={cx(
              'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
              '[-webkit-user-drag:none] pointer-events-none',
              '[image-rendering:-webkit-optimize-contrast]',
              'motion-reduce:transition-none',
              scaleOnHover &&
                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120'
            )}
            src={(logoItem as any).src}
            srcSet={(logoItem as any).srcSet}
            sizes={(logoItem as any).sizes}
            width={(logoItem as any).width}
            height={(logoItem as any).height}
            alt={(logoItem as any).alt ?? ''}
            title={(logoItem as any).title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem
          ? ((logoItem as any).ariaLabel ?? (logoItem as any).title)
          : ((logoItem as any).alt ?? (logoItem as any).title);

        const inner = (logoItem as any).href ? (
          <a
            className={cx(
              'inline-flex items-center no-underline rounded',
              'transition-opacity duration-200 ease-linear',
              'hover:opacity-80',
              'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
            )}
            href={(logoItem as any).href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <li
            className={cx(
              'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',
              scaleOnHover && 'overflow-visible group/item'
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [scaleOnHover, textClassName]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => {
          // Créer une liste avec les items et les étoiles entre chaque item texte consécutif
          const itemsWithStars: React.ReactNode[] = [];
          itemsToRender.forEach((item, itemIndex) => {
            itemsWithStars.push(renderLogoItem(item, `${copyIndex}-${itemIndex}`));

            // Ajouter une étoile après un item texte seulement si le prochain item est aussi du texte
            if (
              isTextItem(item) &&
              itemIndex < itemsToRender.length - 1 &&
              isTextItem(itemsToRender[itemIndex + 1])
            ) {
              itemsWithStars.push(
                <li
                  className={cx(
                    'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',
                    scaleOnHover && 'overflow-visible group/item'
                  )}
                  key={`${copyIndex}-star-${itemIndex}`}
                  role="listitem"
                  aria-hidden={true}
                >
                  <img
                    className={cx(
                      'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
                      '[-webkit-user-drag:none] pointer-events-none',
                      '[image-rendering:-webkit-optimize-contrast]',
                      'motion-reduce:transition-none',
                      scaleOnHover &&
                        'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110',
                      'opacity-60'
                    )}
                    src={starIcon}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </li>
              );
            }
          });

          return (
            <ul
              className="flex items-center"
              key={`copy-${copyIndex}`}
              role="list"
              aria-hidden={copyIndex > 0}
              ref={copyIndex === 0 ? seqRef : undefined}
            >
              {itemsWithStars}
            </ul>
          );
        }),
      [copyCount, itemsToRender, renderLogoItem, scaleOnHover, starIcon]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: toCssLength(width) ?? '100%',
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style]
    );

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            <div
              aria-hidden
              className={cx(
                'pointer-events-none absolute inset-y-0 left-0 z-[1]',
                'w-[clamp(24px,8%,120px)]',
                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
              )}
            />
            <div
              aria-hidden
              className={cx(
                'pointer-events-none absolute inset-y-0 right-0 z-[1]',
                'w-[clamp(24px,8%,120px)]',
                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
              )}
            />
          </>
        )}

        <div
          className={cx('flex w-max will-change-transform select-none', 'motion-reduce:transform-none')}
          ref={trackRef}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
