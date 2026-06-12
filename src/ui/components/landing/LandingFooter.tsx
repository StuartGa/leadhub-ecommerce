import { LOGO_WHITE } from "../../../application/constants/assets";

const LEGAL_LINKS = [
  { label: "Aviso de Privacidad", href: "#" },
  { label: "Términos y Condiciones", href: "#" },
  { label: "Política de Cookies", href: "#" },
  { label: "Aviso Legal", href: "#" },
] as const;

export function LandingFooter() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:gap-10 lg:gap-14">
        <div className="shrink-0">
          <img
            src={LOGO_WHITE}
            alt="Alimentos Convenientes san patric"
            className="h-14 w-auto sm:h-16"
          />
        </div>

        <div className="flex flex-col gap-2 text-left text-sm leading-relaxed text-white/95 sm:text-[0.9375rem]">
          <p>Proveedor confiable para la industria HORECA.</p>
          <p>Calidad • Rendimiento • Confianza</p>

          <nav
            aria-label="Enlaces legales"
            className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/75 sm:text-sm"
          >
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.label} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <span className="text-white/40" aria-hidden="true">
                    |
                  </span>
                )}
                <a
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
