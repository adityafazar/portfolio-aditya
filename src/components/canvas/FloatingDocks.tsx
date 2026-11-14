"use client";

import React, { memo, useEffect, useState } from "react";
import { CONTACT_ITEMS, SECTIONS } from "@/data/canvasConfig";

function getSectionIcon(id: string): React.ReactNode {
  switch (id) {
    case "hero":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "bio":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "edu":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.42 10.922-8.5-4.5a2 2 0 0 0-1.84 0l-8.5 4.5a1 1 0 0 0 0 1.76l8.5 4.5a2 2 0 0 0 1.84 0l8.5-4.5a1 1 0 0 0 0-1.76Z" />
          <path d="M6 13v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
        </svg>
      );
    case "exp":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "uiux":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="20" x="5" y="2" rx="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
          <path d="m3 8 9 5 9-5" />
          <path d="M12 13v8" />
        </svg>
      );
  }
}

function getContactIcon(id: string): React.ReactNode {
  switch (id) {
    case "email":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "ig-personal":
    case "ig-design":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
  }
}

export interface FloatingDocksProps {
  activeSection: string;
  zoomFactor: number;
  onScrollToSection: (figmaY: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSetZoomFactor: (factor: number) => void;
}

export const FloatingDocks = memo(function FloatingDocks({
  activeSection,
  zoomFactor,
  onScrollToSection,
  onZoomIn,
  onZoomOut,
  onSetZoomFactor,
}: FloatingDocksProps) {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const [idleContactIndex, setIdleContactIndex] = useState(0);

  // Scoped inside FloatingDocks so the 2.4s highlight never re-renders the 820-node canvas
  useEffect(() => {
    if (isContactHovered) return;
    const interval = setInterval(() => {
      setIdleContactIndex((prev) => (prev + 1) % CONTACT_ITEMS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isContactHovered]);

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3.5 pointer-events-none">
      {/* Sleek Vertical Contact Dock */}
      <aside
        aria-label="Kontak dan Media Sosial"
        onMouseEnter={() => setIsContactHovered(true)}
        onMouseLeave={() => {
          setIsContactHovered(false);
          setHoveredContact(null);
        }}
        className={`pointer-events-auto flex flex-col items-center gap-1.5 rounded-2xl border-2 border-black bg-[#F8F6F2]/95 p-2 shadow-[4px_4px_0px_#000] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isContactHovered ? "w-[180px] items-stretch" : "w-[56px]"
        }`}
      >
        {CONTACT_ITEMS.map((item, index) => {
          const isItemHovered = hoveredContact === item.id;
          const isAutoActive = !isContactHovered && idleContactIndex === index;
          const isActive = isItemHovered || isAutoActive;

          return (
            <a
              key={item.id}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredContact(item.id)}
              onMouseLeave={() => setHoveredContact(null)}
              title={`${item.label} - ${item.desc}`}
              aria-label={`${item.label} - ${item.desc}`}
              className={`flex h-9 items-center rounded-xl transition-all ${
                isContactHovered ? "w-full px-2.5 gap-2.5 justify-start" : "w-9 justify-center"
              } ${
                isActive
                  ? "text-white shadow-[2px_2px_0px_#000] border-2 border-black font-bold scale-[1.05]"
                  : "text-[#1A1A1A] hover:bg-black/10 border-2 border-transparent font-medium"
              }`}
              style={{
                backgroundColor: isActive ? item.activeColor : undefined,
              }}
            >
              <span className="flex-shrink-0 flex items-center justify-center transition-transform">
                {getContactIcon(item.id)}
              </span>
              {isContactHovered && (
                <span className="truncate text-xs tracking-tight transition-opacity duration-200">
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </aside>

      {/* Sleek Vertical Section Navigation Dock */}
      <nav
        aria-label="Navigasi bagian portfolio"
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={`pointer-events-auto flex flex-col items-center gap-1.5 rounded-2xl border-2 border-black bg-[#F8F6F2]/95 p-2 shadow-[4px_4px_0px_#000] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNavHovered ? "w-[180px] items-stretch" : "w-[56px]"
        }`}
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onScrollToSection(sec.y)}
              aria-label={`${sec.label} - ${sec.desc}`}
              className={`flex h-9 items-center rounded-xl transition-all ${
                isNavHovered ? "w-full px-2.5 gap-2.5 justify-start" : "w-9 justify-center"
              } ${
                isActive
                  ? "text-white shadow-[2px_2px_0px_#000] border-2 border-black font-bold"
                  : "text-[#1A1A1A] hover:bg-black/10 border-2 border-transparent font-medium"
              }`}
              style={{
                backgroundColor: isActive ? sec.activeColor : undefined,
              }}
            >
              <span className="flex-shrink-0 flex items-center justify-center">
                {getSectionIcon(sec.id)}
              </span>
              {isNavHovered && (
                <span className="truncate text-xs tracking-tight transition-opacity duration-200">
                  {sec.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sleek Vertical Zoom Dock */}
      <div
        role="toolbar"
        aria-label="Kontrol Zoom Kanvas"
        className="pointer-events-auto flex w-[56px] flex-col items-center gap-1 rounded-2xl border-2 border-black bg-[#F8F6F2]/95 p-1.5 shadow-[4px_4px_0px_#000] backdrop-blur-md"
      >
        <button
          type="button"
          onClick={onZoomIn}
          title="Zoom In (+)"
          aria-label="Zoom In"
          className="flex h-8 w-9 items-center justify-center rounded-xl border-2 border-transparent text-sm font-black text-[#1A1A1A] transition-all hover:border-black hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_#000]"
        >
          +
        </button>

        <span className="text-[11px] font-black tabular-nums text-[#1A1A1A] py-0.5 select-none text-center">
          {Math.round(zoomFactor * 100)}%
        </span>

        <button
          type="button"
          onClick={onZoomOut}
          title="Zoom Out (–)"
          aria-label="Zoom Out"
          className="flex h-8 w-9 items-center justify-center rounded-xl border-2 border-transparent text-sm font-black text-[#1A1A1A] transition-all hover:border-black hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_#000]"
        >
          –
        </button>

        <div className="h-[1.5px] w-6 bg-black/20 my-0.5" />

        <button
          type="button"
          onClick={() => onSetZoomFactor(1)}
          title="Fit Layar (100%)"
          className={`flex h-7 w-9 items-center justify-center rounded-lg text-[10px] font-extrabold transition-all ${
            zoomFactor === 1
              ? "border-2 border-black bg-black text-white shadow-[1px_1px_0px_#000]"
              : "border-2 border-transparent text-[#1A1A1A] hover:border-black hover:bg-black/10"
          }`}
        >
          Fit
        </button>

        <button
          type="button"
          onClick={() => onSetZoomFactor(0.8)}
          title="Tampilan 80% (Default)"
          className={`flex h-7 w-9 items-center justify-center rounded-lg text-[10px] font-extrabold transition-all ${
            zoomFactor === 0.8
              ? "border-2 border-black bg-black text-white shadow-[1px_1px_0px_#000]"
              : "border-2 border-transparent text-[#1A1A1A] hover:border-black hover:bg-black/10"
          }`}
        >
          80%
        </button>

        <button
          type="button"
          onClick={() => onSetZoomFactor(0.6)}
          title="Tampilan 60% (Overview Makro)"
          className={`flex h-7 w-9 items-center justify-center rounded-lg text-[10px] font-extrabold transition-all ${
            zoomFactor === 0.6
              ? "border-2 border-black bg-black text-white shadow-[1px_1px_0px_#000]"
              : "border-2 border-transparent text-[#1A1A1A] hover:border-black hover:bg-black/10"
          }`}
        >
          60%
        </button>
      </div>
    </div>
  );
});
