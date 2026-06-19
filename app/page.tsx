import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center overflow-hidden px-5 py-16"
      style={{ backgroundImage: "url('/bg-leaves.jpg')" }}
    >

      {/* Dark overlay for readability */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xl">

        {/* Již brzy badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 border border-brand-yellow/30 rounded-full px-5 py-2 bg-brand-yellow/10 animate-fade-up delay-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0" />
          <span className="font-sans text-xs font-semibold tracking-[0.28em] uppercase text-brand-yellow">
            Již brzy
          </span>
        </div>

        {/* Wordmark */}
        <Image
          src="/logo-wordmark.png"
          alt="Yerby"
          width={1080}
          height={1080}
          priority
          className="w-[85vw] max-w-[460px] h-auto invert mix-blend-screen animate-fade-up delay-100"
        />

        {/* Separator */}
        <div className="w-14 h-px bg-brand-yellow/40 mt-8 mb-7 animate-fade-up delay-200" />

        {/* Headline */}
        <p className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug mb-3 animate-fade-up delay-300">
          Energie, co šumí.
        </p>

        {/* Subtext */}
        <p className="font-sans text-sm text-white/40 tracking-wide mb-10 animate-fade-up delay-300">
          Přírodní.&ensp;Šumivé.&ensp;Probouzející.
        </p>

        {/* Email form */}
        <div className="w-full animate-fade-up delay-400">
          <EmailForm dark />
        </div>

        {/* No spam note */}
        <p className="mt-4 font-sans text-[10px] tracking-[0.22em] uppercase text-white/20 animate-fade-up delay-500">
          Žádný spam — jen info o spuštění.
        </p>

        {/* Social icons */}
        <div className="mt-10 flex items-center gap-7 animate-fade-up delay-600">
          <a href="#" aria-label="Instagram" className="text-white/25 hover:text-white/60 transition-colors duration-200">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="TikTok" className="text-white/25 hover:text-white/60 transition-colors duration-200">
            <TikTokIcon />
          </a>
        </div>

        {/* Footer */}
        <p className="mt-10 font-sans text-[10px] tracking-[0.22em] uppercase text-white/15 animate-fade-up delay-700">
          &copy; {new Date().getFullYear()} Yerby. Všechna práva vyhrazena.
        </p>

      </div>
    </main>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  );
}
