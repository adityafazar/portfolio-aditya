"use client";

import React from "react";

export interface Extra3DProject {
  id: string;
  title: string;
  subtitle: string;
  software: string[];
  overview: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  accentColor?: string;
}

export const UPCOMING_3D_PROJECTS: Extra3DProject[] = [
  // Siap diisi proyek 3D tambahan di bawah Japanese Garage (3D Car & Environment Animation)
];

interface Upcoming3DSectionsProps {
  onOpenLightbox?: (src: string, title?: string) => void;
}

export function Upcoming3DSections({ onOpenLightbox }: Upcoming3DSectionsProps) {
  if (UPCOMING_3D_PROJECTS.length === 0) {
    return null; // Belum ada data tambahan, tidak merusak layout kanvas yang ada
  }

  return (
    <div className="extra-3d-container w-full flex flex-col gap-10">
      {UPCOMING_3D_PROJECTS.map((proj) => (
        <div
          key={proj.id}
          className="rounded-[28px] border-4 border-black bg-[#F8F6F2] p-8 shadow-[6px_6px_0px_#000]"
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="rounded-full border-2 border-black px-3 py-0.5 text-xs font-black uppercase text-white shadow-[1px_1px_0px_#000]"
              style={{ backgroundColor: proj.accentColor || "#D93B4B" }}
            >
              3D Project
            </span>
            <span className="text-sm font-bold text-black/60">{proj.software.join(" • ")}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-black">{proj.title}</h3>
          <p className="mt-2 text-sm md:text-base text-black/75 max-w-2xl">{proj.overview}</p>

          <div
            role="button"
            tabIndex={0}
            onClick={() => onOpenLightbox && onOpenLightbox(proj.mediaSrc, proj.title)}
            className="mt-6 aspect-video w-full overflow-hidden rounded-[20px] border-3 border-black bg-black cursor-zoom-in"
          >
            {proj.mediaType === "video" ? (
              <video
                src={proj.mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={proj.mediaSrc}
                alt={proj.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

