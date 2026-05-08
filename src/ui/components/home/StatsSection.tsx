import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  target: number;
  label: string;
  prefix?: string;
}

function StatItem({ target, label, prefix = "+" }: StatItemProps) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        setHasAnimated(true);
        const durationMs = 1200;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - (1 - progress) * (1 - progress);
          setValue(Math.round(target * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated, target]);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <span className="mb-2 font-sans text-5xl font-semibold leading-tight tracking-tight">
        {prefix}
        {value}
      </span>
      <span className="font-sans text-xs font-semibold uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-500 py-12 text-white">
      {/* Watermark Decoration */}
      <div className="absolute left-0 top-1/2 h-64 w-64 -translate-x-1/4 -translate-y-1/2 opacity-10">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-full w-full"
        >
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 text-center md:grid-cols-3">
        <StatItem target={35} label="Proveedores" />
        <StatItem target={750} label="Clientes Activos" />
        <StatItem target={200} label="Productos" />
      </div>
    </section>
  );
}
