export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Tiempo Completo" | "Medio Tiempo" | "Prácticas" | "Freelance";
  description: string;
  requirements: readonly string[];
  responsibilities: readonly string[];
  postedAt: string;
}
