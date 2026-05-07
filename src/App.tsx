import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { usePageTracking } from "./application/hooks/usePageTracking";
import { useTrackingConsent } from "./application/hooks/useTrackingConsent";
import {
  loadGA4,
  loadGTM,
  loadMetaPixel,
} from "./application/services/trackingService";
import { CookieConsentBanner } from "./ui/components/tracking/CookieConsentBanner";
import { ContactPage } from "./ui/pages/ContactPage";
import { HomePage } from "./ui/pages/HomePage";
import { ProductPage } from "./ui/pages/ProductPage";

function AppContent() {
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
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
