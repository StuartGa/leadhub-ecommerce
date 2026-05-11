import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/20 bg-slate-900">
      <div className="relative min-h-[640px]">
        {/* Imagen de fondo como fallback principal */}
        <img
          alt="Ingredientes frescos para foodservice"
          src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1800&q=72&fm=webp"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-900/52 to-slate-900/8" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(177,36,85,0.28),transparent_48%)]" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-[1200px] items-center px-6 py-16">
          <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/8 p-8 shadow-2xl backdrop-blur-md sm:p-10">
            <p className="mb-4 inline-block rounded bg-white/18 px-3 py-1 text-sm font-semibold text-white">
              Precisión Gastronómica para tu Negocio
            </p>

            <h1 className="mb-5 font-sans text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Soluciones transparentes para
              <span className="text-brand-100"> foodservice y retail</span>
            </h1>

            <p className="mb-8 font-sans text-lg font-light leading-relaxed text-white/90 sm:text-xl">
              Distribución, logística y acondicionamiento de alimentos secos,
              refrigerados y congelados con trazabilidad, puntualidad y calidad
              premium.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded border border-brand-300/60 bg-brand-500/85 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Cotizar Productos
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </Link>

              <Link
                to="/productos"
                className="inline-flex items-center justify-center rounded border border-white/45 bg-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
