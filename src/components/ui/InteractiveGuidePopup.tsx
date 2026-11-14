"use client";

import React, { memo, useEffect } from "react";

interface InteractiveGuidePopupProps {
  open: boolean;
  onClose: () => void;
}

const GUIDE_ITEMS = [
  {
    step: "01",
    label: "Zoom & Pan",
    description: "Atur skala tampilan lewat kontrol zoom di sisi kanan layar.",
  },
  {
    step: "02",
    label: "Preview Karya",
    description:
      "Klik window proyek atau video 3D untuk melihat detail ukuran penuh.",
  },
  {
    step: "03",
    label: "Navigasi Cepat",
    description:
      "Gunakan menu ikon di kiri dan kanan untuk melompat antar-bagian.",
  },
] as const;

/**
 * Onboarding guide pop-up shown immediately after the initial preloader finishes.
 * Styled to match the drafting-paper & Figma browser window chrome without generic icons.
 */
export const InteractiveGuidePopup = memo(function InteractiveGuidePopup({
  open,
  onClose,
}: InteractiveGuidePopupProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-popup-title"
      className="fixed inset-0 z-[98] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[500px] overflow-hidden rounded-2xl border-[3px] border-black bg-[#FFFDF8] shadow-[10px_10px_0px_#000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Top Bar */}
        <div className="flex items-center justify-between border-b-[2.5px] border-black bg-[#EDE8E0] px-5 py-3">
          <span className="inline-flex items-center rounded-md border-2 border-black bg-[#FFFDF8] px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-[#1A1A1A] shadow-[2px_2px_0px_#000]">
            Panduan Singkat
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panduan"
            title="Tutup (Esc)"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#FFFDF8] text-xs font-black text-[#1A1A1A] shadow-[2px_2px_0px_#000] transition-all hover:bg-[#1A1A1A] hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="p-5 sm:p-6">
          <div>
            <h2
              id="guide-popup-title"
              className="text-xl font-black tracking-tight text-[#1A1A1A] sm:text-[22px]"
            >
              Portofolio Ini 100% Interaktif
            </h2>
            <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#4A463F]">
              Untuk pengalaman terbaik menjelajahi karya 3D, Design &amp; UI/UX
              saya, kamu dapat:
            </p>
          </div>

          {/* Clean Typographic Guide List (No Icons) */}
          <ol className="mt-4 divide-y-2 divide-black/15 overflow-hidden rounded-xl border-2 border-black bg-[#F6F2EC]">
            {GUIDE_ITEMS.map((item) => (
              <li
                key={item.step}
                className="flex items-baseline gap-3.5 px-4 py-3"
              >
                <span className="shrink-0 font-mono text-xs font-black tracking-tight text-[#4565D6]">
                  {item.step}
                </span>
                <div className="min-w-0 text-[13px] leading-relaxed text-[#2D2A26] sm:text-sm">
                  <span className="font-extrabold text-[#1A1A1A]">
                    {item.label}:
                  </span>{" "}
                  <span className="font-medium">{item.description}</span>
                </div>
              </li>
            ))}
          </ol>

          {/* Footer CTA */}
          <div className="mt-5 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <span className="text-[11px] font-semibold text-[#6E685F]">
              Tekan{" "}
              <kbd className="rounded border border-black/35 bg-[#EDE8E0] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#1A1A1A]">
                Esc
              </kbd>{" "}
              atau klik area luar untuk menutup
            </span>

            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer whitespace-nowrap rounded-xl border-2 border-black bg-[#4565D6] px-6 py-2.5 text-sm font-black tracking-wide text-white shadow-[4px_4px_0px_#000] transition-all hover:translate-y-[-1px] hover:bg-[#3A57C2] hover:shadow-[5px_5px_0px_#000] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] sm:w-auto"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
