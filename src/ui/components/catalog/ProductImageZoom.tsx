import { useState, useRef, MouseEvent } from "react";

interface ProductImageZoomProps {
  src: string;
  alt: string;
  onError?: () => void;
}

export function ProductImageZoom({ src, alt, onError }: ProductImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(false); // Reset zoom on hover
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div
      ref={imageRef}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ height: "500px" }}
    >
      <div
        className="h-full w-full transition-transform duration-200 ease-out"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: isZoomed ? "250%" : "cover",
          backgroundPosition: isZoomed
            ? `${position.x}% ${position.y}%`
            : "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain opacity-0"
          loading="eager"
          decoding="async"
          onError={onError}
        />
      </div>

      {/* Instrucciones */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/75 px-4 py-2 text-xs text-white backdrop-blur-sm">
        {isZoomed ? "Haz click para desactivar zoom" : "Pasa el mouse para hacer zoom • Click para fijar"}
      </div>
    </div>
  );
}
