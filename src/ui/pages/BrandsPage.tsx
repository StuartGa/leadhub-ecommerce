import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
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
        <section className="bg-slate-50/70 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Categorías <span className="font-normal">Disponibles</span>
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Acompañantes",
                  temp: "Congelado",
                  image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Azúcar y Endulzantes",
                  temp: "Seco",
                  image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Estuchados",
                  temp: "Seco",
                  image: "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Papas y Botanas",
                  temp: "Seco",
                  image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Proteína",
                  temp: "Congelado",
                  image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Repostería",
                  temp: "Congelado",
                  image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Salsas y Aderezos",
                  temp: "Refrigerado",
                  image: "https://images.unsplash.com/photo-1598511757337-fe2cafc31a3c?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Verduras y Leguminosas",
                  temp: "Congelado",
                  image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
                {
                  name: "Quesos",
                  temp: "Refrigerado",
                  image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=72&fm=webp",
                },
              ].map((category, index) => (
                <motion.article
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className={`group relative overflow-hidden rounded-lg border border-white/45 bg-white/40 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${index === 8 ? "sm:col-span-2 lg:col-span-2 lg:col-start-2" : ""}`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${index === 8 ? "h-52" : "h-44"}`}
                    onError={(event) => {
                      const img = event.currentTarget;
                      if (img.src.includes("/images/product-placeholder.webp")) return;
                      img.src = "/images/product-placeholder.webp";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-white/76 via-white/62 to-white/84 transition-colors duration-300 group-hover:from-white/70 group-hover:via-white/54 group-hover:to-white/76" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-5 text-center">
                    <h3 className="text-base font-semibold text-slate-900">{category.name}</h3>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-600">{category.temp}</p>
                    <Link
                      to={`/productos?category=${encodeURIComponent(category.name)}`}
                      className="mt-1 inline-flex rounded border border-brand-300/60 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-slate-900 transition-colors hover:bg-brand-500 hover:text-white"
                    >
                      Ver todo
                    </Link>
                  </div>
                </motion.article>
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
