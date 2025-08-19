import { useState, useEffect } from 'react';

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

    // Simple human heuristic: time on form & minimal message length
    const elapsed = Date.now() - startTs;
    const formCheck = new FormData(e.currentTarget);
    const messagePreview = (formCheck.get('message') as string || '').trim();
    if (elapsed < 1500 || messagePreview.length < 5) {
      setStatus('error');
      setError('Spam suspected. Please add a bit more detail.');
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('form-name', 'contact');
    try {
      const body = new URLSearchParams(formData as any).toString();
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error('Bad status ' + response.status + ' ' + txt.slice(0,120));
      }
      setStatus('success');
      form.reset();
    } catch (err:any) {
      console.error('Form submit failed', err);
      // Fallback: attempt native submission (lets Netlify handle if JS fetch failed)
      try {
        const native = document.createElement('form');
        native.action = '/';
        native.method = 'POST';
        native.style.display = 'none';
        native.innerHTML = `<input type="hidden" name="form-name" value="contact" />`;
        for (const [k,v] of (formData as any).entries()) {
          if (k === 'form-name') continue; // already added
          const input = document.createElement('input');
            input.type = 'hidden';
            input.name = k;
            input.value = v as string;
            native.appendChild(input);
        }
        document.body.appendChild(native);
        native.submit();
        return; // stop state changes; page will navigate
      } catch {}
      setStatus('error');
      setError('Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="mx-auto min-h-[60vh] max-w-6xl px-6 py-24">
      <h2 className="font-display text-3xl font-bold md:text-5xl mb-8">Contact</h2>
      <p className="text-neutral-300 max-w-2xl">Got a project in mind or just want to say hello? Drop me a line using the form below or reach out via the links.</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_minmax(0,320px)]">
  <form name="contact" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" data-netlify-recaptcha="true" onSubmit={handleSubmit} className="group relative rounded-2xl border border-white/10 bg-white/5/50 p-8 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_30px_-10px_rgba(0,0,0,0.6)]">
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
            <div data-netlify-recaptcha="true" className="rounded-lg bg-white/5 p-3 text-xs text-neutral-400" />
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

        <div className="space-y-6 md:pt-2">
          <div>
            <h3 className="mb-3 font-semibold text-neutral-200">Other ways</h3>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:azniruliqmal@gmail.com" className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40">Email</a>
              <a href="https://www.linkedin.com/in/azniruliqmal/" target="_blank" className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30" rel="noreferrer">LinkedIn</a>
              <a href="dist\\docs\\AZNIRUL_RESUME_LATEST25.pdf" className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">Resume</a>
            </div>
          </div>
          <div className="text-xs leading-relaxed text-neutral-500">
            <p>Prefer using your own mail client? The form launches a pre‑filled email. No data is stored or sent anywhere else.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
