import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { lazyWithRetry } from "./application/utils/lazyWithRetry";
import { usePageTracking } from "./application/hooks/usePageTracking";
import { useTrackingConsent } from "./application/hooks/useTrackingConsent";
import {
  loadGA4,
  loadGTM,
  loadMetaPixel,
} from "./application/services/trackingService";
import { QuoteCartProvider } from "./application/contexts/QuoteCartContext";
import { CookieConsentBanner } from "./ui/components/tracking/CookieConsentBanner";
import { FloatingQuoteButton } from "./ui/components/common/FloatingQuoteButton";
import { FloatingWhatsAppButton } from "./ui/components/common/FloatingWhatsAppButton";
import { RouteErrorBoundary } from "./ui/components/common/RouteErrorBoundary";
import { ScrollToTop } from "./ui/components/common/ScrollToTop";

const HomePage = lazyWithRetry(() =>
  import("./ui/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazyWithRetry(() =>
  import("./ui/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const BrandsPage = lazyWithRetry(() =>
  import("./ui/pages/BrandsPage").then((m) => ({ default: m.BrandsPage })),
);
const ProductsPage = lazyWithRetry(() =>
  import("./ui/pages/ProductsPage").then((m) => ({ default: m.ProductsPage })),
);
const CategoryPage = lazyWithRetry(() =>
  import("./ui/pages/CategoryPage").then((m) => ({ default: m.CategoryPage })),
);
const ProductPage = lazyWithRetry(() =>
  import("./ui/pages/ProductPage").then((m) => ({ default: m.ProductPage })),
);
const ContactPage = lazyWithRetry(() =>
  import("./ui/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const QuotePage = lazyWithRetry(() =>
  import("./ui/pages/QuotePage").then((m) => ({ default: m.QuotePage })),
);
const CoveragePage = lazyWithRetry(() =>
  import("./ui/pages/CoveragePage").then((m) => ({ default: m.CoveragePage })),
);
const BlogPage = lazyWithRetry(() =>
  import("./ui/pages/BlogPage").then((m) => ({ default: m.BlogPage })),
);
const BlogPostPage = lazyWithRetry(() =>
  import("./ui/pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage })),
);
const CareersPage = lazyWithRetry(() =>
  import("./ui/pages/CareersPage").then((m) => ({ default: m.CareersPage })),
);
const HorecaLandingPage = lazyWithRetry(() =>
  import("./ui/pages/HorecaLandingPage").then((m) => ({
    default: m.HorecaLandingPage,
  })),
);
const NotFoundPage = lazyWithRetry(() =>
  import("./ui/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
    </div>
  );
}

function AppContent() {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/categoria/:categorySlug" element={<CategoryPage />} />
          <Route path="/marcas" element={<BrandsPage />} />
          <Route path="/cobertura" element={<CoveragePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/trabaja-con-nosotros" element={<CareersPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/cotizacion" element={<QuotePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/horeca" element={<HorecaLandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </RouteErrorBoundary>
  );
}

function AppShell() {
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      <AppContent />
    </>
  );
}

export function App() {
  const {
    acceptAll,
    rejectAll,
    customize,
    hasConsent,
    canUseAnalytics,
    canUseMarketing,
  } = useTrackingConsent();

  useEffect(() => {
    const gtmId = import.meta.env.VITE_GTM_ID;
    const ga4Id = import.meta.env.VITE_GA4_ID;
    const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;

    if (canUseAnalytics) {
      if (gtmId) loadGTM(gtmId);
      if (ga4Id) loadGA4(ga4Id);
    }

    if (canUseMarketing) {
      if (metaPixelId) loadMetaPixel(metaPixelId);
    }
  }, [canUseAnalytics, canUseMarketing]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <QuoteCartProvider>
        <AppShell />
        <FloatingWhatsAppButton />
        <FloatingQuoteButton />
      </QuoteCartProvider>
      {!hasConsent && (
        <CookieConsentBanner
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onCustomize={customize}
        />
      )}
    </BrowserRouter>
  );
}
