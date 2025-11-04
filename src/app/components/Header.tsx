'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, forwardRef, useRef } from 'react';
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { label: 'Accueil', ariaLabel: "Aller à la page d'accueil", link: '/' },
  { label: 'A propos', ariaLabel: 'En apprendre plus sur moi', link: '/a-propos' },
  { label: 'Projets', ariaLabel: 'Voir mes réalisations', link: '/realisations' },
  { label: 'Contact', ariaLabel: 'Me contacter', link: '/contact' }
];

const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Instagram', link: 'https://www.instagram.com/lucsar.tsn/' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/lucas-thomassin-7ba03634a/' },
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onHover?: (href: string | null) => void;
  ref?: React.RefObject<HTMLAnchorElement>;
}

const NavLink = forwardRef<HTMLAnchorElement, Omit<NavLinkProps, 'ref'>>(
  ({ href, children, isActive, onHover }, ref) => {
    return (
      <a 
        ref={ref}
        href={href}
        onMouseEnter={() => onHover?.(href)}
        onMouseLeave={() => onHover?.(null)}
        className={`relative p-2 px-4 text-xl transition-colors duration-300 ${
          isActive 
            ? 'text-orange-400 link-glow ' 
            : 'text-black dark:text-white hover:text-orange-400'
        }`}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = 'NavLink';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [barStyle, setBarStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  
  const linkRefs = {
    '/': useRef<HTMLAnchorElement>(null),
    '/realisations': useRef<HTMLAnchorElement>(null),
    '/a-propos': useRef<HTMLAnchorElement>(null),
  };

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Déterminer quel ref utiliser (hover ou active)
    const targetHref = hoveredHref || pathname;
    const targetRef = linkRefs[targetHref as keyof typeof linkRefs];

    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const containerRect = targetRef.current.parentElement?.getBoundingClientRect();

      if (containerRect) {
        setBarStyle({
          left: rect.left - containerRect.left,
          width: rect.width,
        });
      }
    }
  }, [hoveredHref, pathname]);
    return (
        <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'top-4 mx-4 h-[10vh] bg-neutral-300/70 dark:bg-neutral-700/70 backdrop-blur-lg shadow-lg rounded-full p-4 items-center flex' 
            : 'top-0 mx-0 h-[10vh] bg-transparent'
        }`}>
            <div className={`absolute top-0 h-full left-0 right-0 flex justify-between items-center p-4
              ${isScrolled ? '' : 'bg-transparent'}`}>
              <a href="/">
                {/* Logo blanc - Affiché sur home sans scroll, ou sur autres pages, ou sur home au scroll en mode dark */}
                {(!isHomePage || (isHomePage && !isScrolled) || (isHomePage && isScrolled)) && (
                  <img 
                    src="/white-logo.png" 
                    alt="Logo" 
                    className={`hidden md:flex  hover:cursor-pointer transition-all duration-300 ${
                      isScrolled ? 'relative w-12 h-12' : 'relative top-2 w-16 h-16'
                    } ${
                      isHomePage && isScrolled ? 'dark:flex' : ''
                    }`} 
                  />
                )}
                {/* Logo dark - Affiché sur home au scroll uniquement en mode light */}
                {isHomePage && isScrolled && (
                  <img 
                    src="/dark-logo.png" 
                    alt="Logo" 
                    className={`hidden dark:hidden md:flex absolute top-2 hover:cursor-pointer transition-all duration-300 w-12 h-12`}
                  />
                )}
              </a>
            <nav>
                <div className="sm:flex md:hidden">
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
                <div className={`hidden md:flex right-5 items-center transition-all duration-300 relative
                  ${isScrolled ? 'gap-2' : 'gap-4'}`}>
                    <NavLink 
                      ref={linkRefs['/']} 
                      href="/" 
                      isActive={pathname === '/'} 
                      onHover={setHoveredHref}
                    >
                      Accueil
                    </NavLink>
                    <NavLink 
                      ref={linkRefs['/realisations']} 
                      href="/realisations" 
                      isActive={pathname === '/realisations'} 
                      onHover={setHoveredHref}
                    >
                      Mes réalisations
                    </NavLink>
                    <NavLink 
                      ref={linkRefs['/a-propos']} 
                      href="/a-propos" 
                      isActive={pathname === '/a-propos'} 
                      onHover={setHoveredHref}
                    >
                      A propos
                    </NavLink>
                    
                    {/* Barre dynamique qui s'adapte à la taille et position du lien */}
                    <div 
                      className="absolute bottom-0 h-[3px] bg-orange-400 rounded-full transition-all duration-300 pointer-events-none"
                      style={{
                        left: `${barStyle.left}px`,
                        width: `${barStyle.width}px`,
                      }}
                    />
                    
                    {/* <div className="w-[3px] mx-[5px] bg-white rounded-2xl h-8"></div> */}
                    <ThemeToggle />
                 </div>
            </nav>
        </div>
        </header>
    );
}