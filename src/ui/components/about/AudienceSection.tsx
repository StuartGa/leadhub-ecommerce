import { Link } from "react-router-dom";

import { audienceShowcaseItems } from "../../../infrastructure/data/audienceShowcase";
import { AudienceIcon } from "./AudienceIcon";

export function AudienceSection() {
  return (
    <section
      className="bg-slate-100/90 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="audience-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2
            id="audience-heading"
            className="mb-4 font-sans text-3xl font-bold uppercase tracking-wider text-slate-900 sm:text-4xl"
          >
            A Quién <span className="font-normal">Atendemos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Soluciones de abasto y logística para cada segmento del sector
            foodservice en México.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {audienceShowcaseItems.map((item) => (
            <article
              key={item.name}
              className="group relative aspect-square overflow-hidden rounded-xl bg-slate-200"
              aria-label={item.name}
            >
              <img
                src={item.imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 shadow-md transition-transform duration-300 group-hover:scale-105 sm:bottom-4 sm:left-4 sm:h-12 sm:w-12">
                <AudienceIcon id={item.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <span className="sr-only">{item.name}</span>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 rounded bg-brand-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Ver Productos
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
