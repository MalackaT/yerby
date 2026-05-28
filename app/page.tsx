import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ────────────────────────────────────────
          TOP ZONE — krémová, logo v centru
      ──────────────────────────────────────── */}
      <section className="flex-1 min-h-[55vh] flex flex-col items-center justify-center gap-5 px-4 sm:px-6 py-14 sm:py-20 bg-brand-cream">

        {/* Štítek */}
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-muted animate-fade-up delay-0">
          Již brzy
        </p>

        {/* Ikonka */}
        <Image
          src="/logo-icon.png"
          alt=""
          width={1080}
          height={1080}
          priority
          className="w-20 h-20 sm:w-24 sm:h-24 mix-blend-multiply animate-fade-up delay-100"
        />

        {/* Slovní značka — hlavní prvek stránky */}
        <Image
          src="/logo-wordmark.png"
          alt="Yerby"
          width={1080}
          height={1080}
          priority
          className="w-[80vw] max-w-[320px] sm:max-w-[460px] h-auto mix-blend-multiply animate-fade-up delay-200"
        />

      </section>

      {/* ────────────────────────────────────────
          DOLNÍ ZÓNA — tmavě zelená, text + formulář
      ──────────────────────────────────────── */}
      <section className="bg-brand-green-dark px-4 sm:px-6 pt-10 pb-10 flex flex-col items-center text-center">

        {/* Oddělovač */}
        <div className="flex items-center gap-3 w-full max-w-md mb-8 animate-fade-up delay-300">
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-brand-green-pale" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

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
        <p className="mt-10 font-sans text-[10px] tracking-[0.22em] uppercase text-white/15 animate-fade-up delay-700">
          &copy; {new Date().getFullYear()} Yerby. Všechna práva vyhrazena.
        </p>

      </section>

    </div>
  );
}
