import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useQuoteCart } from "../../application/hooks/useQuoteCart";
import { ContactForm } from "../components/form/ContactForm";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageBanner } from "../components/common/PageBanner";

export function ContactPage() {
  const { distinctProducts, totalUnits } = useQuoteCart();

  useDocumentTitle(
    "Inicie su Cotización — San Patric Foodservice",
    "Inicie su cotización B2B para alimentos foodservice. Complete el formulario y un especialista de San Patric diseñará una propuesta a la medida para su operación.",
    "/contact",
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <PageBanner
          src="banner-contacto.webp"
          alt="Inicie su Cotización — San Patric Foodservice"
          title={<>Inicie su <span className="font-normal">Cotización</span></>}
          subtitle="Precisión gastronómica para su negocio. Complete el formulario detallado y continuamos para que nuestro equipo especializado estructure una propuesta a su medida."
          variant="light"
        />

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          {distinctProducts > 0 && (
            <div className="mb-8 inline-flex rounded border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-900">
              Carrito listo: {distinctProducts} productos · {totalUnits} unidades
            </div>
          )}

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
                    <p className="font-semibold text-slate-900">Oficinas</p>
                    <p>Certificados 20, Col Postal</p>
                    <p>Benito Juárez, CDMX 03410</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Almacén</p>
                    <p>Calle Campesinos 122, Col Granjas Esmeralda</p>
                    <p>Iztapalapa, CDMX 09810</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <p><strong>Teléfono</strong></p>
                  <a href="tel:+525585905780" className="text-brand-700 hover:text-brand-900">(55) 85 90 57 80</a>
                  <p className="pt-2"><strong>Correo</strong></p>
                  <a href="mailto:info@alimentosconvenientes.com.mx" className="text-brand-700 hover:text-brand-900">info@alimentosconvenientes.com.mx</a>
                  <p className="pt-2"><strong>Horario de Atención</strong></p>
                  <p>Lunes a Viernes: 8:30 – 17:00</p>
                  <p>Sábado: 9:00 – 13:00</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <iframe
                  title="Ubicación San Patric Foodservice"
                  src="https://maps.google.com/maps?q=Certificados+20,+Colonia+Postal,+Benito+Juarez,+Ciudad+de+Mexico+03410&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
