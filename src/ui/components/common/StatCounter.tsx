import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../../../application/hooks/useCountUp";

interface StatCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  dark?: boolean;
}

export function StatCounter({ target, prefix = "", suffix = "", label, dark }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp({ target, duration: 1800, enabled: visible });

  const numberClass = dark
    ? "mb-2 text-5xl font-bold tabular-nums text-white"
    : "mb-2 font-sans text-3xl font-bold text-brand-500 sm:text-4xl tabular-nums";

  const labelClass = dark
    ? "text-xl text-brand-50"
    : "font-sans text-sm font-light uppercase tracking-wide text-slate-600";

  return (
    <div ref={ref} className="text-center">
      <div className={numberClass}>
        {prefix}{count}{suffix}
      </div>
      <div className={labelClass}>{label}</div>
    </div>
  );
}
