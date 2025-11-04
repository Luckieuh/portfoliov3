'use client';

import { usePathname } from 'next/navigation';
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
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <a 
      href={href} 
      className={`relative p-2 px-4 text-xl transition-colors duration-300 ${
        isActive 
          ? 'text-orange-400 link-glow ' 
          : 'text-black dark:text-white hover:text-orange-400'
      }`}
    >
      {children}
      {isActive && (
      <span className="box-shadow-glow-orange absolute bottom-0 w-[90%] left-[5%] translate-x-1/2 h-[3px] bg-orange-400 rounded-full animate-fadeIn"></span>
      )}
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
    return (
        <header>
            <div className="absolute top-0 h-[10vh] left-0 right-0 flex justify-between items-center p-4 z-50">
              <a href="/">
                <img src="/white-logo.png" alt="Logo" className="hidden md:flex absolute top-2 w-16 h-16 hover:cursor-pointer" />
                <img src="/dark-logo.png" alt="Logo" className="dark:hidden md:flex absolute top-2 w-16 h-16 hover:cursor-pointer" />
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
                <div className="hidden md:flex absolute top-2 right-5 gap-4 items-center">
                    <NavLink href="/" isActive={pathname === '/'}>
                      Accueil
                    </NavLink>
                    <NavLink href="/realisations" isActive={pathname === '/realisations'}>
                      Mes réalisations
                    </NavLink>
                    <NavLink href="/a-propos" isActive={pathname === '/a-propos'}>
                      A propos
                    </NavLink>
                    <div className="w-[3px] bg-white rounded-2xl h-8"></div>
                    <ThemeToggle />
                 </div>
            </nav>
        </div>
        </header>
    );
}