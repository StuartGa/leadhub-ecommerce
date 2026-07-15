import { Link } from "react-router-dom";
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_E164,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_URL,
} from "../../../application/constants/contact";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div>
            <h3 className="mb-4 font-sans text-xl font-semibold text-white">
              San Patric Foodservice
            </h3>
            <p className="font-sans text-sm font-light leading-relaxed text-slate-300">
              Distribuidor 100% mexicano con más de 20 años de experiencia en la 
              industria alimentaria.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">
              Navegación
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3 font-sans text-sm text-slate-300">
                <li>
                  <Link
                    to="/quienes-somos"
                    className="transition-colors hover:text-brand-500"
                  >
                    Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/productos"
                    className="transition-colors hover:text-brand-500"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marcas"
                    className="transition-colors hover:text-brand-500"
                  >
                    Marcas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cobertura"
                    className="transition-colors hover:text-brand-500"
                  >
                    Cobertura
                  </Link>
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
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:info@alimentosconvenientes.com.mx"
                  className="transition-colors hover:text-brand-500"
                >
                  info@alimentosconvenientes.com.mx
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href={`tel:${OFFICE_PHONE_E164}`}
                  className="transition-colors hover:text-brand-500"
                >
                  {OFFICE_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#25D366]"
                >
                  WhatsApp {WHATSAPP_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Col Postal, CDMX<br />
                  México
                </span>
              </li>
            </ul>
          </div>

          {/* Hours Column */}
          <div>
            <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">
              Horario de Atención
            </h4>
            <ul className="flex flex-col gap-2 font-sans text-sm text-slate-300">
              <li className="flex justify-between">
                <span className="text-slate-400">Lun - Vie:</span>
                <span className="font-medium">8:30 – 17:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Sábado:</span>
                <span className="font-medium">9:00 – 13:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Domingo:</span>
                <span className="font-medium text-slate-500">Cerrado</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block rounded bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-600"
              >
                Cotizar Ahora
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-sans text-xs text-slate-400">
              &copy; {new Date().getFullYear()} San Patric Foodservice. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 font-sans text-xs text-slate-400">
              <Link to="/privacy" className="transition-colors hover:text-brand-500">
                Privacidad
              </Link>
              <Link to="/terms" className="transition-colors hover:text-brand-500">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
