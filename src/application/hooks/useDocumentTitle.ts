import { useEffect } from "react";
import { CANONICAL_BASE } from "../constants/seo";

/**
 * Updates document.title, meta description, OG/Twitter meta tags,
 * og:url, and injects/updates the per-page canonical <link> on every
 * client-side navigation.
 *
 * @param title          Full page title (shown in tab + og:title + twitter:title)
 * @param description    Meta description (og:description + twitter:description)
 * @param canonicalPath  Path relative to CANONICAL_BASE (e.g. "/productos").
 *                       Omit for pages that should not override the root canonical.
 */
export function useDocumentTitle(
  title: string,
  description?: string,
  canonicalPath?: string,
): void {
  useEffect(() => {
    // --- document.title ---
    const prevTitle = document.title;
    document.title = title;

    // --- meta[name="description"] ---
    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descEl?.content;
    if (descEl && description !== undefined) descEl.content = description;

    // --- og:title ---
    const ogTitleEl = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const prevOgTitle = ogTitleEl?.content;
    if (ogTitleEl) ogTitleEl.content = title;

    // --- og:description ---
    const ogDescEl = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const prevOgDesc = ogDescEl?.content;
    if (ogDescEl && description !== undefined) ogDescEl.content = description;

    // --- twitter:title ---
    const twTitleEl = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const prevTwTitle = twTitleEl?.content;
    if (twTitleEl) twTitleEl.content = title;

    // --- twitter:description ---
    const twDescEl = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    const prevTwDesc = twDescEl?.content;
    if (twDescEl && description !== undefined) twDescEl.content = description;

    // --- og:url + canonical ---
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

    // Capture mutable refs for cleanup closure
    const capturedCanonical = canonicalEl;
    const capturedCreated = canonicalCreated;

    return () => {
      document.title = prevTitle;
      if (descEl && prevDesc !== undefined) descEl.content = prevDesc;
      if (ogTitleEl && prevOgTitle !== undefined) ogTitleEl.content = prevOgTitle;
      if (ogDescEl && prevOgDesc !== undefined) ogDescEl.content = prevOgDesc;
      if (twTitleEl && prevTwTitle !== undefined) twTitleEl.content = prevTwTitle;
      if (twDescEl && prevTwDesc !== undefined) twDescEl.content = prevTwDesc;
      if (ogUrlEl && prevOgUrl !== undefined) ogUrlEl.content = prevOgUrl;
      if (capturedCanonical) {
        if (capturedCreated) {
          capturedCanonical.parentNode?.removeChild(capturedCanonical);
        } else if (prevCanonicalHref !== undefined) {
          capturedCanonical.href = prevCanonicalHref;
        }
      }
    };
  }, [title, description, canonicalPath]);
}
