import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type ModuleImporter<T extends ComponentType<unknown>> = () => Promise<{
  default: T;
}>;

const CHUNK_RELOAD_KEY = "leadhub.chunk_reload";

/**
 * Lazy-load a route chunk with retries. After a deploy, stale tabs may request
 * old chunk filenames; one hard reload usually fixes that case.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  importer: ModuleImporter<T>,
): LazyExoticComponent<T> {
  return lazy(async () => {
    const maxAttempts = 3;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      try {
        return await importer();
      } catch (error) {
        const isLastAttempt = attempt === maxAttempts - 1;
        if (!isLastAttempt) {
          await new Promise((resolve) => window.setTimeout(resolve, 400 * (attempt + 1)));
          continue;
        }

        if (!sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
          sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
          window.location.reload();
          return new Promise(() => {});
        }

        sessionStorage.removeItem(CHUNK_RELOAD_KEY);
        throw error;
      }
    }

    throw new Error("Failed to load route module");
  });
}
