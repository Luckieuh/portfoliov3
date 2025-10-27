'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';
import ThemeToggle from './ThemeToggle';
import Silk from './Silk';

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
  isCompact?: boolean;
}

function NavLink({ href, children, isActive, isCompact }: NavLinkProps) {
  return (
    <a 
      href={href} 
      className={`relative transition-all duration-300 ${
        isCompact 
          ? 'p-1 px-3 text-lg' 
          : 'p-2 px-4 text-xl'
      } ${
        isActive 
          ? 'text-orange-400 link-glow ' 
          : 'text-black dark:text-white hover:text-orange-400'
      }`}
    >
      {children}
      {isActive && (
      <span className={`box-shadow-glow-orange absolute bottom-0 w-[90%] left-[5%] translate-x-1/2 rounded-full animate-fadeIn bg-orange-400 ${
        isCompact ? 'h-[2px]' : 'h-[3px]'
      }`}></span>
      )}
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Si on a scrollé plus que 50px, activer le mode "compact"
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`flex justify-between items-center h-[10vh] transition-all duration-300 ${
        isScrolled 
          ? 'mt-2 px-6 mx-2 rounded-full backdrop-blur-md bg-white/50 dark:bg-neutral-900/70 shadow-lg' 
          : 'p-4 backdrop-blur-sm bg-white/40 dark:bg-neutral-900/30'
      }`}>
        <a href="/" className="flex-shrink-0">
          <img 
            src="/white-logo.png" 
            alt="Logo" 
            className={`hidden dark:flex md:hidden dark:md:flex transition-all duration-300 hover:cursor-pointer p-1 ${
              isScrolled 
                ? 'w-12 h-12' 
                : 'w-16 h-16'
            }`} 
          />
          <img 
            src="/dark-logo.png" 
            alt="Logo" 
            className={`hidden dark:hidden md:flex transition-all duration-300 hover:cursor-pointer p-1 ${
              isScrolled 
                ? 'w-12 h-12' 
                : 'w-16 h-16'
            }`} 
          />
        </a>
        <nav className="w-full h-full flex items-center">
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
          <div className={`hidden md:flex ml-auto transition-all duration-300 gap-3 items-center ${
            isScrolled 
              ? 'gap-2' 
              : 'gap-4'
          }`}>
            <NavLink 
              href="/" 
              isActive={pathname === '/'} 
              isCompact={isScrolled}
            >
              Accueil
            </NavLink>
            <NavLink 
              href="/realisations" 
              isActive={pathname === '/realisations'}
              isCompact={isScrolled}
            >
              Mes réalisations
            </NavLink>
            <NavLink 
              href="/a-propos" 
              isActive={pathname === '/a-propos'}
              isCompact={isScrolled}
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