import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

interface CoverageRegion {
  name: string;
  color: string;
  states: string[];
  description: string;
}

export function CoveragePage() {
  useDocumentTitle(
    "Cobertura Nacional — San Patric Foodservice",
    "Cobertura nacional en México con centros de distribución en CDMX, Monterrey, Guadalajara y Mérida. Entregas en 24-48h con 98% de efectividad. Logística especializada en seco, refrigerado y congelado."
  );

  const regions: CoverageRegion[] = [
    {
      name: "Zona Centro",
      color: "brand",
      states: ["Ciudad de México", "México", "Morelos", "Hidalgo", "Puebla", "Tlaxcala", "Querétaro"],
      description: "Centro de operaciones principal con almacén y centro de distribución en CDMX",
    },
    {
      name: "Zona Norte",
      color: "slate",
      states: ["Nuevo León", "Coahuila", "Chihuahua", "Sonora", "Tamaulipas", "Baja California"],
      description: "Red de distribución consolidada cubriendo la franja fronteriza",
    },
    {
      name: "Zona Occidente",
      color: "amber",
      states: ["Jalisco", "Guanajuato", "Michoacán", "Colima", "Aguascalientes", "Nayarit", "Zacatecas", "San Luis Potosí"],
      description: "Presencia estratégica en el Bajío y corredor industrial",
    },
    {
      name: "Zona Sur-Sureste",
      color: "emerald",
      states: ["Veracruz", "Oaxaca", "Chiapas", "Tabasco", "Campeche", "Quintana Roo", "Yucatán", "Guerrero"],
      description: "Cobertura en expansión para la región sur y península",
    },
  ];

  const stats = [
    { value: "32", label: "Estados" },
    { value: "4", label: "Regiones" },
    { value: "24-48h", label: "Tiempo de Entrega" },
    { value: "98%", label: "Efectividad" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 to-brand-700 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 font-sans text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl lg:text-6xl">
              Cobertura <span className="font-normal">Nacional</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Distribuimos a toda la República Mexicana con 4 centros de distribución
              estratégicamente ubicados para garantizar entregas puntuales.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mb-2 font-sans text-3xl font-bold text-brand-500 sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="font-sans text-sm font-light uppercase tracking-wide text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mapa SVG de México */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
                Presencia en <span className="font-normal">Todo México</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Nuestros centros de distribución y rutas logísticas cubren las principales
                ciudades del país.
              </p>
            </div>

            {/* Mapa simplificado de México con regiones */}
            <div className="mx-auto mb-12 max-w-2xl">
              <svg viewBox="0 0 400 280" className="w-full" role="img" aria-label="Mapa de cobertura en México">
                {/* Territorio base */}
                <path
                  d="M50,80 L60,60 L80,50 L100,45 L120,40 L155,30 L180,28 L200,30 L220,28 L250,25 L270,30 L290,35 L310,50 L330,60 L350,70 L355,85 L360,110 L355,130 L345,145 L330,155 L310,160 L290,165 L270,170 L250,175 L230,180 L210,185 L190,190 L170,195 L155,195 L140,190 L125,180 L110,170 L95,160 L80,155 L65,145 L55,130 L45,110 L40,95 Z"
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                {/* Zona Norte */}
                <path
                  d="M120,40 L155,30 L180,28 L200,30 L220,28 L250,25 L270,30 L290,35 L310,50 L300,70 L280,75 L260,78 L240,80 L220,80 L200,78 L180,80 L160,82 L140,85 L120,45 Z"
                  fill="#475569"
                  fillOpacity="0.3"
                  stroke="#475569"
                  strokeWidth="1"
                />
                {/* Zona Occidente */}
                <path
                  d="M100,80 L120,85 L140,90 L150,110 L145,130 L140,145 L125,155 L110,158 L95,150 L85,140 L80,120 L85,100 Z"
                  fill="#d97706"
                  fillOpacity="0.3"
                  stroke="#d97706"
                  strokeWidth="1"
                />
                {/* Zona Centro */}
                <path
                  d="M160,82 L180,80 L200,78 L220,80 L240,82 L250,100 L245,120 L235,135 L215,140 L195,142 L175,140 L160,135 L150,115 L155,95 Z"
                  fill="#b12455"
                  fillOpacity="0.3"
                  stroke="#b12455"
                  strokeWidth="1"
                />
                {/* Zona Sur-Sureste */}
                <path
                  d="M190,142 L210,140 L230,138 L250,145 L260,155 L270,170 L255,180 L235,182 L215,180 L200,175 L190,165 L185,155 Z"
                  fill="#059669"
                  fillOpacity="0.3"
                  stroke="#059669"
                  strokeWidth="1"
                />
                {/* Puntos de distribución */}
                <circle cx="190" cy="110" r="5" fill="#b12455" stroke="#fff" strokeWidth="2" />
                <circle cx="270" cy="55" r="5" fill="#475569" stroke="#fff" strokeWidth="2" />
                <circle cx="130" cy="110" r="5" fill="#d97706" stroke="#fff" strokeWidth="2" />
                <circle cx="230" cy="165" r="5" fill="#059669" stroke="#fff" strokeWidth="2" />
              </svg>
              <p className="mt-4 text-center text-sm text-slate-500">
                Mapa representativo. Los centros de distribución están ubicados en CDMX, Monterrey, Guadalajara y Mérida.
              </p>
            </div>

            {/* Grid de Regiones */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {regions.map((region) => {
                const colorClasses: Record<string, { border: string; bg: string; text: string; dot: string }> = {
                  brand: { border: "border-l-brand-500", bg: "bg-brand-50", text: "text-brand-700", dot: "bg-brand-500" },
                  slate: { border: "border-l-slate-500", bg: "bg-slate-50", text: "text-slate-700", dot: "bg-slate-500" },
                  amber: { border: "border-l-amber-500", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
                  emerald: { border: "border-l-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
                };
                const c = colorClasses[region.color];

                return (
                  <div
                    key={region.name}
                    className={`rounded-lg border border-slate-200 border-l-4 bg-white p-6 shadow-sm transition-all hover:shadow-md ${c?.border ?? "border-l-brand-500"}`}
                  >
                    <h3 className="mb-2 font-sans text-lg font-semibold text-slate-900">
                      {region.name}
                    </h3>
                    <p className="mb-4 font-sans text-sm font-light text-slate-600">
                      {region.description}
                    </p>
                    <div className="space-y-1.5">
                      {region.states.map((state) => (
                        <div key={state} className="flex items-center gap-2 font-sans text-xs text-slate-600">
                          <span className={`h-2 w-2 rounded-full ${c?.dot ?? "bg-brand-500"}`} />
                          {state}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
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
        <section className="bg-brand-500 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
              ¿Necesitas <span className="font-normal">Cobertura</span> en tu Zona?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Contáctanos para verificar disponibilidad en tu localidad y recibe una cotización
              personalizada para tu negocio.
            </p>
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
                href="tel:+525512345678"
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
