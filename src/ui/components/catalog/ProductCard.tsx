import { motion } from "framer-motion";
import type { Product } from "../../../domain/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
  onInquire: (product: Product) => void;
}

export function ProductCard({ product, index, onInquire }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="aspect-video overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900">
            {product.name}
          </h3>
          {!product.inStock && (
            <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
              Coming soon
            </span>
          )}
        </div>

        <p className="flex-1 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toLocaleString()}
          </span>
          <button
            type="button"
            onClick={() => onInquire(product)}
            disabled={!product.inStock}
            className="cursor-pointer rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Inquire Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
