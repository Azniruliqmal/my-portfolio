import { useState, useEffect } from 'react';
import { Section, MotionFade } from '../ui/Section';

export const Contact = () => {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [startTs, setStartTs] = useState<number>(Date.now());

  useEffect(() => {
    setStartTs(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    const form = e.currentTarget;

    // Basic anti-spam (time + length) – keep but don't block legitimate quick tests too aggressively
    const elapsed = Date.now() - startTs;
    const fd = new FormData(form);
    const msg = (fd.get('message') as string || '').trim();
    if (elapsed < 800 || msg.length < 3) { // lowered thresholds to reduce false negatives
      setStatus('error');
      setError('Please add a little more detail.');
      return;
    }

    // Ensure form-name present (safety even though we have hidden input)
    if (!fd.get('form-name')) fd.append('form-name', 'contact');

    try {
      // Simpler: let browser build multipart/form-data boundary automatically (Netlify supports this)
      const res = await fetch('/', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setStatus('success');
      form.reset();
    } catch (err) {
      console.error('Netlify submission failed – fallback', err);
      // Last-resort fallback: create and submit a hidden form (ensures static POST)
      try {
        const native = document.createElement('form');
        native.action = '/';
        native.method = 'POST';
        native.style.display = 'none';
        for (const [k,v] of fd.entries()) {
          const input = document.createElement('input');
          input.type = 'hidden'; input.name = k; input.value = String(v);
          native.appendChild(input);
        }
        document.body.appendChild(native);
        native.submit();
        return;
      } catch {}
      setStatus('error');
      setError('Unable to send right now. Please email me directly.');
    }
  };

  return (
    <Section id="contact" className="mx-auto min-h-[60vh] max-w-6xl px-6 py-24" stagger>
      <MotionFade>
        <h2 className="font-display text-3xl font-bold md:text-5xl mb-8">Contact</h2>
      </MotionFade>
      <MotionFade>
        <p className="text-neutral-300 max-w-2xl">Got a project in mind or just want to say hello? Drop me a line using the form below or reach out via the links.</p>
      </MotionFade>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_minmax(0,320px)]">
        <MotionFade className="contents">
          <form name="contact" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="group relative rounded-2xl border border-white/10 bg-white/5/50 p-8 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_30px_-10px_rgba(0,0,0,0.6)]">
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="submittedAt" value={String(Date.now())} />
            <p className="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 70%)' }} />
            <div className="relative space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium tracking-wide text-neutral-300">Name *</label>
                <input id="name" name="name" required placeholder="Your name" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm/6 text-white placeholder:text-neutral-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium tracking-wide text-neutral-300">Email *</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm/6 text-white placeholder:text-neutral-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium tracking-wide text-neutral-300">Message *</label>
                <textarea id="message" name="message" required rows={6} placeholder="Tell me a little about what you're looking to build or how I can help." className="resize-y w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm/6 text-white placeholder:text-neutral-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 text-xs text-neutral-500">{status === 'success' ? <span className="text-emerald-400">Message sent! I'll get back soon.</span> : status === 'error' ? <span className="text-red-400">{error}</span> : "I'll reply within 1–2 business days."}</div>
                <div className="flex items-center gap-3">
                  <button disabled={status==='submitting'} type="submit" className="relative overflow-hidden rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-500/40">
                    <span className="relative z-10">{status==='submitting' ? 'Sending...' : 'Send Message'}</span>
                    <span className="pointer-events-none absolute inset-0 -translate-y-full bg-white/20 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                  </button>
                  {status==='success' && (
                    <button type="button" onClick={()=> setStatus('idle')} className="rounded-md border border-white/10 px-3 py-2 text-xs text-neutral-400 hover:text-white hover:border-white/20 transition">Send another</button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </MotionFade>

        <MotionFade className="space-y-6 md:pt-2">
          <div>
            <h3 className="mb-3 font-semibold text-neutral-200">Other ways</h3>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:azniruliqmal@gmail.com" className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40">Email</a>
              <a href="https://www.linkedin.com/in/azniruliqmal/" target="_blank" className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" rel="noreferrer">LinkedIn</a>
              {/*<a href="/dist/docs/AZNIRUL_RESUME_LATEST25.pdf" className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">Resume</a>*/}
            </div>
          </div>
          <div className="text-xs leading-relaxed text-neutral-500">
            <p>Prefer using your own mail client? The form launches a pre‑filled email. No data is stored or sent anywhere else.</p>
          </div>
        </MotionFade>
      </div>
    </Section>
  );
};
