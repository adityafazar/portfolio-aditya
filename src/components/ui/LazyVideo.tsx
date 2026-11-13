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
 * Viewport-aware lazy-loading video player.
 * Defers downloading video bytes until the element approaches the viewport,
 * shows a lightweight loading state while buffering, and pauses when off-screen.
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
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Start loading video when within 900px of viewport; track closer visibility for play/pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const loadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );

    const playObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "200px 0px" }
    );

    loadObserver.observe(el);
    playObserver.observe(el);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  // Automatically play when visible and pause when scrolled far out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

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
  }, [isVisible, shouldLoad, isReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#171614]"
      style={{ borderRadius }}
    >
      {/* Subtle loading placeholder shown until video first frame is ready */}
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
        src={shouldLoad ? src : undefined}
        autoPlay={shouldLoad}
        loop
        muted
        playsInline
        preload={shouldLoad ? "auto" : "none"}
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
