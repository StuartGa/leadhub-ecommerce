import { Link } from "react-router-dom";

import {
  categoryShowcaseItems,
  getCategoryShowcaseHref,
} from "../../../infrastructure/data/categoryShowcase";
import { CategoryIcon } from "../catalog/CategoryIcon";

interface CategoriesSectionProps {
  showTitle?: boolean;
  className?: string;
}

export function CategoriesSection({
  showTitle = true,
  className = "",
}: CategoriesSectionProps) {
  return (
    <section
      className={`bg-slate-100/90 py-20 ${className}`}
      aria-labelledby={showTitle ? "categories-heading" : undefined}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="mb-12 text-center">
            <h2
              id="categories-heading"
              className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl"
            >
              Categorías <span className="font-normal">de Productos</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Explora nuestro catálogo por categoría y encuentra los alimentos
              que tu operación necesita.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categoryShowcaseItems.map((item) => (
            <Link
              key={item.name}
              to={getCategoryShowcaseHref(item)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-label={item.name}
            >
              <img
                src={item.imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 shadow-md transition-transform duration-300 group-hover:scale-105 sm:bottom-4 sm:left-4 sm:h-12 sm:w-12">
                <CategoryIcon id={item.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
