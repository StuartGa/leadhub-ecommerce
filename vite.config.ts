import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE ?? "/",
    plugins: [react(), tailwindcss()],
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
          "img-src 'self' https://images.unsplash.com https://www.facebook.com https://www.google-analytics.com data:",
          "font-src 'self'",
          "connect-src 'self' https://rest.gohighlevel.com https://*.gohighlevel.com https://www.googletagmanager.com https://www.google-analytics.com https://*.analytics.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net",
          "frame-src https://www.google.com",
          "frame-ancestors 'none'",
        ].join("; "),
      },
    },
  };
});
