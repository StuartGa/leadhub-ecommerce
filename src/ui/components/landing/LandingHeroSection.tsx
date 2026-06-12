import { Link } from "react-router-dom";

import { LOGO_COLOR } from "../../../application/constants/assets";
import { LANDING_ASSETS } from "../../../application/constants/landingAssets";
import { LeadForm } from "./LeadForm";

export function LandingHeroSection() {
  return (
    <section className="relative min-h-[640px] overflow-hidden lg:min-h-[720px]">
      <img
        src={LANDING_ASSETS.hero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-right lg:object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20 lg:from-white lg:via-white/75 lg:to-transparent" />

      <div className="relative mx-auto flex min-h-[640px] max-w-[1200px] flex-col px-6 py-8 lg:min-h-[720px] lg:py-10">
        <Link to="/" className="inline-block shrink-0">
          <img
            src={LOGO_COLOR}
            alt="Alimentos Convenientes san patric"
            className="h-16 w-auto sm:h-20 lg:h-[5.5rem]"
          />
        </Link>

        <div className="mt-8 flex flex-1 flex-col gap-10 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-xl lg:max-w-[520px]">
            <h1 className="text-[1.75rem] font-bold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Soluciones que impulsan tu cocina,{" "}
              <span className="text-brand-800">resultados que se saborean.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
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
