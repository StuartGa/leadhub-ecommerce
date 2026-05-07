import { useState } from "react";
import type { TrackingPreferences } from "../../../domain/types/tracking";

interface CookieConsentBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: (preferences: TrackingPreferences) => void;
}

export function CookieConsentBanner({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: CookieConsentBannerProps) {
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<TrackingPreferences>({
    analytics: false,
    marketing: false,
  });

  if (showCustomize) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Customize Your Privacy Preferences
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Choose which types of tracking you're comfortable with.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      analytics: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-2 focus:ring-brand-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-slate-900">
                    Analytics Cookies
                  </span>
                  <p className="text-xs text-slate-600">
                    Help us understand how visitors interact with our website
                    to improve user experience.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      marketing: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-2 focus:ring-brand-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-slate-900">
                    Marketing Cookies
                  </span>
                  <p className="text-xs text-slate-600">
                    Used to track visitors across websites to display relevant
                    advertisements and measure campaign performance.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onCustomize(preferences)}
                className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-slate-700">
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. By clicking "Accept All", you
              consent to our use of cookies.{" "}
              <a
                href="#"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onAcceptAll}
              className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={onRejectAll}
              className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={() => setShowCustomize(true)}
              className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
