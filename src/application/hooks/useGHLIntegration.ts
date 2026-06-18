import { useCallback, useState } from "react";

import type { GHLWebhookPayload } from "../../domain/types/ghl";
import { sanitizeGHLPayload } from "../utils/sanitizeText";

type Status = "idle" | "loading" | "success" | "error";

export type LeadSubmitSource = "contact" | "landing-horeca";

export function useGHLIntegration() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: GHLWebhookPayload, source: LeadSubmitSource = "contact", honeypot?: string) => {
      const apiUrl = import.meta.env.VITE_LEAD_API_URL;

      if (!apiUrl) {
        setStatus("error");
        setError("El servicio de contacto no está configurado. Intente más tarde.");
        return;
      }

      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source,
            payload: sanitizeGHLPayload(payload),
            website: honeypot ?? "",
          }),
        });

        if (!response.ok) {
          throw new Error("The request could not be completed. Please try again.");
        }

        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { submit, status, error, reset } as const;
}
