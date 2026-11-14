"use client";

import React, { memo, useCallback, useEffect, useState } from "react";

interface PortfolioPreloaderProps {
  canvasMounted: boolean;
}

const SEGMENT_COUNT = 20;
const RULER_TICKS = 19;
const PALETTE = ["#4565D6", "#E8793A", "#D99B1E", "#2C8B57"] as const;

const CHAR_ITEMS = [
  { ch: "L", color: PALETTE[0], isDot: false },
  { ch: "O", color: PALETTE[1], isDot: false },
  { ch: "A", color: PALETTE[2], isDot: false },
  { ch: "D", color: PALETTE[3], isDot: false },
  { ch: "I", color: PALETTE[0], isDot: false },
  { ch: "N", color: PALETTE[1], isDot: false },
  { ch: "G", color: PALETTE[3], isDot: false },
  { ch: ".", color: PALETTE[2], isDot: true, dotIndex: 0 },
  { ch: ".", color: PALETTE[0], isDot: true, dotIndex: 1 },
] as const;

const GUIDE_ITEMS = [
  {
    num: "01",
    color: "#4565D6",
    label: "Zoom In / Out:",
    text: "Ubah skala kanvas lewat tombol zoom di sisi kanan.",
  },
  {
    num: "02",
    color: "#E8793A",
    label: "Buka Preview:",
    text: "Klik window proyek atau video 3D untuk mode penuh.",
  },
  {
    num: "03",
    color: "#2C8B57",
    label: "Lompat Bagian:",
    text: "Pilih ikon di sisi kanan untuk langsung ke kategori.",
  },
] as const;

function getZoneColor(idx: number, total: number): string {
  const zone = Math.min(
    PALETTE.length - 1,
    Math.floor((idx / total) * PALETTE.length)
  );
  return PALETTE[zone];
}

/**
 * Initial loading screen aligned with the drafting-paper / Figma canvas theme.
 * Displays 4-color optical-blur LOADING.. typography alongside compact canvas
 * navigation tips, unlocking the blue "Lanjutkan" button once Frame 1 images are ready.
 */
