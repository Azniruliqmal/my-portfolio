import { motion } from 'framer-motion';
import data from '../content/projects.json';
import { useState } from 'react';

type P = typeof data.projects[number] & { video?: string; poster?: string };

// Single project card with optional video playback
const ProjectCard: React.FC<{ project: P; index: number }> = ({ project: p, index }) => {
  const [playing, setPlaying] = useState(false);
  const hasVideo = !!p.video;
  return (
    <motion.div
      key={p.title}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.05, duration: 0.55 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl hover:border-white/20"
    >
      {/* Media area */}
      <div className="relative h-40 w-full flex items-center justify-center border-b border-white/10 overflow-hidden bg-white/5">
        {hasVideo ? (
          <>
            {playing ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={p.video}
                poster={p.poster}
                autoPlay
                controls
                playsInline
                onEnded={() => setPlaying(false)}
                preload="metadata"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-inner transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                aria-label={`Play video preview for ${p.title}`}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </button>
            )}
            {/* Hover / idle gradient */}
            <div className={`absolute inset-0 transition duration-500 ${playing ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.18),transparent_65%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_65%)]`}/>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.18),transparent_65%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_65%)]" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-inner">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </>
        )}
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_60%)]" />
        <div className="relative z-10 mb-4">
          <h3 className="font-semibold text-xl tracking-tight mb-2">{p.title}</h3>
          {p.subtitle && <p className="font-medium text-[13px] text-neutral-200 mb-2">{p.subtitle}</p>}
          <p className="text-sm text-neutral-400 mb-5 line-clamp-4">{p.description}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map(t => <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-wide text-neutral-400 group-hover:bg-white/10">{t}</span>)}
          </div>
        </div>
        {/* Actions */}
        <div className="relative z-10 mt-auto flex flex-wrap gap-3 pt-2">
          <a
            href={p.url}
            className="inline-flex items-center gap-1 rounded-md bg-neutral-900/70 px-3 py-2 text-xs font-medium text-white shadow-sm ring-1 ring-white/10 hover:bg-neutral-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="m9 18 6-6-6-6"/><path d="M15 12H3"/><path d="M21 19V5"/></svg>
            View Code
          </a>
          <a
            href={p.url}
            className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const allProjects = data.projects as P[];

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">My Projects</h2>
        <p className="mt-3 text-sm md:text-base text-neutral-400 max-w-2xl mx-auto">Here are some of my recent projects that showcase my skills and creativity</p>
        <div className="mt-4 h-0.5 w-24 mx-auto bg-cyan-400/90 rounded-full" />
      </div>
      {/* Grid (all projects) */}
      <motion.div
        initial={{opacity:0, y:10}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true, amount:0.2}}
        transition={{duration:0.6}}
        className="grid gap-8 md:grid-cols-3"
      >
        {allProjects.map((p: P, i: number) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </motion.div>
    </section>
  );
};
