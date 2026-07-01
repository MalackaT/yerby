'use client';

import { useState, useRef } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EmailForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data: { message?: string; error?: string } = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message ?? 'Jsi na seznamu. Sleduj nás!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Něco se pokazilo. Zkuste to prosím znovu.');
        inputRef.current?.focus();
      }
    } catch {
      setStatus('error');
      setMessage('Připojení selhalo. Zkuste to prosím znovu.');
      inputRef.current?.focus();
    }
  }

  if (status === 'success') {
    return (
      <div className="animate-fade-up py-3 text-center">
        <div className={[
          'inline-flex items-center gap-3 rounded-full px-6 py-3',
          dark
            ? 'border border-white/20 bg-white/5'
            : 'bg-white border border-brand-border shadow-sm',
        ].join(' ')}>
          <span className={`w-2 h-2 rounded-full shrink-0 ${dark ? 'bg-brand-green-pale' : 'bg-brand-green'}`} />
          <span className={`font-sans text-sm font-medium tracking-wide ${dark ? 'text-white' : 'text-brand-green'}`}>
            {message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2.5">

        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="váš@email.cz"
          disabled={status === 'loading'}
          required
          autoComplete="email"
          spellCheck={false}
          aria-label="E-mailová adresa"
          className={[
            'flex-1 rounded-full px-5 py-3.5 outline-none font-sans text-sm',
            'transition-colors duration-200 disabled:opacity-50',
            dark
              ? 'bg-brand-yellow/10 border border-brand-yellow/50 text-white placeholder:text-white/40 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20'
              : 'bg-white border border-brand-border text-brand-ink placeholder:text-brand-faint focus:border-brand-green focus:ring-2 focus:ring-brand-green/10',
          ].join(' ')}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={[
            'rounded-full px-7 py-3.5 w-full sm:w-auto',
            'font-display font-bold text-sm tracking-wide',
            'transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            dark
              ? 'bg-brand-yellow text-brand-green-dark hover:bg-brand-yellow-light focus-visible:ring-brand-yellow focus-visible:ring-offset-brand-green-dark'
              : 'bg-brand-green text-white hover:bg-brand-green-dark focus-visible:ring-brand-green focus-visible:ring-offset-brand-cream',
          ].join(' ')}
        >
          {status === 'loading' ? <LoadingDots dark={dark} /> : 'Dej mi vědět'}
        </button>

      </div>

      {status === 'error' && (
        <p className={`mt-3 text-center font-sans text-xs tracking-wide animate-fade-up ${dark ? 'text-red-300' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

function LoadingDots({ dark }: { dark: boolean }) {
  return (
    <span className="inline-flex gap-1 items-center h-5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`block w-1.5 h-1.5 rounded-full animate-bounce ${dark ? 'bg-brand-green-dark' : 'bg-white'}`}
          style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.8s' }}
        />
      ))}
    </span>
  );
}
