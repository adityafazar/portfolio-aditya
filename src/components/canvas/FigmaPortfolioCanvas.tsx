"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import sceneData from "@/data/figmaScene.json";
import { F2_NODE_IDS } from "@/data/portfolioData";
import {
  F2_BASE_Y,
  F3_BASE_Y,
  FRAME_GAP,
  FRAME1_HEIGHT,
  FRAME2_HEIGHT,
  FRAME3_HEIGHT,
  SECTIONS,
  TOTAL_CANVAS_HEIGHT,
  VIDEO_WINDOW_CONFIGS,
} from "@/data/canvasConfig";
import type { FigmaScene, SceneNode } from "@/types/portfolio";
import {
  HERO_CURSOR_OFFSET_X,
  HERO_CURSOR_OFFSET_Y,
  HERO_SCRIBBLE_OFFSET_X,
  HERO_SCRIBBLE_OFFSET_Y,
  HeroMalinWindow,
  HeroScribbleLine,
  MalinKundangCard,
  ThreeDCoverLine,
  ThreeDPalmTree,
  UIUX_CABLE_OFFSET_X,
  UIUX_CABLE_OFFSET_Y,
  UIUX_CURSOR_OFFSET_X,
  UIUX_CURSOR_OFFSET_Y,
  UiuxCoverCable,
  UiuxMockupCluster,
} from "@/components/sections/ManualSceneSections";
import { PortfolioPreloader } from "@/components/ui/PortfolioPreloader";
import { FigmaBrowserWindowBar } from "./FigmaBrowserWindowBar";
import { FloatingDocks } from "./FloatingDocks";
import { LightboxModal, type LightboxData } from "./LightboxModal";
import { SceneNodeView } from "./SceneNodeView";
import { VideoMockupWindow } from "./VideoMockupWindow";

const typedScene = sceneData as unknown as FigmaScene;

