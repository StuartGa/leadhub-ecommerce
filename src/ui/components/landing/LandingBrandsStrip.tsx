import { Link } from "react-router-dom";

import { LANDING_STRIP_BRANDS } from "../../../application/constants/landingAssets";

function BrandLogo({ name, logo, decorative = false }: { name: string; logo: string; decorative?: boolean }) {
  return (
    <img
      src={logo}
      alt={decorative ? "" : name}
      className="h-16 w-auto max-w-[140px] object-contain sm:h-20 sm:max-w-[160px] lg:h-[4.5rem] lg:max-w-[180px]"
      loading="lazy"
    />
  );
}

export function LandingBrandsStrip() {
  return (
    <section className="-mt-2 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/60 py-8 sm:py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
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

        <div className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-10 lg:max-w-[640px] lg:flex-1 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {LANDING_STRIP_BRANDS.map((brand) => {
            const logo = <BrandLogo name={brand.name} logo={brand.logo} decorative={Boolean(brand.href)} />;

            if (brand.href) {
              return (
                <Link
                  key={brand.id}
                  to={brand.href}
                  aria-label={brand.name}
                  className="transition-opacity hover:opacity-80 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {logo}
                </Link>
              );
            }

            return (
              <div key={brand.id}>
                {logo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
