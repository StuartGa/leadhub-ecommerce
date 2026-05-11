import { Link } from "react-router-dom";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-slate-200/20 bg-white/75 py-20 backdrop-blur-sm"
    >
      {/* Watermark Decoration */}
      <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/4 -translate-y-1/4 opacity-5">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-full w-full text-brand-500"
        >
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      </div>

      <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-sans text-3xl font-normal uppercase tracking-wider text-slate-900">
            ¿QUIÉNES <span className="font-semibold">SOMOS?</span>
          </h2>
          <p className="mb-4 font-sans text-lg font-light leading-relaxed text-slate-600">
            <strong className="text-slate-900">
              Alimentos Convenientes San Patric
            </strong>{" "}
            somos una empresa{" "}
            <strong className="text-slate-900">100% Mexicana</strong> con más de
            20 años de experiencia.
          </p>
          <p className="mb-8 font-sans text-lg font-light leading-relaxed text-slate-600">
            Nos especializamos en la distribución y acondicionamiento (Maquila,
            2PL / 3PL) de alimentos{" "}
            <strong className="text-slate-900">
              congelados, refrigerados y secos
            </strong>
            , brindando soluciones integrales a la industria de alimentos y
            retail en México.
          </p>
          <Link
            to="/quienes-somos"
            className="inline-block rounded bg-brand-500 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-900"
          >
            Conoce más sobre nosotros
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          <div className="relative aspect-video w-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
              src="https://cdn.pixabay.com/video/2023/10/18/184954-875350932_large.mp4"
            />
            
            {/* Overlay gradiente sutil para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
