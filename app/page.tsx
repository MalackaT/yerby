import EmailForm from '@/components/EmailForm';

function LeafMark() {
  return (
    <svg
      width="18"
      height="28"
      viewBox="0 0 18 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-brand-green"
    >
      <path
        d="M9 27 C9 27 1 18 1 11 C1 5.5 4.6 1 9 1 C13.4 1 17 5.5 17 11 C17 18 9 27 9 27Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="9" y1="27" x2="9" y2="1" stroke="currentColor" strokeWidth="0.55" />
      <path d="M9 21 C6.5 17.5 3 16 3 16" stroke="currentColor" strokeWidth="0.45" fill="none" strokeLinecap="round" />
      <path d="M9 17 C11.5 13.5 15 12 15 12" stroke="currentColor" strokeWidth="0.45" fill="none" strokeLinecap="round" />
      <path d="M9 13 C6.5 10 4.5 8.5 4.5 8.5" stroke="currentColor" strokeWidth="0.45" fill="none" strokeLinecap="round" />
      <path d="M9 9.5 C11.5 7.5 13.5 6.5 13.5 6.5" stroke="currentColor" strokeWidth="0.45" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col">

      {/* ── Top bar ── */}
      <header className="flex items-center justify-center pt-10 pb-4 px-6 animate-fade-up delay-100">
        <span className="text-[10px] tracking-[0.28em] uppercase text-brand-muted font-sans font-medium">
          Coming Soon
        </span>
      </header>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Brand name */}
        <div className="mb-8 animate-fade-up delay-250">
          <h1 className="font-serif font-light text-brand-ink tracking-widest3 text-[3.25rem] sm:text-[4.5rem] md:text-[6rem] leading-none select-none">
            YERBY
          </h1>
        </div>

        {/* Leaf + rule */}
        <div className="flex items-center gap-4 mb-10 animate-fade-up delay-400">
          <div className="w-12 sm:w-16 h-px bg-brand-border" />
          <LeafMark />
          <div className="w-12 sm:w-16 h-px bg-brand-border" />
        </div>

        {/* Tagline */}
        <div className="mb-12 space-y-3 animate-fade-up delay-550">
          <p className="font-serif font-light text-brand-ink text-xl sm:text-2xl md:text-3xl tracking-wide leading-snug max-w-sm sm:max-w-md">
            The new ritual for the conscious mover.
          </p>
          <p className="font-sans font-light text-brand-mid text-sm tracking-wider">
            Pure focus.&ensp;Natural energy.&ensp;Zero compromise.
          </p>
        </div>

        {/* Email form */}
        <div className="w-full max-w-md animate-fade-up delay-700">
          <EmailForm />
        </div>

        {/* Privacy note */}
        <p className="mt-7 text-[10px] tracking-[0.22em] uppercase text-brand-faint font-sans animate-fade-up delay-900">
          No spam &mdash; just the launch.
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 flex items-center justify-center gap-2 animate-fade-up delay-900">
        <LeafMark />
        <p className="text-[10px] tracking-[0.22em] uppercase text-brand-faint font-sans">
          &copy; {new Date().getFullYear()} Yerby. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
