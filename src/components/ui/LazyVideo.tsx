"use client";

import React, { memo, useEffect, useRef, useState } from "react";

export interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: number | string;
  label?: string;
}

/**
 * Viewport-aware video player.
 * Uses preload="metadata" initially (fetching only headers + first frame so zero 163 MB spikes),
 * switches to preload="auto" when within 400px of the viewport, and auto-plays/pauses on scroll.
 */
export const LazyVideo = memo(function LazyVideo({
  src,
  className = "h-full w-full object-cover select-none pointer-events-none",
  style,
  borderRadius,
  label = "Loading video...",
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      setIsReady(true);
    }
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      setIsVisible(true);
      return;
    }

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsNearViewport(entry.isIntersecting);
        }
      },
      { rootMargin: "400px 0px" }
    );

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "150px 0px" }
    );

    nearObserver.observe(el);
    playObserver.observe(el);

    return () => {
      nearObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  // Automatically play when visible and pause when scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Ignore autoplay restriction errors since video is muted + playsInline
        });
      }
    } else if (!video.paused) {
      video.pause();
    }
  }, [isVisible, isReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#171614]"
      style={{ borderRadius }}
    >
      {/* Subtle loading placeholder shown until video metadata / first frame is ready */}
      {!isReady && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-[#191816] text-[#EDE8E0]/80 pointer-events-none select-none z-10"
        >
          <div className="h-7 w-7 rounded-full border-2 border-[#EDE8E0]/20 border-t-[#DF3E48] animate-spin" />
          <span className="text-[11px] font-medium tracking-wide uppercase opacity-75">
            {label}
          </span>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload={isNearViewport ? "auto" : "metadata"}
        onLoadedMetadata={() => setIsReady(true)}
        onLoadedData={() => setIsReady(true)}
        onCanPlay={() => setIsReady(true)}
        className={`${className} transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        style={{
          borderRadius,
          ...style,
        }}
      />
    </div>
  );
});
