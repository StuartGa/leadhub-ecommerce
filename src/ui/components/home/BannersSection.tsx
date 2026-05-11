import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    image: `${import.meta.env.BASE_URL}assets/images/banners/banner-1.webp`,
    alt: "Alimentos Convenientes - Servicio de distribución",
  },
  {
    id: 2,
    image: `${import.meta.env.BASE_URL}assets/images/banners/banner-2.webp`,
    alt: "Alimentos Convenientes - Logística especializada",
  },
];

export function BannersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/20 bg-slate-50 py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Carrusel de banners */}
        <div className="relative">
          {/* Container de imágenes */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="w-full flex-shrink-0">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-10 bg-brand-500"
                      : "w-2.5 bg-white/60 hover:bg-white/90"
                  }`}
                  aria-label={`Ir al banner ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Contador de slides */}
          <div className="mt-4 text-center text-sm text-slate-500">
            {currentIndex + 1} / {banners.length}
          </div>
        </div>
      </div>
    </section>
  );
}
