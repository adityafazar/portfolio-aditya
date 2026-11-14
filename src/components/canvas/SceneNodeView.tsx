"use client";

import React, { memo } from "react";
import { MOCKUP_WINDOW_HEADER_MAP } from "@/data/portfolioData";
import { OVERVIEW_DESC_NODE_IDS } from "@/data/canvasConfig";
import type { SceneNode } from "@/types/portfolio";
import { MockupWindowHeader } from "@/components/ui/MockupWindowHeader";
import { InteractiveTypewriterText } from "@/components/ui/InteractiveTypewriterText";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { FigmaBrowserWindowBar } from "./FigmaBrowserWindowBar";
import { HeroLeftToolbar } from "./HeroLeftToolbar";
import { MacDockRow } from "./MacDockRow";
import { WorkingExperienceCardsRow } from "./WorkingExperienceCardsRow";
import { getFontFamily, getPositionStyle, renderStrokeOverlay } from "./utils";

export const SceneNodeView = memo(function SceneNodeView({
  node,
  onOpenLightbox,
  hoveredWeaveGroup,
  onHoverWeaveGroup,
  onScrollToSection,
  eager = false,
}: {
  node: SceneNode;
  onOpenLightbox: (src: string, title?: string) => void;
  hoveredWeaveGroup?: string | null;
  onHoverWeaveGroup?: (group: string | null) => void;
  onScrollToSection?: (targetY: number) => void;
  eager?: boolean;
}) {
  // User requested deletion of cursor & caret at Hero Short Description
  if (
    node.id === "347:1115" ||
    node.id === "347:1116" ||
    node.id === "347:1117" ||
    node.id === "347:1118"
  ) {
    return null;
  }

  // Window 1: Hero Top Browser Window Bar
  if (node.id === "347:812") {
    return (
      <FigmaBrowserWindowBar
        activeWindow="hero"
        top={0}
        onScrollToSection={onScrollToSection}
      />
    );
  }

  // Window Mockup Header: Standardized Reusable OS Window Frame
  if (node.windowHeader || MOCKUP_WINDOW_HEADER_MAP[node.id]) {
    const title =
      node.title || MOCKUP_WINDOW_HEADER_MAP[node.id] || "Blender 3D Project";
    return (
      <MockupWindowHeader
        title={title}
        width="100%"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />
    );
  }

  const posStyle = getPositionStyle(node);

  // 1. Subtle Blender 2D Background Grid Group (+ Hero 3D Floor Grid child)
  if (node.t === "GRID_GROUP") {
    return (
      <div style={{ ...posStyle, pointerEvents: "none" }} aria-hidden="true">
        {node.ch?.map((child) => (
          <SceneNodeView
            key={child.id}
            node={child}
            onOpenLightbox={onOpenLightbox}
            hoveredWeaveGroup={hoveredWeaveGroup}
            onHoverWeaveGroup={onHoverWeaveGroup}
            onScrollToSection={onScrollToSection}
            eager={eager}
          />
        ))}
        {node.lines && node.lines.length > 0 && (
          <svg
            width={node.w}
            height={node.h}
            viewBox={`0 0 ${node.w} ${node.h}`}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {node.lines.map((ln, idx) => (
              <line
                key={idx}
                x1={ln.x1}
                y1={ln.y1}
                x2={ln.x2}
                y2={ln.y2}
                stroke={ln.c}
                strokeWidth={ln.sw}
              />
            ))}
          </svg>
        )}
      </div>
    );
  }

  // 2. Special @2x Native Figma Subtree (Hero 3D Grid, Blender Glass Toolbar, XYZ Gizmo, QR Codes)
  if (node.t === "SPECIAL_IMG") {
    const imgEl = (
      <img
        src={node.src}
        alt={node.alt || ""}
        draggable={false}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
        }}
      />
    );

    if (node.href) {
      return (
        <a
          href={node.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`${node.alt || "Watch Video"} (Buka di tab baru)`}
          className="figma-action-link"
          style={{
            ...posStyle,
            pointerEvents: "auto",
            cursor: "pointer",
            display: "block",
          }}
        >
          {imgEl}
        </a>
      );
    }

    if (node.id === "347:858") {
      return (
        <div
          title="Blender 3D Axis Gizmo"
          className="figma-gizmo-trigger"
          style={{
            ...posStyle,
            pointerEvents: "auto",
            cursor: "crosshair",
          }}
        >
          <div className="figma-gizmo-spin w-full h-full flex items-center justify-center">
            {imgEl}
          </div>
        </div>
      );
    }

    if (node.id === "347:870") {
      return (
        <HeroLeftToolbar node={node} onScrollToSection={onScrollToSection} />
      );
    }

    return (
      <div style={{ ...posStyle, pointerEvents: "none" }} aria-hidden="true">
        {imgEl}
      </div>
    );
  }

  // 3. Crisp Inline Vector / Bezier Cable / Cursor / Icon
  if (node.t === "SVG") {
    if (node.id === "347:1025" || node.id === "347:1026") {
      return null;
    }

    if (node.id === "347:1022") {
      return (
        <svg
          width={node.w}
          height={node.h}
          style={{
            ...posStyle,
            overflow: "visible",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <line
            x1={0}
            y1={-2.5}
            x2={node.w}
            y2={-2.5}
            stroke="rgb(12, 140, 233)"
            strokeWidth={5}
            strokeDasharray="20 20"
            className="figma-timeline-marching-ants"
          />
        </svg>
      );
    }

    if (node.id === "347:934") {
      return (
        <div
          style={{
            ...posStyle,
            overflow: "visible",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <span className="figma-radar-ping-ring figma-radar-ring-1" />
          <span className="figma-radar-ping-ring figma-radar-ring-2" />
          <svg
            width={node.w}
            height={node.h}
            viewBox={`0 0 ${node.w} ${node.h}`}
            style={{
              position: "relative",
              zIndex: 1,
              overflow: "visible",
            }}
          >
            {node.fg?.map((g, i) => (
              <path
                key={`f${i}`}
                d={g.d}
                fill={node.fc}
                stroke={node.sw ? node.sc : undefined}
                strokeWidth={node.sw}
              />
            ))}
          </svg>
        </div>
      );
    }

    const isInteractiveCursor =
      node.id === "347:949" ||
      node.id === "347:1020" ||
      node.id === "347:1186" ||
      node.id === "347:1387";

    if (isInteractiveCursor) {
      const cursorDelays: Record<string, string> = {
        "347:1020": "0s",
        "347:949": "1.2s",
        "347:1186": "2.4s",
        "347:1387": "0.8s",
      };
      const animDelay = cursorDelays[node.id] || "0s";

      return (
        <div
          style={{
            ...posStyle,
            zIndex: 50,
            overflow: "visible",
            pointerEvents: "auto",
          }}
          aria-hidden="true"
        >
          <div
            className="figma-cursor-float-click relative w-full h-full"
            style={{
              animationDelay: animDelay,
            }}
          >
            <span
              className="figma-cursor-click-ripple"
              style={{
                animationDelay: animDelay,
              }}
            />
            <svg
              width={node.w}
              height={node.h}
              viewBox={`0 0 ${node.w} ${node.h}`}
              style={{ overflow: "visible" }}
            >
              {node.fg?.map((g, i) => (
                <path
                  key={`f${i}`}
                  d={g.d}
                  fill={node.fc}
                  stroke={node.sw ? node.sc : undefined}
                  strokeWidth={node.sw}
                />
              ))}
              {node.sg?.map((g, i) => (
                <path
                  key={`s${i}`}
                  d={g.d}
                  fill={node.sc}
                  fillRule={g.r || "evenodd"}
                />
              ))}
            </svg>
          </div>
        </div>
      );
    }

    const isCursorRing = node.id === "347:842";
    const clipId = node.clipIn ? `clip-${node.id.replace(":", "-")}` : undefined;

    let svgZIndex: number | undefined = undefined;
    if (node.id === "347:1167") {
      svgZIndex = 20;
    } else if (node.id === "347:1272") {
      svgZIndex = 25;
    } else if (node.id === "347:995") {
      svgZIndex = 25;
    }

    return (
      <svg
        width={node.w}
        height={node.h}
        viewBox={`0 0 ${node.w} ${node.h}`}
        className={isCursorRing ? "figma-3d-cursor-ring" : undefined}
        style={{
          ...posStyle,
          zIndex: svgZIndex,
          overflow: "visible",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {clipId && node.fg && (
          <defs>
            <clipPath id={clipId}>
              {node.fg.map((g, i) => (
                <path key={`cp${i}`} d={g.d} clipRule={g.r} />
              ))}
            </clipPath>
          </defs>
        )}
        {node.fg?.map((g, i) => (
          <path
            key={`f${i}`}
            d={g.d}
            fill={node.fc}
            fillRule={g.r}
            stroke={node.sw ? node.sc : undefined}
            strokeWidth={node.sw}
          />
        ))}
        {!node.sw &&
          node.sg &&
          (clipId ? (
            <g clipPath={`url(#${clipId})`}>
              {node.sg.map((g, i) => (
                <path key={`s${i}`} d={g.d} fill={node.sc} fillRule={g.r} />
              ))}
            </g>
          ) : (
            node.sg.map((g, i) => (
              <path key={`s${i}`} d={g.d} fill={node.sc} fillRule={g.r} />
            ))
          ))}
      </svg>
    );
  }

  // 4. Real Selectable HTML Typography
  if (node.t === "TEXT") {
    const fullText =
      node.text !== undefined
        ? node.text
        : (node.runs || []).map((r) => r.text).join("");
    const hasNewline = fullText.includes("\n");
    const lh = node.lh || (node.fs || 16) * 1.3;
    const maxOneLineH = node.trim
      ? (node.fs || 16) * 0.85 + lh * 0.45
      : lh * 1.45;
    const isSingleLine =
      node.ar === "WIDTH_AND_HEIGHT" || (!hasNewline && node.h <= maxOneLineH);

    const alignItems =
      node.va === "center"
        ? "center"
        : node.va === "bottom"
          ? "flex-end"
          : "flex-start";

    const justifyContent =
      node.ta === "center"
        ? "center"
        : node.ta === "right"
          ? "flex-end"
          : "flex-start";

    const innerStyle: React.CSSProperties = {
      fontFamily: getFontFamily(node.ff),
      fontSize: node.fs,
      fontWeight: node.fw,
      lineHeight: node.lh ? `${node.lh}px` : undefined,
      letterSpacing: node.ls ? `${node.ls}px` : undefined,
      color: node.c,
      textAlign:
        node.ta === "justified" || node.ta === "justify"
          ? "justify"
          : (node.ta as React.CSSProperties["textAlign"]) || "left",
      textJustify:
        node.ta === "justified" || node.ta === "justify" ? "inter-word" : undefined,
      textAlignLast:
        node.ta === "justified" || node.ta === "justify" ? "left" : undefined,
      whiteSpace: isSingleLine
        ? hasNewline
          ? "pre"
          : "nowrap"
        : "pre-wrap",
      width: isSingleLine ? "auto" : "100%",
      flexShrink: isSingleLine ? 0 : undefined,
      margin: 0,
    };

    const content = node.bullets ? (
      <ul className="list-disc pl-[1.35em] m-0">
        {node.bullets.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : node.runs ? (
      node.runs.map((run, idx) => (
        <span
          key={idx}
          style={{
            fontWeight: run.fw,
            fontSize: run.fs,
            fontFamily: run.ff ? getFontFamily(run.ff) : undefined,
            lineHeight: run.lh ? `${run.lh}px` : undefined,
            color: run.c,
          }}
        >
          {run.text}
        </span>
      ))
    ) : (
      fullText
    );

    const isHeroProfile = node.id === "347:1114";
    const isOverviewDesc = OVERVIEW_DESC_NODE_IDS.has(node.id);

    const textInner = isHeroProfile ? (
      <InteractiveTypewriterText
        text={fullText}
        runs={node.runs}
        innerStyle={{
          ...innerStyle,
          textAlign: "justify",
          textJustify: "inter-word",
          textAlignLast: "left",
        }}
        lineHeightOverride="49px"
        className={node.trim ? "cap-trim" : undefined}
      />
    ) : isOverviewDesc ? (
      <InteractiveTypewriterText
        text={fullText}
        runs={node.runs}
        innerStyle={innerStyle}
      />
    ) : (
      <div className={node.trim ? "cap-trim" : undefined} style={innerStyle}>
        {content}
      </div>
    );

    return (
      <div
        aria-hidden={node.dup ? "true" : undefined}
        style={{
          ...posStyle,
          display: "flex",
          alignItems,
          justifyContent,
          overflow: "visible",
          pointerEvents: node.dup ? "none" : "auto",
          userSelect: node.dup ? "none" : "text",
        }}
      >
        {textInner}
      </div>
    );
  }

  // 5. BOX (FRAME / GROUP / RECTANGLE)
  const renderChildNode = (childNode: SceneNode) => (
    <SceneNodeView
      node={childNode}
      onOpenLightbox={onOpenLightbox}
      hoveredWeaveGroup={hoveredWeaveGroup}
      onHoverWeaveGroup={onHoverWeaveGroup}
      onScrollToSection={onScrollToSection}
      eager={eager}
    />
  );

  if (node.id === "347:908") {
    return <WorkingExperienceCardsRow node={node} renderNode={renderChildNode} />;
  }

  if (node.id === "347:uiux_mockups_cluster") {
    return (
      <div
        style={{
          ...posStyle,
          zIndex: 30,
          overflow: "visible",
          pointerEvents: "auto",
        }}
        aria-label="UI/UX Showcase Mockups Cluster"
      >
        <div
          className="figma-uiux-cluster-float-rotate w-full h-full relative"
          style={{ overflow: "visible" }}
        >
          {node.ch?.map((child) => (
            <SceneNodeView
              key={child.id}
              node={child}
              onOpenLightbox={onOpenLightbox}
              hoveredWeaveGroup={hoveredWeaveGroup}
              onHoverWeaveGroup={onHoverWeaveGroup}
              onScrollToSection={onScrollToSection}
              eager={eager}
            />
          ))}
        </div>
      </div>
    );
  }

  if (node.id === "347:974" || node.id === "347:986") {
    return (
      <MacDockRow
        node={node}
        onScrollToSection={onScrollToSection}
        renderNode={renderChildNode}
      />
    );
  }

  const isCutout = Boolean(node.cutout);
  const isSubmarine =
    node.id === "347:1576" ||
    node.id === "347:1269" ||
    Boolean(
      node.imgs?.some(
        (im) =>
          im.src && im.src.includes("2cdc3943f8d30bbfc8d69cbb3469dc6991da2f75")
      )
    );
  const isShowcaseCutout =
    node.id === "347:1174" ||
    node.id === "347:1215" ||
    node.id === "347:1217" ||
    node.id === "347:1269" ||
    node.id === "347:1337" ||
    node.id === "347:1338" ||
    node.id === "347:1512" ||
    node.id === "347:1576" ||
    node.id === "347:1641" ||
    node.id === "347:1658" ||
    node.id === "347:2530" ||
    node.id === "347:2772";

  const isWindowMockup =
    Boolean(node.windowHeader) ||
    Boolean(MOCKUP_WINDOW_HEADER_MAP[node.id]) ||
    Boolean(node.ch?.some((c) => c.windowHeader || MOCKUP_WINDOW_HEADER_MAP[c.id]));

  let zIndexVal: number | undefined = undefined;
  if (node.id === "347:996") {
    zIndexVal = 30;
  } else if (node.id === "347:834") {
    zIndexVal = 20;
  } else if (node.id === "347:999") {
    zIndexVal = 30;
  } else if (node.id === "347:uiux_mockups_cluster") {
    zIndexVal = 30;
  } else if (
    node.id === "347:1165" ||
    node.id === "347:1121" ||
    node.id === "347:1171" ||
    node.id === "347:1169"
  ) {
    zIndexVal = 10;
  } else if (node.id === "347:2572") {
    zIndexVal = 2;
  } else if (node.id === "347:2594") {
    zIndexVal = 4;
  } else if (node.id === "347:2704") {
    zIndexVal = 6;
  } else if (node.id === "347:1187") {
    zIndexVal = 60;
  } else if (node.id === "347:1270") {
    zIndexVal = 20;
  } else if (node.id === "347:1337" || node.id === "347:1338" || node.id === "347:1287") {
    zIndexVal = 12;
  } else if (node.id === "347:1215") {
    zIndexVal = 12;
  } else if (
    node.id === "347:1434" ||
    node.id === "347:1435" ||
    node.id === "347:1462" ||
    node.id === "347:1487"
  ) {
    zIndexVal = 12;
  } else if (node.id === "347:2772") {
    zIndexVal = 10;
  } else if (
    node.id === "347:2773" ||
    node.id === "347:2531" ||
    node.id === "347:3620" ||
    node.id === "347:1515" ||
    node.id === "347:1367"
  ) {
    zIndexVal = 25;
  } else if (node.titleBadge) {
    zIndexVal = 30;
  } else if (isCutout || isSubmarine || isShowcaseCutout) {
    zIndexVal = 20;
  } else if (node.id === "347:1246") {
    zIndexVal = 14;
  } else if (node.id === "347:1219") {
    zIndexVal = 12;
  } else if (node.id === "347:1189") {
    zIndexVal = 10;
  } else if (isWindowMockup) {
    zIndexVal = 10;
  }

  const boxStyle: React.CSSProperties = {
    ...posStyle,
    zIndex: zIndexVal,
    backgroundColor: node.bg,
    borderRadius: node.br,
    boxShadow: node.bs,
    filter: node.df,
    clipPath: node.cp,
    overflow: node.clip ? "hidden" : "visible",
    pointerEvents: node.weaveOverlay || node.dup
      ? "none"
      : node.href || node.lb || isCutout || node.titleBadge
        ? "auto"
        : "none",
    cursor: node.href
      ? "pointer"
      : node.lb
        ? "zoom-in"
        : isCutout
          ? "grab"
          : node.titleBadge
            ? "pointer"
            : undefined,
  };

  const innerLayers = (
    <>
      {/* Image fills rendered in exact bottom-to-top Figma paint order */}
      {node.imgs && node.imgs.length > 0 && (
        <div
          className={node.lb ? "figma-img-container" : undefined}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: node.br,
            pointerEvents: "none",
          }}
        >
          {node.imgs.map((im, idx) => {
            const isMirrored = node.mirrorX || node.id === "347:1337";
            const mirrorTransform = isMirrored ? "scaleX(-1)" : undefined;

            const isVideo =
              im.src.toLowerCase().endsWith(".mp4") ||
              im.src.toLowerCase().endsWith(".webm") ||
              im.src.toLowerCase().includes(".mp4?") ||
              im.src.toLowerCase().includes(".webm?");

            if (isVideo) {
              return (
                <LazyVideo
                  key={idx}
                  src={im.src}
                  borderRadius={node.br}
                  label={node.name || "Loading 3D preview..."}
                  style={{
                    opacity: im.op,
                    transform: mirrorTransform,
                  }}
                />
              );
            }

            if (im.crop) {
              const [cw, ch, cl, ct] = im.crop;
              return (
                <img
                  key={idx}
                  src={im.src}
                  alt={node.name || ""}
                  draggable={false}
                  loading={eager ? "eager" : "lazy"}
                  fetchPriority={eager ? "high" : undefined}
                  decoding="async"
                  className={
                    node.lb
                      ? "figma-img-target"
                      : isCutout
                        ? "figma-cutout-img"
                        : undefined
                  }
                  style={{
                    position: "absolute",
                    maxWidth: "none",
                    width: `${cw}%`,
                    height: `${ch}%`,
                    left: `${cl}%`,
                    top: `${ct}%`,
                    opacity: im.op,
                    userSelect: "none",
                    transform: mirrorTransform,
                  }}
                />
              );
            }

            return (
              <img
                key={idx}
                src={im.src}
                alt={node.name || ""}
                draggable={false}
                loading={eager ? "eager" : "lazy"}
                fetchPriority={eager ? "high" : undefined}
                decoding="async"
                className={
                  node.lb
                    ? "figma-img-target"
                    : isCutout
                      ? "figma-cutout-img"
                      : undefined
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit:
                    im.mode === "FIT"
                      ? "contain"
                      : im.mode === "STRETCH"
                        ? "fill"
                        : "cover",
                  opacity: im.op,
                  userSelect: "none",
                  transform: mirrorTransform,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Child layers */}
      {node.ch?.map((child) => (
        <SceneNodeView
          key={child.id}
          node={child}
          onOpenLightbox={onOpenLightbox}
          hoveredWeaveGroup={hoveredWeaveGroup}
          onHoverWeaveGroup={onHoverWeaveGroup}
          onScrollToSection={onScrollToSection}
          eager={eager}
        />
      ))}

      {/* Stroke overlay */}
      {node.stroke &&
        renderStrokeOverlay(
          node.stroke,
          node.w,
          node.h,
          node.br,
          node.id === "347:834" || Boolean(node.marchingAnts)
        )}
    </>
  );

  if (node.href) {
    return (
      <a
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
        title="Watch Video (Buka di tab baru)"
        className="figma-action-link"
        style={{ ...boxStyle, display: "block", textDecoration: "none" }}
      >
        {innerLayers}
      </a>
    );
  }

  if (node.lb) {
    return (
      <div
        role="button"
        tabIndex={0}
        title={
          isSubmarine
            ? "Kapal Selam AR Warship (Klik untuk preview)"
            : "Klik untuk memperbesar preview"
        }
        className={`figma-lightbox-trigger group ${
          isSubmarine ? "figma-submarine-trigger" : ""
        }`}
        style={{
          ...posStyle,
          zIndex: zIndexVal,
          overflow: "visible",
          pointerEvents: "auto",
          cursor: "zoom-in",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onOpenLightbox(node.lb!, node.name);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenLightbox(node.lb!, node.name);
          }
        }}
      >
        <div
          className="figma-interactive-inner w-full h-full relative"
          style={{
            backgroundColor: node.bg,
            borderRadius: node.br,
            boxShadow: isSubmarine ? undefined : node.bs,
            filter: node.df,
            overflow: node.clip ? "hidden" : "visible",
          }}
        >
          <div
            className={
              isSubmarine
                ? "figma-submarine-maneuver w-full h-full relative"
                : "w-full h-full relative"
            }
            style={{ overflow: node.clip ? "hidden" : "visible" }}
          >
            {innerLayers}
          </div>
          <div className="figma-zoom-pill absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30 translate-y-1 group-hover:translate-y-0">
            <span className="bg-black/85 text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-white/20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Preview
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isCutout) {
    return (
      <div
        title={node.name || "3D Object"}
        className="figma-3d-cutout-trigger group"
        style={{
          ...posStyle,
          zIndex: zIndexVal,
          overflow: "visible",
          pointerEvents: "auto",
          cursor: "grab",
        }}
      >
        <div
          className="figma-cutout-inner w-full h-full relative"
          style={{
            backgroundColor: node.bg,
            borderRadius: node.br,
            boxShadow: node.bs,
            filter: node.df,
            overflow: node.clip ? "hidden" : "visible",
          }}
        >
          {innerLayers}
        </div>
      </div>
    );
  }

  if (node.id === "347:811") {
    return (
      <div
        title="Aditya Fazar Sanjaya - ID Card & Lanyard"
        className="figma-lanyard-pendulum"
        style={{
          ...posStyle,
          overflow: "visible",
          pointerEvents: "auto",
          cursor: "grab",
        }}
      >
        <div className="figma-lanyard-inner w-full h-full relative">
          {innerLayers}
        </div>
      </div>
    );
  }

  if (node.id === "347:840") {
    return (
      <div
        title="Blender 3D Cursor"
        className="figma-3d-cursor group"
        style={{
          ...posStyle,
          overflow: "visible",
          pointerEvents: "auto",
          cursor: "crosshair",
        }}
      >
        <div className="figma-3d-cursor-pulse w-full h-full relative">
          {innerLayers}
        </div>
      </div>
    );
  }

  if (node.titleBadge) {
    const isHeroSub = Boolean(node.heroSubtitle || node.id === "347:838");
    const isWovenActive = Boolean(
      node.weaveGroup && hoveredWeaveGroup === node.weaveGroup
    );

    const animClass = isHeroSub
      ? "figma-hero-subtitle-badge"
      : node.titleRot && node.titleRot > 0
        ? `figma-title-badge figma-title-badge-rot-pos ${
            isWovenActive ? "figma-title-badge-active-pos" : ""
          }`
        : `figma-title-badge figma-title-badge-rot-neg ${
            isWovenActive ? "figma-title-badge-active-neg" : ""
          }`;

    const isUiuxCoverBadge =
      node.id === "347:1165" ||
      node.id === "347:1121" ||
      node.id === "347:1171" ||
      node.id === "347:1169";

    const is3dDesignBadge = node.id === "347:1187";

    return (
      <div
        style={{
          ...posStyle,
          zIndex: isUiuxCoverBadge ? 5 : is3dDesignBadge ? 60 : 30,
          overflow: "visible",
          pointerEvents: node.weaveOverlay || node.dup ? "none" : "auto",
        }}
        onMouseEnter={
          node.weaveGroup && onHoverWeaveGroup
            ? () => onHoverWeaveGroup(node.weaveGroup!)
            : undefined
        }
        onMouseLeave={
          node.weaveGroup && onHoverWeaveGroup
            ? () => onHoverWeaveGroup(null)
            : undefined
        }
      >
        <div
          className={`${animClass} w-full h-full relative`}
          style={{
            backgroundColor: node.bg,
            borderRadius: node.br,
            boxShadow: node.bs,
            filter: node.df,
            clipPath: node.cp,
            transformOrigin: "center center",
          }}
        >
          {innerLayers}
        </div>
      </div>
    );
  }

  if (isSubmarine) {
    return (
      <div
        style={{
          ...posStyle,
          zIndex: zIndexVal,
          overflow: "visible",
          pointerEvents: "auto",
        }}
      >
        <div
          className="figma-submarine-maneuver w-full h-full relative"
          style={{ overflow: "visible" }}
        >
          {innerLayers}
        </div>
      </div>
    );
  }

  return <div style={boxStyle}>{innerLayers}</div>;
});
