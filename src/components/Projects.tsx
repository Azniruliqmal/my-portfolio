import { motion, AnimatePresence } from 'framer-motion';
import data from '../content/projects.json';
import { useState, useMemo } from 'react';

type P = typeof data.projects[number];

const tabs: { key: string; label: string; icon: string }[] = [
  { key: 'uiux', label: 'UI/UX Design', icon: '🧩' },
  { key: 'app', label: 'App Projects', icon: '</>' },
  { key: 'multimedia', label: 'Multimedia', icon: '🎬' },
];

export const Projects = () => {
  const [active, setActive] = useState<string>('uiux');
  const filtered = useMemo(() => data.projects.filter(p => p.category === active), [active]);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">My Projects</h2>
        <p className="mt-3 text-sm md:text-base text-neutral-400 max-w-2xl mx-auto">A selection of my work across different domains.</p>
        <div className="mt-4 h-0.5 w-24 mx-auto bg-cyan-400/90 rounded-full" />
      </div>
      {/* Tabs */}
      <div className="relative mb-14 flex justify-center w-full">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2 py-2 backdrop-blur-md border border-white/10">
          {tabs.map(t => {
            const activeTab = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${activeTab ? 'text-neutral-900 dark:text-white' : 'text-neutral-300 hover:text-white'}`}
              >
                {activeTab && (
                  <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-full bg-cyan-400/90 text-neutral-900 dark:text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" transition={{type:'spring', stiffness:380, damping:30}} />
                )}
                <span className="relative z-10 text-base leading-none">
                  {t.icon}
                </span>
                <span className="relative z-10 hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{opacity:0, y:10}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-10}}
            transition={{duration:0.35}}
          className="grid gap-8 md:grid-cols-3"
        >
          {filtered.map((p: P, i: number) => (
            <motion.div
              key={p.title}
              initial={{opacity:0, y:20}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:0.4}}
              transition={{delay:i*0.05, duration:0.5}}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-xl hover:border-white/20"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.15),transparent_60%)]" />
              <div className="relative z-10">
                <h3 className="font-semibold text-xl tracking-tight mb-4">{p.title}</h3>
                {p.subtitle && <p className="font-medium text-sm text-neutral-200 mb-2">{p.subtitle}</p>}
                <p className="text-sm text-neutral-400 mb-6 line-clamp-3">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(t => <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-wide text-neutral-400 group-hover:bg-white/10">{t}</span>)}
                </div>
              </div>
              <div className="relative z-10 mt-auto pt-2">
                <a href={p.url} className="text-cyan-300 text-sm font-medium inline-flex items-center gap-1 hover:text-cyan-200">View Details →</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
