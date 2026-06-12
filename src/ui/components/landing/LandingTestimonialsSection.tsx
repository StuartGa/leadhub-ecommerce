import { LANDING_ASSETS } from "../../../application/constants/landingAssets";

const TESTIMONIALS = [
  {
    quote:
      "La consistencia de los tomates Stanislaus ha transformado nuestras salsas base. Nuestros clientes notan la diferencia en cada plato.",
    author: "Chef Ejecutivo",
    role: "Hotel & Resort",
  },
  {
    quote:
      "Las Megacrunch de Simplot mantienen su crujiente incluso en servicio para llevar. Es exactamente lo que necesitábamos para nuestra cadena.",
    author: "Director de Operaciones",
    role: "Cadena de Restaurantes",
  },
  {
    quote:
      "San Patric entiende las necesidades del sector HORECA. Entregas puntuales, productos de calidad y un equipo que realmente apoya tu negocio.",
    author: "Gerente de Compras",
    role: "Grupo de Catering",
  },
];

function StarRating() {
  return (
    <div className="flex justify-center gap-1" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function LandingTestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <img
        src={LANDING_ASSETS.testimonialsBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-brand-900/85" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          La confianza de nuestros clientes nos respalda.
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote key={testimonial.author} className="text-center">
              <p className="text-sm italic leading-relaxed text-white sm:text-[0.9375rem]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <p className="text-sm font-semibold text-white">
                    {testimonial.author}, {testimonial.role}
                  </p>
                </cite>
                <div className="mt-3">
                  <StarRating />
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
