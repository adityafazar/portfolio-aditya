"use client";

import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { DOCK_APP_METADATA } from "@/data/portfolioData";
import type { SceneNode } from "@/types/portfolio";
import { getPositionStyle } from "./utils";

export const MacDockRow = memo(function MacDockRow({
  node,
  onScrollToSection,
  renderNode,
}: {
  node: SceneNode;
  onScrollToSection?: (targetY: number) => void;
  renderNode: (childNode: SceneNode) => React.ReactNode;
}) {
  const dockRef = useRef<HTMLDivElement | null>(null);
  const children = useMemo(() => node.ch || [], [node.ch]);
  const itemCount = children.length;
  const is3D = node.id === "347:986";
  const scaleFactor = is3D ? 0.68 : 0.72;

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [autoIdx, setAutoIdx] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [activeBounceIdx, setActiveBounceIdx] = useState<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scaledItems = useMemo(() => {
    const items = children.map((child) => ({
      ...child,
      w: child.w * scaleFactor,
      h: child.h * scaleFactor,
      br: typeof child.br === "number" ? child.br * scaleFactor : child.br,
    }));

    const totalW = items.reduce((sum, item) => sum + item.w, 0);
    const targetGap = 44;
    const maxPossibleGap =
      items.length > 1 ? Math.max(0, (node.w - totalW) / (items.length - 1)) : 0;
    const gap = Math.min(targetGap, maxPossibleGap);
    const rowContentW = totalW + gap * Math.max(0, items.length - 1);
    let currentX = Math.max(0, (node.w - rowContentW) / 2);

    return items.map((item) => {
      const x = currentX;
      const y = Math.max(0, (node.h - item.h) / 2);
      currentX += item.w + gap;
      return {
        ...item,
        layoutX: x,
        layoutY: y,
      };
    });
  }, [children, node.w, node.h, scaleFactor]);

  // Pause auto-roll when scrolled out of viewport
  useEffect(() => {
    const el = dockRef.current;
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

  useEffect(() => {
    if (!isInView || isUserHovering || itemCount === 0) return;

    const intervalTime = is3D ? 1900 : 1700;
    const interval = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % itemCount);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isInView, isUserHovering, itemCount, is3D]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleMouseEnterItem = (idx: number) => {
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

  const handleItemClick = (idx: number, metaName?: string) => {
    setActiveBounceIdx(idx);
    setTimeout(() => {
      setActiveBounceIdx(null);
    }, 450);
    if (onScrollToSection && metaName) {
      if (metaName === "Blender" || metaName === "Unity" || metaName === "Unreal Engine") {
        onScrollToSection(12204);
      } else if (metaName === "Figma") {
        onScrollToSection(4392);
      } else if (metaName === "Photoshop" || metaName === "Illustrator") {
        onScrollToSection(2150);
      } else if (metaName === "Premiere Pro" || metaName === "CapCut") {
        onScrollToSection(3180);
      }
    }
  };

  const activeIdx = hoveredIdx !== null ? hoveredIdx : autoIdx;
  const posStyle = getPositionStyle(node);
  const rowTop = (node.y ?? 0) + 24;

  return (
    <div
      ref={dockRef}
      style={{
        ...posStyle,
        top: rowTop,
        overflow: "visible",
        pointerEvents: "auto",
      }}
      onMouseLeave={handleMouseLeaveRow}
    >
      {scaledItems.map((item, idx) => {
        const meta = DOCK_APP_METADATA[item.id] || { name: item.name || "App" };
        const dist = Math.abs(idx - activeIdx);
        const isActive = idx === activeIdx;

        let scale = 1.0;
        let translateY = 0;
        let zIndex = 1;

        if (isUserHovering) {
          if (dist === 0) {
            scale = 1.24;
            translateY = -6;
            zIndex = 40;
          } else if (dist === 1) {
            scale = 1.1;
            translateY = -2;
            zIndex = 20;
          }
        } else {
          if (dist === 0) {
            scale = 1.22;
            translateY = -5;
            zIndex = 40;
          } else if (dist === 1) {
            scale = 1.08;
            translateY = -2;
            zIndex = 20;
          }
        }

        const isBouncing = activeBounceIdx === idx;
        const iconTopOffset = (scale - 1) * item.h + Math.abs(translateY);

        return (
          <div
            key={item.id}
            className="macos-dock-item"
            style={{
              position: "absolute",
              left: item.layoutX,
              top: item.layoutY,
              width: item.w,
              height: item.h,
              zIndex,
              cursor: "pointer",
            }}
            onMouseEnter={() => handleMouseEnterItem(idx)}
            onClick={() => handleItemClick(idx, meta.name)}
          >
            {/* Themed Tooltip Pill directly above active item */}
            <div
              className={`macos-dock-tooltip ${
                is3D ? "macos-dock-tooltip-3d" : "macos-dock-tooltip-design"
              }`}
              style={{
                position: "absolute",
                bottom: `calc(100% + ${Math.round(iconTopOffset + 5)}px)`,
                left: "50%",
                transform: isActive
                  ? "translateX(-50%) translateY(0px) scale(1)"
                  : "translateX(-50%) translateY(4px) scale(0.92)",
                opacity: isActive ? 1 : 0,
                pointerEvents: "none",
                transition:
                  "opacity 180ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), bottom 200ms ease",
              }}
            >
              <div className="macos-dock-tooltip-pill">{meta.name}</div>
              <div className="macos-dock-tooltip-caret" />
            </div>

            {/* Magnified & bouncing icon container */}
            <div
              className={isBouncing ? "macos-dock-bounce" : ""}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformOrigin: "center bottom",
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transition: isUserHovering
                  ? "transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1.2), filter 180ms ease"
                  : "transform 460ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 460ms ease",
                willChange: "transform",
                filter: isActive
                  ? "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.28))"
                  : dist === 1
                    ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.14))"
                    : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08))",
              }}
            >
              {renderNode({ ...item, x: 0, y: 0 })}
            </div>
          </div>
        );
      })}
    </div>
  );
});
