import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LOGO_PLACEHOLDER } from "../../../application/constants/assets";
import { useBrands } from "../../../application/hooks/useBrands";
import { slugify } from "../../../application/utils/slugify";

export function BrandCarousel() {
  const { brands } = useBrands();
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  // Dividir marcas en dos grupos para los dos carruseles
  const midpoint = Math.ceil(brands.length / 2);
  const brandsRow1 = brands.slice(0, midpoint);
  const brandsRow2 = brands.slice(midpoint);

  useEffect(() => {
    const scroll1 = scrollRef1.current;
    const scroll2 = scrollRef2.current;
    if (!scroll1 || !scroll2 || brands.length === 0) return;

    let animationId1: number;
    let animationId2: number;
    let position1 = 0;
    let position2 = 0;

    const animate1 = () => {
      position1 += 0.5; // Velocidad del scroll
      if (scroll1.scrollWidth && position1 >= scroll1.scrollWidth / 2) {
        position1 = 0;
      }
      scroll1.style.transform = `translateX(-${position1}px)`;
      animationId1 = requestAnimationFrame(animate1);
    };

    const animate2 = () => {
      position2 -= 0.5; // Velocidad del scroll (dirección opuesta)
      if (scroll2.scrollWidth && position2 <= -(scroll2.scrollWidth / 2)) {
        position2 = 0;
      }
      scroll2.style.transform = `translateX(${position2}px)`;
      animationId2 = requestAnimationFrame(animate2);
    };

    animationId1 = requestAnimationFrame(animate1);
    animationId2 = requestAnimationFrame(animate2);

    return () => {
      cancelAnimationFrame(animationId1);
      cancelAnimationFrame(animationId2);
    };
  }, [brands.length]); // ✅ Agregar brands.length como dependencia

  const renderBrandLogo = (brand: typeof brands[0], index: number) => (
    <Link
      key={`${brand.id}-${index}`}
      to={`/productos?marca=${encodeURIComponent(slugify(brand.name))}`}
      className="group inline-flex h-28 w-40 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-brand-500 hover:shadow-md"
    >
      <img
        src={brand.logoUrl}
        alt={brand.name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
        onError={(event) => {
          const img = event.currentTarget;
          if (img.src.includes(LOGO_PLACEHOLDER)) return;
          img.src = LOGO_PLACEHOLDER;
        }}
      />
    </Link>
  );

  return (
    <section className="overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl lg:text-5xl">
            Marcas <span className="font-normal">que Manejamos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Trabajamos con más de 35 proveedores líderes en la industria 
            alimentaria para ofrecerte los mejores productos.
          </p>
        </div>
      </div>

      {/* Carrusel 1 - Dirección derecha */}
      <div className="relative mb-6 overflow-hidden">
        <div
          ref={scrollRef1}
          className="flex gap-6"
          style={{ willChange: "transform" }}
        >
          {/* Duplicamos las marcas para crear el efecto infinito (2x es suficiente) */}
          {brandsRow1.map((brand, index) => renderBrandLogo(brand, index))}
          {brandsRow1.map((brand, index) => renderBrandLogo(brand, index + brandsRow1.length))}
        </div>
      </div>

      {/* Carrusel 2 - Dirección izquierda */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef2}
          className="flex gap-6"
          style={{ willChange: "transform" }}
        >
          {/* Duplicamos las marcas para crear el efecto infinito (2x es suficiente) */}
          {brandsRow2.map((brand, index) => renderBrandLogo(brand, index))}
          {brandsRow2.map((brand, index) => renderBrandLogo(brand, index + brandsRow2.length))}
        </div>
      </div>

      {/* CTA para ver todas las marcas */}
      <div className="mx-auto mt-16 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Link
          to="/marcas"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-brand-600 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Ver Todas las Marcas
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
