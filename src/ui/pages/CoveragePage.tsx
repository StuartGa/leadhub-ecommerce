import { Link } from "react-router-dom";
import { CANONICAL_BASE } from "../../application/constants/seo";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useJsonLd } from "../../application/hooks/useJsonLd";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageBanner } from "../components/common/PageBanner";
import { StatCounter } from "../components/common/StatCounter";

export function CoveragePage() {
  useDocumentTitle(
    "Cobertura Nacional — San Patric Foodservice",
    "Cobertura en 9 estados de México: CDMX, Estado de México, Morelos, Puebla, Veracruz, Querétaro, Jalisco, Guanajuato y Tlaxcala. 98% de efectividad. Logística especializada en seco, refrigerado y congelado.",
    "/cobertura",
  );

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${CANONICAL_BASE}/` },
      { "@type": "ListItem", position: 2, name: "Cobertura", item: `${CANONICAL_BASE}/cobertura` },
    ],
  });

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
              <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-600">
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
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Producto Seco</h3>
                <p className="flex-1 font-sans text-sm font-light leading-relaxed text-slate-600">
                  Almacenamiento a temperatura ambiente en bodegas climatizadas con control de humedad.
                </p>
                <Link
                  to="/productos?temperature=Seco"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-900"
                >
                  Ver Productos
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Refrigerado */}
              <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M24 10v6m0 16v6M12 20h6m12 0h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    {[{ cx: 15, cy: 15 }, { cx: 33, cy: 15 }, { cx: 33, cy: 33 }, { cx: 15, cy: 33 }].map((p, i) => (
                      <line key={i} x1={p.cx - 3} y1={p.cy - 3} x2={p.cx + 3} y2={p.cy + 3}
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    ))}
                  </svg>
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Refrigerado</h3>
                <p className="flex-1 font-sans text-sm font-light leading-relaxed text-slate-600">
                  Cadena de frío controlada de 0°C a 4°C con monitoreo constante de temperatura.
                </p>
                <Link
                  to="/productos?temperature=Refrigerado"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-900"
                >
                  Ver Productos
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Congelado */}
              <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
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
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Congelado</h3>
                <p className="flex-1 font-sans text-sm font-light leading-relaxed text-slate-600">
                  Ultracongelación a -18°C con transporte refrigerado especializado para mantener la cadena de frío.
                </p>
                <Link
                  to="/productos?temperature=Congelado"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-900"
                >
                  Ver Productos
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
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
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-brand-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-500"
              >
                Solicitar Cotización
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
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
