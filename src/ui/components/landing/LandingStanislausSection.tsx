import { Link } from "react-router-dom";

import {
  LANDING_ASSETS,
  LANDING_BRAND_LOGOS,
} from "../../../application/constants/landingAssets";
import { CheckList, IdealForGrid } from "./IdealForGrid";
import { STANISLAUS_IDEAL_FOR } from "./idealForData";

const FEATURES = [
  "Sabor natural y auténtico",
  "Textura ideal para salsas, guisos y horneados",
  "Presentaciones para cada necesidad de tu cocina",
  "Rendimiento superior y merma mínima",
];

export function LandingStanislausSection() {
  return (
    <section className="bg-white pb-0 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
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

          <div className="flex items-center justify-center lg:justify-end">
            <img
              src={LANDING_ASSETS.stanislausProducts}
              alt="Línea Stanislaus — Alta Cucina, Saporito, Valoroso, 7/11, Tomato Magic y San Nicola"
              className="h-auto w-full max-w-xl object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-10 pb-2 text-center sm:mt-12">
          <Link
            to="/marcas"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-14 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Ver más
          </Link>
        </div>
      </div>

      <IdealForGrid items={STANISLAUS_IDEAL_FOR} variant="grey" />
    </section>
  );
}
