import {
  LANDING_BRAND_LOGOS,
  LANDING_VENTURA_PRODUCTS,
} from "../../../application/constants/landingAssets";
import { CheckList } from "./IdealForGrid";
import { LandingProductGrid, LandingSectionCta } from "./LandingProductGrid";

const FEATURES = [
  "Aderezos y salsas listos para servir",
  "Consistencia en cada lote",
  "Presentaciones institucionales para alto volumen",
  "Sabores versátiles para toda tu carta",
];

export function LandingVenturaFoodsSection() {
  return (
    <section className="bg-white pb-0 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-12">
          <div>
            <img
              src={LANDING_BRAND_LOGOS.venturaFoods}
              alt="Ventura Foods"
              className="mb-6 h-20 w-auto max-w-[240px] object-contain sm:h-24"
              loading="lazy"
            />
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Aderezos y salsas Ventura Foods
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Soluciones listas para usar que ahorran tiempo en cocina sin
              sacrificar sabor ni presentación en tu operación.
            </p>
            <div className="mt-6">
              <CheckList items={FEATURES} />
            </div>
          </div>

          <LandingProductGrid products={LANDING_VENTURA_PRODUCTS} columns={3} />
        </div>

        <LandingSectionCta href="/productos?marca=ventura-foods" label="Ver más" />
      </div>
    </section>
  );
}
