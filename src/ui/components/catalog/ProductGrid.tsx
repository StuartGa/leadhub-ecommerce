import type { Product } from "../../../domain/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onInquire: (product: Product) => void;
}

export function ProductGrid({ products, onInquire }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="px-4 py-24 text-center">
        <p className="text-slate-500">No products available at this time.</p>
      </section>
    );
  }

  return (
    <section
      id="catalog"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="catalog-heading"
    >
      <h2
        id="catalog-heading"
        className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
      >
        Our Services
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
    </section>
  );
}
