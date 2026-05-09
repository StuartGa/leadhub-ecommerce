import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;

import { useQuoteCart } from "../../../application/hooks/useQuoteCart";
import {
  getTopMatch,
  searchAll,
  type SearchItem,
} from "../../../application/services/globalSearchService";

function resultTypeLabel(type: SearchItem["type"]) {
  if (type === "producto") return "Producto";
  if (type === "categoria") return "Categoría";
  if (type === "blog") return "Blog";
  return "Marca";
}

export function Header() {
  const navigate = useNavigate();
  const { distinctProducts } = useQuoteCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchPanelRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (!searchPanelRef.current || !desktopSearchOpen) return;
      if (searchPanelRef.current.contains(target)) return;
      if (searchButtonRef.current?.contains(target)) return;
      setDesktopSearchOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [desktopSearchOpen]);

  useEffect(() => {
    let cancelled = false;

    const runSearch = async () => {
      if (!query.trim()) {
        if (!cancelled) {
          setSuggestions([]);
          setIsSearching(false);
        }
        return;
      }

      if (!cancelled) {
        setIsSearching(true);
      }

      const results = await searchAll(query, 8);
      if (cancelled) return;
      setSuggestions(results);
      setIsSearching(false);
    };

    void runSearch();

    return () => {
      cancelled = true;
    };
  }, [query]);

  const executeSearch = async (overrideItem?: SearchItem) => {
    const trimmed = query.trim();
    if (!trimmed && !overrideItem) return;

    const closeSearchUi = () => {
      setDesktopSearchOpen(false);
      setMobileMenuOpen(false);
      setQuery("");
      setSuggestions([]);
      setActiveIndex(0);
    };

    if (overrideItem) {
      navigate(overrideItem.href);
      closeSearchUi();
      return;
    }

    const selectedItem = suggestions[Math.min(activeIndex, Math.max(suggestions.length - 1, 0))];
    if (selectedItem) {
      navigate(selectedItem.href);
      closeSearchUi();
      return;
    }

    const topMatch = await getTopMatch(trimmed);
    if (topMatch) {
      navigate(topMatch.href);
      closeSearchUi();
      return;
    }

    navigate(`/productos?q=${encodeURIComponent(trimmed)}`);
    closeSearchUi();
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(suggestions.length, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + Math.max(suggestions.length, 1)) % Math.max(suggestions.length, 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      void executeSearch();
      return;
    }

    if (event.key === "Escape") {
      setDesktopSearchOpen(false);
      return;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-24 max-w-[1200px] items-center justify-between px-6">
        <div className="flex h-full items-center gap-4 py-2">
          <NavLink to="/" className="flex h-full items-center">
            <img
              src={logoSrc}
              alt="San Patric Foodservice"
              className="h-12 w-auto"
            />
          </NavLink>
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                to="/quienes-somos"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Quiénes Somos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/productos"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marcas"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Marcas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cobertura"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Cobertura
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Contacto
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cotizacion"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Cotizacion {distinctProducts > 0 ? `(${distinctProducts})` : ""}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            ref={searchButtonRef}
            type="button"
            onClick={() => setDesktopSearchOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-slate-600 transition-colors hover:border-brand-500 hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="Abrir buscador"
            aria-expanded={desktopSearchOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <NavLink
            to="/contact"
            className="items-center gap-2 rounded bg-brand-500 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-900 md:inline-flex"
          >
            Cotizar
            <svg
              className="h-[18px] w-[18px]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </NavLink>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6 text-slate-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-slate-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {desktopSearchOpen && (
        <div ref={searchPanelRef} className="hidden border-t border-slate-200 bg-white px-6 pb-5 pt-4 md:block">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative mx-auto max-w-2xl">
              <input
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onSearchKeyDown}
                placeholder="Buscar productos, categorías, blog o marcas..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pl-11 text-slate-900 placeholder-slate-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                autoFocus
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

            {query.trim() && (
              <div className="mx-auto mt-3 max-w-2xl rounded-lg border border-slate-200 bg-white shadow-lg">
                {suggestions.length > 0 ? (
                  <ul className="max-h-80 overflow-auto py-1">
                    {suggestions.map((item, index) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => void executeSearch(item)}
                          className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors ${index === activeIndex ? "bg-brand-50" : "hover:bg-slate-50"}`}
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-900">{item.label}</p>
                            <p className="text-xs text-slate-500">{item.subtitle}</p>
                          </div>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                            {resultTypeLabel(item.type)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-4 text-sm text-slate-600">
                    {isSearching ? "Buscando coincidencias..." : "Sin coincidencias exactas. Presiona Enter para buscar en productos."}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="px-6 py-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Buscar..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pl-10 text-slate-900 placeholder-slate-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <svg
                  className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400"
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

              {query.trim() && suggestions.length > 0 && (
                <ul className="mt-2 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white py-1">
                  {suggestions.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => void executeSearch(item)}
                        className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.subtitle}</p>
                        </div>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                          {resultTypeLabel(item.type)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ul className="flex flex-col gap-4">
              <li>
                <NavLink
                  to="/quienes-somos"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Quiénes Somos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/productos"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Productos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/marcas"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Marcas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cobertura"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Cobertura
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Contacto
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cotizacion"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Cotizacion {distinctProducts > 0 ? `(${distinctProducts})` : ""}
                </NavLink>
              </li>
              <li className="pt-2">
                <NavLink
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded bg-brand-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-900"
                >
                  Cotizar
                  <svg
                    className="h-[18px] w-[18px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
