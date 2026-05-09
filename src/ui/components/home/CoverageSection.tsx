export function CoverageSection() {
  const regions = [
    { name: "Zona Centro", states: ["CDMX", "Estado de México", "Morelos", "Hidalgo"] },
    { name: "Zona Norte", states: ["Nuevo León", "Coahuila", "Chihuahua"] },
    { name: "Zona Occidente", states: ["Jalisco", "Guanajuato", "Querétaro"] },
    { name: "Zona Sur", states: ["Puebla", "Oaxaca", "Veracruz"] },
  ];

  const temperatures = [
    {
      label: "Secos",
      desc: "Almacén a temperatura ambiente",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="10" fill="currentColor" opacity="0.15" />
          <circle cx="24" cy="24" r="5" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 24 + 8 * Math.cos(rad);
            const y1 = 24 + 8 * Math.sin(rad);
            const x2 = 24 + 14 * Math.cos(rad);
            const y2 = 24 + 14 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />;
          })}
        </svg>
      ),
    },
    {
      label: "Refrigerados",
      desc: "Cadena de frío controlada 0°–4°C",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M24 10v6m0 16v6M12 20h6m12 0h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {[
            { cx: 15, cy: 15 }, { cx: 33, cy: 15 },
            { cx: 33, cy: 33 }, { cx: 15, cy: 33 },
          ].map((p, i) => (
            <line
              key={i}
              x1={p.cx - 3} y1={p.cy - 3}
              x2={p.cx + 3} y2={p.cy + 3}
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            />
          ))}
        </svg>
      ),
    },
    {
      label: "Congelados",
      desc: "Cadena de frío -18°C o inferior",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 4L24 44M8 14L40 34M8 34L40 14M14 8L34 40M34 8L14 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M18 12L24 18L30 12L36 18L30 24L36 30L30 36L24 30L18 36L12 30L18 24L12 18Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      ),
    },
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

        {/* Temperature Capability Bar */}
        <div className="mb-10 grid gap-6 sm:grid-cols-3">
          {temperatures.map((temp) => (
            <div
              key={temp.label}
              className="flex items-center gap-4 rounded-lg border border-brand-100 bg-brand-50/60 px-5 py-4"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                {temp.icon}
              </div>
              <div>
                <div className="font-sans text-base font-semibold text-slate-900">
                  {temp.label}
                </div>
                <div className="text-xs text-slate-600">{temp.desc}</div>
              </div>
            </div>
          ))}
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
