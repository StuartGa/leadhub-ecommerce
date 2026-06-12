import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

/** GitHub Pages serves static files only — copy SPA shell for direct deep links. */
function githubPagesSpaFallbacks(routes: string[]) {
  return {
    name: "github-pages-spa-fallbacks",
    closeBundle() {
      const dist = join(process.cwd(), "dist");
      const indexHtml = readFileSync(join(dist, "index.html"), "utf8");

      for (const route of routes) {
        const dir = join(dist, route);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, "index.html"), indexHtml);
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE ?? "/",
    plugins: [react(), tailwindcss(), githubPagesSpaFallbacks(["horeca"])],
    server: {
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
        "Content-Security-Policy": [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' https://cdn.sanity.io https://images.unsplash.com https://www.facebook.com https://www.google-analytics.com data:",
          "font-src 'self'",
          "connect-src 'self' https://api.sanity.io https://cdn.sanity.io https://*.api.sanity.io https://rest.gohighlevel.com https://*.gohighlevel.com https://www.googletagmanager.com https://www.google-analytics.com https://*.analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net",
          "frame-src https://www.google.com",
          "frame-ancestors 'none'",
        ].join("; "),
      },
    },
  };
});
