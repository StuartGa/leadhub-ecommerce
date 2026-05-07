import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center bg-[#f7f3ed]">
      <div className="absolute inset-0 z-0 flex">
        {/* Left Content Area */}
        <div className="flex w-1/2 items-center bg-[#f7f3ed] p-16">
          <div className="max-w-xl">
            <h1 className="mb-6 font-sans text-5xl font-semibold leading-tight tracking-tight text-brand-500">
              Precisión Gastronómica
              <br />
              para tu Negocio
            </h1>
            <p className="mb-8 font-sans text-2xl font-normal leading-relaxed text-brand-900">
              Soluciones integrales de alimentos para foodservice y retail, con
              los más altos estándares de calidad.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded bg-brand-500 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-900"
            >
              Cotizar Productos
              <svg
                className="h-[18px] w-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="relative w-1/2">
          <img
            alt="Fresh food ingredients"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=1200&h=800&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}
