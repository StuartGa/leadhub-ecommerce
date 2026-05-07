export interface TrackingPreferences {
  analytics: boolean;
  marketing: boolean;
}

export type ConsentStatus = "unset" | "accepted" | "rejected" | "customized";

export interface TrackingConsent {
  status: ConsentStatus;
  preferences: TrackingPreferences;
  timestamp: number;
}
