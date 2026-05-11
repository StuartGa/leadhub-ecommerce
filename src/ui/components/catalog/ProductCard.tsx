import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCT_PLACEHOLDER } from "../../../application/constants/assets";
import type { Product } from "../../../domain/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
  onInquire: (product: Product) => void;
}

function formatPrice(price?: number): string | null {
  if (price === undefined || price === null || price === 0) return null;
  return `$${price.toLocaleString("es-MX")} MXN`;
}

export const ProductCard = memo(function ProductCard({ product, index, onInquire }: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(product.imageUrl);

  const priceLabel = formatPrice(product.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      <div className="aspect-[4/3] bg-slate-50 p-4">
        <Link to={`/products/${product.id}`} className="block h-full">
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageSrc(PRODUCT_PLACEHOLDER)}
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-xl font-normal text-slate-900">
            <Link
              to={`/products/${product.id}`}
              className="transition-colors hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              {product.name}
            </Link>
          </h3>
          {!product.inStock && (
            <span className="shrink-0 rounded bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
              Próximamente
            </span>
          )}
        </div>

        <p className="flex-1 font-sans text-base font-light leading-relaxed text-slate-600">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.tags.filter(t => !t.startsWith("precio-")).map((tag) => (
            <span
              key={tag}
              className="rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600">
          Pedido mínimo: <span className="font-semibold text-slate-900">{product.minOrderQty}</span> {product.inventoryUnit}{product.minOrderQty > 1 ? "es" : ""}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          {priceLabel ? (
            <span className="font-sans text-base font-semibold text-brand-600">{priceLabel}</span>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-3">
            <Link
              to={`/products/${product.id}`}
              className="font-sans text-sm font-normal text-slate-600 transition-colors hover:text-brand-500"
            >
              Detalles
            </Link>
            <button
              type="button"
              onClick={() => onInquire(product)}
              disabled={!product.inStock}
              className="cursor-pointer rounded bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cotizar
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
});
