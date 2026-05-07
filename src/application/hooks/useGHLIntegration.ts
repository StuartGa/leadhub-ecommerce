import { useCallback, useState } from "react";

import type { GHLWebhookPayload } from "../../domain/types/ghl";

type Status = "idle" | "loading" | "success" | "error";

export function useGHLIntegration() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (payload: GHLWebhookPayload) => {
    const webhookUrl = import.meta.env.VITE_GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      setStatus("error");
      setError("Webhook URL is not configured");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Avoid leaking internal HTTP status codes to the UI
        throw new Error("The request could not be completed. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { submit, status, error, reset } as const;
}
