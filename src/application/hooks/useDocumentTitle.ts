import { useEffect } from "react";
import { CANONICAL_BASE, DEFAULT_OG_IMAGE } from "../constants/seo";

export type PageSeoOptions = {
  /** Meta robots directive. Defaults to indexable when omitted. */
  robots?: "index, follow" | "noindex, nofollow" | "noindex, follow";
  /** Absolute or site-relative OG/Twitter image URL. */
  ogImage?: string;
};

function resolveOgImage(ogImage?: string): string {
  if (!ogImage) return DEFAULT_OG_IMAGE;
  if (ogImage.startsWith("http://") || ogImage.startsWith("https://")) return ogImage;
  const normalized = ogImage.startsWith("/") ? ogImage : `/${ogImage}`;
  return `${CANONICAL_BASE}${normalized}`;
}

/**
 * Updates document.title, meta description, OG/Twitter meta tags,
 * og:url, robots, og:image, and injects/updates the per-page canonical
 * <link> on every client-side navigation.
 */
export function useDocumentTitle(
  title: string,
  description?: string,
  canonicalPath?: string,
  options?: PageSeoOptions,
): void {
  const robots = options?.robots;
  const ogImage = resolveOgImage(options?.ogImage);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descEl?.content;
    if (descEl && description !== undefined) descEl.content = description;

    const ogTitleEl = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const prevOgTitle = ogTitleEl?.content;
    if (ogTitleEl) ogTitleEl.content = title;

    const ogDescEl = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const prevOgDesc = ogDescEl?.content;
    if (ogDescEl && description !== undefined) ogDescEl.content = description;

    const twTitleEl = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const prevTwTitle = twTitleEl?.content;
    if (twTitleEl) twTitleEl.content = title;

    const twDescEl = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    const prevTwDesc = twDescEl?.content;
    if (twDescEl && description !== undefined) twDescEl.content = description;

    const ogImageEl = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    const prevOgImage = ogImageEl?.content;
    if (ogImageEl) ogImageEl.content = ogImage;

    const twImageEl = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    const prevTwImage = twImageEl?.content;
    if (twImageEl) twImageEl.content = ogImage;

    let robotsEl = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prevRobots = robotsEl?.content;
    let robotsCreated = false;
    if (robots) {
      if (!robotsEl) {
        robotsEl = document.createElement("meta");
        robotsEl.name = "robots";
        document.head.appendChild(robotsEl);
        robotsCreated = true;
      }
      robotsEl.content = robots;
    }

    const ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const prevOgUrl = ogUrlEl?.content;

    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonicalHref = canonicalEl?.href;
    let canonicalCreated = false;

    if (canonicalPath !== undefined) {
      const fullUrl = `${CANONICAL_BASE}${canonicalPath}`;
      if (ogUrlEl) ogUrlEl.content = fullUrl;
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.rel = "canonical";
        document.head.appendChild(canonicalEl);
        canonicalCreated = true;
      }
      canonicalEl.href = fullUrl;
    }

    const capturedCanonical = canonicalEl;
    const capturedCreated = canonicalCreated;
    const capturedRobots = robotsEl;
    const capturedRobotsCreated = robotsCreated;

    return () => {
      document.title = prevTitle;
      if (descEl && prevDesc !== undefined) descEl.content = prevDesc;
      if (ogTitleEl && prevOgTitle !== undefined) ogTitleEl.content = prevOgTitle;
      if (ogDescEl && prevOgDesc !== undefined) ogDescEl.content = prevOgDesc;
      if (twTitleEl && prevTwTitle !== undefined) twTitleEl.content = prevTwTitle;
      if (twDescEl && prevTwDesc !== undefined) twDescEl.content = prevTwDesc;
      if (ogImageEl && prevOgImage !== undefined) ogImageEl.content = prevOgImage;
      if (twImageEl && prevTwImage !== undefined) twImageEl.content = prevTwImage;
      if (ogUrlEl && prevOgUrl !== undefined) ogUrlEl.content = prevOgUrl;
      if (capturedCanonical) {
        if (capturedCreated) {
          capturedCanonical.parentNode?.removeChild(capturedCanonical);
        } else if (prevCanonicalHref !== undefined) {
          capturedCanonical.href = prevCanonicalHref;
        }
      }
      if (capturedRobots) {
        if (capturedRobotsCreated) {
          capturedRobots.parentNode?.removeChild(capturedRobots);
        } else if (prevRobots !== undefined) {
          capturedRobots.content = prevRobots;
        }
      }
    };
  }, [title, description, canonicalPath, robots, ogImage]);
}
