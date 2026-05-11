export function TemperatureSection() {
  return (
    <section className="border-b border-slate-200/20 bg-gradient-to-b from-slate-50 to-white py-24 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
            Distribución en las <span className="font-normal">3 Temperaturas</span>
          </h2>
          <p className="mx-auto max-w-3xl font-sans text-lg font-light leading-relaxed text-slate-600">
            Contamos con <strong className="text-slate-900">distribución especializada</strong>{" "}
            y <strong className="text-slate-900">almacenamiento controlado</strong> en las{" "}
            tres temperaturas para garantizar la calidad de tus productos.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Seco */}
          <div className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-brand-500 hover:shadow-lg">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
              <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
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
            </div>
            <h3 className="mb-3 font-sans text-2xl font-bold uppercase tracking-wide text-slate-900">
              Seco
            </h3>
            <p className="font-sans text-base leading-relaxed text-slate-600">
              Almacenamiento a temperatura ambiente con control de humedad para productos no perecederos, 
              conservas, abarrotes y alimentos de larga vida útil.
            </p>
          </div>

          {/* Refrigerado */}
          <div className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-brand-500 hover:shadow-lg">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
              <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <path d="M24 10v6m0 16v6M12 20h6m12 0h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {[{ cx: 15, cy: 15 }, { cx: 33, cy: 15 }, { cx: 33, cy: 33 }, { cx: 15, cy: 33 }].map((p, i) => (
                  <line key={i} x1={p.cx - 3} y1={p.cy - 3} x2={p.cx + 3} y2={p.cy + 3}
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ))}
              </svg>
            </div>
            <h3 className="mb-3 font-sans text-2xl font-bold uppercase tracking-wide text-slate-900">
              Refrigerado
            </h3>
            <p className="font-sans text-base leading-relaxed text-slate-600">
              Cadena de frío controlada entre 0°C y 8°C para lácteos, carnes frescas, 
              frutas, verduras y productos que requieren refrigeración constante.
            </p>
          </div>

          {/* Congelado */}
          <div className="group rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-brand-500 hover:shadow-lg">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 transition-colors group-hover:bg-cyan-100">
              <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 4L24 44M8 14L40 34M8 34L40 14M14 8L34 40M34 8L14 40"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"
                />
                <path
                  d="M18 12L24 18L30 12L36 18L30 24L36 30L30 36L24 30L18 36L12 30L18 24L12 18Z"
                  fill="currentColor" opacity="0.85"
                />
              </svg>
            </div>
            <h3 className="mb-3 font-sans text-2xl font-bold uppercase tracking-wide text-slate-900">
              Congelado
            </h3>
            <p className="font-sans text-base leading-relaxed text-slate-600">
              Congelación industrial a -18°C o menos para carnes, pescados, helados, 
              productos procesados y alimentos que requieren ultra-congelación.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 font-sans text-4xl font-bold text-brand-600">98%</div>
            <div className="font-sans text-sm font-semibold uppercase tracking-wide text-slate-600">
              Efectividad de entregas
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-sans text-4xl font-bold text-brand-600">24-48h</div>
            <div className="font-sans text-sm font-semibold uppercase tracking-wide text-slate-600">
              Tiempo de entrega
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-sans text-4xl font-bold text-brand-600">100%</div>
            <div className="font-sans text-sm font-semibold uppercase tracking-wide text-slate-600">
              Trazabilidad garantizada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
