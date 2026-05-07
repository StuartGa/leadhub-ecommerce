export function loadGTM(gtmId: string): void {
  if (!gtmId || typeof window === "undefined") return;

  // Prevent double-loading
  if ((window as unknown as Record<string, unknown>)[`gtm_${gtmId}`]) return;
  (window as unknown as Record<string, unknown>)[`gtm_${gtmId}`] = true;

  // Initialize dataLayer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dataLayer = (window as any).dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  // Inject GTM script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}

export function loadGA4(measurementId: string): void {
  if (!measurementId || typeof window === "undefined") return;

  // Prevent double-loading
  if ((window as unknown as Record<string, unknown>)[`ga4_${measurementId}`])
    return;
  (window as unknown as Record<string, unknown>)[`ga4_${measurementId}`] = true;

  // Inject GA4 script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dataLayer = (window as any).dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).dataLayer.push(args);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag = gtag;

  gtag("js", new Date());
  gtag("config", measurementId);
}

export function loadMetaPixel(pixelId: string): void {
  if (!pixelId || typeof window === "undefined") return;

  // Prevent double-loading
  if ((window as unknown as Record<string, unknown>)[`fbq_${pixelId}`]) return;
  (window as unknown as Record<string, unknown>)[`fbq_${pixelId}`] = true;

  // Initialize fbq
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fbq = function (...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions
    (fbq as any).callMethod
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (fbq as any).callMethod.apply(fbq, args)
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (fbq as any).queue.push(args);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(window as any).fbq) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq = fbq;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fbq.push = fbq;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fbq.loaded = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fbq.version = "2.0";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fbq.queue = [];

  // Inject Meta Pixel script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Initialize pixel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fbq("init", pixelId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fbq("track", "PageView");
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;

  // GTM pageview
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).dataLayer) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).dataLayer.push({
      event: "pageview",
      page: path,
    });
  }

  // GA4 pageview
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", "page_view", {
      page_path: path,
    });
  }

  // Meta Pixel pageview
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).fbq) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq("track", "PageView");
  }
}
