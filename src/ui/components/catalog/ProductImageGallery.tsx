import { useCallback, useEffect, useState } from "react";

import { ProductImageZoom } from "./ProductImageZoom";

interface ProductImageGalleryProps {
  images: readonly string[];
  alt: string;
  placeholder: string;
}

export function ProductImageGallery({ images, alt, placeholder }: ProductImageGalleryProps) {
  const gallery = images.length > 0 ? images.slice(0, 3) : [placeholder];
  const [activeIndex, setActiveIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveIndex(0);
    setFailed({});
  }, [images]);

  const goTo = useCallback(
    (index: number) => {
      if (gallery.length <= 1) return;
      setActiveIndex((index + gallery.length) % gallery.length);
    },
    [gallery.length],
  );

  const currentSrc = failed[activeIndex] ? placeholder : gallery[activeIndex];

  return (
    <div className="space-y-3">
      <div className="relative">
        <ProductImageZoom
          src={currentSrc}
          alt={alt}
          onError={() => setFailed((prev) => ({ ...prev, [activeIndex]: true }))}
        />

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {gallery.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Ver foto ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    activeIndex === index ? "bg-brand-600" : "bg-white/80 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-lg border ${
                activeIndex === index ? "border-brand-500 ring-2 ring-brand-500/30" : "border-slate-200"
              }`}
            >
              <img
                src={failed[index] ? placeholder : image}
                alt={`${alt} vista ${index + 1}`}
                className="h-20 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
