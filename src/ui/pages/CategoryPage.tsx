import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useProducts } from "../../application/hooks/useProducts";
import { useQuoteCart } from "../../application/hooks/useQuoteCart";
import { slugify } from "../../application/utils/slugify";
import type { Product } from "../../domain/types/product";
import { ProductCard } from "../components/catalog/ProductCard";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function CategoryPage() {
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { products, loading } = useProducts();
  const { addItem } = useQuoteCart();

  const categoryName = useMemo(() => {
    if (!categorySlug) return undefined;
    const categories = Array.from(new Set(products.map((product) => product.category)));
    return categories.find((category) => slugify(category) === categorySlug);
  }, [categorySlug, products]);

  const categoryProducts = useMemo(() => {
    if (!categoryName) return [];
    return products.filter((product) => product.category === categoryName);
  }, [categoryName, products]);

  useDocumentTitle(
    categoryName
      ? `${categoryName} — San Patric Foodservice`
      : "Categoría no encontrada — San Patric Foodservice",
    categoryName
      ? `Catálogo de ${categoryName} para foodservice. Solicite su cotización personalizada con San Patric Foodservice.`
      : "La categoría solicitada no fue encontrada en el catálogo de San Patric Foodservice.",
  );

  const handleInquire = (product: Product) => {
    addItem({ product });
    navigate("/contact");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="w-full rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">Cargando categoria...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!categoryName) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="w-full rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="mb-2 text-3xl font-bold text-slate-900">Categoría no encontrada</h1>
            <p className="mb-6 text-slate-600">La categoría solicitada no está disponible en el catálogo.</p>
            <Link
              to="/productos"
              className="inline-flex rounded bg-brand-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900"
            >
              Volver a Productos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand-900 to-brand-700 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Categoría</p>
            <h1 className="mb-3 font-sans text-4xl font-bold text-white sm:text-5xl">{categoryName}</h1>
            <p className="max-w-2xl text-white/90">
              Productos seleccionados para operaciones foodservice. Cotización personalizada
              de acuerdo con volumen y frecuencia de compra.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{categoryProducts.length}</span> productos en esta categoría
              </p>
              <Link to="/productos" className="text-sm font-medium text-brand-700 hover:text-brand-900">
                Ver todo el catálogo
              </Link>
            </div>

            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onInquire={handleInquire}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-10 text-center">
                <p className="text-slate-700">No hay productos cargados para esta categoría por ahora.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
