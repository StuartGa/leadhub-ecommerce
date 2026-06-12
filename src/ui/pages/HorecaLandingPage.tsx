import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { LandingBrandsStrip } from "../components/landing/LandingBrandsStrip";
import { LandingCoverageSection } from "../components/landing/LandingCoverageSection";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingHeroSection } from "../components/landing/LandingHeroSection";
import { LandingSimplotSection } from "../components/landing/LandingSimplotSection";
import { LandingStanislausSection } from "../components/landing/LandingStanislausSection";
import { LandingTestimonialsSection } from "../components/landing/LandingTestimonialsSection";

export function HorecaLandingPage() {
  useDocumentTitle(
    "San Patric — Soluciones HORECA | Stanislaus & Simplot",
    "Ingredientes confiables para restaurantes, hoteles y catering. Tomates Stanislaus y papas Simplot Megacrunch con cobertura en México. Solicita información."
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <main className="flex-1">
        <LandingHeroSection />
        <LandingBrandsStrip />
        <LandingStanislausSection />
        <LandingSimplotSection />
        <LandingTestimonialsSection />
        <LandingCoverageSection />
      </main>
      <LandingFooter />
    </div>
  );
}
