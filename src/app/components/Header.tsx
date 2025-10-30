'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';
import ThemeToggle from './ThemeToggle';
import Silk from './Silk';

const menuItems = [
  { label: 'Accueil', ariaLabel: "Aller à la page d'accueil", link: '/' },
  { label: 'Projets', ariaLabel: 'Voir mes réalisations', link: '/realisations' },
  { label: 'A propos', ariaLabel: 'En apprendre plus sur moi', link: '/a-propos' },
];

const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Instagram', link: 'https://www.instagram.com/lucsar.tsn/' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/lucas-thomassin-7ba03634a/' },
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  isCompact?: boolean;
  onHover?: (ref: HTMLAnchorElement | null) => void;
  onHoverEnd?: () => void;
}

function NavLink({ href, children, isActive, isCompact, onHover, onHoverEnd }: NavLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a 
      ref={ref}
      href={href} 
      className={`relative transition-all duration-300 ${
        isCompact 
          ? 'p-1 px-3 text-lg' 
          : 'p-2 px-4 text-xl'
      } ${
        isActive 
          ? 'text-orange-400 link-glow text-shadow-lg/50 text-shadow-orange' 
          : 'text-black dark:text-white hover:text-orange-400'
      }`}
      onMouseEnter={() => onHover?.(ref.current)}
      onMouseLeave={() => onHoverEnd?.()}
    >
      {children}
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Si on a scrollé plus que 50px, activer le mode "compact"
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavHover = (element: HTMLAnchorElement | null) => {
    if (!element || !navContainerRef.current) return;

    const navRect = navContainerRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    setUnderlineStyle({
      left: elementRect.left - navRect.left + elementRect.width * 0.05,
      width: elementRect.width * 0.9,
      opacity: 1,
    });
  };

  const handleNavHoverEnd = () => {
    setUnderlineStyle({ left: 0, width: 0, opacity: 0 });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`relative flex justify-between items-center h-[10vh] transition-all duration-300 overflow-hidden ${
        isScrolled 
          ? 'md:mt-3 md:px-6 md:mx-8 md:rounded-full md:backdrop-blur-md md:bg-white/50 md:dark:bg-neutral-700/50 md:shadow-lg' 
          : 'p-4'
      }`}>
        <a href="/" className="flex-shrink-0 relative z-10">
          {/* Logo en mode sombre (visible toujours en dark mode) */}
          <img 
            src="/white-logo.png" 
            alt="Logo" 
            className={`hidden md:dark:block transition-all duration-300 hover:cursor-pointer p-1 ${
              isScrolled 
                ? 'w-12 h-12' 
                : 'w-16 h-16'
            }`} 
          />
          
          {/* Logo clair sur page d'accueil (visible par défaut, disparaît au scroll) */}
          {pathname === '/' && (
            <img 
              src="/white-logo.png" 
              alt="Logo" 
              className={`hidden dark:hidden md:block transition-all duration-300 hover:cursor-pointer p-1 ${
                isScrolled 
                  ? 'opacity-0' 
                  : 'opacity-100'
              } ${
                isScrolled 
                  ? 'w-12 h-12' 
                  : 'w-16 h-16'
              }`} 
            />
          )}
          
          {/* Logo dark sur page d'accueil (invisible par défaut, visible au scroll) */}
          {pathname === '/' && (
            <img 
              src="/dark-logo.png" 
              alt="Logo" 
              className={`hidden dark:hidden md:block transition-all duration-300 hover:cursor-pointer p-1 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                isScrolled 
                  ? 'opacity-100' 
                  : 'opacity-0 pointer-events-none'
              } ${
                isScrolled 
                  ? 'w-12 h-12' 
                  : 'w-16 h-16'
              }`} 
            />
          )}
          
          {/* Logo dark sur autres pages */}
          {pathname !== '/' && (
            <img 
              src="/dark-logo.png" 
              alt="Logo" 
              className={`hidden dark:hidden md:block transition-all duration-300 hover:cursor-pointer p-1 ${
                isScrolled 
                  ? 'w-12 h-12' 
                  : 'w-16 h-16'
              }`} 
            />
          )}
        </a>
        <nav className="w-full h-full flex items-center relative z-10">
          <div className="sm:flex md:hidden w-full">
            <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              displaySocials={true}
              displayItemNumbering={false}
              menuButtonColor="#fff"
              openMenuButtonColor="#000"
              changeMenuColorOnOpen={true}
              colors={['#efcd9e', '#ffa127']}
              logoUrl="/white-logo.png"
              accentColor="#ffa127"
              onMenuOpen={() => console.log('Menu opened')}
              onMenuClose={() => console.log('Menu closed')}
              isFixed={true}
            />
          </div>
          <div 
            ref={navContainerRef}
            className={`hidden md:flex ml-auto transition-all duration-300 gap-3 items-center relative ${
              isScrolled 
                ? 'gap-2' 
                : 'gap-4'
            }`}
          >
            {/* Barre unique qui se déplace */}
            <div
              className="absolute bottom-0 h-[3px] bg-orange-400 rounded-full transition-all duration-300 pointer-events-none"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
                opacity: underlineStyle.opacity,
              }}
            />

            <NavLink 
              href="/" 
              isActive={pathname === '/'} 
              isCompact={isScrolled}
              onHover={handleNavHover}
              onHoverEnd={handleNavHoverEnd}
            >
              Accueil
            </NavLink>
            <NavLink 
              href="/realisations" 
              isActive={pathname === '/realisations'}
              isCompact={isScrolled}
              onHover={handleNavHover}
              onHoverEnd={handleNavHoverEnd}
            >
              Mes réalisations
            </NavLink>
            <NavLink 
              href="/a-propos" 
              isActive={pathname === '/a-propos'}
              isCompact={isScrolled}
              onHover={handleNavHover}
              onHoverEnd={handleNavHoverEnd}
            >
              A propos
            </NavLink>
            {/* <div className={`${isScrolled ? 'h-6' : 'h-8'} w-[3px] bg-neutral-700 dark:bg-white rounded-2xl transition-all duration-300`}></div> */}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}