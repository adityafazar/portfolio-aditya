"use client";

import React, { memo } from "react";

export interface FigmaBrowserWindowBarProps {
  activeWindow: "hero" | "uiux" | "3d";
  top?: number;
  onScrollToSection?: (targetY: number) => void;
}

export const FigmaBrowserWindowBar = memo(function FigmaBrowserWindowBar({
  activeWindow,
  top = 0,
  onScrollToSection,
}: FigmaBrowserWindowBarProps) {
  const targets = {
    hero: 0,
    uiux: 4456,
    threeD: 12384,
  };

  const handleNextSection = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeWindow === "hero") onScrollToSection?.(targets.uiux);
    else if (activeWindow === "uiux") onScrollToSection?.(targets.threeD);
    else onScrollToSection?.(targets.hero);
  };

  const handleMinimize = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeWindow === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (activeWindow === "uiux") {
      onScrollToSection?.(targets.hero);
    } else {
      onScrollToSection?.(targets.uiux);
    }
  };

  const handleMaximize = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeWindow === "hero") onScrollToSection?.(targets.hero);
    else if (activeWindow === "uiux") onScrollToSection?.(targets.uiux);
    else onScrollToSection?.(targets.threeD);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onScrollToSection?.(targets.hero);
  };

  const tabLabel =
    activeWindow === "hero"
      ? "Aditya Fazar"
      : activeWindow === "uiux"
        ? "UI/UX Design"
        : "3D Design & AR";

  return (
    <header
      role="region"
      aria-label={
        activeWindow === "hero"
          ? "Header: Aditya Fazar (Hero)"
          : activeWindow === "uiux"
            ? "Header: UI/UX Design Projects"
            : "Header: 3D Studio & AR Warship"
      }
      className="figma-window-header"
      style={{
        position: "absolute",
        left: 0,
        top: top,
        width: 1920,
        height: 53.63,
        overflow: "hidden",
        zIndex: 35,
        userSelect: "none",
      }}
    >
      {/* 347:813 - Bar Background */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 50.38,
          backgroundColor: "rgb(246,242,236)",
        }}
      />

      {/* 347:830 - Active Tab Box (sits above bottom line so bottom line is 100% continuous) */}
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 0,
          width: 190,
          height: 50,
          backgroundColor: "rgb(255,252,246)",
          zIndex: 5,
        }}
      >
        {/* Tab Icon / Portrait */}
        {activeWindow === "hero" ? (
          /* 347:831 - Exact Figma Cutout Portrait with stretch crop */
          <div
            style={{
              position: "absolute",
              left: 20.88,
              top: 0,
              width: 44,
              height: 50,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <img
              src="/figma/72e0795de2daec6585bb0e02949cd0e401ce700c.webp"
              alt="Aditya Fazar"
              draggable={false}
              style={{
                position: "absolute",
                maxWidth: "none",
                width: "205.884%",
                height: "121.807%",
                left: "-51.969%",
                top: "5.434%",
              }}
            />
          </div>
        ) : activeWindow === "uiux" ? (
          /* Clean UI/UX Icon at left: 26, top: 13 */
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 13,
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: "rgba(74, 148, 96, 0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2B7340",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
        ) : (
          /* Clean 3D Cube Icon at left: 24, top: 13 */
          <div
            style={{
              position: "absolute",
              left: 22,
              top: 13,
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: "rgba(217, 59, 75, 0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C12737",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
              <path d="m3 8 9 5 9-5" />
              <path d="M12 13v8" />
            </svg>
          </div>
        )}

        {/* 347:832 - Tab Label Text */}
        <div
          style={{
            position: "absolute",
            left: activeWindow === "hero" ? 76.88 : activeWindow === "uiux" ? 58 : 54,
            top: 17.5,
            height: 15,
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 12,
            fontWeight: 400,
            lineHeight: "14.52px",
            color: "rgb(0,0,0)",
            whiteSpace: "nowrap",
          }}
        >
          {tabLabel}
        </div>

        {/* 347:833 - Tab Close Button */}
        <button
          type="button"
          onClick={handleClose}
          title="Tutup / Reset Tab"
          style={{
            position: "absolute",
            left: 152,
            top: 13,
            width: 25,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
          className="hover:bg-black/8 transition-colors"
        >
          <svg
            width={9.2}
            height={9.2}
            viewBox="0 0 9.2 9.2"
            style={{ overflow: "visible" }}
          >
            <path
              d="M0 0L-0.388807 0.38901L8.816 9.58901L9.20481 9.2L9.59361 8.81099L0.388807 -0.38901L0 0ZM9.20481 0L8.816 -0.38901L-0.388807 8.81099L0 9.2L0.388807 9.58901L9.59361 0.38901L9.20481 0Z"
              fill="rgb(0,0,0)"
            />
          </svg>
        </button>
      </div>

      {/* 347:816 - Vertical Divider 1 (between Home and Tab) */}
      <div
        style={{
          position: "absolute",
          left: 57.02,
          top: 0,
          width: 1,
          height: 52,
          backgroundColor: "rgb(76,76,76)",
          zIndex: 10,
        }}
      />

      {/* 347:817 - Vertical Divider 2 (between Tab and Plus '+') */}
      <div
        style={{
          position: "absolute",
          left: 248.26,
          top: 0,
          width: 1,
          height: 52,
          backgroundColor: "rgb(76,76,76)",
          zIndex: 10,
        }}
      />

      {/* 347:818 - Vertical Divider 3 (before Minimize / Restore / Close) */}
      <div
        style={{
          position: "absolute",
          left: 1694.75,
          top: 0,
          width: 1.5,
          height: 52,
          backgroundColor: "rgb(76,76,76)",
          zIndex: 10,
        }}
      />

      {/* 347:814 - Continuous Unbroken Bottom Border Line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 50.38,
          width: 1920,
          height: 3.25,
          backgroundColor: "rgb(76,76,76)",
          zIndex: 15,
        }}
      />

      {/* 347:827 - Home Icon Button */}
      <button
        type="button"
        onClick={() => onScrollToSection?.(targets.hero)}
        title="Kembali ke Home (Aditya Fazar)"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 57,
          height: 50.38,
          zIndex: 12,
        }}
        className="hover:bg-black/5 active:bg-black/10 transition-colors"
      >
        {/* 347:828 - House Roof */}
        <svg
          width={18.36}
          height={7.7}
          viewBox="0 0 18.36 7.7"
          style={{
            position: "absolute",
            left: 18.64,
            top: 17.1,
            overflow: "visible",
          }}
        >
          <path
            d="M-0.35345 7.28044C-0.58618 7.47564 -0.616599 7.82255 -0.421394 8.05528C-0.226189 8.28801 0.12072 8.31843 0.35345 8.12323L0 7.70183L-0.35345 7.28044ZM9.18237 0L9.53582 -0.421394C9.33138 -0.592869 9.03336 -0.592869 8.82892 -0.421394L9.18237 0ZM18.0113 8.12323C18.244 8.31843 18.5909 8.28801 18.7861 8.05528C18.9813 7.82255 18.9509 7.47564 18.7182 7.28044L18.3647 7.70183L18.0113 8.12323ZM0 7.70183L0.35345 8.12323L9.53582 0.421394L9.18237 0L8.82892 -0.421394L-0.35345 7.28044L0 7.70183ZM9.18237 0L8.82892 0.421394L18.0113 8.12323L18.3647 7.70183L18.7182 7.28044L9.53582 -0.421394L9.18237 0Z"
            fill="rgb(0,0,0)"
          />
        </svg>
        {/* 347:829 - House Body */}
        <svg
          width={15.68}
          height={11.48}
          viewBox="0 0 15.68 11.48"
          style={{
            position: "absolute",
            left: 19.98,
            top: 23.9,
            overflow: "visible",
          }}
        >
          <path
            d="M0.55 0C0.55 -0.303757 0.303757 -0.55 0 -0.55C-0.303757 -0.55 -0.55 -0.303757 -0.55 0L0 0L0.55 0ZM0 11.4772L-0.55 11.4772C-0.55 11.781 -0.303757 12.0272 1.22125e-16 12.0272L0 11.4772ZM5.82297 11.4772L5.82297 12.0272C6.12672 12.0272 6.37297 11.781 6.37297 11.4772L5.82297 11.4772ZM5.82297 4.22846L5.82297 3.67846C5.51921 3.67846 5.27297 3.9247 5.27297 4.22846L5.82297 4.22846ZM9.85425 4.22846L10.4043 4.22846C10.4043 3.9247 10.158 3.67846 9.85425 3.67846L9.85425 4.22846ZM9.85425 11.4772L9.30425 11.4772C9.30425 11.781 9.5505 12.0272 9.85425 12.0272L9.85425 11.4772ZM15.6772 11.4772L15.6772 12.0272C15.981 12.0272 16.2272 11.781 16.2272 11.4772L15.6772 11.4772ZM16.2272 0C16.2272 -0.303757 15.981 -0.55 15.6772 -0.55C15.3735 -0.55 15.1272 -0.303757 15.1272 0L15.6772 0L16.2272 0ZM0 0L-0.55 0L-0.55 11.4772L0 11.4772L0.55 11.4772L0.55 0L0 0ZM0 11.4772L0 12.0272L5.82297 12.0272L5.82297 11.4772L5.82297 10.9272L0 10.9272L0 11.4772ZM5.82297 11.4772L6.37297 11.4772L6.37297 4.22846L5.82297 4.22846L5.27297 4.22846L5.27297 11.4772L5.82297 11.4772ZM5.82297 4.22846L5.82297 4.77846L9.85425 4.77846L9.85425 4.22846L9.85425 3.67846L5.82297 3.67846L5.82297 4.22846ZM9.85425 4.22846L9.30425 4.22846L9.30425 11.4772L9.85425 11.4772L10.4043 11.4772L10.4043 4.22846L9.85425 4.22846ZM9.85425 11.4772L9.85425 12.0272L15.6772 12.0272L15.6772 11.4772L15.6772 10.9272L9.85425 10.9272L9.85425 11.4772ZM15.6772 11.4772L16.2272 11.4772L16.2272 0L15.6772 0L15.1272 0L15.1272 11.4772L15.6772 11.4772Z"
            fill="rgb(0,0,0)"
          />
        </svg>
      </button>

      {/* 347:820 - Plus '+' Button */}
      <button
        type="button"
        onClick={handleNextSection}
        title="Buka frame / judul berikutnya"
        style={{
          position: "absolute",
          left: 249.26,
          top: 0,
          width: 34,
          height: 50.38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 12,
        }}
        className="hover:bg-black/5 active:bg-black/10 transition-colors"
      >
        <svg
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
          style={{ overflow: "visible" }}
        >
          <line x1="6" y1="1" x2="6" y2="11" stroke="rgb(0,0,0)" strokeWidth="1.2" />
          <line x1="1" y1="6" x2="11" y2="6" stroke="rgb(0,0,0)" strokeWidth="1.2" />
        </svg>
      </button>

      {/* 347:826 - Chevron Down 'v' Button */}
      <button
        type="button"
        onClick={handleNextSection}
        title="Lanjut ke judul berikutnya"
        style={{
          position: "absolute",
          left: 1635,
          top: 0,
          width: 52,
          height: 50.38,
          zIndex: 12,
        }}
        className="hover:bg-black/5 transition-colors"
      >
        <svg
          width={14}
          height={7}
          viewBox="0 0 14 7"
          style={{
            position: "absolute",
            left: 1653.67 - 1635,
            top: 24.71,
            overflow: "visible",
          }}
        >
          <path
            d="M0.388909 -0.388909C0.17412 -0.603697 -0.17412 -0.603697 -0.388909 -0.388909C-0.603697 -0.17412 -0.603697 0.17412 -0.388909 0.388909L0 0L0.388909 -0.388909ZM7 7L6.61109 7.38891C6.82588 7.6037 7.17412 7.6037 7.38891 7.38891L7 7ZM14.3889 0.388909C14.6037 0.17412 14.6037 -0.17412 14.3889 -0.388909C14.1741 -0.603697 13.8259 -0.603697 13.6111 -0.388909L14 0L14.3889 0.388909ZM0 0L-0.388909 0.388909L6.61109 7.38891L7 7L7.38891 6.61109L0.388909 -0.388909L0 0ZM7 7L7.38891 7.38891L14.3889 0.388909L14 0L13.6111 -0.388909L6.61109 6.61109L7 7Z"
            fill="rgb(0,0,0)"
          />
        </svg>
      </button>

      {/* 347:822 - Minimize '—' Button */}
      <button
        type="button"
        onClick={handleMinimize}
        title="Minimize ke atas"
        style={{
          position: "absolute",
          left: 1705,
          top: 0,
          width: 54,
          height: 50.38,
          zIndex: 12,
        }}
        className="hover:bg-black/5 transition-colors"
      >
        <svg
          width={16}
          height={1}
          viewBox="0 0 16 1"
          style={{
            position: "absolute",
            left: 1723.67 - 1705,
            top: 27.71,
            overflow: "visible",
          }}
        >
          <path d="M0 0L0 0.5L16 0.5L16 0L16 -0.5L0 -0.5L0 0Z" fill="rgb(0,0,0)" />
        </svg>
      </button>

      {/* 347:823 & 347:824 - Maximize / Restore Double-Square Button */}
      <button
        type="button"
        onClick={handleMaximize}
        title="Fokuskan ke judul ini"
        style={{
          position: "absolute",
          left: 1782,
          top: 0,
          width: 54,
          height: 50.38,
          zIndex: 12,
        }}
        className="hover:bg-black/5 transition-colors"
      >
        {/* Front Square (347:823) */}
        <svg
          width={11}
          height={11}
          viewBox="0 0 11 11"
          style={{
            position: "absolute",
            left: 1802.67 - 1782,
            top: 23.71,
            overflow: "visible",
          }}
        >
          <path
            d="M0 0L0 -0.5L-0.5 -0.5L-0.5 0L0 0ZM11 0L11.5 0L11.5 -0.5L11 -0.5L11 0ZM11 11L11 11.5L11.5 11.5L11.5 11L11 11ZM0 11L-0.5 11L-0.5 11.5L0 11.5L0 11ZM0 0L0 0.5L11 0.5L11 0L11 -0.5L0 -0.5L0 0ZM11 0L10.5 0L10.5 11L11 11L11.5 11L11.5 0L11 0ZM11 11L11 10.5L0 10.5L0 11L0 11.5L11 11.5L11 11ZM0 11L0.5 11L0.5 0L0 0L-0.5 0L-0.5 11L0 11Z"
            fill="rgb(0,0,0)"
          />
        </svg>
        {/* Back Square (347:824) */}
        <svg
          width={11}
          height={10}
          viewBox="0 0 11 10"
          style={{
            position: "absolute",
            left: 1805.67 - 1782,
            top: 20.71,
            overflow: "visible",
          }}
        >
          <path
            d="M0 0L0 -0.5L-0.5 -0.5L-0.5 0L0 0ZM11 0L11.5 0L11.5 -0.5L11 -0.5L11 0ZM11 10L11 10.5L11.5 10.5L11.5 10L11 10ZM0 2.14286L0.5 2.14286L0.5 0L0 0L-0.5 0L-0.5 2.14286L0 2.14286ZM0 0L0 0.5L11 0.5L11 0L11 -0.5L0 -0.5L0 0ZM11 0L10.5 0L10.5 10L11 10L11.5 10L11.5 0L11 0ZM11 10L11 9.5L8.64286 9.5L8.64286 10L8.64286 10.5L11 10.5L11 10Z"
            fill="rgb(0,0,0)"
          />
        </svg>
      </button>

      {/* 347:825 - Window Close '✕' Button */}
      <button
        type="button"
        onClick={handleClose}
        title="Tutup (Kembali ke Home)"
        style={{
          position: "absolute",
          left: 1860,
          top: 0,
          width: 60,
          height: 50.38,
          zIndex: 12,
        }}
        className="hover:bg-[#E81123] group transition-colors"
      >
        <svg
          width={15}
          height={14}
          viewBox="0 0 15 14"
          style={{
            position: "absolute",
            left: 1880.67 - 1860,
            top: 20.71,
            overflow: "visible",
          }}
        >
          <path
            d="M0 0L-0.341159 0.365528L14.6588 14.3655L15 14L15.3412 13.6345L0.341159 -0.365528L0 0ZM15 0L14.6588 -0.365528L-0.341159 13.6345L0 14L0.341159 14.3655L15.3412 0.365528L15 0Z"
            className="fill-black group-hover:fill-white transition-colors"
          />
        </svg>
      </button>
    </header>
  );
});
