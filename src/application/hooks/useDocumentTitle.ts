import { useEffect } from "react";

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = meta?.content ?? null;
    if (meta && description) {
      meta.content = description;
    }

    return () => {
      document.title = prev;
      if (meta && prevDescription) {
        meta.content = prevDescription;
      }
    };
  }, [title, description]);
}
