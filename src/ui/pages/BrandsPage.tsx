import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useBrands } from "../../application/hooks/useBrands";
import { LOGO_PLACEHOLDER } from "../../application/constants/assets";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useJsonLd } from "../../application/hooks/useJsonLd";
import { slugify } from "../../application/utils/slugify";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageBanner } from "../components/common/PageBanner";
import { StatCounter } from "../components/common/StatCounter";

export function BrandsPage() {
  useDocumentTitle(
    "Marcas — San Patric Foodservice",
    "Más de 35 marcas líderes en la industria alimentaria para foodservice. Explora nuestro catálogo de proveedores con productos en seco, refrigerado y congelado. Calidad premium garantizada.",
  );

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Marcas Foodservice — San Patric",
    description: "Más de 35 marcas líderes en la industria alimentaria para foodservice. Productos en seco, refrigerado y congelado.",
    url: `${import.meta.env.BASE_URL || "/"}marcas`,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const highlightedBrandId = searchParams.get("brand");
  const { brands, loading: brandsLoading } = useBrands();

  const filteredBrands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter((brand) => brand.name.toLowerCase().includes(q));
  }, [brands, query]);

  const totalCount = brands.length;
  const currentCount = filteredBrands.length;

  useEffect(() => {
    if (!highlightedBrandId) return;
    const element = document.getElementById(`brand-${highlightedBrandId}`);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightedBrandId, filteredBrands]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <PageBanner
          src="banner-marcas.webp"
          alt="Nuestras Marcas — San Patric Foodservice"
          title={<>Nuestras <span className="font-normal">Marcas</span></>}
          subtitle="Trabajamos con más de 35 proveedores líderes en la industria alimentaria para ofrecerte los mejores productos en las tres temperaturas: secos, refrigerados y congelados."
          variant="light"
        />

        {/* Stats Section */}
        <section className="bg-brand-500 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <StatCounter target={35} prefix="+" label="Proveedores Premium" dark />
              <StatCounter target={200} prefix="+" label="Productos Diferentes" dark />
              <StatCounter target={100} suffix="%" label="Calidad Garantizada" dark />
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Marcas <span className="font-normal">Asociadas</span>
            </h2>

            <div className="mx-auto mb-8 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => {
                    const next = new URLSearchParams(searchParams);
                    const value = event.target.value;

                    if (!value.trim()) {
                      next.delete("q");
                      next.delete("brand");
                    } else {
                      next.set("q", value);
                    }

                    setSearchParams(next, { replace: true });
                  }}
                  placeholder="Buscar marca..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pl-11 text-slate-900 placeholder-slate-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <svg
                  className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Mostrando <span className="font-semibold text-slate-900">{currentCount}</span> de <span className="font-semibold text-slate-900">{totalCount}</span> marcas.
              </p>
            </div>
            
            {brandsLoading && (
              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 px-6 py-4 text-center text-sm text-slate-600">
                Cargando marcas...
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredBrands.map((brand) => (
                <Link
                  id={`brand-${brand.id}`}
                  key={brand.id}
                  to={`/productos?marca=${encodeURIComponent(slugify(brand.name))}`}
                  className={`group flex aspect-square items-center justify-center rounded-lg border bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-brand-500 ${highlightedBrandId === brand.id ? "border-brand-500 ring-2 ring-brand-200" : "border-slate-200"}`}
                >
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                    onError={(event) => {
                      const img = event.currentTarget;
                      if (img.src.includes(LOGO_PLACEHOLDER)) return;
                      img.src = LOGO_PLACEHOLDER;
                    }}
                  />
                </Link>
              ))}
            </div>

            {filteredBrands.length === 0 && (
              <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-slate-700">No encontramos marcas con ese criterio de búsqueda.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-500 to-brand-900 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-sans text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
              ¿Buscas <span className="font-normal">Productos Específicos?</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-brand-50">
              Contacta a nuestro equipo de ventas para conocer el catálogo completo 
              de productos disponibles por cada marca.
            </p>
            <a
              href="/contact"
              className="inline-block rounded bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-brand-600 transition-all hover:bg-slate-50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600 focus-visible:outline-none"
            >
              Solicitar Cotización
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
