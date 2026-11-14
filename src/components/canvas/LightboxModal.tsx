"use client";

import React, { memo } from "react";

export interface LightboxData {
  src: string;
  title?: string;
}

export const LightboxModal = memo(function LightboxModal({
  lightbox,
  onClose,
}: {
  lightbox: LightboxData | null;
  onClose: () => void;
}) {
  if (!lightbox) return null;

  const isVideo =
    lightbox.src.toLowerCase().includes(".mp4") ||
    lightbox.src.toLowerCase().includes(".webm");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] max-w-[92vw] flex-col items-center rounded-2xl border-4 border-black bg-[#F2EFE9] p-3 shadow-[10px_10px_0px_#000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex w-full items-center justify-between gap-4 border-b-2 border-black/15 px-2 pb-2">
          <span className="truncate text-xs font-semibold text-[#1A1A1A]">
            {lightbox.title
              ? `${lightbox.title} — Aditya Fazar Sanjaya`
              : "Preview Karya — Aditya Fazar Sanjaya"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border-2 border-black bg-[#DB5F2D] px-2.5 py-0.5 text-xs font-bold text-white shadow-[2px_2px_0px_#000] hover:brightness-110"
          >
            Tutup (ESC)
          </button>
        </div>
        {isVideo ? (
          <video
            src={lightbox.src}
            controls
            autoPlay
            loop
            playsInline
            className="max-h-[82vh] max-w-[88vw] rounded-lg object-contain bg-black"
          />
        ) : (
          <img
            src={lightbox.src}
            alt={lightbox.title || "Portfolio Preview"}
            className="max-h-[82vh] max-w-[88vw] rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  );
});
