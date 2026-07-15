import { Link } from "react-router-dom";

import { LOGO_COLOR } from "../../../application/constants/assets";
import { LANDING_ASSETS } from "../../../application/constants/landingAssets";
import { LeadForm } from "./LeadForm";

export function LandingHeroSection() {
  return (
    <section className="relative min-h-[480px] overflow-hidden lg:min-h-[560px]">
      <img
        src={LANDING_ASSETS.hero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-right lg:object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20 lg:from-white lg:via-white/75 lg:to-transparent" />

      <div className="relative mx-auto flex min-h-[480px] max-w-[1200px] flex-col px-6 py-5 lg:min-h-[560px] lg:py-6">
        <Link to="/" className="inline-block shrink-0">
          <img
            src={LOGO_COLOR}
            alt="Alimentos Convenientes san patric"
            className="h-14 w-auto sm:h-16 lg:h-[4.5rem]"
          />
        </Link>

        <div className="mt-5 flex flex-1 flex-col gap-6 lg:mt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl lg:max-w-[520px]">
            <h1 className="text-[1.65rem] font-bold leading-[1.2] tracking-tight text-slate-900 sm:text-3xl lg:text-[2.35rem]">
              Soluciones que impulsan tu cocina,{" "}
              <span className="text-brand-800">resultados que se saborean.</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Ingredientes confiables, rendimiento constante y sabor que tus
              clientes notan.
            </p>
          </div>

          <div className="w-full shrink-0 lg:max-w-[400px]">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
