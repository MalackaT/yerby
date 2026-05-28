import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

function YIconMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 118"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M 42 7 C 36 3 26 5 20 13 C 14 21 16 33 22 43 C 27 51 35 57 37 67 C 39 75 35 85 31 97 C 27 107 27 117 37 119 C 47 121 55 113 59 103 C 63 93 63 81 67 69 C 71 59 77 51 77 39 C 77 29 73 17 65 11 C 57 5 49 9 47 17 C 45 23 45 33 41 39 C 37 45 29 45 25 37 C 21 29 23 15 31 9 C 35 6 39 9 42 7 Z" />
      <path d="M 63 5 C 69 1 79 5 79 15 C 79 25 73 37 63 37 C 57 37 53 29 55 21 C 57 13 59 8 63 5 Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col">

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">

        {/* Logo zone */}
        <div className="mb-10 animate-fade-up delay-100">

          {/* Icon mark */}
          <YIconMark className="w-12 h-auto text-brand-ink mx-auto mb-7" />

          {/*
            Wordmark — once you have the real PNG/SVG file:
            1. Copy it to public/logo-wordmark.png (or .svg)
            2. Uncomment the <Image> block below and remove the <h1> fallback.

            <Image
              src="/logo-wordmark.png"
              alt="Yerby"
              width={220}
              height={60}
              priority
              className="mx-auto"
            />
          */}
          <h1
            className="font-display font-black text-brand-ink leading-none select-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', letterSpacing: '-0.01em' }}
          >
            yerby
          </h1>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3 mb-10 animate-fade-up delay-200">
          <div className="w-10 h-px bg-brand-border" />
          <YIconMark className="w-3 h-auto text-brand-green" />
          <div className="w-10 h-px bg-brand-border" />
        </div>

        {/* Taglines */}
        <div className="mb-12 space-y-3 animate-fade-up delay-350">
          <p className="font-display font-bold text-brand-ink text-xl sm:text-2xl leading-snug max-w-xs sm:max-w-sm">
            The new ritual for the conscious mover.
          </p>
          <p className="font-sans font-light text-brand-mid text-sm tracking-wide">
            Pure focus.&ensp;Natural energy.&ensp;Zero compromise.
          </p>
        </div>

        {/* Email form */}
        <div className="w-full max-w-md animate-fade-up delay-500">
          <EmailForm />
        </div>

        {/* Privacy note */}
        <p className="mt-6 font-sans text-[11px] tracking-[0.18em] uppercase text-brand-faint animate-fade-up delay-650">
          No spam &mdash; just the launch.
        </p>

      </section>

      {/* ── Footer ── */}
      <footer className="py-8 flex items-center justify-center gap-2.5 animate-fade-up delay-800">
        <YIconMark className="w-3 h-auto text-brand-faint" />
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-faint">
          &copy; {new Date().getFullYear()} Yerby. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
