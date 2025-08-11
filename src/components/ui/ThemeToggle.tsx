import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, [theme]);
  return (
    <button aria-label="Toggle theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="relative h-9 w-9 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden group">
      <AnimatePresence initial={false} mode="wait">
        <motion.span key={theme} initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} exit={{y:-10, opacity:0}} transition={{duration:0.25}} className="text-lg">
          {theme === 'dark' ? '🌙' : '☀️'}
        </motion.span>
      </AnimatePresence>
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};
