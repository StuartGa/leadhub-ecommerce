import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useQuoteCart } from "../../application/hooks/useQuoteCart";
import { ContactForm } from "../components/form/ContactForm";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function ContactPage() {
  const { distinctProducts, totalUnits } = useQuoteCart();

  useDocumentTitle(
    "Inicie su Cotización — San Patric Foodservice",
    "Inicie su cotización B2B para alimentos foodservice. Complete el formulario y un especialista de San Patric diseñará una propuesta a la medida para su operación."
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h1 className="mb-4 font-sans text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
              Inicie su Cotización
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Precisión gastronómica para su negocio. Complete el formulario detallado
              y continuamos para que nuestro equipo especializado estructure una
              propuesta a su medida.
            </p>

            {distinctProducts > 0 && (
              <div className="mt-5 inline-flex rounded border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-900">
                Carrito listo: {distinctProducts} productos · {totalUnits} unidades
              </div>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.65fr_0.65fr] lg:items-start">
            <div className="rounded-lg border border-brand-200/70 bg-white p-5 shadow-md shadow-brand-100/40 ring-1 ring-brand-100/70 sm:p-7">
              <div className="mb-5 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-bold tracking-tight text-brand-900">Cotizador B2B</h2>
                <p className="mt-1 text-sm text-slate-600">Complete todos los campos para recibir propuesta personalizada.</p>
              </div>
              <ContactForm showHeading={false} />
            </div>

            <div className="space-y-5">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-brand-900">
                  Nuestras Oficinas
                </h2>
                <div className="space-y-4 text-sm text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">Dirección Principal</p>
                    <p>Av. Gastronomía 1045, Parque Industrial,</p>
                    <p>Ciudad de México, CDMX 02300</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <p><strong>Teléfono Corporativo</strong></p>
                  <a href="tel:+525550000000" className="text-brand-700 hover:text-brand-900">+52 (55) 5000-0000</a>
                  <p className="pt-2"><strong>Ventas Corporativas</strong></p>
                  <a href="mailto:cotizaciones@sanpatric.com" className="text-brand-700 hover:text-brand-900">cotizaciones@sanpatric.com</a>
                  <p className="pt-2"><strong>Horario de Atención</strong></p>
                  <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <iframe
                  title="Ubicación San Patric Foodservice"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.8!2d-103.3496092!3d20.6736778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQwJzI1LjIiTiAxMDPCsDIwJzU4LjYiVw!5e0!3m2!1sen!2smx!4v1234567890123!5m2!1sen!2smx"
                  width="100%"
                  height="170"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-lg border border-brand-900 bg-brand-900 p-6 text-white shadow-sm">
                <h3 className="mb-3 text-2xl font-bold">Bolsa de Trabajo</h3>
                <p className="mb-4 text-sm text-white/90">
                  Únete a nuestro equipo de precisión culinaria. Buscamos talento
                  apasionado por la industria alimentaria B2B.
                </p>
                <a
                  href="/trabaja-con-nosotros"
                  className="inline-flex rounded border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  Ver Vacantes Disponibles
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
