import Image from 'next/image';
import EmailForm from '@/components/EmailForm';
import WaitlistCounter from '@/components/WaitlistCounter';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-green-dark flex flex-col items-center justify-center overflow-hidden px-5 py-16">

      {/* Background video — plays once, freezes on last frame */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="none"
        poster="/bg-leaves.jpg"
        aria-hidden="true"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        <source src="/bg-video.webm" type="video/webm" />
      </video>

      {/* Dark overlay for readability */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xl">

        {/* Již brzy badge */}
        <div className="max-md:order-1 mb-8 inline-flex items-center gap-2.5 border border-brand-yellow/30 rounded-full px-5 py-2 bg-brand-yellow/10 animate-fade-up delay-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0" />
          <span className="font-sans text-xs font-semibold tracking-[0.28em] uppercase text-brand-yellow">
            Již brzy
          </span>
        </div>

        {/* Wordmark — the PNG has large transparent padding; on mobile we
            collapse it with negative margins so the form fits above the fold */}
        <Image
          src="/logo-wordmark.png"
          alt="Yerby"
          width={1080}
          height={1080}
          priority
          className="max-md:order-2 w-[85vw] max-w-[460px] h-auto invert mix-blend-screen pointer-events-none max-md:-mt-[30vw] max-md:-mb-[29vw] animate-fade-up delay-100"
        />

        {/* Separator */}
        <div className="max-md:order-4 w-14 h-px bg-brand-yellow/40 mt-8 mb-7 animate-fade-up delay-200" />

        {/* Headline */}
        <p className="max-md:order-5 font-display font-bold text-2xl sm:text-3xl text-white leading-snug mb-3 animate-fade-up delay-300">
          Z přírody rovnou do plechovky.
        </p>

        {/* Subtext */}
        <p className="max-md:order-6 font-sans text-sm text-white/75 leading-relaxed max-w-md mb-10 max-md:mb-0 animate-fade-up delay-300">
          Zapomeňte na kompromisy a chemii. Připravujeme 100% přírodní funkční nápoj pro každého, kdo chce od svého dne víc. Základem je prvotřídní cold brewed yerba maté, které je přirozeně plné minerálů a antioxidantů. Ať už vás čeká náročný den v kanceláři, nebo potřebujete čisté osvěžení během aktivního odpoledne, podpoří vaše tělo i mysl v jejich přirozeném rytmu.
        </p>

        {/* Email form + captions (below logo on mobile via order, below text on desktop) */}
        <div className="max-md:order-3 w-full flex flex-col items-center animate-fade-up delay-400">
          <div className="h-5 mb-3 flex items-center justify-center">
            <WaitlistCounter />
          </div>
          <p className="mb-4 font-sans text-sm sm:text-base font-semibold text-white">
            Zadej e-mail a získej <span className="text-brand-yellow">20% slevu</span> na první objednávku.
          </p>
          <div className="w-full">
            <EmailForm dark />
          </div>
          <p className="mt-3 font-sans text-[10px] tracking-[0.22em] uppercase text-white/20">
            Žádný spam — jen info o spuštění.
          </p>
        </div>

        {/* Social icons */}
        <div className="max-md:order-7 mt-10 flex items-center animate-fade-up delay-600">
          <a
            href="https://www.instagram.com/yerbycz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/40 hover:text-white/80 transition-colors duration-200"
          >
            <InstagramIcon />
          </a>
        </div>

        {/* Footer */}
        <p className="max-md:order-8 mt-10 font-sans text-[10px] tracking-[0.22em] uppercase text-white/15 animate-fade-up delay-700">
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
