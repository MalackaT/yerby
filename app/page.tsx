import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

function YMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 118" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M 42 7 C 36 3 26 5 20 13 C 14 21 16 33 22 43 C 27 51 35 57 37 67 C 39 75 35 85 31 97 C 27 107 27 117 37 119 C 47 121 55 113 59 103 C 63 93 63 81 67 69 C 71 59 77 51 77 39 C 77 29 73 17 65 11 C 57 5 49 9 47 17 C 45 23 45 33 41 39 C 37 45 29 45 25 37 C 21 29 23 15 31 9 C 35 6 39 9 42 7 Z" />
      <path d="M 63 5 C 69 1 79 5 79 15 C 79 25 73 37 63 37 C 57 37 53 29 55 21 C 57 13 59 8 63 5 Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ─────────────────────────────────────────────
          TOP ZONE — krémová, jen logo, bez zbytečného prostoru
      ───────────────────────────────────────────── */}
      <section className="relative flex-1 min-h-[42vh] flex items-center justify-center px-4 py-8 bg-brand-cream overflow-hidden">

        {/* "Již brzy" — rohový štítek, neoklešťuje vertikální prostor */}
        <p className="absolute top-5 right-5 font-sans text-[9px] tracking-[0.3em] uppercase text-brand-muted animate-fade-up delay-0">
          Již brzy
        </p>

        {/* Slovní značka — co největší */}
        <Image
          src="/logo-wordmark.png"
          alt="Yerby"
          width={1080}
          height={1080}
          priority
          className="w-[96vw] max-w-[680px] h-auto mix-blend-multiply animate-fade-up delay-100"
        />

      </section>

      {/* ─────────────────────────────────────────────
          DOLNÍ ZÓNA — tmavě zelená
      ───────────────────────────────────────────── */}
      <section className="bg-brand-green-dark px-4 sm:px-6 pt-8 pb-10 flex flex-col items-center text-center">

        {/* Symbol Y — značka Yerby na přechodu sekcí */}
        <YMark className="w-8 h-auto text-white/35 mb-6 animate-fade-up delay-200" />

        {/* Oddělovač */}
        <div className="w-full max-w-md h-px bg-white/10 mb-8 animate-fade-up delay-300" />

        {/* Nadpis */}
        <p className="font-display font-bold text-white text-xl sm:text-2xl leading-snug max-w-sm mb-2.5 animate-fade-up delay-400">
          Rituál pro aktivní a uvědomělé.
        </p>

        {/* Podnadpis */}
        <p className="font-sans text-sm text-white/40 tracking-wide mb-8 animate-fade-up delay-400">
          Čistý fokus.&ensp;Přírodní energie.&ensp;Bez kompromisů.
        </p>

        {/* Formulář */}
        <div className="w-full max-w-md animate-fade-up delay-500">
          <EmailForm dark />
        </div>

        {/* Poznámka */}
        <p className="mt-5 font-sans text-[10px] tracking-[0.22em] uppercase text-white/20 animate-fade-up delay-600">
          Žádný spam &mdash; jen info o spuštění.
        </p>

        {/* Patička */}
        <p className="mt-8 font-sans text-[10px] tracking-[0.22em] uppercase text-white/15 animate-fade-up delay-700">
          &copy; {new Date().getFullYear()} Yerby. Všechna práva vyhrazena.
        </p>

      </section>

    </div>
  );
}
