'use client';

import { useState, useRef } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EmailForm() {
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
      <div className="animate-fade-up text-center py-3">
        <span className="inline-block w-4 h-px bg-brand-green mr-3 align-middle" />
        <span className="font-sans text-sm tracking-wider text-brand-green">{message}</span>
        <span className="inline-block w-4 h-px bg-brand-green ml-3 align-middle" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-0 border-b border-brand-border focus-within:border-brand-green transition-colors duration-300">
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
          className={[
            'flex-1 bg-transparent outline-none py-3 px-1',
            'font-sans text-sm text-brand-ink placeholder:text-brand-faint',
            'tracking-wider transition-colors duration-200',
            'disabled:opacity-50',
          ].join(' ')}
          aria-label="Email address"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={[
            'mt-3 sm:mt-0 shrink-0',
            'px-7 py-3 bg-brand-green text-white',
            'font-sans text-[10px] font-medium tracking-[0.22em] uppercase',
            'hover:bg-brand-green-dark transition-colors duration-200',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg',
          ].join(' ')}
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-1.5">
              <LoadingDots />
            </span>
          ) : (
            'Notify Me'
          )}
        </button>
      </div>

      {status === 'error' && (
        <p className="mt-3 text-center font-sans text-xs text-red-500 tracking-wide animate-fade-up">
          {message}
        </p>
      )}
    </form>
  );
}

function LoadingDots() {
  return (
    <span className="flex gap-1 items-center h-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-1 h-1 rounded-full bg-white animate-bounce"
          style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.8s' }}
        />
      ))}
    </span>
  );
}
