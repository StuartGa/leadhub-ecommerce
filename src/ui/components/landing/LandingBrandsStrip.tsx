import { LANDING_BRAND_LOGOS } from "../../../application/constants/landingAssets";

export function LandingBrandsStrip() {
  return (
    <section className="border-b border-slate-100 bg-white py-12 sm:py-14">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-lg text-center lg:text-left">
          <h2 className="text-2xl font-bold text-brand-800 sm:text-[1.75rem]">
            Marcas líderes. Resultados comprobados.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Trabajamos con marcas reconocidas a nivel internacional para ofrecerte
            productos de calidad premium, consistencia en cada entrega y la
            confianza que tu operación necesita.
          </p>
        </div>

        <div
          className="hidden h-24 w-px shrink-0 bg-slate-200 lg:block"
          aria-hidden="true"
        />

        <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16 lg:gap-14">
          <img
            src={LANDING_BRAND_LOGOS.stanislaus}
            alt="Stanislaus"
            className="h-28 w-auto max-w-[280px] object-contain sm:h-32 lg:h-36"
            loading="lazy"
          />
          <img
            src={LANDING_BRAND_LOGOS.simplot}
            alt="Simplot"
            className="h-24 w-auto max-w-[260px] object-contain sm:h-28 lg:h-32"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
