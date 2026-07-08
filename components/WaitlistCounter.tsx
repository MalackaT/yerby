'use client';

import { useEffect, useState } from 'react';

const TOTAL_SLOTS = 100;

/**
 * Honest launch-discount counter: shows 100 minus the real signup count.
 * Renders nothing until the count is loaded; stays hidden if the API
 * fails or signups aren't queryable (missing env vars).
 */
export default function WaitlistCounter() {
  const [slotsLeft, setSlotsLeft] = useState<number | null>(null);

  // Load the real count once on mount (source of truth).
  useEffect(() => {
    let alive = true;

    fetch('/api/waitlist-count', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (alive && data && typeof data.count === 'number') {
          setSlotsLeft(Math.max(0, TOTAL_SLOTS - data.count));
        }
      })
      .catch(() => {
        /* hide counter on failure */
      });

    return () => {
      alive = false;
    };
  }, []);

  // Tick down instantly when someone signs up in this session. Honest —
  // it only moves on a real successful submit; a reload reconciles it
  // with the true server count.
  useEffect(() => {
    function onSignup() {
      setSlotsLeft((prev) => (prev === null ? prev : Math.max(0, prev - 1)));
    }
    window.addEventListener('yerby:signup', onSignup);
    return () => window.removeEventListener('yerby:signup', onSignup);
  }, []);

  if (slotsLeft === null) return null;

  return (
    <p className="font-sans text-[13px] sm:text-sm font-semibold text-brand-yellow">
      20% sleva už jen pro posledních {slotsLeft} z vás
    </p>
  );
}
