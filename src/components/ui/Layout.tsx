import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Scroll spy for active section
  const [active, setActive] = useState<string>('hero');
  useEffect(() => {
    const sectionIds = ['hero','about','projects','experience','contact'];
    const getActive = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // Offset so the nav updates slightly after section top passes
      const offset = scrollY + viewportHeight * 0.25; // 25% from top
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= offset) current = id; else break;
      }
      setActive(current);
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { getActive(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    getActive();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const links: { id: string; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-950 bg-hero-gradient bg-[length:200%_200%] animate-gradient text-neutral-100 relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.15),transparent_60%)]" />
      {/* Floating Glass Oval Header */}
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center px-2 sm:px-4">
        <nav className="relative flex items-center gap-0.5 sm:gap-1 rounded-full border border-white/15 bg-white/5/50 backdrop-blur-sm px-2.5 sm:px-5 py-1.5 sm:py-2 text-[12px] sm:text-sm shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-white/10 max-w-[calc(100%-1rem)] overflow-hidden">
          {/* decorative liquid sheen */}
          <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-40 mix-blend-overlay" />
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActive('hero');
              // update hash manually (optional)
              if (history.pushState) {
                history.pushState(null, '', '#hero');
              } else {
                window.location.hash = '#hero';
              }
            }}
            className="relative mr-1 sm:mr-2 pl-2 pr-2 sm:pr-3 py-1.5 font-display text-[16px] sm:text-[19px] font-semibold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 whitespace-nowrap"
          >
            Aznirul<span className="text-brand-400">.</span>
          </a>
          {links.map(link => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="relative rounded-full px-2.5 sm:px-3 py-1.5 font-medium text-neutral-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 whitespace-nowrap"
              >
                {isActive && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/15 backdrop-blur-lg shadow-inner" transition={{type:'spring', stiffness:320, damping:28}} />
                )}
                <span className={`relative z-10 mix-blend-normal ${isActive ? 'text-white font-semibold' : ''}`}>{link.label}</span>
              </a>
            );
          })}
          {/* Dot indicator between groups (optional removed) */}
          {/*<ThemeToggle />*/}
        </nav>

      </header>
      <main className="pt-32">{mounted && <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>{children}</motion.div>}</main>
      <footer className="relative z-10 mt-32 border-t border-white/10 py-10 text-center text-xs text-neutral-400">© {new Date().getFullYear()} This Portfolio belongs to Aznirul Iqmal. Crafted with React & Tailwind.</footer>
    </div>
  );
};
