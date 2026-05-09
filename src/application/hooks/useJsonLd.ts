import { useEffect } from "react";

export function useJsonLd(json: Record<string, unknown> | null): void {
  useEffect(() => {
    if (!json) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(json);

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [json]);
}
