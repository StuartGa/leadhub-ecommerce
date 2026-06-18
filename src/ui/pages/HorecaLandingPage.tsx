import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { LandingBrandsStrip } from "../components/landing/LandingBrandsStrip";
import { LandingCoverageSection } from "../components/landing/LandingCoverageSection";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingHeroSection } from "../components/landing/LandingHeroSection";
import { LandingSimplotSection } from "../components/landing/LandingSimplotSection";
import { LandingStanislausSection } from "../components/landing/LandingStanislausSection";
import { LandingTestimonialsSection } from "../components/landing/LandingTestimonialsSection";
import { LandingVenturaFoodsSection } from "../components/landing/LandingVenturaFoodsSection";

export function HorecaLandingPage() {
  useDocumentTitle(
    "San Patric — Soluciones HORECA | Stanislaus, Simplot y Ventura Foods",
    "Ingredientes confiables para restaurantes, hoteles y catering. Tomates Stanislaus, papas Simplot y aderezos Ventura Foods con cobertura en México. Solicita información."
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <main className="flex-1">
        <LandingHeroSection />
        <LandingBrandsStrip />
        <LandingStanislausSection />
        <LandingSimplotSection />
        <LandingVenturaFoodsSection />
        <LandingTestimonialsSection />
        <LandingCoverageSection />
      </main>
      <LandingFooter />
    </div>
  );
}
