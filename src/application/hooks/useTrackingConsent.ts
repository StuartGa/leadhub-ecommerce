import { useCallback, useEffect, useState } from "react";
import type {
  TrackingConsent,
  TrackingPreferences,
} from "../../domain/types/tracking";

const STORAGE_KEY = "leadhub_tracking_consent";

function loadConsent(): TrackingConsent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as TrackingConsent;
  } catch {
    return null;
  }
}

function saveConsent(consent: TrackingConsent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Silent fail if localStorage is unavailable
  }
}

export function useTrackingConsent() {
  const [consent, setConsent] = useState<TrackingConsent>(() => {
    const stored = loadConsent();
    return (
      stored ?? {
        status: "unset",
        preferences: { analytics: false, marketing: false },
        timestamp: Date.now(),
      }
    );
  });

  useEffect(() => {
    saveConsent(consent);
  }, [consent]);

  const acceptAll = useCallback(() => {
    setConsent({
      status: "accepted",
      preferences: { analytics: true, marketing: true },
      timestamp: Date.now(),
    });
  }, []);

  const rejectAll = useCallback(() => {
    setConsent({
      status: "rejected",
      preferences: { analytics: false, marketing: false },
      timestamp: Date.now(),
    });
  }, []);

  const customize = useCallback((preferences: TrackingPreferences) => {
    setConsent({
      status: "customized",
      preferences,
      timestamp: Date.now(),
    });
  }, []);

  const reset = useCallback(() => {
    setConsent({
      status: "unset",
      preferences: { analytics: false, marketing: false },
      timestamp: Date.now(),
    });
  }, []);

  return {
    consent,
    acceptAll,
    rejectAll,
    customize,
    reset,
    hasConsent: consent.status !== "unset",
    canUseAnalytics: consent.preferences.analytics,
    canUseMarketing: consent.preferences.marketing,
  } as const;
}
