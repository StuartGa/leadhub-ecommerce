import { useCallback, useState } from "react";
import { productService } from "../../application/services/productService";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import type { Product } from "../../domain/types/product";
import { ProductGrid } from "../components/catalog/ProductGrid";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { HeroSection } from "../components/home/HeroSection";
import { AboutSection } from "../components/home/AboutSection";
import { StatsSection } from "../components/home/StatsSection";
import { TemperatureSection } from "../components/home/TemperatureSection";
import { BrandsSection } from "../components/home/BrandsSection";
import { ClientsSection } from "../components/home/ClientsSection";
import { CoverageSection } from "../components/home/CoverageSection";

export function HomePage() {
  useDocumentTitle(
    "San Patric Foodservice — Alimentos Convenientes de Calidad Premium",
    "San Patric Foodservice: distribución de alimentos convenientes premium para restaurantes, hoteles y cafeterías en México. Catálogo de +200 productos, +35 proveedores y cobertura nacional. Solicita tu cotización."
  );
  const [products] = useState<Product[]>(() => productService.getAll());

  const handleInquire = useCallback((product: Product) => {
    window.location.href = `/contact?products=${product.id}`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_10%_10%,rgba(177,36,85,0.08),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(80,0,33,0.06),transparent_42%),#f8fafc] text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <TemperatureSection />
        <BrandsSection />
        <ProductGrid products={products} onInquire={handleInquire} />
        <ClientsSection />
        <CoverageSection />
      </main>

      <Footer />
    </div>
  );
}
