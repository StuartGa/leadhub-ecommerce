import type { AudienceIconId } from "../../../infrastructure/data/audienceShowcase";

interface AudienceIconProps {
  id: AudienceIconId;
  className?: string;
}

export function AudienceIcon({ id, className = "h-6 w-6" }: AudienceIconProps) {
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
    case "restaurants":
      return (
        <svg {...common}>
          <path d="M4 11h16v9H4z" />
          <path d="M8 11V7l4-3 4 3v4" />
          <path d="M9 15h2M13 15h2" />
        </svg>
      );
    case "hotels":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="14" rx="1.5" />
          <path d="M8 10h2v2H8zM14 10h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z" />
          <path d="M10 20v-4h4v4" />
        </svg>
      );
    case "cafes":
      return (
        <svg {...common}>
          <path d="M6 10h12v5a4 4 0 0 1-8 0v-5z" />
          <path d="M18 11h1.5a2 2 0 0 1 0 4H18" />
          <path d="M9 7V5M12 7V5M15 7V5" />
          <path d="M8 19h8" />
        </svg>
      );
    case "catering":
      return (
        <svg {...common}>
          <path d="M12 3v4" />
          <path d="M8 7h8l-1 12H9L8 7z" />
          <path d="M6 19h12" />
        </svg>
      );
    case "hospitals":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      );
    case "schools":
      return (
        <svg {...common}>
          <path d="M3 10 12 5l9 5-9 5-9-5z" />
          <path d="M6 12v5l6 3 6-3v-5" />
        </svg>
      );
    case "supermarkets":
      return (
        <svg {...common}>
          <path d="M4 8h16l-1.5 11H5.5L4 8z" />
          <path d="M9 8V5h6v3" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    case "wholesalers":
      return (
        <svg {...common}>
          <rect x="4" y="12" width="4" height="8" rx="0.5" />
          <rect x="10" y="9" width="4" height="11" rx="0.5" />
          <rect x="16" y="6" width="4" height="14" rx="0.5" />
        </svg>
      );
    case "industrial":
      return (
        <svg {...common}>
          <path d="M4 14h16v6H4z" />
          <path d="M6 14V9l3-3 3 3v5M12 14V7l3-3 3 3v7" />
        </svg>
      );
    case "other":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 9h3v3H8zM13 9h3v3h-3zM8 14h8" />
        </svg>
      );
  }
}
