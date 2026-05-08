import { Link } from "react-router-dom";
import { useBrands } from "../../../application/hooks/useBrands";

export function BrandsSection() {
  const { brands } = useBrands();
  const featuredBrands = brands.filter((brand) => brand.featured).slice(0, 8);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
            Marcas <span className="font-normal">que Manejamos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Trabajamos con más de 35 proveedores líderes en la industria 
            alimentaria para ofrecerte los mejores productos.
          </p>
        </div>

        {/* Grid de marcas destacadas */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
          {featuredBrands.map((brand) => (
            <div
              key={brand.id}
              className="group flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-500"
            >
              <div className="text-center">
                <div className="mb-2 flex h-12 w-24 items-center justify-center">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-12 w-auto object-contain"
                    onError={(event) => {
                      const img = event.currentTarget;
                      if (img.src.includes("/images/logo-placeholder.webp")) return;
                      img.src = "/images/logo-placeholder.webp";
                    }}
                  />
                </div>
                <div className="text-xs font-medium text-slate-600">{brand.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para ver todas las marcas */}
        <div className="mt-12 text-center">
          <Link
            to="/marcas"
            className="inline-flex items-center gap-2 rounded bg-brand-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Ver Todas las Marcas
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
