import {
  LANDING_BRAND_LOGOS,
  LANDING_VENTURA_PRODUCTS,
} from "../../../application/constants/landingAssets";
import { CheckList } from "./IdealForGrid";
import { LandingProductShowcase, LandingSectionCta } from "./LandingProductGrid";
import { LandingTintedLogo } from "./LandingTintedLogo";

const FEATURES = [
  "Aderezos y salsas listos para servir",
  "Consistencia en cada lote",
  "Presentaciones institucionales para alto volumen",
  "Sabores versátiles para toda tu carta",
];

export function LandingVenturaFoodsSection() {
  return (
    <section className="bg-gradient-to-b from-slate-100/80 via-slate-50/40 to-white pb-0 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-3xl">
          <LandingTintedLogo
            src={LANDING_BRAND_LOGOS.venturaFoodsMexico}
            alt="Ventura Foods México"
            tintClassName="bg-slate-900"
            className="mb-6 h-16 w-[min(100%,300px)] sm:h-20 sm:w-[min(100%,360px)]"
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

        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:mt-12 sm:p-6">
          <LandingProductShowcase products={LANDING_VENTURA_PRODUCTS} columns={3} />
        </div>

        <LandingSectionCta href="/productos?marca=ventura-foods" label="Ver más" />
      </div>
    </section>
  );
}
