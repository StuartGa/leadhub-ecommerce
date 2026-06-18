import { Link } from "react-router-dom";

import type { LandingFeaturedProduct } from "../../../application/constants/landingAssets";

type LandingProductGridProps = {
  products: LandingFeaturedProduct[];
  columns?: 2 | 3 | 4;
};

const columnClass: Record<NonNullable<LandingProductGridProps["columns"]>, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function LandingProductGrid({ products, columns = 2 }: LandingProductGridProps) {
  return (
    <div className={`grid gap-4 sm:gap-5 ${columnClass[columns]}`}>
      {products.map((product) => (
        <Link
          key={product.id}
          to={product.href}
          className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all hover:border-brand-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <div className="flex aspect-square items-center justify-center bg-slate-50 p-3 sm:p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <div className="border-t border-slate-100 px-3 py-2.5 text-center sm:px-4 sm:py-3">
            <p className="text-xs font-semibold text-slate-800 sm:text-sm">{product.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function LandingSectionCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-10 pb-2 text-center sm:mt-12">
      <Link
        to={href}
        className="inline-flex items-center justify-center rounded-full bg-brand-600 px-14 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {label}
      </Link>
    </div>
  );
}
