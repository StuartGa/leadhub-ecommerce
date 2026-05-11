import { Link } from "react-router-dom";

export function AboutBriefSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/20 bg-white py-20">
      {/* Watermark Decoration */}
      <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/4 -translate-y-1/4 opacity-5">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-full w-full text-brand-500"
        >
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mb-6 font-sans text-4xl font-normal uppercase tracking-wider text-slate-900">
            ¿QUIÉNES <span className="font-semibold">SOMOS?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl font-sans text-xl font-light leading-relaxed text-slate-600">
            <strong className="text-slate-900">
              Alimentos Convenientes San Patric
            </strong>{" "}
            somos una compañía{" "}
            <strong className="text-slate-900">100% mexicana</strong> dedicada al{" "}
            <strong className="text-slate-900">
              envío, distribución y acondicionamiento de alimentos congelados,
              refrigerados y secos
            </strong>{" "}
            de la más alta calidad, a empresas dedicadas al servicio de alimentos.
          </p>

          {/* Estadísticas en línea */}
          <div className="mb-10 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="mb-2 font-sans text-4xl font-bold text-brand-500">+45</div>
              <div className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-600">
                Proveedores
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-sans text-4xl font-bold text-brand-500">+350</div>
              <div className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-600">
                Productos
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-sans text-4xl font-bold text-brand-500">+400</div>
              <div className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-600">
                Clientes Activos
              </div>
            </div>
          </div>

          <Link
            to="/quienes-somos"
            className="inline-block rounded-lg bg-brand-500 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition-all duration-200 hover:bg-brand-600 hover:shadow-xl"
          >
            Conoce más sobre nosotros
          </Link>
        </div>
      </div>
    </section>
  );
}
