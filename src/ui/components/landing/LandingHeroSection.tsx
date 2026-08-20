import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { LOGO_COLOR } from "../../../application/constants/assets";
import { LANDING_ASSETS } from "../../../application/constants/landingAssets";
import { LeadForm } from "./LeadForm";

function primeSafariVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

export function LandingHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setVideoEnabled(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    primeSafariVideo(video);

    let interactionListenersAttached = false;
    let playOnInteraction: (() => void) | null = null;
    let onVisibilityChange: (() => void) | null = null;

    const detachInteractionListeners = () => {
      if (!interactionListenersAttached || !playOnInteraction || !onVisibilityChange) {
        return;
      }

      document.removeEventListener("pointerdown", playOnInteraction, true);
      document.removeEventListener("touchstart", playOnInteraction, true);
      document.removeEventListener("keydown", playOnInteraction, true);
      document.removeEventListener("scroll", playOnInteraction, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      interactionListenersAttached = false;
    };

    const tryPlay = async () => {
      if (!video.paused) return;

      primeSafariVideo(video);
      try {
        await video.play();
        detachInteractionListeners();
      } catch {
        attachInteractionListeners();
      }
    };

    const attachInteractionListeners = () => {
      if (interactionListenersAttached || !video.paused) return;
      interactionListenersAttached = true;

      playOnInteraction = () => {
        void tryPlay();
      };

      onVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          void tryPlay();
        }
      };

      document.addEventListener("pointerdown", playOnInteraction, {
        capture: true,
        passive: true,
      });
      document.addEventListener("touchstart", playOnInteraction, {
        capture: true,
        passive: true,
      });
      document.addEventListener("keydown", playOnInteraction, { capture: true });
      document.addEventListener("scroll", playOnInteraction, {
        capture: true,
        passive: true,
      });
      document.addEventListener("visibilitychange", onVisibilityChange);
    };

    const onCanPlay = () => {
      void tryPlay();
    };

    // Safari often refuses autoplay on elements that are not yet visible in the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void tryPlay();
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(video);

    video.addEventListener("canplay", onCanPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
      detachInteractionListeners();
    };
  }, []);

  useEffect(() => {
    if (!videoEnabled) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = LANDING_ASSETS.heroVideo;
    link.type = "video/mp4";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [videoEnabled]);

  return (
    <section
      className="hero-section-bg relative shrink-0 overflow-hidden pb-1 lg:flex lg:min-h-0 lg:flex-1"
      style={{ backgroundImage: `url(${LANDING_ASSETS.hero})` }}
    >
      {videoEnabled ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          poster={LANDING_ASSETS.hero}
          aria-hidden="true"
          className="hero-bg-video pointer-events-none absolute inset-0 h-full w-full object-cover object-[80%_center] lg:object-center"
        >
          <source src={LANDING_ASSETS.heroVideo} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 lg:from-white lg:via-white/75 lg:to-transparent" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col px-4 py-3 sm:px-6 sm:py-4 lg:h-full lg:py-5">
        <Link to="/" className="inline-block shrink-0">
          <img
            src={LOGO_COLOR}
            alt="Alimentos Convenientes san patric"
            className="h-10 w-auto sm:h-14 lg:h-16"
          />
        </Link>

        <div className="mt-2 flex flex-col gap-3 sm:mt-3 lg:mt-4 lg:min-h-0 lg:flex-1 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="max-w-xl shrink-0 lg:max-w-[460px] lg:pt-1">
            <h1 className="text-[1.15rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-[1.85rem] lg:text-[2rem]">
              Soluciones que impulsan tu cocina,{" "}
              <span className="text-brand-800">resultados que se saborean.</span>
            </h1>
            <p className="mt-2 hidden text-sm leading-relaxed text-slate-600 sm:block lg:mt-3">
              Ingredientes confiables, rendimiento constante y sabor que tus
              clientes notan.
            </p>
          </div>

          <div className="hidden min-h-0 flex-1 overflow-y-auto lg:block lg:max-w-[420px] lg:flex-none lg:pr-1">
            <LeadForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
