import { motion } from 'framer-motion';
import data from '../content/projects.json';
import { useState, useEffect, useCallback, useRef } from 'react';

type P = typeof data.projects[number] & { video?: string; poster?: string };

// Single project card with optional video playback
const ProjectCard: React.FC<{ project: P; index: number; onExpand?: (p: P) => void }> = ({ project: p, index, onExpand }) => {
  const [playing, setPlaying] = useState(false);
  const hasVideo = !!p.video;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);
  const showCode = !!p.url && p.url.trim() !== '' && p.url.trim() !== '#';
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
            {/* Poster (shows before playing) */}
            {!playing && p.poster && (
              <img
                src={p.poster}
                alt={`${p.title} poster`}
                className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                loading="lazy"
              />
            )}
            {playing ? (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover cursor-pointer"
                  src={p.video}
                  poster={p.poster}
                  autoPlay
                  playsInline
                  aria-label={`${paused ? 'Play' : 'Pause'} ${p.title} preview`}
                  onClick={() => {
                    const v = videoRef.current; if (!v) return;
                    if (v.paused) { v.play(); setPaused(false); } else { v.pause(); setPaused(true); }
                  }}
                  onPlay={() => setPaused(false)}
                  onPause={() => setPaused(true)}
                  onEnded={() => { setPlaying(false); setPaused(false); }}
                  preload="metadata"
                />
                {paused && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="material-symbols-outlined text-white/90 text-6xl drop-shadow">play_circle</span>
                  </div>
                )}
                {paused && onExpand && (
                  <button
                    type="button"
                    onClick={() => onExpand(p)}
                    className="absolute top-2 right-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900/70 border border-white/20 text-white/90 backdrop-blur-md shadow-inner transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    aria-label={`Open large video for ${p.title}`}
                  >
                    <span className="material-symbols-outlined text-xl leading-none">open_in_full</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-neutral-900/50 backdrop-blur-md shadow-inner transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                  aria-label={`Play video preview for ${p.title}`}
                >
                  <span className="material-symbols-outlined text-white/90 text-4xl leading-none">play_circle</span>
                </button>
                {onExpand && (
                  <button
                    type="button"
                    onClick={() => onExpand(p)}
                    className="absolute top-2 right-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900/60 border border-white/15 text-white/90 backdrop-blur-md shadow-inner transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    aria-label={`Open large video for ${p.title}`}
                  >
                    <span className="material-symbols-outlined text-xl leading-none">open_in_full</span>
                  </button>
                )}
              </>
            )}
            {/* Hover / idle gradient overlay (only when not playing to avoid covering video controls) */}
            <div className={`pointer-events-none absolute inset-0 transition duration-500 ${playing ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.18),transparent_65%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_65%)]`}/>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.18),transparent_65%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_65%)]" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-neutral-900/50 backdrop-blur-md shadow-inner">
              <span className="material-symbols-outlined text-white/85 text-4xl leading-none">play_circle</span>
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
        <div className="relative z-10 mt-auto flex justify-end gap-3 pt-2">
          {showCode && (
            <a
              href={p.url}
              className="relative inline-flex items-center gap-1.5 rounded-md bg-neutral-900/70 px-3.5 py-2 text-xs font-medium text-white shadow-sm ring-1 ring-white/10 hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 transition before:absolute before:inset-0 before:rounded-md before:bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.55),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(217,70,239,0.45),transparent_65%)] before:opacity-0 hover:before:opacity-100 before:blur before:transition before:duration-300"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.07-.74.08-.73.08-.73 1.18.08 1.81 1.22 1.81 1.22 1.05 1.8 2.76 1.28 3.43.98.11-.76.41-1.28.74-1.57-2.55-.29-5.23-1.28-5.23-5.72 0-1.27.45-2.31 1.2-3.13-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.19a11 11 0 0 1 2.9-.39c.99 0 1.99.13 2.9.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.58.23 2.75.11 3.04.75.82 1.2 1.86 1.2 3.13 0 4.45-2.69 5.42-5.25 5.71.42.36.79 1.07.79 2.17 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              <span className="relative">View Code</span>
            </a>
          )}
          {/*<a
            href={p.url}
            className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            Live Demo
          </a>*/}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const allProjects = data.projects as P[];
  const [expanded, setExpanded] = useState<P | null>(null);

  const close = useCallback(() => setExpanded(null), []);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (expanded) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [expanded]);

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
          <ProjectCard key={p.title} project={p} index={i} onExpand={p.video ? setExpanded : undefined} />
        ))}
      </motion.div>

      {/* Modal for expanded video */}
      {expanded && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0 animate-[fadeIn_.35s_ease_forwards]" onClick={close} />
          <motion.div
            initial={{opacity:0, scale:0.9, y:20}}
            animate={{opacity:1, scale:1, y:0}}
            exit={{opacity:0, scale:0.9}}
            transition={{type:'spring', stiffness:210, damping:22}}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-900/80 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <h3 className="font-semibold text-sm md:text-base tracking-tight">{expanded.title} – Preview</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={close}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                  aria-label="Close video"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                key={expanded.video}
                src={expanded.video}
                poster={expanded.poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
                preload="metadata"
              />
              <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.25),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.25),transparent_60%)]" />
            </div>
            <div className="px-5 py-4 flex flex-col gap-3">
              <p className="text-xs text-neutral-400 line-clamp-3">{expanded.description}</p>
              <div className="flex flex-wrap gap-2">
                {expanded.tags?.map(t => <span key={t} className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-medium tracking-wide text-neutral-400">{t}</span>)}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
