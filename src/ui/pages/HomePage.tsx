import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { HeroSection } from "../components/home/HeroSection";
import { AboutBriefSection } from "../components/home/AboutBriefSection";
import { BannersSection } from "../components/home/BannersSection";
import { BrandCarousel } from "../components/home/BrandCarousel";
import { TemperatureSection } from "../components/home/TemperatureSection";

export function HomePage() {
  useDocumentTitle(
    "San Patric Foodservice — Alimentos Premium para Foodservice",
    "San Patric Foodservice: distribución de alimentos convenientes premium para restaurantes, hoteles y cafeterías en México. Catálogo de +200 productos, +35 proveedores y cobertura nacional. Solicita tu cotización."
  );

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_10%_10%,rgba(177,36,85,0.08),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(80,0,33,0.06),transparent_42%),#f8fafc] text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <AboutBriefSection />
        <BannersSection />
        <BrandCarousel />
        <TemperatureSection />
      </main>

      <Footer />
    </div>
  );
}
