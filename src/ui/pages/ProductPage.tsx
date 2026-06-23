import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PRODUCT_PLACEHOLDER } from "../../application/constants/assets";
import { CANONICAL_BASE, absoluteUrl } from "../../application/constants/seo";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useJsonLd } from "../../application/hooks/useJsonLd";
import { useProducts } from "../../application/hooks/useProducts";
import { useQuoteCart } from "../../application/hooks/useQuoteCart";
import type { Product } from "../../domain/types/product";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ProductImageGallery } from "../components/catalog/ProductImageGallery";
import { toSafeHttpsUrl } from "../../application/utils/safeUrl";
import { RelatedProducts } from "../components/catalog/RelatedProducts";

export function ProductPage() {
  const { productId } = useParams();
  const { products, loading } = useProducts();
  const { addItem } = useQuoteCart();
  const [quantityByProduct, setQuantityByProduct] = useState<Record<string, number>>({});

  const product = useMemo(
    () => products.find((entry) => entry.id === productId || entry.slug === productId),
    [productId, products],
  );

  const quantity = product ? quantityByProduct[product.id] ?? product.minOrderQty : 1;
  const gallery = product?.gallery.length
    ? product.gallery.slice(0, 3)
    : [product?.imageUrl ?? PRODUCT_PLACEHOLDER];
  const safeSpecSheetUrl = useMemo(
    () => (product ? toSafeHttpsUrl(product.specSheetUrl) : undefined),
    [product],
  );

  const handleInquireRelated = useCallback((p: Product) => {
    addItem({ product: p, quantity: p.minOrderQty });
  }, [addItem]);

  useDocumentTitle(
    product ? `${product.name} — San Patric Foodservice` : "Producto no encontrado — San Patric Foodservice",
    product
      ? `${product.name}. ${product.description.slice(0, 140)}. Cotiza este alimento foodservice con San Patric.`
      : "Producto no encontrado en el catálogo de San Patric Foodservice.",
    product ? `/products/${product.slug ?? product.id}` : undefined,
    product
      ? { ogImage: absoluteUrl(product.imageUrl) }
      : { robots: "noindex, nofollow" },
  );

  useJsonLd(
    product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          sku: product.sku,
          image: gallery.map((url) => absoluteUrl(url)),
          brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
          category: product.category,
          offers: {
            "@type": "Offer",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            price: product.price,
            priceCurrency: "MXN",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              minValue: product.minOrderQty,
              unitText: product.inventoryUnit,
            },
          },
        }
      : null,
  );

  useJsonLd(
    product
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: `${CANONICAL_BASE}/` },
            { "@type": "ListItem", position: 2, name: "Productos", item: `${CANONICAL_BASE}/productos` },
            { "@type": "ListItem", position: 3, name: product.name, item: `${CANONICAL_BASE}/products/${product.slug ?? product.id}` },
          ],
        }
      : null,
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
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Producto no encontrado
            </h1>
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
              <ProductImageGallery
                images={gallery}
                alt={product.name}
                placeholder={PRODUCT_PLACEHOLDER}
              />
            </div>

            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {product.name}
                  </h1>
                  {product.sku && (
                    <p className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-700">
                        Código / SKU
                      </span>
                      <span className="font-mono text-sm font-semibold tracking-wide text-brand-900">
                        {product.sku}
                      </span>
                    </p>
                  )}
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
                {safeSpecSheetUrl && (
                  <a
                    href={safeSpecSheetUrl}
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

        {/* Productos Relacionados */}
        <RelatedProducts
          currentProduct={product}
          allProducts={products}
          onInquire={handleInquireRelated}
        />
      </main>

      <Footer />
    </div>
  );
}
