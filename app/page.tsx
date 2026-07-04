import Image from 'next/image';
import EmailForm from '@/components/EmailForm';

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
          Z přírody rovnou do plechovky.
        </p>

        {/* Subtext */}
        <p className="font-sans text-sm text-white/75 leading-relaxed max-w-md mb-10 animate-fade-up delay-300">
          Zapomeňte na kompromisy a chemii. Připravujeme 100% přírodní funkční nápoj pro každého, kdo chce od svého dne víc. Základem je prvotřídní cold brewed yerba maté, které je přirozeně plné minerálů a antioxidantů. Ať už vás čeká náročný den v kanceláři, nebo potřebujete čisté osvěžení během aktivního odpoledne, podpoří vaše tělo i mysl v jejich přirozeném rytmu.
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
        <div className="mt-10 flex items-center animate-fade-up delay-600">
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
