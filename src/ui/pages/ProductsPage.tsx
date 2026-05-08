import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { productService } from "../../application/services/productService";
import type { Product, Temperature, Seasonality } from "../../domain/types/product";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/catalog/ProductCard";

const TEMPERATURES: Temperature[] = ["Seco", "Refrigerado", "Congelado"];
const SEASONALITIES: Seasonality[] = ["Todo el Año", "Temporada"];

export function ProductsPage() {
  useDocumentTitle(
    "Productos Foodservice — San Patric Foodservice",
    "Catálogo completo de productos alimenticios para foodservice: acompañantes, proteínas, salsas, quesos y más. Filtra por temperatura (seco, refrigerado, congelado) y temporalidad. Calidad premium garantizada."
  );

  const [products] = useState<Product[]>(() => productService.getAll());
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "all";
  const selectedTemperature = searchParams.get("temperature") ?? "all";
  const selectedSeasonality = searchParams.get("seasonality") ?? "all";
  const searchQuery = searchParams.get("q") ?? "";

  const categoryOptions = useMemo(() => {
    const categories = new Set(products.map((product) => product.category));
    return Array.from(categories).sort((a, b) => a.localeCompare(b, "es"));
  }, [products]);

  // Aplicar filtros
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filtro por categoría
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Filtro por temperatura
      if (selectedTemperature !== "all" && product.temperature !== selectedTemperature) {
        return false;
      }

      // Filtro por temporalidad
      if (selectedSeasonality !== "all") {
        if (!product.seasonality || product.seasonality !== selectedSeasonality) {
          return false;
        }
      }

      // Filtro por búsqueda de texto
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags.some((tag) => tag.toLowerCase().includes(query));
        
        if (!matchesName && !matchesDescription && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, selectedTemperature, selectedSeasonality, searchQuery]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const handleInquire = (product: Product) => {
    window.location.href = `/contact?products=${product.id}`;
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = 
    selectedCategory !== "all" || 
    selectedTemperature !== "all" || 
    selectedSeasonality !== "all" || 
    searchQuery.trim() !== "";

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-900 to-brand-700 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 font-sans text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl lg:text-6xl">
              Nuestros <span className="font-normal">Productos</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Explora nuestro catálogo completo de productos alimenticios de calidad premium
              para tu negocio foodservice.
            </p>
          </div>
        </section>

        {/* Filtros y Catálogo */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Buscador */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos por nombre, descripción o etiquetas..."
                  value={searchQuery}
                  onChange={(event) => updateParam("q", event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pl-12 text-slate-900 placeholder-slate-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
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
            </div>

            {/* Filtros en Grid */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Filtro por Categoría */}
              <div>
                <label
                  htmlFor="category-filter"
                  className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700"
                >
                  Categoría
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(event) => updateParam("category", event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">Todas las Categorías</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por Temperatura */}
              <div>
                <label
                  htmlFor="temperature-filter"
                  className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700"
                >
                  Temperatura
                </label>
                <select
                  id="temperature-filter"
                  value={selectedTemperature}
                  onChange={(event) => updateParam("temperature", event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">Todas las Temperaturas</option>
                  {TEMPERATURES.map((temp) => (
                    <option key={temp} value={temp}>
                      {temp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por Temporalidad */}
              <div>
                <label
                  htmlFor="seasonality-filter"
                  className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700"
                >
                  Temporalidad
                </label>
                <select
                  id="seasonality-filter"
                  value={selectedSeasonality}
                  onChange={(event) => updateParam("seasonality", event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">Todas las Temporalidades</option>
                  {SEASONALITIES.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón Reset */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <p className="text-sm text-slate-600">
                {filteredProducts.length === 0 && (
                  <span className="font-semibold text-slate-900">
                    No se encontraron productos
                  </span>
                )}
                {filteredProducts.length === 1 && (
                  <span>
                    <span className="font-semibold text-slate-900">1</span> producto encontrado
                  </span>
                )}
                {filteredProducts.length > 1 && (
                  <span>
                    <span className="font-semibold text-slate-900">{filteredProducts.length}</span> productos encontrados
                  </span>
                )}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-brand-600 hover:text-brand-700 focus:outline-none focus:underline"
                >
                  Mostrar todos
                </button>
              )}
            </div>

            {/* Grid de Productos */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onInquire={handleInquire}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-16 text-center">
                <svg
                  className="mx-auto mb-4 h-16 w-16 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  No se encontraron productos
                </h3>
                <p className="mb-6 text-slate-600">
                  Intenta ajustar los filtros o realizar una búsqueda diferente
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              ¿No Encuentras lo que <span className="font-normal">Buscas?</span>
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Contáctanos y nuestro equipo te ayudará a encontrar el producto perfecto
              para las necesidades de tu negocio.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Contáctanos Ahora
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
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
