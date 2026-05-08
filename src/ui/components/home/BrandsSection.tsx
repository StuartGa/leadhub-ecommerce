import { Link } from "react-router-dom";

export function BrandsSection() {
  // Subset de marcas principales para mostrar en home (8 de las 35+)
  const featuredBrands = [
    { id: 1, name: "Marca 1", logo: "🏢" },
    { id: 2, name: "Marca 2", logo: "🏭" },
    { id: 3, name: "Marca 3", logo: "🏪" },
    { id: 4, name: "Marca 4", logo: "🏬" },
    { id: 5, name: "Marca 5", logo: "🏢" },
    { id: 6, name: "Marca 6", logo: "🏭" },
    { id: 7, name: "Marca 7", logo: "🏪" },
    { id: 8, name: "Marca 8", logo: "🏬" },
  ];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
            Marcas <span className="font-normal">que Manejamos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Trabajamos con más de 35 proveedores líderes en la industria 
            alimentaria para ofrecerte los mejores productos.
          </p>
        </div>

        {/* Grid de marcas destacadas */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
          {featuredBrands.map((brand) => (
            <div
              key={brand.id}
              className="group flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-500"
            >
              <div className="text-center">
                <div className="mb-2 text-4xl">{brand.logo}</div>
                <div className="text-xs font-medium text-slate-600">{brand.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para ver todas las marcas */}
        <div className="mt-12 text-center">
          <Link
            to="/marcas"
            className="inline-flex items-center gap-2 rounded bg-brand-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
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
      </div>
    </section>
  );
}
