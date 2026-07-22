import { Link } from "react-router-dom";

import type { LandingFeaturedProduct } from "../../../application/constants/landingAssets";

export function LandingProductCard({ product }: { product: LandingFeaturedProduct }) {
  return (
    <Link
      to={product.href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all hover:border-brand-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="flex aspect-square items-center justify-center bg-white p-3 sm:p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="border-t border-slate-100 bg-slate-50/50 px-3 py-2.5 text-center sm:px-4 sm:py-3">
        <p className="text-xs font-semibold text-slate-800 sm:text-sm">{product.name}</p>
      </div>
    </Link>
  );
}

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
        <LandingProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const CAROUSEL_CARD_CLASS =
  "w-[240px] shrink-0 sm:w-[260px] lg:w-[280px]";

export function LandingProductCarousel({ products }: { products: LandingFeaturedProduct[] }) {
  const loop = [...products, ...products];
  const durationSeconds = Math.max(products.length * 5, 24);

  return (
    <div
      className="relative isolate w-full max-w-full overflow-x-clip overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]"
      aria-label="Productos destacados"
      role="region"
    >
      <div
        className="landing-marquee-track flex w-max max-w-none gap-4 animate-landing-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] sm:gap-5"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {loop.map((product, index) => (
          <div key={`${product.id}-${index}`} className={CAROUSEL_CARD_CLASS}>
            <LandingProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingProductShowcase({
  products,
  columns = 2,
}: {
  products: LandingFeaturedProduct[];
  columns?: 2 | 3 | 4;
}) {
  if (products.length > 3) {
    return <LandingProductCarousel products={products} />;
  }

  return <LandingProductGrid products={products} columns={columns} />;
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
