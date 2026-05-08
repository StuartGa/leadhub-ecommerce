import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../../application/hooks/useCountUp";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

interface StatCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function StatCounter({ target, prefix = "", suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp({ target, duration: 1800, enabled: visible });

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 text-5xl font-bold tabular-nums text-white">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xl text-brand-50">{label}</div>
    </div>
  );
}

export function AboutPage() {
  useDocumentTitle("Quiénes Somos — San Patric Foodservice");

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-50 to-white px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-sans text-4xl font-bold uppercase tracking-wider text-slate-900 sm:text-5xl">
              Quié<span className="font-normal">nes Somos</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700">
              Somos un Distribuidor Foodservice, 100% mexicano y con más de 20 años de experiencia 
              en la industria de la alimentación. Nuestra pasión y razón de ser es garantizar la 
              satisfacción total de nuestros clientes a través de la distribución y acondicionamiento 
              de alimentos congelados, refrigerados y secos de la más alta calidad.
            </p>
          </div>
        </section>

        {/* Servicios */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Nuestros <span className="font-normal">Servicios</span>
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Logística */}
              <div className="group rounded-lg border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-brand-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-8 w-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Logística</h3>
                <p className="leading-relaxed text-slate-600">
                  Distribución eficiente y puntual de productos en las tres temperaturas: 
                  secos, refrigerados y congelados, garantizando la cadena de frío.
                </p>
              </div>

              {/* Acondicionamiento */}
              <div className="group rounded-lg border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-brand-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-8 w-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Acondicionamiento de Productos</h3>
                <p className="leading-relaxed text-slate-600">
                  Servicio de maquila especializada para adaptar productos a las necesidades 
                  específicas de tu negocio foodservice.
                </p>
              </div>

              {/* Operador Logístico */}
              <div className="group rounded-lg border border-slate-200 bg-white p-8 shadow-md transition-all hover:shadow-xl hover:border-brand-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-8 w-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">Operador Logístico 2PL y 3PL</h3>
                <p className="leading-relaxed text-slate-600">
                  Soluciones integrales de almacenamiento, gestión de inventarios y distribución 
                  para optimizar tu cadena de suministro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Indicadores */}
        <section className="bg-brand-500 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
              Nuestros <span className="font-normal">Indicadores</span>
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              <StatCounter target={35} prefix="+" label="Proveedores" />
              <StatCounter target={750} prefix="+" label="Clientes Activos" />
              <StatCounter target={200} prefix="+" label="Productos" />
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Misión */}
              <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 shadow-md">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-10 w-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">Misión</h3>
                <p className="leading-relaxed text-slate-700">
                  Ser el aliado estratégico de la industria foodservice en México, garantizando 
                  la distribución de productos de la más alta calidad con un servicio excepcional, 
                  entregas puntuales y soluciones logísticas innovadoras que impulsen el éxito 
                  de nuestros clientes.
                </p>
              </div>

              {/* Visión */}
              <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 shadow-md">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-10 w-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">Visión</h3>
                <p className="leading-relaxed text-slate-700">
                  Consolidarnos como el distribuidor foodservice líder en México, reconocidos 
                  por nuestra excelencia operativa, innovación en servicios logísticos y el 
                  compromiso inquebrantable con la satisfacción total de nuestros clientes y 
                  el crecimiento sostenible de la industria.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* A Quién Atendemos */}
        <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              A Quién <span className="font-normal">Atendemos</span>
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Restaurantes", icon: "🍽️" },
                { name: "Hoteles", icon: "🏨" },
                { name: "Cafeterías", icon: "☕" },
                { name: "Servicios de Catering", icon: "🎉" },
                { name: "Hospitales", icon: "🏥" },
                { name: "Escuelas", icon: "🎓" },
                { name: "Supermercados", icon: "🛒" },
                { name: "Mayoristas", icon: "📦" },
                { name: "Otros Negocios", icon: "🏢" },
              ].map((client) => (
                <div
                  key={client.name}
                  className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-500"
                >
                  <div className="mb-3 text-4xl">{client.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900">{client.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Lo Que Dicen <span className="font-normal">Nuestros Clientes</span>
            </h2>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-md">
                <div className="mb-4 text-4xl text-brand-500">"</div>
                <p className="mb-6 leading-relaxed text-slate-700">
                  Excelente servicio, siempre puntuales con las entregas y productos de calidad. 
                  Han sido un pilar fundamental para nuestro restaurante.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-600">
                    R
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Restaurante El Buen Sabor</div>
                    <div className="text-sm text-slate-600">Guadalajara, Jalisco</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-md">
                <div className="mb-4 text-4xl text-brand-500">"</div>
                <p className="mb-6 leading-relaxed text-slate-700">
                  La variedad de productos y la atención personalizada nos ha permitido optimizar 
                  nuestros costos sin sacrificar calidad.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-600">
                    H
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Hotel Boutique Centro</div>
                    <div className="text-sm text-slate-600">Ciudad de México</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-md">
                <div className="mb-4 text-4xl text-brand-500">"</div>
                <p className="mb-6 leading-relaxed text-slate-700">
                  Confiamos en San Patric hace más de 5 años. Su compromiso con la calidad y 
                  servicio al cliente es insuperable.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-600">
                    C
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Cafetería Urban Coffee</div>
                    <div className="text-sm text-slate-600">Monterrey, Nuevo León</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trabaja con Nosotros CTA */}
        <section className="bg-gradient-to-br from-brand-500 to-brand-900 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-sans text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
              Únete a <span className="font-normal">Nuestro Equipo</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-brand-50">
              ¿Te apasiona la industria foodservice? Estamos buscando talento comprometido 
              para formar parte de nuestra familia.
            </p>
            <a
              href="/trabaja-con-nosotros"
              className="inline-block rounded bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-brand-600 transition-all hover:bg-slate-50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600 focus-visible:outline-none"
            >
              Ver Vacantes
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
