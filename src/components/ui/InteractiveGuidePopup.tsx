"use client";

import React, { memo, useEffect } from "react";

interface InteractiveGuidePopupProps {
  open: boolean;
  onClose: () => void;
}

const GUIDE_ITEMS = [
  {
    id: "zoom",
    label: "Zoom & Pan:",
    description: "Atur skala tampilan lewat kontrol zoom di sisi kanan layar.",
    accentBg: "bg-[#E8B838]",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v6" />
        <path d="M8 11h6" />
      </svg>
    ),
  },
  {
    id: "preview",
    label: "Preview Karya:",
    description:
      "Klik window proyek atau video 3D untuk melihat detail ukuran penuh.",
    accentBg: "bg-[#E8793A]",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 3h6v6" />
        <path d="M9 21H3v-6" />
        <path d="M21 3l-7 7" />
        <path d="M3 21l7-7" />
      </svg>
    ),
  },
  {
    id: "navigation",
    label: "Navigasi Cepat:",
    description:
      "Gunakan menu ikon di kiri dan kanan untuk melompat antar-bagian.",
    accentBg: "bg-[#5DBB63]",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
] as const;

/**
 * Onboarding guide pop-up shown immediately after the initial preloader finishes.
 * Uses the same drafting-paper & neo-brutalist canvas styling as the main workspace.
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
        className="relative w-full max-w-[520px] rounded-2xl border-[3px] border-black bg-[#FFFDF8] p-5 shadow-[10px_10px_0px_#000] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Row: Badge + Close Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#EDE8E0] px-3 py-1 shadow-[2px_2px_0px_#000]">
            <span
              className="h-2.5 w-2.5 rounded-full border border-black bg-[#E8793A]"
              aria-hidden="true"
            />
            <span className="text-xs font-extrabold tracking-wide text-[#1A1A1A]">
              💡 Panduan Singkat
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panduan"
            title="Tutup (Esc)"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#FFFDF8] text-sm font-black text-[#1A1A1A] shadow-[2px_2px_0px_#000] transition-all hover:bg-[#E8793A] hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            ✕
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-4">
          <h2
            id="guide-popup-title"
            className="text-xl font-black tracking-tight text-[#1A1A1A] sm:text-2xl"
          >
            Portofolio Ini 100% Interaktif
          </h2>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#3D3A34]">
            Untuk pengalaman terbaik menjelajahi karya 3D, Design &amp; UI/UX
            saya, kamu dapat:
          </p>
        </div>

        {/* Interactive Feature Cards */}
        <ul className="mt-4 space-y-2.5">
          {GUIDE_ITEMS.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl border-2 border-black bg-[#F5F1EA] p-3 shadow-[3px_3px_0px_#000]"
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black text-[#1A1A1A] shadow-[2px_2px_0px_#000] ${item.accentBg}`}
              >
                {item.icon}
              </div>
              <div className="min-w-0 text-[13px] leading-snug text-[#2D2A26] sm:text-sm">
                <span className="font-black text-[#1A1A1A]">{item.label}</span>{" "}
                <span className="font-medium">{item.description}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer CTA */}
        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
          <span className="text-[11px] font-bold text-[#6E685F]">
            Tekan <kbd className="rounded border border-black/40 bg-[#EDE8E0] px-1.5 py-0.5 font-mono text-[10px] text-[#1A1A1A]">Esc</kbd> atau klik area luar untuk menutup
          </span>

          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl border-2 border-black bg-[#1A1A1A] px-5 py-2.5 text-sm font-black tracking-wide text-[#FFFDF8] shadow-[4px_4px_0px_#E8793A] transition-all hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#E8793A] active:translate-y-[1px] active:shadow-[2px_2px_0px_#E8793A] sm:w-auto"
          >
            Mengerti, Lanjutkan →
          </button>
        </div>
      </div>
    </div>
  );
});
