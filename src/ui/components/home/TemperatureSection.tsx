export function TemperatureSection() {
  return (
    <section className="border-b border-slate-200/20 bg-white/70 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-6 text-center">
          <p className="font-sans text-lg font-light text-slate-600">
            Contamos con <strong className="text-slate-900">distribución</strong>{" "}
            y <strong className="text-slate-900">almacenamiento</strong> en las{" "}
            <strong className="text-slate-900">3 TEMPERATURAS</strong>
          </p>
        </div>
          <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-24">
            {/* Seco */}
            <div className="flex items-center gap-3 text-brand-600">
              <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="10" fill="currentColor" opacity="0.15" />
                <circle cx="24" cy="24" r="5" fill="currentColor" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 24 + 8 * Math.cos(rad);
                  const y1 = 24 + 8 * Math.sin(rad);
                  const x2 = 24 + 14 * Math.cos(rad);
                  const y2 = 24 + 14 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />;
                })}
              </svg>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-900">
                SECO
              </span>
            </div>

            {/* Refrigerado */}
            <div className="flex items-center gap-3 text-brand-600">
              <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <path d="M24 10v6m0 16v6M12 20h6m12 0h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {[{ cx: 15, cy: 15 }, { cx: 33, cy: 15 }, { cx: 33, cy: 33 }, { cx: 15, cy: 33 }].map((p, i) => (
                  <line key={i} x1={p.cx - 3} y1={p.cy - 3} x2={p.cx + 3} y2={p.cy + 3}
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ))}
              </svg>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-900">
                REFRIGERADO
              </span>
            </div>

            {/* Congelado */}
            <div className="flex items-center gap-3 text-brand-600">
              <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 4L24 44M8 14L40 34M8 34L40 14M14 8L34 40M34 8L14 40"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"
                />
                <path
                  d="M18 12L24 18L30 12L36 18L30 24L36 30L30 36L24 30L18 36L12 30L18 24L12 18Z"
                  fill="currentColor" opacity="0.85"
                />
              </svg>
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-900">
                CONGELADO
              </span>
            </div>
          </div>
      </div>
    </section>
  );
}
