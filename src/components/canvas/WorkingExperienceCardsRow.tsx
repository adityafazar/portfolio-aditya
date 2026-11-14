"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import type { SceneNode } from "@/types/portfolio";
import { getPositionStyle } from "./utils";

const ACCENT_GLOWS = [
  "rgba(245, 197, 24, 0.45)", // Kementerian ESDM (Yellow)
  "rgba(12, 140, 233, 0.45)", // Urbansolv (Blue)
  "rgba(224, 60, 68, 0.45)", // SCCIC ITB (Red)
];

export const WorkingExperienceCardsRow = memo(function WorkingExperienceCardsRow({
  node,
  renderNode,
}: {
  node: SceneNode;
  renderNode: (childNode: SceneNode) => React.ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const cards = node.ch || [];
  const cardCount = cards.length;

  const [autoIdx, setAutoIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [activeBounceIdx, setActiveBounceIdx] = useState<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pause auto-cycling timer when scrolled out of viewport
  useEffect(() => {
    const el = rowRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "150px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle through the 3 cards sequentially (every 3000ms) while in viewport
  useEffect(() => {
    if (!isInView || isUserHovering || cardCount === 0) return;

    const interval = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % cardCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isUserHovering, cardCount]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleMouseEnterCard = (idx: number) => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    setIsUserHovering(true);
    setHoveredIdx(idx);
  };

  const handleMouseLeaveRow = () => {
    setHoveredIdx(null);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsUserHovering(false);
    }, 2400);
  };

  const handleCardClick = (idx: number) => {
    setActiveBounceIdx(idx);
    setTimeout(() => {
      setActiveBounceIdx(null);
    }, 380);
  };

  const activeIdx = hoveredIdx !== null ? hoveredIdx : autoIdx;
  const posStyle = getPositionStyle(node);

  return (
    <div
      ref={rowRef}
      style={{
        ...posStyle,
        overflow: "visible",
        pointerEvents: "auto",
      }}
      onMouseLeave={handleMouseLeaveRow}
    >
      {cards.map((card, idx) => {
        const isActive = idx === activeIdx;
        const isBouncing = activeBounceIdx === idx;
        const glowColor = ACCENT_GLOWS[idx] || "rgba(0, 0, 0, 0.25)";

        const translateY = isActive ? -4 : 0;
        const scale = 1.0;
        const zIndex = isActive ? 35 : 10;
        const opacity = isUserHovering
          ? isActive
            ? 1.0
            : 0.82
          : isActive
            ? 1.0
            : 0.92;

        return (
          <div
            key={card.id}
            className={isBouncing ? "figma-card-spring-click" : undefined}
            style={{
              position: "absolute",
              left: card.x ?? 0,
              top: card.y ?? 0,
              width: card.w,
              height: card.h,
              transform: `translateY(${translateY}px) scale(${scale})`,
              transformOrigin: "center center",
              zIndex,
              opacity,
              cursor: "pointer",
              transition:
                "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), filter 350ms ease, opacity 300ms ease",
              filter: isActive
                ? `drop-shadow(0 0 14px ${glowColor}) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08))`
                : "none",
            }}
            onMouseEnter={() => handleMouseEnterCard(idx)}
            onClick={() => handleCardClick(idx)}
          >
            {renderNode({
              ...card,
              x: 0,
              y: 0,
            })}
          </div>
        );
      })}
    </div>
  );
});
