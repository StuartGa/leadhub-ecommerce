import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <h3 className="mb-4 font-sans text-xl font-semibold text-white">
              San Patric Foodservice
            </h3>
            <p className="font-sans text-sm font-light leading-relaxed text-slate-300">
              Alimentos convenientes premium para restaurantes, hoteles,
              cafeterías y servicios de catering en México.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">
              Enlaces
            </h4>
            <nav aria-label="Footer links">
              <ul className="flex flex-col gap-3 font-sans text-sm text-slate-300">
                <li>
                  <a
                    href="#about"
                    className="transition-colors hover:text-brand-500"
                  >
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#catalog"
                    className="transition-colors hover:text-brand-500"
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="transition-colors hover:text-brand-500"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">
              Contacto
            </h4>
            <ul className="flex flex-col gap-3 font-sans text-sm text-slate-300">
              <li>
                <a
                  href="mailto:info@sanpatric.com"
                  className="transition-colors hover:text-brand-500"
                >
                  info@sanpatric.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+525555555555"
                  className="transition-colors hover:text-brand-500"
                >
                  +52 (55) 5555-5555
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-8 text-center">
          <p className="font-sans text-xs text-slate-400">
            &copy; {new Date().getFullYear()} San Patric Foodservice. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