export const PortfolioPreloader = memo(function PortfolioPreloader({
  canvasMounted,
}: PortfolioPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [dotPhase, setDotPhase] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  const handleEnter = useCallback(() => {
    if (!isReady || isExiting) return;
    setIsExiting(true);
    window.setTimeout(() => setShouldUnmount(true), 550);
  }, [isReady, isExiting]);

  // Animate trailing dots while loading
  useEffect(() => {
    if (isReady) return;
    const timer = window.setInterval(() => {
      setDotPhase((prev) => (prev + 1) % 3);
    }, 340);
    return () => window.clearInterval(timer);
  }, [isReady]);

  // Allow keyboard dismissal (Enter / Space / Escape) once ready
  useEffect(() => {
    if (!isReady || isExiting) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
        if (e.key === " ") e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isReady, isExiting, handleEnter]);

  // Track Frame 1 (Hero / Bio / Experience) images for fast readiness
  useEffect(() => {
    if (!canvasMounted) return;

    const startTime = Date.now();
    const MIN_DISPLAY_MS = 650;
    const MAX_WAIT_MS = 2800;

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
          setIsReady(true);
        }, 180);
      }, delay);
    };

    const rafId = window.requestAnimationFrame(() => {
      const heroImgs = Array.from(
        document.querySelectorAll("#figma-frame-1 img")
      ) as HTMLImageElement[];
      const total = heroImgs.length;

      if (total === 0) {
        finishLoading();
        return;
      }

      const evaluateProgress = () => {
        if (finished) return;

        let ready = 0;
        for (const img of heroImgs) {
          if (img.complete) {
            ready += 1;
          }
        }

        const pct = Math.min(
          100,
          Math.max(0, Math.round((ready / total) * 100))
        );
        setProgress(pct);

        if (ready >= total) {
          finishLoading();
        }
      };

      for (const img of heroImgs) {
        if (!img.complete) {
          const onImgDone = () => evaluateProgress();
          img.addEventListener("load", onImgDone, { once: true });
          img.addEventListener("error", onImgDone, { once: true });
          cleanups.push(() => {
            img.removeEventListener("load", onImgDone);
            img.removeEventListener("error", onImgDone);
          });
        }
      }

      evaluateProgress();
      const pollTimer = window.setInterval(evaluateProgress, 120);
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

  const zoneIndex = Math.min(
    PALETTE.length - 1,
    Math.floor((progress / 100) * PALETTE.length)
  );
  const filledSegments = Math.round((progress / 100) * SEGMENT_COUNT);
  const litTicks = Math.round((progress / 100) * RULER_TICKS);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Memuat portofolio"
      aria-hidden={isExiting}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden bg-[#EDE8E0] px-6 py-7 select-none touch-none transition-all duration-500 sm:px-12 sm:py-10 ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(140, 135, 125, 0.16) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(140, 135, 125, 0.16) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}
    >
      {/* Frosted glass exit curtain */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[#EDE8E0]/35 transition-all duration-500 ${
          isExiting ? "backdrop-blur-[16px]" : "backdrop-blur-0"
        }`}
      />

      {/* Side Vertical Drafting Rulers */}
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 flex-col gap-[6px] sm:flex ${
            side === "left"
              ? "left-5 items-start md:left-10"
              : "right-5 items-end md:right-10"
          }`}
        >
          {Array.from({ length: RULER_TICKS }).map((_, idx) => {
            const isMajor = idx % 5 === 0 || idx === RULER_TICKS - 1;
            const isLit = idx < litTicks;
            return (
              <div
                key={idx}
                className="h-[1.5px] rounded-[1px] transition-colors duration-200"
                style={{
                  width: isMajor ? 14 : 7,
                  backgroundColor: isLit
                    ? getZoneColor(idx, RULER_TICKS)
                    : isMajor
                      ? "rgba(26, 26, 26, 0.55)"
                      : "rgba(26, 26, 26, 0.24)",
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Top Telemetry Reticle (0%..100% -> READY) */}
      <div
        className={`relative z-10 flex h-[26px] min-w-[70px] items-center justify-center gap-1.5 px-3 font-mono text-[11px] font-bold tracking-wider transition-all duration-200 ${
          isReady
            ? "rounded-md border-2 border-black bg-[#2C8B57] text-white shadow-[2px_2px_0px_#000]"
            : "border-[1.5px] border-[#0D99FF] bg-[#FFFDF8] text-[#1A1A1A]"
        }`}
      >
        {!isReady && (
          <>
            <span className="absolute -left-[3px] -top-[3px] h-[5px] w-[5px] border-[1.5px] border-[#0D99FF] bg-white" />
            <span className="absolute -right-[3px] -top-[3px] h-[5px] w-[5px] border-[1.5px] border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] border-[1.5px] border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-[3px] -right-[3px] h-[5px] w-[5px] border-[1.5px] border-[#0D99FF] bg-white" />
            <span
              className="h-[7px] w-[7px] rounded-full transition-colors duration-200"
              style={{ backgroundColor: PALETTE[zoneIndex] }}
            />
          </>
        )}
        <span>{isReady ? "READY" : `${progress}%`}</span>
      </div>

      {/* Center Focal Stack: 4-Color Optical-Blur LOADING.. + Compact Opsi 7 Guide */}
      <div className="relative z-10 flex w-full max-w-[355px] flex-col items-center sm:max-w-[375px]">
        <div
          aria-hidden="true"
          className={`preloader-optical-word inline-flex items-baseline text-[44px] font-extrabold leading-none tracking-[0.04em] sm:text-[62px] ${
            isReady ? "is-ready" : ""
          }`}
        >
          {CHAR_ITEMS.map((item, idx) => {
            const hideDot =
              !isReady && item.isDot && item.dotIndex >= dotPhase;
            return (
              <span
                key={idx}
                className={`inline-block transition-opacity duration-150 ${
                  hideDot ? "opacity-0" : "opacity-100"
                }`}
                style={{ color: item.color }}
              >
                {item.ch}
              </span>
            );
          })}
        </div>

        {/* Compact Opsi 7 Micro-Manual Box */}
        <div className="mt-4 w-full rounded-[10px] border-[1.5px] border-black bg-[#FFFDF8]/95 px-3.5 py-2.5 shadow-[3px_3px_0px_#000]">
          <div className="border-b border-black/10 pb-1.5 text-[11.5px] font-black tracking-tight text-[#1A1A1A] sm:text-xs">
            Kontrol Kanvas Portofolio
          </div>

          <ol className="mt-0.5 divide-y divide-black/[0.08] text-[10.5px] leading-snug text-[#3D3A34] sm:text-[11px]">
            {GUIDE_ITEMS.map((item) => (
              <li key={item.num} className="flex items-baseline gap-2 py-1.5">
                <span
                  className="shrink-0 font-mono text-[10px] font-black"
                  style={{ color: item.color }}
                >
                  {item.num}
                </span>
                <span>
                  <strong className="font-bold text-[#1A1A1A]">
                    {item.label}
                  </strong>{" "}
                  {item.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Bottom Action Slot: 4-Color 20-Segment Progress Track -> Blue "Lanjutkan" CTA */}
      <div className="relative z-10 flex h-10 items-center justify-center">
        {!isReady ? (
          <div
            aria-hidden="true"
            className="flex items-center gap-[3px] rounded-[8px] border-2 border-black bg-[#FFFDF8] px-1.5 py-1.5 shadow-[3px_3px_0px_#000]"
          >
            {Array.from({ length: SEGMENT_COUNT }).map((_, idx) => (
              <div
                key={idx}
                className="h-[14px] w-[7px] rounded-[2px] transition-colors duration-150 sm:w-[8px]"
                style={{
                  backgroundColor:
                    idx < filledSegments
                      ? getZoneColor(idx, SEGMENT_COUNT)
                      : "#E5DFD5",
                }}
              />
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEnter}
            className="cursor-pointer rounded-lg border-2 border-black bg-[#4565D6] px-6 py-1.5 text-xs font-extrabold tracking-wide text-white shadow-[3px_3px_0px_#000] transition-all hover:-translate-y-0.5 hover:bg-[#3A57C2] hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] sm:text-[13px]"
          >
            Lanjutkan
          </button>
        )}
      </div>
    </div>
  );
});
