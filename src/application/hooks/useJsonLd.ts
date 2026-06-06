import { useEffect } from "react";

/**
 * Injects a <script type="application/ld+json"> into <head>.
 * Uses JSON.stringify as the effect dependency so the script is only
 * replaced when the serialised content actually changes, preventing
 * constant remounts caused by unstable object references.
 */
export function useJsonLd(json: Record<string, unknown> | null): void {
  const jsonString = json !== null ? JSON.stringify(json) : null;

  useEffect(() => {
    if (!jsonString) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = jsonString;
    document.head.appendChild(script);

    return () => {
      script.parentNode?.removeChild(script);
    };
  }, [jsonString]);
}
