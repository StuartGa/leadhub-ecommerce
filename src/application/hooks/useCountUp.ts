import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number; // ms
  enabled?: boolean;
}

export function useCountUp({ target, duration = 1800, enabled = true }: UseCountUpOptions): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration, enabled]);

  return count;
}
