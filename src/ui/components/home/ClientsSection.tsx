import { clientService } from "../../../application/services/clientService";

const AVATAR_COLORS = [
  "bg-brand-500",
  "bg-brand-700",
  "bg-slate-700",
  "bg-brand-600",
  "bg-slate-800",
  "bg-brand-800",
];

function initial(name: string): string {
  const words = name.split(" ");
  return words.length > 1
    ? words[0][0] + words[words.length - 1][0]
    : name.slice(0, 2).toUpperCase();
}

export function ClientsSection() {
  const clients = clientService.getAll();

  return (
    <section
      id="clients"
      className="border-b border-slate-200/20 bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-3xl font-normal uppercase tracking-wider text-slate-900">
            NUESTROS <span className="font-semibold">CLIENTES</span>
          </h2>
          <p className="font-sans text-lg font-light text-slate-600">
            Confiamos en brindar calidad y servicio excepcional a las empresas
            líderes en México
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-300"
            >
              <div
                className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]} text-lg font-bold text-white shadow-md`}
                aria-hidden="true"
              >
                {initial(client.name)}
              </div>
              <p className="text-center font-sans text-xs font-medium text-slate-600 leading-tight">
                {client.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-brand-100 bg-brand-50 p-8">
          <div className="text-center">
            <p className="mb-2 font-sans text-lg font-light italic text-slate-700">
              "San Patric ha sido nuestro aliado estratégico por más de 5 años.
              Su consistencia en calidad y puntualidad de entrega nos ha
              permitido mantener nuestros estándares de servicio."
            </p>
            <p className="font-sans text-sm font-semibold text-brand-900">
              — Director de Operaciones, Grupo Hotelero Nacional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
