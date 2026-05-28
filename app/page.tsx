import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ────────────────────────────────────────
          TOP ZONE — cream, logo-focused
      ──────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-16 bg-brand-cream">

        {/* "Coming soon" label */}
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-muted animate-fade-up delay-0">
          Coming Soon
        </p>

        {/* Icon mark */}
        <Image
          src="/logo-icon.png"
          alt=""
          width={1080}
          height={1080}
          priority
          className="w-16 h-16 mix-blend-multiply animate-fade-up delay-100"
        />

        {/* Wordmark — hero element */}
        <Image
          src="/logo-wordmark.png"
          alt="Yerby"
          width={1080}
          height={1080}
          priority
          className="w-full max-w-[340px] sm:max-w-[460px] h-auto mix-blend-multiply animate-fade-up delay-200"
        />

      </section>

      {/* ────────────────────────────────────────
          BOTTOM ZONE — deep green, copy + form
      ──────────────────────────────────────── */}
      <section className="bg-brand-green-dark px-6 pt-12 pb-10 flex flex-col items-center text-center">

        {/* Top rule with dot */}
        <div className="flex items-center gap-3 w-full max-w-md mb-10 animate-fade-up delay-300">
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-brand-green-pale" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Headline */}
        <div className="max-w-sm mb-3 animate-fade-up delay-400">
          <p className="font-display font-bold text-white text-xl sm:text-2xl leading-snug">
            The ritual for the active and intentional.
          </p>
        </div>

        {/* Sub-copy */}
        <p className="font-sans text-sm text-white/40 tracking-wide mb-10 animate-fade-up delay-400">
          Pure focus.&ensp;Natural energy.&ensp;Zero compromise.
        </p>

        {/* Email form — dark variant */}
        <div className="w-full max-w-md animate-fade-up delay-500">
          <EmailForm dark />
        </div>

        {/* Privacy note */}
        <p className="mt-5 font-sans text-[10px] tracking-[0.22em] uppercase text-white/20 animate-fade-up delay-600">
          No spam &mdash; just the launch.
        </p>

        {/* Footer */}
        <p className="mt-10 font-sans text-[10px] tracking-[0.22em] uppercase text-white/15 animate-fade-up delay-700">
          &copy; {new Date().getFullYear()} Yerby. All rights reserved.
        </p>

      </section>

    </div>
  );
}
