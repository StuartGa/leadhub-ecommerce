import { Link } from "react-router-dom";

import { LANDING_STRIP_BRANDS } from "../../../application/constants/landingAssets";

function BrandLogo({
  name,
  logo,
  decorative = false,
  mobile = false,
}: {
  name: string;
  logo: string;
  decorative?: boolean;
  mobile?: boolean;
}) {
  return (
    <img
      src={logo}
      alt={decorative ? "" : name}
      className={
        mobile
          ? "h-8 w-auto max-w-[64px] object-contain sm:h-14 sm:max-w-[140px] lg:h-16 lg:max-w-[150px]"
          : "h-12 w-auto max-w-[120px] object-contain sm:h-14 sm:max-w-[140px] lg:h-16 lg:max-w-[150px]"
      }
      loading="eager"
    />
  );
}

function BrandLogoGrid({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={
        mobile
          ? "grid w-full grid-cols-5 items-center justify-items-center gap-1.5 sm:hidden"
          : "hidden w-full max-w-[720px] grid-cols-2 items-center justify-items-center gap-x-6 gap-y-5 sm:grid sm:grid-cols-3 sm:gap-x-8 lg:flex-1 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-4"
      }
    >
      {LANDING_STRIP_BRANDS.map((brand) => {
        const logo = (
          <BrandLogo
            name={brand.name}
            logo={brand.logo}
            decorative={Boolean(brand.href)}
            mobile={mobile}
          />
        );

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

        return <div key={brand.id}>{logo}</div>;
      })}
    </div>
  );
}

export function LandingBrandsStrip() {
  return (
    <section className="shrink-0 bg-gradient-to-b from-white to-slate-50/60 py-3 pb-3 sm:py-6 lg:border-b lg:border-slate-100">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="w-full text-center sm:max-w-md lg:max-w-sm lg:text-left">
          <h2 className="text-base font-bold text-brand-800 sm:text-2xl">
            Marcas líderes. Resultados comprobados.
          </h2>
          <p className="mt-1 hidden text-sm leading-relaxed text-slate-600 sm:mt-2 sm:block">
            Trabajamos con marcas reconocidas a nivel internacional para ofrecerte
            productos de calidad premium y consistencia en cada entrega.
          </p>
        </div>

        <div
          className="hidden h-16 w-px shrink-0 bg-slate-200 lg:block"
          aria-hidden="true"
        />

        <BrandLogoGrid mobile />
        <BrandLogoGrid />
      </div>
    </section>
  );
}
