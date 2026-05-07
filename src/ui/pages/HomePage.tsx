import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../application/services/productService";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import type { Product } from "../../domain/types/product";
import { ProductGrid } from "../components/catalog/ProductGrid";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function HomePage() {
  useDocumentTitle("LeadHub — Grow Your Business with Proven Lead Generation");
  const [products] = useState<Product[]>(() => productService.getAll());

  const handleInquire = useCallback((product: Product) => {
    window.location.href = `/contact?product=${product.id}`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section
          aria-labelledby="hero-heading"
          className="mx-auto max-w-7xl px-4 pb-16 pt-28 text-center sm:px-6"
        >
          <h1
            id="hero-heading"
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Grow Your Business with{" "}
            <span className="text-brand-600">LeadHub</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            We help businesses capture, nurture, and convert leads through
            proven strategies and powerful tools. Explore our services and start
            scaling today.
          </p>
          <a
            href="#catalog"
            className="mt-8 inline-block rounded-lg bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            View Services
          </a>
        </section>

        <ProductGrid products={products} onInquire={handleInquire} />

        <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Let's build a customized lead generation strategy for your business. Our team is ready to help you grow.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-lg bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Contact Us Today
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
