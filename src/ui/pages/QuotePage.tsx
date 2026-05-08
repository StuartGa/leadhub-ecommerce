import { Link } from "react-router-dom";

import { useQuoteCart } from "../../application/hooks/useQuoteCart";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function QuotePage() {
  useDocumentTitle(
    "Carrito de Cotizacion — San Patric Foodservice",
    "Revise su carrito de cotizacion B2B por unidades y envie su solicitud de propuesta personalizada.",
  );

  const { items, totalUnits, distinctProducts, updateQuantity, updateNotes, removeItem, clearCart } = useQuoteCart();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">Carrito de Cotizacion</h1>
              <p className="mt-2 text-sm text-slate-600">
                {distinctProducts} productos seleccionados · {totalUnits} unidades totales
              </p>
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="rounded border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition-colors hover:bg-slate-100"
              >
                Vaciar carrito
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-900">Aun no hay productos en su cotizacion.</p>
              <Link
                to="/productos"
                className="mt-6 inline-flex rounded bg-brand-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900"
              >
                Explorar catalogo
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[96px_1fr_auto]"
                >
                  <img src={item.imageUrl} alt={item.productName} className="h-24 w-24 rounded object-cover" />

                  <div>
                    <p className="text-lg font-semibold text-slate-900">{item.productName}</p>
                    <p className="text-xs text-slate-500">Unidad: {item.inventoryUnit}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Cantidad
                        <input
                          type="number"
                          min={item.minOrderQty}
                          step={item.orderStep}
                          value={item.quantity}
                          onChange={(event) => updateQuantity(item.productId, Number(event.target.value))}
                          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Nota
                        <input
                          type="text"
                          value={item.notes ?? ""}
                          onChange={(event) => updateNotes(item.productId, event.target.value)}
                          placeholder="Ej: entrega matutina"
                          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Quitar
                    </button>
                  </div>
                </article>
              ))}

              <div className="flex justify-end pt-4">
                <Link
                  to="/contact"
                  className="inline-flex rounded bg-brand-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-700"
                >
                  Continuar a formulario
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
