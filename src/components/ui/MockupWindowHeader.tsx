"use client";

import React, { memo } from "react";

export interface MockupWindowHeaderProps {
  title: string;
  width?: number | string;
  className?: string;
  onClose?: () => void;
  style?: React.CSSProperties;
}

/**
 * Standardized reusable OS-style mockup window header.
 * Referenced from the production "3D Car & Environment Animation" card layout.
 * Ensures 100% width precision, fixed 32px height, uniform typography, crisp SVG controls,
 * and seamless alignment with the underlying image canvas.
 */
export const MockupWindowHeader = memo(function MockupWindowHeader({
  title,
  width,
  className = "",
  onClose,
  style,
}: MockupWindowHeaderProps) {
  return (
    <div
      className={`figma-mockup-window-header w-full flex items-center justify-between select-none ${className}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: width ?? "100%",
        height: 32,
        backgroundColor: "rgb(255, 252, 246)",
        borderRadius: "25px 25px 0 0",
        overflow: "hidden",
        zIndex: 5,
        pointerEvents: "auto",
        ...style,
      }}
    >
      {/* Left: Home Icon + Divider + Active Tab Item */}
      <div className="flex items-center h-full pl-5">
        {/* Home icon button container */}
        <div className="flex items-center justify-center pr-3 border-r border-[#4C4C4C]/80 h-full">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="text-black"
            aria-hidden="true"
          >
            <path
              d="M1 4.5L5 1.5L9 4.5V8.5C9 8.76522 8.89464 9.01957 8.70711 9.20711C8.51957 9.39464 8.26522 9.5 8 9.5H2C1.73478 9.5 1.48043 9.39464 1.29289 9.20711C1.10536 9.01957 1 8.76522 1 8.5V4.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 9.5V5.5H6.5V9.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Tab badge with Blender icon, clean title text, and close button */}
        <div className="flex items-center gap-2 pl-3 h-full">
          {/* Blender 3D Logo */}
          <img
            src="/figma/61afd6ebcb0a931aa9d284f902ad7a684b8e2250.webp"
            alt="Blender 3D"
            className="w-[18px] h-[15px] object-contain flex-shrink-0"
            draggable={false}
          />
          {/* Project Tab Title */}
          <span
            className="text-[10.5px] font-normal text-black font-sans truncate tracking-tight"
            style={{ maxWidth: "clamp(180px, 40vw, 420px)" }}
            title={title}
          >
            {title}
          </span>
          {/* Tab close X button */}
          <button
            type="button"
            onClick={onClose}
            className="text-black/60 hover:text-black ml-1 p-0.5 rounded transition-colors focus:outline-none"
            aria-label="Close Tab"
          >
            <svg width="8" height="8" viewBox="0 0 9 9" fill="none" aria-hidden="true">
              <path
                d="M1 1L8 8M8 1L1 8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right: Vertical Divider + Window Controls (Chevron, Minimize, Maximize, Close) */}
      <div className="flex items-center h-full pr-5">
        <div className="h-full w-px bg-[#4C4C4C]/80 mr-3.5" />
        <div className="flex items-center gap-3 text-black">
          {/* Dropdown Chevron */}
          <button
            type="button"
            className="p-0.5 text-black hover:opacity-70 focus:outline-none"
            aria-label="Window options"
          >
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
              <path
                d="M1 1L4 4L7 1"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Minimize */}
          <button
            type="button"
            className="p-0.5 text-black hover:opacity-70 focus:outline-none"
            aria-label="Minimize"
          >
            <svg width="8" height="2" viewBox="0 0 8 2" fill="none" aria-hidden="true">
              <path
                d="M0.5 1H7.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* Maximize */}
          <button
            type="button"
            className="p-0.5 text-black hover:opacity-70 focus:outline-none"
            aria-label="Maximize"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <rect
                x="0.65"
                y="0.65"
                width="6.7"
                height="6.7"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </button>
          {/* Close Window */}
          <button
            type="button"
            onClick={onClose}
            className="p-0.5 text-black hover:opacity-70 focus:outline-none"
            aria-label="Close"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path
                d="M1 1L7 7M7 1L1 7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default MockupWindowHeader;
