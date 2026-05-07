export function TemperatureSection() {
  return (
    <section className="border-b border-slate-200/20 bg-white py-12">
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
          <div className="flex items-center gap-3 text-brand-500">
            <svg
              className="h-10 w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-900">
              SECO
            </span>
          </div>

          {/* Refrigerado */}
          <div className="flex items-center gap-3 text-brand-500">
            <svg
              className="h-10 w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z" />
            </svg>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-900">
              REFRIGERADO
            </span>
          </div>

          {/* Congelado */}
          <div className="flex items-center gap-3 text-brand-500">
            <svg
              className="h-10 w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z" />
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
