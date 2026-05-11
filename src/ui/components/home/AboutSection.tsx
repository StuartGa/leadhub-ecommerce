import { Link } from "react-router-dom";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-slate-200/20 bg-white py-24"
    >
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
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-sans text-4xl font-normal uppercase tracking-wider text-slate-900">
            ¿QUIÉNES <span className="font-semibold">SOMOS?</span>
          </h2>
          <p className="mx-auto max-w-3xl font-sans text-xl font-light leading-relaxed text-slate-600">
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
        </div>

        {/* Servicios Grid */}
        <div className="mb-20">
          <h3 className="mb-12 text-center font-sans text-3xl font-semibold uppercase tracking-wide text-slate-900">
            Servicios
          </h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logística */}
            <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-500 hover:shadow-xl">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="mb-3 font-sans text-lg font-semibold text-slate-900">
                Logística
              </h4>
              <p className="font-sans text-sm leading-relaxed text-slate-600">
                Distribución bajo ambiente controlado. Manejo de 3 temperaturas: Congelado, Refrigerado y Seco.
              </p>
            </div>

            {/* 2PL */}
            <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-500 hover:shadow-xl">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h4 className="mb-3 font-sans text-lg font-semibold text-slate-900">
                Operador Logístico 2PL
              </h4>
              <p className="font-sans text-sm leading-relaxed text-slate-600">
                Tú controlas tu proveedor, nosotros gestionamos almacenamiento y transporte en tiempo y forma.
              </p>
            </div>

            {/* Maquila */}
            <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-500 hover:shadow-xl">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="mb-3 font-sans text-lg font-semibold text-slate-900">
                Acondicionamiento (Maquila)
              </h4>
              <p className="font-sans text-sm leading-relaxed text-slate-600">
                Empaquetamos, etiquetamos y adaptamos la presentación según las necesidades de tu negocio.
              </p>
            </div>

            {/* 3PL */}
            <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-500 hover:shadow-xl">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="mb-3 font-sans text-lg font-semibold text-slate-900">
                Operador Logístico 3PL
              </h4>
              <p className="font-sans text-sm leading-relaxed text-slate-600">
                Nos encargamos del almacenamiento, transporte, pago y calidad de la mercancía.
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mb-20">
          <h3 className="mb-8 text-center font-sans text-2xl font-semibold text-slate-900">
            Orgullosos de nuestros resultados
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-3 font-sans text-5xl font-bold text-brand-500">+45</div>
              <div className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-600">
                Proveedores
              </div>
            </div>
            <div className="text-center">
              <div className="mb-3 font-sans text-5xl font-bold text-brand-500">+350</div>
              <div className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-600">
                Productos
              </div>
            </div>
            <div className="text-center">
              <div className="mb-3 font-sans text-5xl font-bold text-brand-500">+400</div>
              <div className="font-sans text-sm font-semibold uppercase tracking-wider text-slate-600">
                Clientes Activos
              </div>
            </div>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid gap-12 md:grid-cols-2">
          <div className="rounded-xl bg-gradient-to-br from-brand-50 to-white p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-4 font-sans text-2xl font-semibold text-slate-900">
              Misión
            </h3>
            <p className="font-sans leading-relaxed text-slate-600">
              Ser reconocidos por nuestros clientes como un aliado estratégico que les produce resultados satisfactorios y que les provee productos y servicios que sobrepasan sus expectativas.
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="mb-4 font-sans text-2xl font-semibold text-slate-900">
              Visión
            </h3>
            <p className="font-sans leading-relaxed text-slate-600">
              Somos su socio estratégico para su crecimiento comercial y profesional, comprometidos con valores de lealtad y honestidad.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
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
