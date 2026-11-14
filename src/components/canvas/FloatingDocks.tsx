"use client";

import React, { memo, useEffect, useState } from "react";
import { CONTACT_ITEMS, SECTIONS } from "@/data/canvasConfig";

function getSectionIcon(id: string): React.ReactNode {
  switch (id) {
    case "hero":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.8 3 10v10a1 1 0 0 0 1 1h5.5v-6.5h5V21H20a1 1 0 0 0 1-1V10l-9-7.2Z" />
        </svg>
      );
    case "bio":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 15c0-3.1 3.1-5 7-5s7 1.9 7 5v1.5H5v-1.5Z" />
        </svg>
      );
    case "edu":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.8 21 7.2 12 11.6 3 7.2l9-4.4Zm-8.2 8 8.2 4 8.2-4 1.3 1.9-9.5 4.7-9.5-4.7 1.3-1.9Zm0 4.6 8.2 4 8.2-4 1.3 1.9-9.5 4.7-9.5-4.7 1.3-1.9Z" />
        </svg>
      );
    case "exp":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 3a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V5a2 2 0 0 0-2-2H9Zm0 3h6V5H9v1Zm1.5 5.5a1 1 0 0 0-1 1v1h5v-1a1 1 0 0 0-1-1h-3Z"
          />
        </svg>
      );
    case "uiux":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 5.5A2.5 2.5 0 0 1 5 3h14a2.5 2.5 0 0 1 2.5 2.5v2.2h-19V5.5ZM5.8 6.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          />
          <path d="M2.5 9.2h5.2v11.8H5a2.5 2.5 0 0 1-2.5-2.5V9.2ZM9.2 9.2h12.3v9.3A2.5 2.5 0 0 1 19 21H9.2V9.2Z" />
        </svg>
      );
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.4 20.2 7 12 11.4 3.8 7 12 2.4Z" />
          <path d="M3 8.4 11.2 12.9v8.8L3 17.1V8.4Z" />
          <path d="m21 8.4-8.2 4.5v8.8l8.2-4.6V8.4Z" />
        </svg>
      );
  }
}

function getContactIcon(id: string): React.ReactNode {
  switch (id) {
    case "email":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M2.3 6.2A2.2 2.2 0 0 1 4.2 5h15.6a2.2 2.2 0 0 1 1.9 1.2L12 12.6 2.3 6.2Z" />
          <path d="M2 8.2v9.6A2.2 2.2 0 0 0 4.2 20h15.6a2.2 2.2 0 0 0 2.2-2.2V8.2l-9.2 6a1.5 1.5 0 0 1-1.6 0l-9.2-6Z" />
        </svg>
      );
    case "ig-personal":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 2.2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Zm5.3-3.7a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm3.3 4.8a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0ZM5.7 10.2h2.4v7.8H5.7v-7.8Zm4.4 0h2.3v1.1h.1c.3-.6 1.2-1.3 2.5-1.3 2.6 0 3.1 1.7 3.1 3.9V18h-2.4v-3.6c0-.9 0-2-1.2-2s-1.4 1-1.4 1.9V18h-2.4v-7.8Z"
          />
        </svg>
      );
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2.5a9.3 9.3 0 0 0-8.1 13.8L2.8 21l4.9-1.3A9.3 9.3 0 1 0 12 2.5Zm-3.1 5.4c.2-.4.4-.4.7-.4h.6c.2 0 .4.1.5.4l.7 1.7c.1.2.1.5-.1.7l-.5.6c-.1.1-.1.3 0 .5.4.8 1.2 1.6 2 2 .2.1.4.1.5 0l.7-.6c.2-.2.5-.2.7-.1l1.7.8c.3.1.4.3.4.5 0 .7-.4 1.5-1.2 1.8-.9.3-2.3.1-3.9-.8-1.6-.9-2.8-2.3-3.4-3.7-.5-1.1-.4-2.2.6-3Z"
          />
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
    <>
      {/* Left Floating Docks: Contact & Zoom */}
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-start gap-3.5 pointer-events-none">
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
            onClick={() => onSetZoomFactor(0.7)}
            title="Tampilan 70% (Default)"
            className={`flex h-7 w-9 items-center justify-center rounded-lg text-[10px] font-extrabold transition-all ${
              zoomFactor === 0.7
                ? "border-2 border-black bg-black text-white shadow-[1px_1px_0px_#000]"
                : "border-2 border-transparent text-[#1A1A1A] hover:border-black hover:bg-black/10"
            }`}
          >
            70%
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

      {/* Right Floating Dock: Section Navigation */}
      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3.5 pointer-events-none">
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
      </div>
    </>
  );
});
