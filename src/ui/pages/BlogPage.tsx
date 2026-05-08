import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../../application/hooks/useDocumentTitle";
import { blogService } from "../../application/services/blogService";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const CATEGORIES = ["Todas", "Tendencias", "Guías", "Operación"];

export function BlogPage() {
  useDocumentTitle(
    "Blog Foodservice — San Patric Foodservice",
    "Artículos, guías y tendencias del mundo foodservice: cadena de frío, abastecimiento inteligente, productos convenientes y más. Información práctica para restauranteros y profesionales de la industria alimentaria."
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const posts = blogService.getAll();

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (selectedCategory !== "Todas" && post.category !== selectedCategory) {
        return false;
      }

      if (!normalizedQuery) return true;

      const inTitle = post.title.toLowerCase().includes(normalizedQuery);
      const inExcerpt = post.excerpt.toLowerCase().includes(normalizedQuery);
      const inCategory = post.category.toLowerCase().includes(normalizedQuery);
      const inTags = post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return inTitle || inExcerpt || inCategory || inTags;
    });
  }, [posts, query, selectedCategory]);

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
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 to-brand-700 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 font-sans text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl lg:text-6xl">
              Blog <span className="font-normal">Foodservice</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Artículos, guías y tendencias del mundo foodservice para ayudar
              a tu negocio a crecer.
            </p>
          </div>
        </section>

        {/* Filtros por categoría */}
        <section className="border-b border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-6 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => {
                    const next = new URLSearchParams(searchParams);
                    if (!event.target.value.trim()) {
                      next.delete("q");
                    } else {
                      next.set("q", event.target.value);
                    }
                    setSearchParams(next, { replace: true });
                  }}
                  placeholder="Buscar artículos del blog..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pl-11 text-slate-900 placeholder-slate-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <svg
                  className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                    selectedCategory === category
                      ? "bg-brand-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {filteredPosts.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-16 text-center">
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  No encontramos artículos con ese criterio
                </h3>
                <p className="text-slate-600">Prueba otra búsqueda o cambia la categoría.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-video overflow-hidden bg-slate-100">
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50">
                          <svg
                            className="h-16 w-16 text-brand-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="rounded-full bg-brand-50 px-3 py-1 font-medium uppercase tracking-wide text-brand-700">
                          {post.category}
                        </span>
                        <span className="text-slate-500">{post.readTime} min lectura</span>
                      </div>

                      <h2 className="font-sans text-xl font-semibold leading-tight text-slate-900">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="transition-colors hover:text-brand-500"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="flex-1 font-sans text-sm font-light leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs text-slate-500">
                          {formatDate(post.publishedAt)}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-sm font-semibold uppercase tracking-wide text-brand-500 transition-colors hover:text-brand-700"
                        >
                          Leer Más →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl">
              Suscríbete a <span className="font-normal">Nuestro Boletín</span>
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Recibe las últimas tendencias, guías y novedades del mundo foodservice
              directamente en tu correo.
            </p>
            <form
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
