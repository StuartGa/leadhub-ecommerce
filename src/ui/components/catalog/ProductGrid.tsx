import type { Product } from "../../../domain/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onInquire: (product: Product) => void;
  loading?: boolean;
}

export function ProductGrid({ products, onInquire, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <section className="px-6 py-24 text-center">
        <p className="text-slate-500">Cargando productos...</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="px-6 py-24 text-center">
        <p className="text-slate-500">No hay productos disponibles.</p>
      </section>
    );
  }

  return (
    <section
      id="catalog"
      className="border-b border-slate-200/20 bg-white py-20"
      aria-labelledby="catalog-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <h2
          id="catalog-heading"
          className="mb-12 text-center font-sans text-3xl font-normal uppercase tracking-wider text-slate-900"
        >
          NUESTROS <span className="font-semibold">PRODUCTOS</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onInquire={onInquire}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
