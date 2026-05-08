import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { usePageTracking } from "./application/hooks/usePageTracking";
import { useTrackingConsent } from "./application/hooks/useTrackingConsent";
import {
  loadGA4,
  loadGTM,
  loadMetaPixel,
} from "./application/services/trackingService";
import { CookieConsentBanner } from "./ui/components/tracking/CookieConsentBanner";

// Lazy load pages for code splitting
const HomePage = lazy(() =>
  import("./ui/pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("./ui/pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const BrandsPage = lazy(() =>
  import("./ui/pages/BrandsPage").then((m) => ({ default: m.BrandsPage }))
);
const ProductsPage = lazy(() =>
  import("./ui/pages/ProductsPage").then((m) => ({ default: m.ProductsPage }))
);
const CategoryPage = lazy(() =>
  import("./ui/pages/CategoryPage").then((m) => ({ default: m.CategoryPage }))
);
const ProductPage = lazy(() =>
  import("./ui/pages/ProductPage").then((m) => ({ default: m.ProductPage }))
);
const ContactPage = lazy(() =>
  import("./ui/pages/ContactPage").then((m) => ({ default: m.ContactPage }))
);
const CoveragePage = lazy(() =>
  import("./ui/pages/CoveragePage").then((m) => ({ default: m.CoveragePage }))
);
const BlogPage = lazy(() =>
  import("./ui/pages/BlogPage").then((m) => ({ default: m.BlogPage }))
);
const BlogPostPage = lazy(() =>
  import("./ui/pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage }))
);
const CareersPage = lazy(() =>
  import("./ui/pages/CareersPage").then((m) => ({ default: m.CareersPage }))
);

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500"></div>
    </div>
  );
}

function AppContent() {
  usePageTracking();
  return (
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
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
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
      <AppContent />
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