export default function FigmaPortfolioCanvas() {
  const [zoomFactor, setZoomFactor] = useState<number>(0.8);
  const [scale, setScale] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const activeSectionRef = useRef<string>("hero");
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);
  const [hoveredWeaveGroup, setHoveredWeaveGroup] = useState<string | null>(null);

  const updateScale = useCallback(() => {
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const isMobile = vw < 768;
    const baseFitScale = Math.min(1, vw / typedScene.width);
    const effectiveZoom = isMobile ? Math.max(zoomFactor, 0.96) : zoomFactor;
    setScale(Math.round(baseFitScale * effectiveZoom * 1000) / 1000);
    setMounted(true);
  }, [zoomFactor]);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  const handleZoomIn = useCallback(() => {
    setZoomFactor((curr) => Math.min(1.4, Math.round((curr + 0.1) * 10) / 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomFactor((curr) => Math.max(0.4, Math.round((curr - 0.1) * 10) / 10));
  }, []);

  // Throttled scroll tracking that only updates React state when the active section ID changes
  useEffect(() => {
    let rafId = 0;
    const checkSection = () => {
      rafId = 0;
      const figmaY = (window.scrollY + window.innerHeight * 0.28) / (scale || 1);
      let current: string = SECTIONS[0].id;
      for (const sec of SECTIONS) {
        if (figmaY >= sec.y) current = sec.id;
      }
      if (current !== activeSectionRef.current) {
        activeSectionRef.current = current;
        setActiveSection(current);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(checkSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    checkSection();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [scale]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const handleOpenLightbox = useCallback((src: string, title?: string) => {
    setLightbox({ src, title });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const scrollToSection = useCallback(
    (figmaY: number) => {
      window.scrollTo({
        top: Math.round(figmaY * scale),
        behavior: "smooth",
      });
    },
    [scale]
  );

  const { frame1Nodes, frame2Nodes, frame3Nodes } = useMemo(() => {
    const f1: SceneNode[] = [];
    const f2: SceneNode[] = [];
    const f3: SceneNode[] = [];

    const getNodeY = (n: SceneNode): number => {
      if (n.m) return n.m[5];
      return n.y ?? 0;
    };

    for (const node of typedScene.children) {
      if (node.t === "GRID_GROUP") {
        if (node.id === "347:140") {
          f1.push(node);
        }
        continue;
      }
      const y = getNodeY(node);

      if (y < 4280 && node.id !== "347:1007") {
        f1.push(node);
      } else if (F2_NODE_IDS.has(node.id)) {
        const offsetNode = node.m
          ? {
              ...node,
              m: [
                node.m[0],
                node.m[1],
                node.m[2],
                node.m[3],
                node.m[4],
                node.m[5] - F2_BASE_Y,
              ] as [number, number, number, number, number, number],
            }
          : { ...node, y: (node.y ?? 0) - F2_BASE_Y };
        f2.push(offsetNode);
      } else {
        const offsetNode = node.m
          ? {
              ...node,
              m: [
                node.m[0],
                node.m[1],
                node.m[2],
                node.m[3],
                node.m[4],
                node.m[5] - F3_BASE_Y,
              ] as [number, number, number, number, number, number],
            }
          : { ...node, y: (node.y ?? 0) - F3_BASE_Y };
        f3.push(offsetNode);
      }
    }

    const group42Node = typedScene.children.find((n) => n.id === "347:140");
    if (group42Node) {
      f2.unshift({ ...group42Node, id: "347:140-f2" });
      f3.unshift({ ...group42Node, id: "347:140-f3" });
    }

    return { frame1Nodes: f1, frame2Nodes: f2, frame3Nodes: f3 };
  }, []);

  const scaledWidth = Math.round(typedScene.width * scale * 100) / 100;
  const scaledHeight = Math.round(TOTAL_CANVAS_HEIGHT * scale * 100) / 100;

  return (
    <main
      className="min-h-screen w-full bg-[#EDE8E0] flex flex-col items-center select-text overflow-x-auto relative pt-4 pb-20 md:pt-6 md:pb-28"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(140, 135, 125, 0.16) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(140, 135, 125, 0.16) 1px, transparent 1px)
        `,
        backgroundSize: `${Math.max(35, Math.round(70 * scale))}px ${Math.max(35, Math.round(70 * scale))}px`,
      }}
    >
      {/* Initial Loading Screen */}
      <PortfolioPreloader canvasMounted={mounted} />

      {/* Outer Responsive Height-Matched Viewport Container */}
      <div
        style={{
          width: mounted ? scaledWidth : "100%",
          height: mounted ? scaledHeight : "auto",
          position: "relative",
          zIndex: 1,
          overflow: "visible",
        }}
      >
        {/* Unscaled 1920px Canvas Wrapper */}
        <div
          style={{
            width: 1920,
            height: TOTAL_CANVAS_HEIGHT,
            position: "relative",
            transformOrigin: "0 0",
            transform: `scale(${scale})`,
            display: "flex",
            flexDirection: "column",
            gap: `${FRAME_GAP}px`,
            opacity: mounted ? 1 : 0,
            transition:
              "opacity 150ms ease-out, transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* FRAME 1: Hero, Bio, Edu & Working Experience */}
          <div
            id="figma-frame-1"
            className="figma-artboard-frame"
            style={{
              width: 1920,
              height: FRAME1_HEIGHT,
              backgroundColor: "#EDE8E0",
              borderRadius: "20px",
              boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.18)",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              contain: "layout paint",
            }}
          >
            {frame1Nodes.map((layer) => {
              if (layer.id === "347:995") {
                return <HeroScribbleLine key={layer.id} />;
              }
              if (layer.id === "347:1008" || layer.id === "347:996") {
                return null;
              }
              if (layer.id === "347:1020") {
                const shiftedCursor = {
                  ...layer,
                  x: (layer.x ?? 0) + HERO_SCRIBBLE_OFFSET_X + HERO_CURSOR_OFFSET_X,
                  y: (layer.y ?? 0) + HERO_SCRIBBLE_OFFSET_Y + HERO_CURSOR_OFFSET_Y,
                };
                return (
                  <SceneNodeView
                    key={layer.id}
                    node={shiftedCursor}
                    onOpenLightbox={handleOpenLightbox}
                    hoveredWeaveGroup={hoveredWeaveGroup}
                    onHoverWeaveGroup={setHoveredWeaveGroup}
                    onScrollToSection={scrollToSection}
                    eager
                  />
                );
              }
              return (
                <SceneNodeView
                  key={layer.id}
                  node={layer}
                  onOpenLightbox={handleOpenLightbox}
                  hoveredWeaveGroup={hoveredWeaveGroup}
                  onHoverWeaveGroup={setHoveredWeaveGroup}
                  onScrollToSection={scrollToSection}
                  eager
                />
              );
            })}
          </div>

          {/* FRAME 2: UI/UX Design System & 6 Projects */}
          <div
            id="figma-frame-2"
            className="figma-artboard-frame"
            style={{
              width: 1920,
              height: FRAME2_HEIGHT,
              backgroundColor: "#EDE8E0",
              borderRadius: "20px",
              boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.18)",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              contain: "layout paint",
            }}
          >
            <FigmaBrowserWindowBar
              activeWindow="uiux"
              top={0}
              onScrollToSection={scrollToSection}
            />

            {frame2Nodes.map((layer) => {
              if (layer.id === "347:1167") return <UiuxCoverCable key={layer.id} />;
              if (
                layer.id === "347:1007" ||
                layer.id === "347:1175" ||
                layer.id === "347:1180"
              ) {
                return null;
              }
              if (layer.id === "347:1186") {
                const shiftedCursor = {
                  ...layer,
                  x: (layer.x ?? 10) + UIUX_CABLE_OFFSET_X + UIUX_CURSOR_OFFSET_X,
                  y: (layer.y ?? 50) + UIUX_CABLE_OFFSET_Y + UIUX_CURSOR_OFFSET_Y,
                };
                return (
                  <SceneNodeView
                    key={layer.id}
                    node={shiftedCursor}
                    onOpenLightbox={handleOpenLightbox}
                    hoveredWeaveGroup={hoveredWeaveGroup}
                    onHoverWeaveGroup={setHoveredWeaveGroup}
                    onScrollToSection={scrollToSection}
                  />
                );
              }
              if (layer.id === "347:uiux_mockups_cluster") {
                return (
                  <UiuxMockupCluster
                    key={layer.id}
                    onOpenLightbox={handleOpenLightbox}
                  />
                );
              }
              return (
                <SceneNodeView
                  key={layer.id}
                  node={layer}
                  onOpenLightbox={handleOpenLightbox}
                  hoveredWeaveGroup={hoveredWeaveGroup}
                  onHoverWeaveGroup={setHoveredWeaveGroup}
                  onScrollToSection={scrollToSection}
                />
              );
            })}
          </div>

          {/* FRAME 3: 3D Blender Studio & AR Warship Projects */}
          <div
            id="figma-frame-3"
            className="figma-artboard-frame"
            style={{
              width: 1920,
              height: FRAME3_HEIGHT,
              backgroundColor: "#EDE8E0",
              borderRadius: "20px",
              boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.18)",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              contain: "layout paint",
            }}
          >
            <FigmaBrowserWindowBar
              activeWindow="3d"
              top={0}
              onScrollToSection={scrollToSection}
            />

            {frame3Nodes.map((layer) => {
              if (layer.id === "347:1189") {
                return (
                  <HeroMalinWindow
                    key={layer.id}
                    onOpenLightbox={handleOpenLightbox}
                  />
                );
              }
              if (layer.id === "347:1287") {
                return (
                  <MalinKundangCard
                    key={layer.id}
                    onOpenLightbox={handleOpenLightbox}
                  />
                );
              }
              if (layer.id === "347:1272") {
                return <ThreeDCoverLine key={layer.id} />;
              }
              if (layer.id === "347:1215") {
                return <ThreeDPalmTree key={layer.id} />;
              }
              const videoConfig = VIDEO_WINDOW_CONFIGS[layer.id];
              if (videoConfig) {
                return (
                  <VideoMockupWindow
                    key={layer.id}
                    config={videoConfig}
                    onOpenLightbox={handleOpenLightbox}
                  />
                );
              }
              if (
                layer.id === "347:1896" ||
                layer.id === "347:1619" ||
                layer.id === "347:2846" ||
                layer.id === "347:2548" ||
                layer.id === "347:3649" ||
                layer.id === "347:4303" ||
                layer.id === "347:1125" ||
                layer.id === "347:1216" ||
                layer.id === "347:1218" ||
                layer.id === "347:1273" ||
                layer.id === "347:1280" ||
                layer.id === "347:1379"
              ) {
                return null;
              }
              return (
                <SceneNodeView
                  key={layer.id}
                  node={layer}
                  onOpenLightbox={handleOpenLightbox}
                  hoveredWeaveGroup={hoveredWeaveGroup}
                  onHoverWeaveGroup={setHoveredWeaveGroup}
                  onScrollToSection={scrollToSection}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Unified Right Floating Docks (Contact Dock + Section Nav Dock + Zoom Dock) */}
      <FloatingDocks
        activeSection={activeSection}
        zoomFactor={zoomFactor}
        onScrollToSection={scrollToSection}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onSetZoomFactor={setZoomFactor}
      />

      {/* High-Res Image / Video Lightbox Modal */}
      <LightboxModal lightbox={lightbox} onClose={handleCloseLightbox} />
    </main>
  );
}
