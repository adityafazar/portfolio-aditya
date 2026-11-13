"use client";

import React, { memo, useEffect, useState } from "react";

interface PortfolioPreloaderProps {
  canvasMounted: boolean;
}

/**
 * Lightweight initial loading screen aligned with the drafting-paper / Blender theme.
 * Smoothly reveals the canvas once hydrated & hero resources settle, with a strict safety timeout.
 */
export const PortfolioPreloader = memo(function PortfolioPreloader({
  canvasMounted,
}: PortfolioPreloaderProps) {
  const [progress, setProgress] = useState(25);
  const [isDone, setIsDone] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_DISPLAY_MS = 450;
    const MAX_WAIT_MS = 1400;

    // Gentle progress ramp so user sees immediate feedback
    const rampTimer = window.setInterval(() => {
      setProgress((prev) => (prev < 88 ? prev + 9 : prev));
    }, 110);

    let finished = false;
    const finishLoading = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(rampTimer);

      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);

      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => {
          setIsDone(true);
          window.setTimeout(() => setShouldUnmount(true), 420);
        }, 140);
      }, delay);
    };

    // Wait for window load + fonts, but never block past MAX_WAIT_MS
    const safetyTimer = window.setTimeout(finishLoading, MAX_WAIT_MS);

    const onReadyCheck = () => {
      if (canvasMounted && document.readyState === "complete") {
        finishLoading();
      }
    };

    if (canvasMounted) {
      if (document.readyState === "complete") {
        finishLoading();
      } else {
        window.addEventListener("load", onReadyCheck, { once: true });
      }
    }

    return () => {
      window.clearInterval(rampTimer);
      window.clearTimeout(safetyTimer);
      window.removeEventListener("load", onReadyCheck);
    };
  }, [canvasMounted]);

  if (shouldUnmount) return null;

  return (
    <div
      aria-hidden={isDone}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#EDE8E0] transition-opacity duration-400 ${
        isDone ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(140, 135, 125, 0.16) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(140, 135, 125, 0.16) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}
    >
      <div className="mx-4 flex w-full max-w-[340px] flex-col items-center gap-4 rounded-2xl border-[3px] border-black bg-[#FFFDF8] px-6 py-6 shadow-[8px_8px_0px_#000]">
        {/* Animated badge + Blender icon */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border-2 border-black bg-[#4565D6] shadow-[3px_3px_0px_#000]">
            <div className="h-5 w-5 rounded-full border-[2.5px] border-white/30 border-t-white animate-spin" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-[#1A1A1A]">
              Aditya Fazar Sanjaya
            </span>
            <span className="text-[11px] font-medium text-[#57534E]">
              3D, Design &amp; UI/UX Portfolio
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="h-3 w-full overflow-hidden rounded-full border-2 border-black bg-[#EDE8E0]">
            <div
              className="h-full bg-[#DF3E48] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#57534E]">
            <span>Memuat kanvas interaktif...</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
});
