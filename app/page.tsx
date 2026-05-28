import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ─────────────────────────────────────────────
          TOP ZONE — žlutá značka, logo v centru
      ───────────────────────────────────────────── */}
      <section className="flex-1 min-h-[42vh] flex flex-col items-center justify-center px-4 py-10 bg-brand-yellow">

        {/* Slovní značka — na žlutém pozadí, mix-blend-multiply odstraní bílou */}
        <Image
          src="/logo-wordmark.png"
          alt="Yerby"
          width={1080}
          height={1080}
          priority
          className="w-[96vw] max-w-[680px] h-auto mix-blend-multiply animate-fade-up delay-0"
        />

        {/* Již brzy — pod logem */}
        <div className="mt-5 inline-flex items-center gap-2.5 border border-brand-green-dark/20 rounded-full px-5 py-2 bg-brand-green-dark/8 animate-fade-up delay-150">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green-dark shrink-0" />
          <span className="font-sans text-xs font-semibold tracking-[0.28em] uppercase text-brand-green-dark">
            Již brzy
          </span>
        </div>

      </section>

      {/* ─────────────────────────────────────────────
          DOLNÍ ZÓNA — tmavě zelená
      ───────────────────────────────────────────── */}
      <section className="bg-brand-green-dark px-4 sm:px-6 pt-10 pb-10 flex flex-col items-center text-center">

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
