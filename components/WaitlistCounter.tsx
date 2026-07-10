'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TOTAL_SLOTS = 100;

/**
 * Honest launch-discount counter: shows 100 minus the real signup count.
 * Renders nothing until the count is loaded; stays hidden if the API
 * fails or signups aren't queryable (missing env vars).
 *
 * Keeps in sync with the server:
 * - fetches the real count on load and whenever the tab regains focus
 * - ticks down instantly on this visitor's own successful signup, then
 *   reconciles with the server once its short cache window has passed
 */
export default function WaitlistCounter() {
  const [slotsLeft, setSlotsLeft] = useState<number | null>(null);
  const reconcileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback((reconcile: boolean) => {
    fetch('/api/waitlist-count', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (data && typeof data.count === 'number') {
          const server = Math.max(0, TOTAL_SLOTS - data.count);
          // When reconciling right after a signup, never bounce the number
          // back up because of a still-stale server cache — signups only grow.
          setSlotsLeft((prev) =>
            reconcile && prev !== null ? Math.min(prev, server) : server,
          );
        }
      })
      .catch(() => {
        /* keep the current value; hidden if nothing loaded yet */
      });
  }, []);

  // Initial load.
  useEffect(() => {
    load(false);
  }, [load]);

  // Refetch when the tab becomes visible again (kept-open tabs stay honest).
  useEffect(() => {
    function onVisible() {
      if (document.visibilityState === 'visible') load(true);
    }
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, [load]);

  // This visitor signed up: tick down instantly, then confirm against the
  // server after its 5s cache window so the number persists across reloads.
  useEffect(() => {
    function onSignup() {
      setSlotsLeft((prev) => (prev === null ? prev : Math.max(0, prev - 1)));
      if (reconcileTimer.current) clearTimeout(reconcileTimer.current);
      reconcileTimer.current = setTimeout(() => load(true), 6_000);
    }
    window.addEventListener('yerby:signup', onSignup);
    return () => {
      window.removeEventListener('yerby:signup', onSignup);
      if (reconcileTimer.current) clearTimeout(reconcileTimer.current);
    };
  }, [load]);

  if (slotsLeft === null) return null;

  return (
    <p className="font-sans text-[13px] sm:text-sm font-semibold text-brand-yellow">
      20% sleva už jen pro posledních {slotsLeft} z vás
    </p>
  );
}
