"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";

export interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: number | string;
  label?: string;
}

/**
 * Viewport-aware video player with real-time buffering feedback.
 * Defers downloading until within 600px of the viewport (`shouldLoad`),
 * auto-plays/pauses when within 150px (`isVisible`), and displays a live
 * buffering spinner + buffered percentage pill while downloading or stalling.
 */
export const LazyVideo = memo(function LazyVideo({
  src,
  className = "h-full w-full object-cover select-none pointer-events-none",
  style,
  borderRadius,
  label = "Buffering video...",
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [bufferPct, setBufferPct] = useState<number | null>(null);

  const updateBufferedProgress = useCallback((video: HTMLVideoElement) => {
    if (!video.duration || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }
    if (video.buffered.length === 0) return;

    const end = video.buffered.end(video.buffered.length - 1);
    const pct = Math.min(100, Math.max(0, Math.round((end / video.duration) * 100)));
    setBufferPct(pct);
  }, []);

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
      { rootMargin: "600px 0px" }
    );

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "150px 0px" }
    );

    loadObserver.observe(el);
    playObserver.observe(el);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  // Automatically play when visible and pause when scrolled out of view
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
  }, [isVisible, shouldLoad, hasFirstFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#171614]"
      style={{ borderRadius }}
    >
      {/* Buffering indicator shown while first frame or mid-playback chunks are downloading */}
      {isBuffering && (
        <div
          aria-live="polite"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 bg-black/25 transition-opacity duration-200"
        >
          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/65 px-4 py-2.5 text-[#EDE8E0] backdrop-blur-sm shadow-lg">
            <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[#EDE8E0]/25 border-t-[#DF3E48] animate-spin" />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold tracking-wide uppercase">
                {bufferPct !== null && bufferPct > 0 && bufferPct < 100
                  ? `Buffering ${bufferPct}%`
                  : "Buffering..."}
              </span>
              {label && (
                <span className="max-w-[190px] truncate text-[10px] text-[#EDE8E0]/70">
                  {label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        loop
        muted
        playsInline
        preload={shouldLoad ? "auto" : "none"}
        onProgress={(e) => updateBufferedProgress(e.currentTarget)}
        onLoadedData={(e) => {
          const video = e.currentTarget;
          if (video.readyState >= 2) setHasFirstFrame(true);
          updateBufferedProgress(video);
        }}
        onWaiting={() => setIsBuffering(true)}
        onSeeking={() => setIsBuffering(true)}
        onCanPlay={(e) => {
          const video = e.currentTarget;
          setHasFirstFrame(true);
          setIsBuffering(false);
          updateBufferedProgress(video);
        }}
        onCanPlayThrough={() => {
          setHasFirstFrame(true);
          setIsBuffering(false);
        }}
        onPlaying={() => {
          setHasFirstFrame(true);
          setIsBuffering(false);
        }}
        onTimeUpdate={(e) => {
          const video = e.currentTarget;
          if (video.readyState >= 3 && isBuffering) {
            setIsBuffering(false);
          }
        }}
        onError={() => setIsBuffering(false)}
        className={`${className} transition-opacity duration-300 ${
          hasFirstFrame ? "opacity-100" : "opacity-0"
        }`}
        style={{
          borderRadius,
          ...style,
        }}
      />
    </div>
  );
});
