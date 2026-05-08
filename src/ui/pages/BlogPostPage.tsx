import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { blogService } from "../../application/services/blogService";
import type { ContentBlock } from "../../domain/types/blog";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return <h2 className="mt-8 mb-4 font-sans text-2xl font-bold text-slate-900">{block.text}</h2>;
      }
      return <h3 className="mt-6 mb-3 font-sans text-xl font-semibold text-slate-900">{block.text}</h3>;
    case "paragraph":
      return <p className="mb-4 font-sans text-base font-light leading-relaxed text-slate-700">{block.text}</p>;
    case "list":
      return (
        <ul className="mb-4 list-inside list-disc space-y-1 pl-4">
          {block.items.map((item, i) => (
            <li key={i} className="font-sans text-base font-light leading-relaxed text-slate-700">{item}</li>
          ))}
        </ul>
      );
  }
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogService.getBySlug(slug) : undefined;

  useDocumentTitle(post ? `${post.title} — San Patric Foodservice` : "Artículo no encontrado — San Patric Foodservice");

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="text-center">
            <h1 className="mb-4 font-sans text-4xl font-bold text-slate-900">
              Artículo no encontrado
            </h1>
            <p className="mb-6 text-lg text-slate-600">
              El artículo que buscas no existe o ha sido removido.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              ← Volver al Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand-900 to-brand-700 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              to="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-white"
            >
              ← Volver al Blog
            </Link>
            <h1 className="mb-4 font-sans text-3xl font-bold leading-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-white/80">
              <span>{formatDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{post.readTime} min de lectura</span>
              <span>·</span>
              <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs uppercase tracking-wide">
                {post.category}
              </span>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-3xl">
            {post.content.map((block, index) => (
              <ContentBlockRenderer key={index} block={block} />
            ))}
          </article>

          <div className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wider text-slate-900 sm:text-3xl">
              ¿Listo para <span className="font-normal">Cotizar?</span>
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Descubre cómo San Patric Foodservice puede ayudarte con productos de calidad
              y entregas puntuales para tu negocio.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Solicitar Cotización
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-700 transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Más Artículos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
