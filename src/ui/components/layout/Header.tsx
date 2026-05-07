import { Link, NavLink, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          Lead<span className="text-brand-600">Hub</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <li>
              {isHome ? (
                <a
                  href="#catalog"
                  className="transition-colors hover:text-slate-900"
                >
                  Services
                </a>
              ) : (
                <NavLink
                  to="/#catalog"
                  className="transition-colors hover:text-slate-900"
                >
                  Services
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                to="/contact"
                className="rounded-lg bg-brand-600 px-4 py-2 text-white transition-colors hover:bg-brand-700"
              >
                Get in Touch
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
