type LandingTintedLogoProps = {
  src: string;
  alt: string;
  tintClassName?: string;
  className?: string;
};

export function LandingTintedLogo({
  src,
  alt,
  tintClassName = "bg-slate-900",
  className = "h-20 w-[min(100%,320px)] sm:h-24 sm:w-[min(100%,380px)]",
}: LandingTintedLogoProps) {
  return (
    <div
      className={`${tintClassName} mask-contain mask-center mask-no-repeat ${className}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
      }}
      role="img"
      aria-label={alt}
    />
  );
}
