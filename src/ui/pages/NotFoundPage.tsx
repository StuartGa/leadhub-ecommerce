import { Link } from "react-router-dom";

import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function NotFoundPage() {
  useDocumentTitle(
    "Página no encontrada — San Patric Foodservice",
    "La página que buscas no existe o fue movida. Explora nuestro catálogo de productos foodservice o contáctanos.",
    undefined,
    { robots: "noindex, nofollow" },
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Página no encontrada
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            La ruta solicitada no existe. Revisa la URL o regresa al inicio.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Ir al inicio
            </Link>
            <Link
              to="/productos"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
