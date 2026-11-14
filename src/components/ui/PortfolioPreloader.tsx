"use client";

import React, { memo, useEffect, useState } from "react";

interface PortfolioPreloaderProps {
  canvasMounted: boolean;
}

/**
 * Initial loading screen aligned with the drafting-paper / Blender theme.
 * Waits for Frame 1 (Hero/Bio/Experience) images and video metadata/first frames,
 * with a fast 3.5s safety timeout so the site never stalls on initial open.
 */
export const PortfolioPreloader = memo(function PortfolioPreloader({
  canvasMounted,
}: PortfolioPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    if (!canvasMounted) return;

    const startTime = Date.now();
    const MIN_DISPLAY_MS = 350;
    const MAX_WAIT_MS = 3500;

    let finished = false;
    const cleanups: Array<() => void> = [];

    const finishLoading = () => {
      if (finished) return;
      finished = true;

      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);

      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => {
          setIsDone(true);
          window.setTimeout(() => setShouldUnmount(true), 380);
        }, 160);
      }, delay);
    };

    const rafId = window.requestAnimationFrame(() => {
      const heroImgs = Array.from(document.querySelectorAll("#figma-frame-1 img"));
      const videos = Array.from(document.querySelectorAll("video"));
      const total = heroImgs.length + videos.length;
      setTotalCount(total);

      if (total === 0) {
        finishLoading();
        return;
      }

      const failedVideos = new WeakSet<HTMLVideoElement>();

      const evaluateProgress = () => {
        if (finished) return;

        let ready = 0;
        for (const img of heroImgs) {
          if ((img as HTMLImageElement).complete) {
            ready += 1;
          }
        }
        for (const video of videos) {
          if (video.readyState >= 1 || Boolean(video.error) || failedVideos.has(video)) {
            ready += 1;
          }
        }

        setLoadedCount(ready);
        const pct = Math.min(100, Math.max(0, Math.round((ready / total) * 100)));
        setProgress(pct);

        if (ready >= total) {
          finishLoading();
        }
      };

      for (const img of heroImgs) {
        const htmlImg = img as HTMLImageElement;
        if (!htmlImg.complete) {
          const onImgDone = () => evaluateProgress();
          htmlImg.addEventListener("load", onImgDone, { once: true });
          htmlImg.addEventListener("error", onImgDone, { once: true });
          cleanups.push(() => {
            htmlImg.removeEventListener("load", onImgDone);
            htmlImg.removeEventListener("error", onImgDone);
          });
        }
      }

      for (const video of videos) {
        if (video.readyState < 1) {
          const onVidDone = () => evaluateProgress();
          const onVidErr = () => {
            failedVideos.add(video);
            evaluateProgress();
          };
          video.addEventListener("loadedmetadata", onVidDone, { once: true });
          video.addEventListener("loadeddata", onVidDone, { once: true });
          video.addEventListener("canplay", onVidDone, { once: true });
          video.addEventListener("error", onVidErr, { once: true });
          cleanups.push(() => {
            video.removeEventListener("loadedmetadata", onVidDone);
            video.removeEventListener("loadeddata", onVidDone);
            video.removeEventListener("canplay", onVidDone);
            video.removeEventListener("error", onVidErr);
          });
        }
      }

      evaluateProgress();
      const pollTimer = window.setInterval(evaluateProgress, 150);
      cleanups.push(() => window.clearInterval(pollTimer));
    });

    const safetyTimer = window.setTimeout(finishLoading, MAX_WAIT_MS);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(safetyTimer);
      for (const fn of cleanups) fn();
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
      <div className="mx-4 flex w-full max-w-[350px] flex-col items-center gap-4 rounded-2xl border-[3px] border-black bg-[#FFFDF8] px-6 py-6 shadow-[8px_8px_0px_#000]">
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
            <span>
              {totalCount > 0
                ? `Memuat aset utama (${loadedCount}/${totalCount})...`
                : "Menyiapkan kanvas..."}
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
});
