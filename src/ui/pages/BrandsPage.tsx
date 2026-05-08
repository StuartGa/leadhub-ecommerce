import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function BrandsPage() {
  useDocumentTitle("Marcas — San Patric Foodservice");

  // Placeholder brand logos - estas se pueden reemplazar con logos reales del cliente
  const brands = [
    { id: 1, name: "Marca 1", logo: "🏢" },
    { id: 2, name: "Marca 2", logo: "🏭" },
    { id: 3, name: "Marca 3", logo: "🏪" },
    { id: 4, name: "Marca 4", logo: "🏬" },
    { id: 5, name: "Marca 5", logo: "🏢" },
    { id: 6, name: "Marca 6", logo: "🏭" },
    { id: 7, name: "Marca 7", logo: "🏪" },
    { id: 8, name: "Marca 8", logo: "🏬" },
    { id: 9, name: "Marca 9", logo: "🏢" },
    { id: 10, name: "Marca 10", logo: "🏭" },
    { id: 11, name: "Marca 11", logo: "🏪" },
    { id: 12, name: "Marca 12", logo: "🏬" },
    { id: 13, name: "Marca 13", logo: "🏢" },
    { id: 14, name: "Marca 14", logo: "🏭" },
    { id: 15, name: "Marca 15", logo: "🏪" },
    { id: 16, name: "Marca 16", logo: "🏬" },
    { id: 17, name: "Marca 17", logo: "🏢" },
    { id: 18, name: "Marca 18", logo: "🏭" },
    { id: 19, name: "Marca 19", logo: "🏪" },
    { id: 20, name: "Marca 20", logo: "🏬" },
    { id: 21, name: "Marca 21", logo: "🏢" },
    { id: 22, name: "Marca 22", logo: "🏭" },
    { id: 23, name: "Marca 23", logo: "🏪" },
    { id: 24, name: "Marca 24", logo: "🏬" },
    { id: 25, name: "Marca 25", logo: "🏢" },
    { id: 26, name: "Marca 26", logo: "🏭" },
    { id: 27, name: "Marca 27", logo: "🏪" },
    { id: 28, name: "Marca 28", logo: "🏬" },
    { id: 29, name: "Marca 29", logo: "🏢" },
    { id: 30, name: "Marca 30", logo: "🏭" },
    { id: 31, name: "Marca 31", logo: "🏪" },
    { id: 32, name: "Marca 32", logo: "🏬" },
    { id: 33, name: "Marca 33", logo: "🏢" },
    { id: 34, name: "Marca 34", logo: "🏭" },
    { id: 35, name: "Marca 35", logo: "🏪" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-50 to-white px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-sans text-4xl font-bold uppercase tracking-wider text-slate-900 sm:text-5xl">
              Nuestras <span className="font-normal">Marcas</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700">
              Trabajamos con más de 35 proveedores líderes en la industria alimentaria 
              para ofrecerte los mejores productos en las tres temperaturas: secos, 
              refrigerados y congelados.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-brand-500 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-white">+35</div>
                <div className="text-xl text-brand-50">Proveedores Premium</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-white">+200</div>
                <div className="text-xl text-brand-50">Productos Diferentes</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-white">100%</div>
                <div className="text-xl text-brand-50">Calidad Garantizada</div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Marcas <span className="font-normal">Asociadas</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="group flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-500"
                >
                  <div className="text-center">
                    <div className="mb-2 text-5xl">{brand.logo}</div>
                    <div className="text-xs font-medium text-slate-600">{brand.name}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note for client */}
            <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Los logos mostrados son placeholders. Favor de proporcionar 
                los logos reales de las marcas en formato PNG o SVG con fondo transparente para 
                reemplazarlos.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Categorías <span className="font-normal">Disponibles</span>
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Acompañantes", icon: "🍚", temp: "Congelado" },
                { name: "Azúcar y Endulzantes", icon: "🍯", temp: "Seco" },
                { name: "Estuchados", icon: "📦", temp: "Seco" },
                { name: "Papas y Botanas", icon: "🥔", temp: "Seco" },
                { name: "Proteína", icon: "🥩", temp: "Congelado" },
                { name: "Repostería", icon: "🍰", temp: "Congelado" },
                { name: "Salsas y Aderezos", icon: "🧂", temp: "Refrigerado" },
                { name: "Verduras y Leguminosas", icon: "🥦", temp: "Congelado" },
                { name: "Quesos", icon: "🧀", temp: "Refrigerado" },
              ].map((category) => (
                <div
                  key={category.name}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-500"
                >
                  <div className="mb-3 text-4xl">{category.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{category.name}</h3>
                  <div className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
                    {category.temp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-500 to-brand-900 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-sans text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl">
              ¿Buscas <span className="font-normal">Productos Específicos?</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-brand-50">
              Contacta a nuestro equipo de ventas para conocer el catálogo completo 
              de productos disponibles por cada marca.
            </p>
            <a
              href="/contact"
              className="inline-block rounded bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-brand-600 transition-all hover:bg-slate-50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600 focus-visible:outline-none"
            >
              Solicitar Cotización
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
