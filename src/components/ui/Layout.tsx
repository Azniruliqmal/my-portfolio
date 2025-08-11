import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="min-h-screen w-full bg-neutral-950 bg-hero-gradient bg-[length:200%_200%] animate-gradient text-neutral-100 relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.15),transparent_60%)]" />
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md/30 border-b border-white/10 bg-black/30">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#" className="font-display text-lg font-bold tracking-tight">AI<span className="text-brand-400">.</span></a>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#projects" className="hover:text-brand-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-brand-400 transition-colors">Experience</a>
            <a href="#about" className="hover:text-brand-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-brand-400 transition-colors">Contact</a>
            {/*<ThemeToggle />*/}
            
          </div>
        </nav>
      </header>
      <main className="pt-24">{mounted && <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>{children}</motion.div>}</main>
      <footer className="relative z-10 mt-32 border-t border-white/10 py-10 text-center text-xs text-neutral-400">© {new Date().getFullYear()} Aznirul Iqmal. Crafted with React & Tailwind.</footer>
    </div>
  );
};
