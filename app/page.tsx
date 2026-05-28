import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

// Kept as inline SVG for the tiny decorative instances (separator, footer)
// where a PNG would be too blurry at ~12px.
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

          {/* Icon mark — real PNG */}
          <Image
            src="/logo-icon.png"
            alt=""
            width={1080}
            height={1080}
            priority
            className="w-20 h-20 mx-auto mb-6 mix-blend-multiply"
          />

          {/* Wordmark — real PNG */}
          <Image
            src="/logo-wordmark.png"
            alt="Yerby"
            width={1080}
            height={1080}
            priority
            className="w-52 sm:w-64 h-auto mx-auto mix-blend-multiply"
          />
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
