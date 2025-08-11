import { motion } from 'framer-motion';
import { LottieSparkle } from './LottieSparkle';

export const Hero = () => {
  return (
    <section id="hero" className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-start justify-center gap-10 px-6">
      <div className="absolute -top-10 left-1/2 h-[600px] w-[900px] -translate-x-1/2 animate-pulse-slow rounded-full bg-gradient-to-r from-brand-500/30 via-fuchsia-500/30 to-emerald-400/30 blur-3xl" />
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Available for freelance & full-time
        </div>
        <h1 className="font-display mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
          Product Designer & Creative Technologist
        </h1>
        <p className="mt-6 text-lg text-neutral-300">I craft delightful, accessible interfaces and immersive multimedia experiences bridging design, code and storytelling.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#projects" className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-7 py-3 font-medium text-white shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50">
            <span className="relative z-10">Explore Work</span>
            <span className="absolute inset-0 rounded-xl bg-white/0 opacity-0 transition group-hover:opacity-10" />
            <LottieSparkle className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3 font-medium text-white/90 backdrop-blur-md hover:border-white/25 hover:bg-white/10">Get in touch →</a>
        </div>
      </div>
    </section>
  );
};
