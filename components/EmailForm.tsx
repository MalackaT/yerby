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
      <div className="animate-fade-up text-center py-4">
        <div className="inline-flex items-center gap-3 bg-white border border-brand-border rounded-full px-6 py-3 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
          <span className="font-sans text-sm text-brand-green font-medium tracking-wide">
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
          className={[
            'flex-1 bg-white border border-brand-border rounded-full',
            'px-5 py-3 outline-none',
            'font-sans text-sm text-brand-ink placeholder:text-brand-faint',
            'transition-colors duration-200',
            'focus:border-brand-green focus:ring-2 focus:ring-brand-green/10',
            'disabled:opacity-50',
          ].join(' ')}
          aria-label="Email address"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className={[
            'shrink-0 rounded-full',
            'px-7 py-3 bg-brand-green text-white',
            'font-display font-bold text-sm tracking-wide',
            'hover:bg-brand-green-dark transition-colors duration-200',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-brand-green focus-visible:ring-offset-2',
            'focus-visible:ring-offset-brand-bg',
          ].join(' ')}
        >
          {status === 'loading' ? <LoadingDots /> : 'Notify Me'}
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
    <span className="inline-flex gap-1 items-center h-5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-white animate-bounce"
          style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.8s' }}
        />
      ))}
    </span>
  );
}
