import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useProducts } from "../../application/hooks/useProducts";
import { useQuoteCart } from "../../application/hooks/useQuoteCart";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function ProductPage() {
  const { productId } = useParams();
  const { products, loading } = useProducts();
  const { addItem } = useQuoteCart();
  const [activeImageByProduct, setActiveImageByProduct] = useState<Record<string, number>>({});
  const [quantityByProduct, setQuantityByProduct] = useState<Record<string, number>>({});
  const [zoomOpen, setZoomOpen] = useState(false);

  const product = useMemo(
    () => products.find((entry) => entry.id === productId || entry.slug === productId),
    [productId, products],
  );

  const activeImage = product ? activeImageByProduct[product.id] ?? 0 : 0;
  const quantity = product ? quantityByProduct[product.id] ?? product.minOrderQty : 1;
  const gallery = product?.gallery.length ? product.gallery : [product?.imageUrl ?? "/images/product-placeholder.webp"];

  useDocumentTitle(
    product ? `${product.name} — San Patric Foodservice` : "Producto no encontrado — San Patric Foodservice",
  );

  if (!product && loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold tracking-tight text-slate-900">Cargando producto...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="absolute right-3 top-3 z-10 rounded-md bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-white"
                >
                  Zoom
                </button>
                <img
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="eager"
                  decoding="async"
                  onError={(event) => {
                    const img = event.currentTarget;
                    if (img.src.includes("/images/product-placeholder.webp")) return;
                    img.src = "/images/product-placeholder.webp";
                  }}
                />
              </div>

              {gallery.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => {
                        setActiveImageByProduct((prev) => ({
                          ...prev,
                          [product.id]: index,
                        }));
                      }}
                      className={`overflow-hidden rounded-lg border ${activeImage === index ? "border-brand-500" : "border-slate-200"}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} vista ${index + 1}`}
                        className="h-20 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                  {product.longDescription && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.longDescription}</p>
                  )}
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
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Cotizacion personalizada</p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                        Precio segun volumen y frecuencia
                      </p>
                    </div>
                    <span className="rounded-md bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      Unidad: {product.inventoryUnit}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                    <label htmlFor="product-quantity" className="text-sm font-medium text-slate-700">
                      Cantidad ({product.inventoryUnit}es)
                    </label>
                    <input
                      id="product-quantity"
                      type="number"
                      min={product.minOrderQty}
                      step={product.orderStep}
                      value={quantity}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        setQuantityByProduct((prev) => ({
                          ...prev,
                          [product.id]: Number.isFinite(value) ? value : product.minOrderQty,
                        }));
                      }}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:w-36"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => addItem({ product, quantity })}
                    className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Agregar a cotizacion
                  </button>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-brand-300 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Ir al formulario
                  </Link>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Pedido minimo: {product.minOrderQty} {product.inventoryUnit}
                  {product.minOrderQty > 1 ? "es" : ""}. Incrementos de {product.orderStep}.
                </p>
                {product.technicalInfo && (
                  <p className="mt-2 text-sm text-slate-600">Ficha tecnica: {product.technicalInfo}</p>
                )}
                {product.packaging && (
                  <p className="mt-2 text-sm text-slate-600">Empaque: {product.packaging}</p>
                )}
                {product.specSheetUrl && (
                  <a
                    href={product.specSheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
                  >
                    Ver ficha tecnica PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute right-3 top-3 rounded-md bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Cerrar
            </button>
            <img
              src={gallery[activeImage]}
              alt={product.name}
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
