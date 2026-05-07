import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { productService } from "../../application/services/productService";
import { ContactForm } from "../components/form/ContactForm";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function ContactPage() {
  useDocumentTitle("Contact Us — LeadHub");
  const [searchParams] = useSearchParams();
  const preselectedProduct = searchParams.get("product");

  const products = useMemo(() => productService.getAll(), []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Ready to grow your business? Reach out to our team and let's start building your lead generation strategy today.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                  Our Office
                </h2>
                <div className="space-y-4 text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">LeadHub CDMX</p>
                    <p>Av. Presidente Masaryk 111</p>
                    <p>Polanco V Sección, Miguel Hidalgo</p>
                    <p>11560 Ciudad de México, CDMX</p>
                    <p>Mexico</p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <a
                      href="tel:+525555551234"
                      className="text-brand-600 transition-colors hover:text-brand-700"
                    >
                      +52 55 5555 1234
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <a
                      href="mailto:hello@leadhub.example.com"
                      className="text-brand-600 transition-colors hover:text-brand-700"
                    >
                      hello@leadhub.example.com
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">Business Hours</p>
                    <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                    <p>Saturday: 10:00 AM – 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  title="LeadHub Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4191581535686!2d-99.19357842493434!3d19.43378954160909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8d6f6f6f6f7%3A0x1234567890abcdef!2sAv.%20Pres.%20Masaryk%20111%2C%20Polanco%2C%20Polanco%20V%20Secc%2C%20Miguel%20Hidalgo%2C%2011560%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1sen!2smx!4v1234567890123!5m2!1sen!2smx"
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
              <ContactForm
                products={products}
                preselectedProduct={preselectedProduct}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
