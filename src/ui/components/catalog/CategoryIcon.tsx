import type { CategoryIconId } from "../../../infrastructure/data/categoryShowcase";

interface CategoryIconProps {
  id: CategoryIconId;
  className?: string;
}

export function CategoryIcon({ id, className = "h-6 w-6" }: CategoryIconProps) {
  const stroke = "currentColor";
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "accompaniments":
      return (
        <svg {...common}>
          <path d="M5 18h14M7 14h10M9 10h6M11 6h2" />
        </svg>
      );
    case "sweeteners":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="6" height="6" rx="1" />
          <rect x="13" y="10" width="6" height="6" rx="1" />
          <path d="M8 18v2M16 18v2" />
        </svg>
      );
    case "canned":
      return (
        <svg {...common}>
          <rect x="8" y="5" width="8" height="14" rx="1.5" />
          <path d="M8 9h8M8 13h8" />
        </svg>
      );
    case "snacks":
      return (
        <svg {...common}>
          <path d="M6 8h12l-1 10H7L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "protein":
      return (
        <svg {...common}>
          <path d="M9 5c0 2 1 3 3 3s3-1 3-3" />
          <path d="M12 8v3M10 18h4l1-7H9l1 7Z" />
        </svg>
      );
    case "bakery":
      return (
        <svg {...common}>
          <path d="M5 18h14M7 14h10l-1-4H8l-1 4Z" />
          <path d="M9 10c0-2 1.5-3 3-3s3 1 3 3" />
        </svg>
      );
    case "sauces":
      return (
        <svg {...common}>
          <path d="M8 6h3v12H8zM13 8h3v10h-3z" />
          <path d="M9.5 6V4.5A1.5 1.5 0 0 1 11 3h2a1.5 1.5 0 0 1 1.5 1.5V6" />
        </svg>
      );
    case "vegetables":
      return (
        <svg {...common}>
          <path d="M12 20c3 0 5-2 5-5 0-3-2-5-5-5s-5 2-5 5c0 3 2 5 5 5Z" />
          <path d="M12 10V4M10 6l2-2 2 2" />
        </svg>
      );
    case "cheese":
      return (
        <svg {...common}>
          <path d="M5 18 12 5l7 13H5Z" />
          <circle cx="10" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="14" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "supplier":
      return (
        <svg {...common}>
          <path d="M3 9h13v9H3zM16 12h3l2 3v3h-5v-6Z" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="16.5" cy="18" r="1.5" />
        </svg>
      );
  }
}
