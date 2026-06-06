import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageBanner } from "../components/common/PageBanner";
import { StatCounter } from "../components/common/StatCounter";

export function CoveragePage() {
  useDocumentTitle(
    "Cobertura Nacional — San Patric Foodservice",
    "Cobertura en 9 estados de México: CDMX, Estado de México, Morelos, Puebla, Veracruz, Querétaro, Jalisco, Guanajuato y Tlaxcala. 98% de efectividad. Logística especializada en seco, refrigerado y congelado."
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <PageBanner
          src="banner-cobertura.webp"
          alt="Cobertura Nacional — San Patric Foodservice"
          title={<>Cobertura <span className="font-normal">Nacional</span></>}
          subtitle="Distribuimos a 9 estados de México con infraestructura especializada para garantizar entregas puntuales y cadena de frío confiable."
          variant="dark"
        />

        {/* Stats */}
        <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-2 gap-6">
              <StatCounter target={9} label="Estados" />
              <StatCounter target={98} suffix="%" label="Efectividad" />
            </div>
          </div>
        </section>

        {/* Mapa de Cobertura */}
        <section className="bg-slate-50">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/banners/banner-mapa.webp`}
            alt="Mapa de cobertura nacional San Patric Foodservice"
            className="mx-auto w-full max-w-6xl object-contain h-auto max-h-[800px]"
            loading="lazy"
          />
        </section>

        {/* Notas de cobertura */}
        <section className="bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center text-sm text-slate-600">
            <p>Días de entrega podrán estar sujetos a cambios.</p>
            <p>Contamos con alianzas con transportistas para llegar a otros destinos, pregunta por ellos.</p>
          </div>
        </section>

        {/* Servicios Logísticos */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
                Nuestra <span className="font-normal">Logística</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Garantizamos entregas en tiempo con nuestra infraestructura especializada en productos foodservice.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Seco */}
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Producto Seco</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-slate-600">
                  Almacenamiento a temperatura ambiente en bodegas climatizadas con control de humedad.
                </p>
              </div>

              {/* Refrigerado */}
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
                  <svg className="h-8 w-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Refrigerado</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-slate-600">
                  Cadena de frío controlada de 0°C a 4°C con monitoreo constante de temperatura.
                </p>
              </div>

              {/* Congelado */}
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Congelado</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-slate-600">
                  Ultracongelación a -18°C con transporte refrigerado especializado para mantener la cadena de frío.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <PageBanner
          src="banner-zona.webp"
          alt="¿Necesitas Cobertura en tu Zona? — San Patric Foodservice"
          title={<>¿Necesitas <span className="font-normal">Cobertura</span> en tu Zona?</>}
          subtitle="Contáctanos para verificar disponibilidad en tu localidad y recibe una cotización personalizada para tu negocio."
          variant="dark"
          compact
        />
        <section className="bg-brand-500 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-brand-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-500"
              >
                Solicitar Cotización
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="tel:+525585905780"
                className="inline-flex items-center justify-center gap-2 rounded border-2 border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-500"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar Ahora
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
