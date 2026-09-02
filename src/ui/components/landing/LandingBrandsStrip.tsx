import { LANDING_STRIP_BRANDS } from "../../../application/constants/landingAssets";

function BrandLogo({
  name,
  logo,
  mobile = false,
}: {
  name: string;
  logo: string;
  mobile?: boolean;
}) {
  return (
    <img
      src={logo}
      alt={name}
      className={
        mobile
          ? "h-11 w-auto max-w-[84px] object-contain sm:h-16 sm:max-w-[170px] lg:h-[5.5rem] lg:max-w-[200px]"
          : "h-14 w-auto max-w-[140px] object-contain sm:h-[4.25rem] sm:max-w-[180px] lg:h-24 lg:max-w-[220px]"
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
          : "hidden w-full max-w-[820px] grid-cols-2 items-center justify-items-center gap-x-6 gap-y-6 sm:grid sm:grid-cols-3 sm:gap-x-10 lg:flex-1 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-5"
      }
    >
      {LANDING_STRIP_BRANDS.map((brand) => (
        <div key={brand.id}>
          <BrandLogo name={brand.name} logo={brand.logo} mobile={mobile} />
        </div>
      ))}
    </div>
  );
}

export function LandingBrandsStrip() {
  return (
    <section className="shrink-0 bg-gradient-to-b from-white to-slate-50/60 py-4 pb-4 sm:py-7 lg:border-b lg:border-slate-100">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
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
          className="hidden h-24 w-px shrink-0 bg-slate-200 lg:block"
          aria-hidden="true"
        />

        <BrandLogoGrid mobile />
        <BrandLogoGrid />
      </div>
    </section>
  );
}
