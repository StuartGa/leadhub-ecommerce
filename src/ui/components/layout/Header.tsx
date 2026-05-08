import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-24 max-w-[1200px] items-center justify-between px-6">
        <div className="flex h-full items-center gap-4 py-2">
          <NavLink to="/" className="flex h-full items-center">
            <img
              src="/logo.svg"
              alt="San Patric Foodservice"
              className="h-12 w-auto"
            />
          </NavLink>
        </div>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            <li>
              <NavLink
                to="/quienes-somos"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Quiénes Somos
              </NavLink>
            </li>
            <li>
              {isHome ? (
                <a
                  href="#catalog"
                  className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Productos
                </a>
              ) : (
                <NavLink
                  to="/#catalog"
                  className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Productos
                </NavLink>
              )}
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
              {isHome ? (
                <a
                  href="#coverage"
                  className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Cobertura
                </a>
              ) : (
                <NavLink
                  to="/#coverage"
                  className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                >
                  Cobertura
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                to="/contact"
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink
          to="/contact"
          className="hidden items-center gap-2 rounded bg-brand-500 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-900 md:flex"
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

        {/* Mobile menu button */}
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="px-6 py-4">
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink
                  to="/quienes-somos"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quiénes Somos
                </NavLink>
              </li>
              <li>
                {isHome ? (
                  <a
                    href="#catalog"
                    className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Productos
                  </a>
                ) : (
                  <NavLink
                    to="/#catalog"
                    className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Productos
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink
                  to="/marcas"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marcas
                </NavLink>
              </li>
              <li>
                {isHome ? (
                  <a
                    href="#coverage"
                    className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cobertura
                  </a>
                ) : (
                  <NavLink
                    to="/#coverage"
                    className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cobertura
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors duration-200 hover:text-brand-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </NavLink>
              </li>
              <li className="pt-2">
                <NavLink
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded bg-brand-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-900"
                  onClick={() => setMobileMenuOpen(false)}
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
