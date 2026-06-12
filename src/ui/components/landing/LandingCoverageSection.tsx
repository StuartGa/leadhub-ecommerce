import { LANDING_ASSETS } from "../../../application/constants/landingAssets";
import { CheckItem } from "./IdealForGrid";

const COVERAGE_STATES_LEFT = [
  "CDMX",
  "Estado de México",
  "Jalisco",
  "Nuevo León",
];

const COVERAGE_STATES_RIGHT = [
  "Puebla",
  "Querétaro",
  "Morelos",
  "Veracruz",
];

const CONTACT_BENEFITS = [
  "Asesoría personalizada",
  "Cotizaciones a la medida",
  "Soluciones para cada tipo de operación",
];

function StateColumn({ states }: { states: string[] }) {
  return (
    <ul className="space-y-2.5">
      {states.map((state) => (
        <CheckItem key={state} label={state} />
      ))}
    </ul>
  );
}

export function LandingCoverageSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-brand-800 sm:text-[1.75rem]">
              Cobertura en México
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              Estamos cerca de tu negocio para ofrecerte el mejor servicio.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-600"
                aria-hidden="true"
              />
              <span className="text-sm font-bold text-slate-900">
                Estados con presencia
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-0">
                <StateColumn states={COVERAGE_STATES_LEFT} />
                <StateColumn states={COVERAGE_STATES_RIGHT} />
              </div>

              <div className="flex flex-1 items-center justify-center sm:justify-end">
                <img
                  src={LANDING_ASSETS.coverageMap}
                  alt="Mapa de México con estados de cobertura resaltados"
                  className="h-auto w-full max-w-[340px] object-contain lg:max-w-[420px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="lg:pl-6 xl:pl-10">
            <h2 className="text-2xl font-bold text-brand-800 sm:text-[1.75rem]">
              Hablemos de tu negocio
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              Déjanos tus datos y un asesor especializado te contactará para
              ofrecerte la mejor solución para tu cocina.
            </p>

            <ul className="mt-8 space-y-3">
              {CONTACT_BENEFITS.map((benefit) => (
                <CheckItem key={benefit} label={benefit} />
              ))}
            </ul>

            <div className="mt-10 pt-2">
              <p className="text-lg font-bold text-brand-800">
                Alimentos Convenientes San Patric
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Ingredientes que inspiran, resultados que se notan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
