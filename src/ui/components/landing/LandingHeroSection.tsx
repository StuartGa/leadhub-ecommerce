import { Link } from "react-router-dom";

import { LOGO_COLOR } from "../../../application/constants/assets";
import { LANDING_ASSETS } from "../../../application/constants/landingAssets";
import { LeadForm } from "./LeadForm";

export function LandingHeroSection() {
  return (
    <section className="relative shrink-0 overflow-hidden pb-1 lg:flex lg:min-h-0 lg:flex-1">
      <img
        src={LANDING_ASSETS.hero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[80%_center] lg:object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 lg:from-white lg:via-white/75 lg:to-transparent" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col px-4 py-3 sm:px-6 sm:py-4 lg:h-full lg:py-5">
        <Link to="/" className="inline-block shrink-0">
          <img
            src={LOGO_COLOR}
            alt="Alimentos Convenientes san patric"
            className="h-10 w-auto sm:h-14 lg:h-16"
          />
        </Link>

        <div className="mt-2 flex flex-col gap-3 sm:mt-3 lg:mt-4 lg:min-h-0 lg:flex-1 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="max-w-xl shrink-0 lg:max-w-[460px] lg:pt-1">
            <h1 className="text-[1.15rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-[1.85rem] lg:text-[2rem]">
              Soluciones que impulsan tu cocina,{" "}
              <span className="text-brand-800">resultados que se saborean.</span>
            </h1>
            <p className="mt-2 hidden text-sm leading-relaxed text-slate-600 sm:block lg:mt-3">
              Ingredientes confiables, rendimiento constante y sabor que tus
              clientes notan.
            </p>
          </div>

          <div className="hidden min-h-0 flex-1 overflow-y-auto lg:block lg:max-w-[420px] lg:flex-none lg:pr-1">
            <LeadForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
