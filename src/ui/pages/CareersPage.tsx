import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { jobs } from "../../infrastructure/data/jobs";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useState } from "react";

export function CareersPage() {
  useDocumentTitle(
    "Trabaja con Nosotros — San Patric Foodservice",
    "Únete al equipo de San Patric Foodservice. Vacantes en ventas, logística, almacén, calidad y marketing. Empresa 100% mexicana con +20 años en foodservice. Prestaciones superiores a la ley y plan de carrera."
  );

  const [openJob, setOpenJob] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const typeStyles: Record<string, string> = {
    "Tiempo Completo": "bg-green-100 text-green-700",
    "Medio Tiempo": "bg-blue-100 text-blue-700",
    "Prácticas": "bg-purple-100 text-purple-700",
    "Freelance": "bg-orange-100 text-orange-700",
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 to-brand-700 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 font-sans text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl lg:text-6xl">
              Únete a <span className="font-normal">Nuestro Equipo</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Forma parte de una empresa 100% mexicana líder en distribución foodservice
              con más de 20 años de experiencia en el mercado.
            </p>
          </div>
        </section>

        {/* ¿Por qué trabajar con nosotros? */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
                ¿Por Qué <span className="font-normal">San Patric?</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-8 w-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Crecimiento Profesional</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-slate-600">
                  Plan de carrera definido con capacitación continua y oportunidades de desarrollo.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-8 w-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Excelente Ambiente</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-slate-600">
                  Cultura de respeto, colaboración y trabajo en equipo con valores sólidos.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                  <svg className="h-8 w-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-sans text-xl font-semibold text-slate-900">Estabilidad Laboral</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-slate-600">
                  Empresa sólida con más de 20 años en el mercado, prestaciones superiores a la ley.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vacantes */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
                Vacantes <span className="font-normal">Disponibles</span>
              </h2>
              <p className="text-lg text-slate-600">
                {jobs.length} posiciones abiertas en diferentes áreas
              </p>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenJob(openJob === job.id ? null : job.id)}
                    className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <div className="flex-1">
                      <h3 className="mb-1 font-sans text-lg font-semibold text-slate-900">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyles[job.type] ?? "bg-slate-100 text-slate-600"}`}>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <svg
                      className={`ml-4 h-5 w-5 flex-shrink-0 text-slate-400 transition-transform ${openJob === job.id ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openJob === job.id && (
                    <div className="border-t border-slate-200 px-6 pb-6">
                      <p className="mb-4 font-sans text-sm leading-relaxed text-slate-600">
                        {job.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
                          Requisitos
                        </h4>
                        <ul className="list-inside list-disc space-y-1">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="text-sm text-slate-600">{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
                          Responsabilidades
                        </h4>
                        <ul className="list-inside list-disc space-y-1">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i} className="text-sm text-slate-600">{resp}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs text-slate-500">
                          Publicado el {formatDate(job.postedAt)}
                        </span>
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 rounded bg-brand-500 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                        >
                          Aplicar Ahora
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-500 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
              ¿No encuentras <span className="font-normal">tu Vacante?</span>
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Envíanos tu CV y nos pondremos en contacto cuando surja una oportunidad
              que se ajuste a tu perfil.
            </p>
            <a
              href="mailto:talento@sampatricfoodservice.com"
              className="inline-flex items-center gap-2 rounded bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-brand-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-500"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar CV
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
