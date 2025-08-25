import { motion } from 'framer-motion';
import { LottieSparkle } from './LottieSparkle';
import { useState } from 'react';
import { Section, MotionFade } from './ui/Section';

export const Hero = () => {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [ctaGlow, setCtaGlow] = useState({ x: 50, y: 50, on: false });
  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };
  return (
    <Section id="hero" className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center text-center gap-10 px-6" once>
      {/* glow backdrop */}
      <div className="absolute -top-10 left-1/2 h-[600px] w-[900px] -translate-x-1/2 animate-pulse-slow rounded-full bg-gradient-to-r from-brand-500/30 via-fuchsia-500/30 to-emerald-400/30 blur-3xl" />
      <div className="relative z-10 max-w-6xl">
        <MotionFade>
          <h1 className="font-display mt-6 font-extrabold leading-[1.05] tracking-tight text-[clamp(2.25rem,6.5vw,5.25rem)]">
            <div
              className="relative inline-block group cursor-pointer select-none"
              onPointerMove={handlePointerMove}
            >
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-fuchsia-400 to-emerald-400 transition duration-300 text-[clamp(2.5rem,7vw,4.5rem)]"
                initial={{ filter: 'brightness(0.9)' }}
                whileHover={{ scale: 1.025, filter: 'brightness(1.15)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                AZNIRUL IQMAL
              </motion.span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-70"
                style={{
                  background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(96,165,250,0.8), rgba(217,70,239,0.5), rgba(16,185,129,0.35), transparent 70%)`
                }}
              />
            </div>
            <span className="block font-semibold mt-4 py-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 text-[clamp(1.25rem,3.2vw,3.25rem)]">
              Full-Stack Developer | Creative
            </span>
          </h1>
        </MotionFade>
        <MotionFade>
          <p className="mt-6 text-lg text-neutral-300"> Welcome to my humble portfolio site where I gather all the information about myself and showcase my work in crafting delightful experiences bridging design, code and storytelling.</p>
        </MotionFade>
        <MotionFade>
          <div className="mt-8 flex flex-wrap items-center py-10 gap-4 justify-center">
            <motion.a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-xl px-7 pr-3 py-3 font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                setCtaGlow({ x, y, on: true });
              }}
              onPointerLeave={() => setCtaGlow(g => ({ ...g, on: false }))}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-500 opacity-90" />
              <span
                className="absolute inset-0 rounded-xl opacity-0 mix-blend-screen transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at ${ctaGlow.x}% ${ctaGlow.y}%, rgba(255,255,255,0.55), rgba(255,255,255,0.15) 35%, transparent 60%)`,
                  filter: 'blur(12px)'
                }}
              />
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute -inset-1 translate-x-[-60%] group-hover:translate-x-[60%] h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-30 transition duration-700 ease-out" />
              </span>
              <span className="relative text-center z-10">Explore Work</span>
              <LottieSparkle className="relative z-10 h-6 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.a>
            <motion.a
              href="#contact"
              className="relative inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3 font-medium text-white/90 backdrop-blur-md hover:border-white/25 hover:bg-white/10 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.12), transparent 65%)' }} />
              <span className="relative z-10">Get in touch</span>
            </motion.a>
          </div>
        </MotionFade>
      </div>
    </Section>
  );
};
