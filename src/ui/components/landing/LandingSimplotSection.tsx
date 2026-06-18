import {
  LANDING_BRAND_LOGOS,
  LANDING_SIMPLOT_PRODUCTS,
} from "../../../application/constants/landingAssets";
import { IdealForGrid } from "./IdealForGrid";
import { LandingProductShowcase, LandingSectionCta } from "./LandingProductGrid";
import { SIMPLOT_IDEAL_FOR } from "./idealForData";

const FEATURES = [
  {
    title: "Cobertura visible",
    desc: "Capa crujiente que se mantiene por más tiempo",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Retención de calor",
    desc: "Permanece caliente y crujiente más tiempo",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
  {
    title: "Calidad premium",
    desc: "Papa seleccionada de origen confiable",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Empaque de alto volumen",
    desc: "Ideal para operaciones de gran escala",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export function LandingSimplotSection() {
  return (
    <section className="bg-gradient-to-br from-amber-50/50 via-[#f7f3ee] to-[#faf8f5] pb-0 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-2xl border border-amber-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6">
            <LandingProductShowcase products={LANDING_SIMPLOT_PRODUCTS} columns={2} />
          </div>

          <div>
            <img
              src={LANDING_BRAND_LOGOS.simplot}
              alt="Simplot"
              className="mb-6 h-20 w-auto max-w-[240px] object-contain sm:h-24"
              loading="lazy"
            />
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Simplot Megacrunch® Fries
            </h2>
            <p className="mt-2 text-sm font-semibold text-brand-700 sm:text-base">
              Corte delgado. Cobertura visible. Crujiente superior.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Papas fritas con recubrimiento exclusivo que garantiza máximo
              crujido, retención de calor y presentación impecable en cada
              servicio, incluso en operaciones de alto volumen.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center text-brand-600 sm:h-16 sm:w-16">
                    {feature.icon}
                  </div>
                  <p className="text-xs font-bold text-brand-700 sm:text-sm">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-xs leading-tight text-slate-500">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <LandingSectionCta href="/productos?marca=simplot" label="Ver más" />
      </div>

      <IdealForGrid items={SIMPLOT_IDEAL_FOR} variant="white" />
    </section>
  );
}
