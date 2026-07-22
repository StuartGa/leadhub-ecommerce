import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { useJsonLd } from "../../application/hooks/useJsonLd";
import { CANONICAL_BASE } from "../../application/constants/seo";
import { LandingBrandsStrip } from "../components/landing/LandingBrandsStrip";
import { LandingCoverageSection } from "../components/landing/LandingCoverageSection";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingHeroSection } from "../components/landing/LandingHeroSection";
import { LeadForm } from "../components/landing/LeadForm";
import { LandingSimplotSection } from "../components/landing/LandingSimplotSection";
import { LandingStanislausSection } from "../components/landing/LandingStanislausSection";
import { LandingTestimonialsSection } from "../components/landing/LandingTestimonialsSection";
import { LandingVenturaFoodsSection } from "../components/landing/LandingVenturaFoodsSection";

export function HorecaLandingPage() {
  useDocumentTitle(
    "San Patric — Soluciones HORECA | Stanislaus, Simplot y Ventura Foods",
    "Ingredientes confiables para restaurantes, hoteles y catering. Tomates Stanislaus, papas Simplot y aderezos Ventura Foods con cobertura en México. Solicita información.",
    "/horeca",
  );

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "San Patric — Soluciones HORECA",
    description:
      "Ingredientes confiables para restaurantes, hoteles y catering. Tomates Stanislaus, papas Simplot y aderezos Ventura Foods con cobertura en México.",
    url: `${CANONICAL_BASE}/horeca`,
    isPartOf: {
      "@type": "WebSite",
      name: "San Patric Foodservice",
      url: `${CANONICAL_BASE}/`,
    },
  });

  return (
    <div className="flex flex-col overflow-x-clip overscroll-y-none bg-white text-slate-900 antialiased">
      <main>
        <div className="flex flex-col lg:max-h-[100dvh] lg:min-h-[100dvh] lg:overflow-hidden">
          <LandingHeroSection />
          <LandingBrandsStrip />
          <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-white px-4 pb-6 pt-3 sm:px-6 lg:hidden">
            <LeadForm compact />
          </section>
        </div>

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
