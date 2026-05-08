import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { brandService } from "../../application/services/brandService";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function BrandsPage() {
  useDocumentTitle("Marcas — San Patric Foodservice");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const highlightedBrandId = searchParams.get("brand");
  const brands = brandService.getAll();

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
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-50 to-white px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-sans text-4xl font-bold uppercase tracking-wider text-slate-900 sm:text-5xl">
              Nuestras <span className="font-normal">Marcas</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700">
              Trabajamos con más de 35 proveedores líderes en la industria alimentaria 
              para ofrecerte los mejores productos en las tres temperaturas: secos, 
              refrigerados y congelados.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-brand-500 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-white">+35</div>
                <div className="text-xl text-brand-50">Proveedores Premium</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-white">+200</div>
                <div className="text-xl text-brand-50">Productos Diferentes</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-white">100%</div>
                <div className="text-xl text-brand-50">Calidad Garantizada</div>
              </div>
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
            
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredBrands.map((brand) => (
                <div
                  id={`brand-${brand.id}`}
                  key={brand.id}
                  className={`group flex aspect-square items-center justify-center rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-500 ${highlightedBrandId === brand.id ? "border-brand-500 ring-2 ring-brand-200" : "border-slate-200"}`}
                >
                  <div className="text-center">
                    <div className="mb-3 flex h-14 w-24 items-center justify-center">
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

            {filteredBrands.length === 0 && (
              <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-slate-700">No encontramos marcas con ese criterio de búsqueda.</p>
              </div>
            )}

            {/* Note for client */}
            <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Los logos mostrados son placeholders. Favor de proporcionar 
                los logos reales de las marcas en formato PNG o SVG con fondo transparente para 
                reemplazarlos.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Categorías <span className="font-normal">Disponibles</span>
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Acompañantes", icon: "🍚", temp: "Congelado" },
                { name: "Azúcar y Endulzantes", icon: "🍯", temp: "Seco" },
                { name: "Estuchados", icon: "📦", temp: "Seco" },
                { name: "Papas y Botanas", icon: "🥔", temp: "Seco" },
                { name: "Proteína", icon: "🥩", temp: "Congelado" },
                { name: "Repostería", icon: "🍰", temp: "Congelado" },
                { name: "Salsas y Aderezos", icon: "🧂", temp: "Refrigerado" },
                { name: "Verduras y Leguminosas", icon: "🥦", temp: "Congelado" },
                { name: "Quesos", icon: "🧀", temp: "Refrigerado" },
              ].map((category) => (
                <div
                  key={category.name}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-500"
                >
                  <div className="mb-3 text-4xl">{category.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{category.name}</h3>
                  <div className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
                    {category.temp}
                  </div>
                </div>
              ))}
            </div>
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
