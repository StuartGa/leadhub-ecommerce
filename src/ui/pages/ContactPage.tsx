import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { ContactForm } from "../components/form/ContactForm";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function ContactPage() {
  useDocumentTitle("Contáctanos — San Patric Foodservice");

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Contáctanos
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              ¿Listo para mejorar tu negocio foodservice? Contáctanos y comencemos a trabajar juntos hoy.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                  Nuestra Oficina
                </h2>
                <div className="space-y-4 text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">San Patric Foodservice</p>
                    <p>Calle Ejemplo 123</p>
                    <p>Colonia Centro</p>
                    <p>44100 Guadalajara, Jalisco</p>
                    <p>México</p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">Teléfono</p>
                    <a
                      href="tel:+523312345678"
                      className="text-brand-600 transition-colors hover:text-brand-700"
                    >
                      +52 33 1234 5678
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <a
                      href="mailto:contacto@sanpatric.mx"
                      className="text-brand-600 transition-colors hover:text-brand-700"
                    >
                      contacto@sanpatric.mx
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">Horario de Atención</p>
                    <p>Lunes – Viernes: 9:00 AM – 6:00 PM</p>
                    <p>Sábado: 10:00 AM – 2:00 PM</p>
                    <p>Domingo: Cerrado</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  title="Ubicación San Patric Foodservice"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.8!2d-103.3496092!3d20.6736778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQwJzI1LjIiTiAxMDPCsDIwJzU4LjYiVw!5e0!3m2!1sen!2smx!4v1234567890123!5m2!1sen!2smx"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
