"use client";

import React, { memo, useState } from "react";
import { HERO_TOOLBAR_CAPSULES, TOOLBAR_ICON_SIZE } from "@/data/canvasConfig";
import type { SceneNode } from "@/types/portfolio";
import { getPositionStyle } from "./utils";

export const HeroLeftToolbar = memo(function HeroLeftToolbar({
  node,
  onScrollToSection,
}: {
  node: SceneNode;
  onScrollToSection?: (targetY: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeToolId, setActiveToolId] = useState<string>("tool-box-select");
  const posStyle = getPositionStyle(node);

  return (
    <div
      aria-label="Blender Creative Toolbar"
      style={{
        ...posStyle,
        width: isHovered ? 260 : node.w,
        overflow: "visible",
        pointerEvents: "auto",
        zIndex: isHovered ? 50 : 25,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {HERO_TOOLBAR_CAPSULES.map((capsule) => {
        const itemCount = capsule.items.length;
        const rowHeight = capsule.height / itemCount;

        return (
          <div
            key={capsule.id}
            style={{
              position: "absolute",
              left: 16,
              top: capsule.top,
              width: isHovered ? 222 : 82,
              height: capsule.height,
              borderRadius: 18,
              backgroundColor: "#F8F6F2",
              border: "1.5px solid #D6D0C7",
              boxShadow: isHovered
                ? "0 12px 28px -4px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.08)"
                : "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition:
                "width 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease",
            }}
          >
            {capsule.items.map((item, idx) => {
              const isFirst = item.isFirstItem;
              const isActive = activeToolId === item.id;
              const hasDivider = idx < itemCount - 1;

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setActiveToolId(item.id);
                    if (item.targetY !== undefined && onScrollToSection) {
                      onScrollToSection(item.targetY);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveToolId(item.id);
                      if (item.targetY !== undefined && onScrollToSection) {
                        onScrollToSection(item.targetY);
                      }
                    }
                  }}
                  className="group relative flex items-center transition-colors cursor-pointer select-none"
                  style={{
                    width: "100%",
                    height: rowHeight,
                    backgroundColor: isFirst
                      ? "#0C8CE9"
                      : isActive
                        ? "#ECE6DD"
                        : "transparent",
                    borderBottom: hasDivider
                      ? isFirst
                        ? "1px solid rgba(255, 255, 255, 0.25)"
                        : "1px solid #E5E0D8"
                      : "none",
                  }}
                >
                  {/* Left 82px Icon Slot */}
                  <div
                    style={{
                      width: 82,
                      height: "100%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="transition-transform duration-200 group-hover:scale-105"
                      style={{
                        width: TOOLBAR_ICON_SIZE,
                        height: TOOLBAR_ICON_SIZE,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        draggable={false}
                        style={{
                          width: TOOLBAR_ICON_SIZE,
                          height: TOOLBAR_ICON_SIZE,
                          objectFit: "contain",
                          display: "block",
                          userSelect: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Animated Text Label Slot */}
                  <div
                    className="flex items-center overflow-hidden"
                    style={{
                      width: isHovered ? 134 : 0,
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateX(0)" : "translateX(-6px)",
                      transition: isHovered
                        ? "width 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease 60ms, transform 260ms cubic-bezier(0.16, 1, 0.3, 1) 40ms"
                        : "width 240ms ease, opacity 140ms ease, transform 200ms ease",
                      pointerEvents: isHovered ? "auto" : "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        letterSpacing: "-0.2px",
                        color: isFirst ? "#FFFFFF" : "#1A1A1A",
                        paddingRight: "14px",
                        userSelect: "none",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});
