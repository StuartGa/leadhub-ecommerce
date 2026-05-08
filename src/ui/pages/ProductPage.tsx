import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { productService } from "../../application/services/productService";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

function formatPrice(price: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${price.toLocaleString()}`;
  }
}

export function ProductPage() {
  const { productId } = useParams();

  const product = useMemo(
    () => (productId ? productService.getById(productId) : undefined),
    [productId],
  );

  useDocumentTitle(
    product ? `${product.name} — San Patric Foodservice` : "Producto no encontrado — San Patric Foodservice",
  );

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              Producto no encontrado
            </p>
            <p className="mt-2 text-sm text-slate-600">
              El producto que buscas no existe o fue movido.
            </p>
            <Link
              to="/productos"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              <span aria-hidden="true">←</span> Volver al catálogo
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.src.includes("/images/product-placeholder.webp")) return;
                  img.src = "/images/product-placeholder.webp";
                }}
              />
            </div>

            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {product.name}
                  </h1>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {product.description}
                  </p>
                </div>
                {!product.inStock && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      Próximamente
                    </span>
                  )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Desde
                    </p>
                    <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>
                  <Link
                    to={`/contact?products=${product.id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Cotizar producto
                  </Link>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Cuéntanos lo que necesitas y responderemos en menos de 24 horas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
