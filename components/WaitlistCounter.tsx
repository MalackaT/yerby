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

  useEffect(() => {
    let alive = true;

    fetch('/api/waitlist-count')
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

  if (slotsLeft === null) return null;

  return (
    <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-brand-yellow">
      Zbývá {slotsLeft} ze {TOTAL_SLOTS} launch slev
    </p>
  );
}
