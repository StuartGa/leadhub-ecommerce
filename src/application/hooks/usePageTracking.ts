import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../services/trackingService";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
}
