export function CoverageSection() {
  const regions = [
    { name: "Zona Centro", states: ["CDMX", "Estado de México", "Morelos", "Hidalgo"] },
    { name: "Zona Norte", states: ["Nuevo León", "Coahuila", "Chihuahua"] },
    { name: "Zona Occidente", states: ["Jalisco", "Guanajuato", "Querétaro"] },
    { name: "Zona Sur", states: ["Puebla", "Oaxaca", "Veracruz"] },
  ];

  return (
    <section
      id="coverage"
      className="border-b border-slate-200/20 bg-white py-20"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-3xl font-normal uppercase tracking-wider text-slate-900">
            COBERTURA <span className="font-semibold">NACIONAL</span>
          </h2>
          <p className="font-sans text-lg font-light text-slate-600">
            Distribución y almacenamiento en las principales ciudades de México
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {regions.map((region, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-500 hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
                  <svg
                    className="h-6 w-6 text-brand-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="font-sans text-lg font-semibold text-slate-900">
                  {region.name}
                </h3>
              </div>
              <ul className="space-y-2">
                {region.states.map((state, stateIndex) => (
                  <li
                    key={stateIndex}
                    className="flex items-center gap-2 font-sans text-sm text-slate-600"
                  >
                    <svg
                      className="h-4 w-4 text-brand-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {state}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-brand-500 p-8 text-center text-white">
          <h3 className="mb-4 font-sans text-2xl font-semibold">
            ¿Tu región no está listada?
          </h3>
          <p className="mb-6 font-sans text-base font-light">
            Estamos expandiendo constantemente nuestra red de distribución.
            Contáctanos para conocer nuestras próximas aperturas.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded bg-white px-8 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-brand-900 transition-all hover:bg-slate-100"
          >
            Contactar Ventas
            <svg
              className="h-[18px] w-[18px]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
