"use client";

import React, { memo, useCallback, useEffect, useState } from "react";

interface PortfolioPreloaderProps {
  canvasMounted: boolean;
}

const SEGMENT_COUNT = 20;
const RULER_TICKS = 25;
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

const WELCOME_ITEMS = [
  { ch: "S", color: PALETTE[0], isSpace: false },
  { ch: "E", color: PALETTE[1], isSpace: false },
  { ch: "L", color: PALETTE[2], isSpace: false },
  { ch: "A", color: PALETTE[3], isSpace: false },
  { ch: "M", color: PALETTE[0], isSpace: false },
  { ch: "A", color: PALETTE[1], isSpace: false },
  { ch: "T", color: PALETTE[3], isSpace: false },
  { ch: " ", color: "transparent", isSpace: true },
  { ch: "D", color: PALETTE[0], isSpace: false },
  { ch: "A", color: PALETTE[1], isSpace: false },
  { ch: "T", color: PALETTE[2], isSpace: false },
  { ch: "A", color: PALETTE[3], isSpace: false },
  { ch: "N", color: PALETTE[0], isSpace: false },
  { ch: "G", color: PALETTE[1], isSpace: false },
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
          className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 flex-col gap-2 sm:flex ${
            side === "left"
              ? "left-6 items-start md:left-12"
              : "right-6 items-end md:right-12"
          }`}
        >
          {Array.from({ length: RULER_TICKS }).map((_, idx) => {
            const isMajor = idx % 4 === 0 || idx === RULER_TICKS - 1;
            const isLit = idx < litTicks;
            return (
              <div
                key={idx}
                className="h-[2px] rounded-[1px] transition-colors duration-200"
                style={{
                  width: isMajor ? 20 : 10,
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

      {/* Top Telemetry Reticle (0%..100% -> 100% • SELESAI) */}
      <div
        aria-live="polite"
        className={`relative z-10 flex h-8 min-w-[84px] items-center justify-center gap-2 px-3.5 font-mono text-xs font-bold tracking-wider transition-all duration-200 sm:h-9 sm:min-w-[96px] sm:px-4 sm:text-[13px] ${
          isReady
            ? "rounded-lg border-2 border-black bg-[#2C8B57] text-white shadow-[3px_3px_0px_#000]"
            : "border-[1.5px] border-[#0D99FF] bg-[#FFFDF8] text-[#1A1A1A]"
        }`}
      >
        {isReady ? (
          <span className="h-2 w-2 rounded-full bg-[#A7F3D0]" />
        ) : (
          <>
            <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 border-[1.5px] border-[#0D99FF] bg-white" />
            <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 border-[1.5px] border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-[3px] -left-[3px] h-1.5 w-1.5 border-[1.5px] border-[#0D99FF] bg-white" />
            <span className="absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 border-[1.5px] border-[#0D99FF] bg-white" />
            <span
              className="h-2 w-2 rounded-full transition-colors duration-200"
              style={{ backgroundColor: PALETTE[zoneIndex] }}
            />
          </>
        )}
        <span>{isReady ? "100% • SELESAI" : `${progress}%`}</span>
      </div>

      {/* Center Focal Stack: Optical-Blur LOADING.. -> Crisp SELAMAT DATANG + Proportional Opsi 7 Guide */}
      <div className="relative z-10 flex w-full max-w-[340px] flex-col items-center sm:max-w-[500px] md:max-w-[550px]">
        {!isReady ? (
          <div
            aria-hidden="true"
            className="preloader-optical-word inline-flex items-baseline text-[46px] font-black leading-[0.95] tracking-[0.04em] sm:text-[74px] md:text-[96px] lg:text-[116px]"
          >
            {CHAR_ITEMS.map((item, idx) => {
              const hideDot = item.isDot && item.dotIndex >= dotPhase;
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
        ) : (
          <div
            aria-hidden="true"
            className="preloader-optical-word is-ready preloader-cta-pop inline-flex items-baseline whitespace-nowrap text-[29px] font-black leading-[0.95] tracking-[0.03em] sm:text-[46px] md:text-[58px] lg:text-[72px]"
          >
            {WELCOME_ITEMS.map((item, idx) =>
              item.isSpace ? (
                <span key={idx} className="inline-block w-[0.3em]" />
              ) : (
                <span
                  key={idx}
                  className="inline-block"
                  style={{ color: item.color }}
                >
                  {item.ch}
                </span>
              )
            )}
          </div>
        )}

        {/* Proportional Opsi 7 Guide Box */}
        <div className="mt-6 w-full rounded-xl border-2 border-black bg-[#FFFDF8]/95 px-4 py-3 shadow-[4px_4px_0px_#000] sm:mt-8 sm:px-5 sm:py-3.5">
          <div className="border-b border-black/15 pb-2 text-xs font-black tracking-tight text-[#1A1A1A] sm:text-sm">
            Kontrol Kanvas Portofolio
          </div>

          <ol className="mt-0.5 divide-y divide-black/10 text-[11.5px] leading-snug text-[#3D3A34] sm:text-[13px]">
            {GUIDE_ITEMS.map((item) => (
              <li key={item.num} className="flex items-baseline gap-2.5 py-2">
                <span
                  className="shrink-0 font-mono text-[11px] font-black sm:text-xs"
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

      {/* Bottom Action Slot: 4-Color 20-Segment Progress Track -> Highlighted "Lanjutkan" CTA */}
      <div className="relative z-10 flex min-h-[104px] items-center justify-center">
        {!isReady ? (
          <div
            aria-hidden="true"
            className="flex items-center gap-1 rounded-[10px] border-2 border-black bg-[#FFFDF8] px-2.5 py-2 shadow-[4px_4px_0px_#000]"
          >
            {Array.from({ length: SEGMENT_COUNT }).map((_, idx) => (
              <div
                key={idx}
                className="h-[18px] w-[8px] rounded-[2px] transition-colors duration-150 sm:h-[22px] sm:w-[11px]"
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
          <div className="preloader-cta-pop flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2C8B57]/35 bg-[#E6F4EC] px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#1E6F43] sm:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#2C8B57]" />
              <span>Loading selesai — klik untuk masuk</span>
            </div>

            <div className="relative inline-flex items-center justify-center">
              <span
                aria-hidden="true"
                className="preloader-cta-ring pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#4565D6] bg-[#4565D6]/20"
              />
              <button
                type="button"
                onClick={handleEnter}
                className="relative inline-flex cursor-pointer items-center gap-3 rounded-2xl border-[2.5px] border-black bg-[#4565D6] px-9 py-3.5 text-[15px] font-black tracking-wide text-white shadow-[6px_6px_0px_#000,0_0_24px_rgba(69,101,214,0.38)] transition-all hover:-translate-y-0.5 hover:bg-[#3A57C2] hover:shadow-[7px_7px_0px_#000,0_0_28px_rgba(69,101,214,0.5)] active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] sm:px-12 sm:py-4 sm:text-[17px]"
              >
                <span>Lanjutkan</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="preloader-cta-arrow"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
                <span className="hidden items-center rounded-md border border-white/35 bg-white/15 px-1.5 py-0.5 font-mono text-[11px] font-bold sm:inline-flex">
                  Enter ↵
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
