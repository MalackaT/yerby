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
        setMessage(data.message ?? "You're on the list. Stay tuned.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
        inputRef.current?.focus();
      }
    } catch {
      setStatus('error');
      setMessage('Connection failed. Please try again.');
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
          placeholder="your@email.com"
          disabled={status === 'loading'}
          required
          autoComplete="email"
          spellCheck={false}
          aria-label="Email address"
          className={[
            'flex-1 rounded-full px-5 py-3 outline-none font-sans text-sm',
            'transition-colors duration-200 disabled:opacity-50',
            dark
              ? [
                  'bg-white/5 border border-white/20 text-white placeholder:text-white/30',
                  'focus:border-white/50 focus:ring-2 focus:ring-white/10',
                ].join(' ')
              : [
                  'bg-white border border-brand-border text-brand-ink placeholder:text-brand-faint',
                  'focus:border-brand-green focus:ring-2 focus:ring-brand-green/10',
                ].join(' '),
          ].join(' ')}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={[
            'shrink-0 rounded-full px-7 py-3',
            'font-display font-bold text-sm tracking-wide',
            'transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            dark
              ? [
                  'bg-white text-brand-green-dark hover:bg-white/90',
                  'focus-visible:ring-white focus-visible:ring-offset-brand-green-dark',
                ].join(' ')
              : [
                  'bg-brand-green text-white hover:bg-brand-green-dark',
                  'focus-visible:ring-brand-green focus-visible:ring-offset-brand-cream',
                ].join(' '),
          ].join(' ')}
        >
          {status === 'loading' ? <LoadingDots dark={dark} /> : 'Notify Me'}
        </button>

      </div>

      {status === 'error' && (
        <p className={[
          'mt-3 text-center font-sans text-xs tracking-wide animate-fade-up',
          dark ? 'text-red-300' : 'text-red-500',
        ].join(' ')}>
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
          className={`block w-1.5 h-1.5 rounded-full animate-bounce ${
            dark ? 'bg-brand-green-dark' : 'bg-white'
          }`}
          style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.8s' }}
        />
      ))}
    </span>
  );
}
