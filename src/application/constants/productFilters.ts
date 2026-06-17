export interface ProductFilterOption {
  id: string;
  label: string;
  tags: string[];
}

const temporada = (slug: string) => `temporada-${slug}`;
const segmento = (slug: string) => `segmento-${slug}`;

/** Temporalidades del catálogo (tags con prefijo temporada-). */
export const TEMPORALITY_OPTIONS: ProductFilterOption[] = [
  {
    id: "dia-del-amor-y-la-amistad",
    label: "Día del amor y de la amistad",
    tags: [
      temporada("dia-del-amor-y-la-amistad"),
      temporada("dia-del-amor-y-san-valentin"),
      temporada("dia-del-amor-y-la-amsitad"),
    ],
  },
  {
    id: "dia-de-reyes",
    label: "Día de Reyes",
    tags: [temporada("dia-de-reyes")],
  },
  {
    id: "dia-de-la-madre",
    label: "Día de las Madres",
    tags: [temporada("dia-de-la-madre"), temporada("dia-del-madre")],
  },
  {
    id: "dia-del-nino",
    label: "Día del niño",
    tags: [temporada("dia-del-nino")],
  },
  {
    id: "dia-del-padre",
    label: "Día del padre",
    tags: [temporada("dia-del-padre")],
  },
  {
    id: "semana-santa-cuaresma",
    label: "Semana Santa (Cuaresma)",
    tags: [
      temporada("cuaresma"),
      temporada("semana-santa-cuaresma"),
      temporada("cuaresma-semana-santa"),
      temporada("semana-santa"),
    ],
  },
  {
    id: "dia-de-la-independencia",
    label: "Día de la Independencia",
    tags: [temporada("dia-de-la-independencia")],
  },
  {
    id: "dia-de-muertos-halloween",
    label: "Día de Muertos / Halloween",
    tags: [temporada("dia-de-muertos")],
  },
  {
    id: "f1-mexico",
    label: "F1 El gran premio de México",
    tags: [temporada("f1"), temporada("f2"), temporada("f3")],
  },
  {
    id: "fin-de-ano",
    label: "Fin de Año",
    tags: [temporada("fin-de-ano")],
  },
  {
    id: "vacaciones-de-verano",
    label: "Vacaciones de Verano",
    tags: [temporada("vacaciones-de-verano")],
  },
  {
    id: "dia-de-la-hamburguesa",
    label: "Día de la Hamburguesa",
    tags: [temporada("dia-de-la-hamburguesa")],
  },
  {
    id: "dia-de-la-pizza",
    label: "Día de la Pizza",
    tags: [temporada("dia-de-la-pizza")],
  },
];

/** Segmentos / tipos de negocio del catálogo (tags con prefijo segmento-). */
export const SEGMENT_OPTIONS: ProductFilterOption[] = [
  { id: "hoteles", label: "Hotel", tags: [segmento("hoteles")] },
  { id: "restaurantes", label: "Restaurante", tags: [segmento("restaurantes")] },
  { id: "cafeterias", label: "Cafetería", tags: [segmento("cafeterias")] },
  { id: "comedor-industrial", label: "Comedor Industrial", tags: [segmento("comedor-industrial")] },
  {
    id: "centros-de-entretenimiento",
    label: "Centro de Entretenimiento",
    tags: [segmento("centros-de-entretenimiento")],
  },
  { id: "panaderias", label: "Panadería", tags: [segmento("panaderias")] },
  { id: "reposterias", label: "Repostería", tags: [segmento("reposterias")] },
  { id: "fast-food", label: "Fast Food", tags: [segmento("fast-food")] },
  { id: "delivery", label: "Delivery", tags: [segmento("delivery")] },
  { id: "escuelas", label: "Escuelas", tags: [segmento("escuelas")] },
  { id: "hospitales", label: "Hospitales", tags: [segmento("hospitales")] },
];

export function productMatchesFilterTags(
  productTags: readonly string[],
  filterTags: readonly string[],
): boolean {
  return productTags.some((tag) => filterTags.includes(tag));
}

export function resolveFilterOption(
  options: ProductFilterOption[],
  selectedId: string,
): ProductFilterOption | undefined {
  const byId = options.find((option) => option.id === selectedId);
  if (byId) return byId;

  // Compatibilidad con URLs antiguas que usaban el primer tag sin prefijo.
  return options.find(
    (option) =>
      option.tags.includes(selectedId) ||
      option.tags.includes(`temporada-${selectedId}`) ||
      option.tags.includes(`segmento-${selectedId}`),
  );
}
