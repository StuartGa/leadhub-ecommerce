import { useCallback, useRef } from "react";
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
  "w-[min(100%,280px)] shrink-0 snap-start sm:w-[min(48%,300px)] lg:w-[min(32%,280px)]";

function CarouselButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

export function LandingProductCarousel({ products }: { products: LandingFeaturedProduct[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-carousel-card]");
    const gap = 16;
    const amount = firstCard ? firstCard.offsetWidth + gap : track.clientWidth * 0.85;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-end gap-2 sm:absolute sm:top-0 sm:right-0 sm:z-10 sm:-mt-14">
        <CarouselButton direction="prev" onClick={() => scroll("prev")} label="Producto anterior" />
        <CarouselButton direction="next" onClick={() => scroll("next")} label="Siguiente producto" />
      </div>

      <div
        ref={trackRef}
        className="-mx-1 flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [scrollbar-width:none] snap-x snap-mandatory sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} data-carousel-card className={CAROUSEL_CARD_CLASS}>
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
