import type { ReactNode } from "react";

interface PageBannerProps {
  src: string;
  alt: string;
  title: ReactNode;
  subtitle?: string;
  variant?: "light" | "dark";
  compact?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}

const BASE = import.meta.env.BASE_URL || "/";

export function PageBanner({ src, alt, title, subtitle, variant = "light", compact = false, fit = "cover", className = "" }: PageBannerProps) {
  const overlayClass = variant === "dark"
    ? "bg-black/50"
    : "bg-white/40";

  const textClass = variant === "dark"
    ? "text-white"
    : "text-slate-900";

  const paddingY = compact
    ? "py-16 sm:py-20"
    : "py-24 lg:py-32";

  const HeadingTag = compact ? "h2" : "h1";
  const headingClass = compact
    ? "mb-2 font-sans text-3xl font-bold uppercase tracking-wider sm:text-4xl"
    : "mb-4 font-sans text-4xl font-bold uppercase tracking-wider sm:text-5xl lg:text-6xl";

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <img
        src={`${BASE}assets/images/banners/${src}`}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        loading="eager"
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className={`relative mx-auto max-w-7xl px-4 ${paddingY} sm:px-6 lg:px-8`}>
        <div className={`mx-auto max-w-4xl text-center ${textClass}`}>
          <HeadingTag className={headingClass}>
            {title}
          </HeadingTag>
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
