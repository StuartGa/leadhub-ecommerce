import {
  LANDING_BRAND_LOGOS,
  LANDING_STANISLAUS_PRODUCTS,
} from "../../../application/constants/landingAssets";
import { CheckList, IdealForGrid } from "./IdealForGrid";
import { LandingProductShowcase, LandingSectionCta } from "./LandingProductGrid";
import { STANISLAUS_IDEAL_FOR } from "./idealForData";

const FEATURES = [
  "Sabor natural y auténtico",
  "Textura ideal para salsas, guisos y horneados",
  "Presentaciones para cada necesidad de tu cocina",
  "Rendimiento superior y merma mínima",
];

export function LandingStanislausSection() {
  return (
    <section className="bg-gradient-to-b from-brand-50/80 via-white to-white pb-0 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-4 sm:gap-5">
            <img
              src={LANDING_BRAND_LOGOS.stanislaus}
              alt=""
              aria-hidden="true"
              className="h-28 w-auto shrink-0 object-contain sm:h-36 lg:h-40"
              loading="lazy"
            />
            <div className="min-w-0">
              <p className="font-brand-serif text-[1.375rem] font-normal leading-none tracking-normal text-brand-600 sm:text-[1.5rem]">
                Stanislaus
              </p>
              <h2 className="mt-2.5 font-sans text-[1.625rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-[1.75rem] lg:text-[1.875rem]">
                Tomates que elevan tus recetas
              </h2>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Tomates cultivados bajo los más altos estándares para ofrecer
            color, sabor y textura consistentes en cada preparación.
          </p>
          <div className="mt-6">
            <CheckList items={FEATURES} />
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:mt-12 sm:p-6">
          <LandingProductShowcase products={LANDING_STANISLAUS_PRODUCTS} />
        </div>

        <LandingSectionCta href="/productos?marca=stanislaus" label="Ver más" />
      </div>

      <IdealForGrid items={STANISLAUS_IDEAL_FOR} variant="grey" />
    </section>
  );
}
