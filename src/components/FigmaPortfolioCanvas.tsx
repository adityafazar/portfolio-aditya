"use client";

import React, { useEffect, useState, useCallback, memo, useRef, useMemo } from "react";
import sceneData from "@/data/figmaScene.json";
import { MockupWindowHeader } from "@/components/ui/MockupWindowHeader";
import { InteractiveTypewriterText } from "@/components/ui/InteractiveTypewriterText";
import {
  UiuxCoverCable,
  UiuxMockupCluster,
  MalinKundangCard,
  HeroMalinWindow,
  HeroScribbleLine,
  ThreeDCoverLine,
  ThreeDPalmTree,
  UIUX_CABLE_OFFSET_X,
  UIUX_CABLE_OFFSET_Y,
  UIUX_CURSOR_OFFSET_X,
  UIUX_CURSOR_OFFSET_Y,
  HERO_SCRIBBLE_OFFSET_X,
  HERO_SCRIBBLE_OFFSET_Y,
  HERO_CURSOR_OFFSET_X,
  HERO_CURSOR_OFFSET_Y,
} from "@/components/sections/manual/ManualSceneSections";
import {
  MOCKUP_WINDOW_HEADER_MAP,
  F2_NODE_IDS,
  DOCK_APP_METADATA,
} from "@/data/portfolioData";
import { TerrainCanvas } from "@/components/ui/TerrainCanvas";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { PortfolioPreloader } from "@/components/ui/PortfolioPreloader";

interface GridLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  c: string;
  sw: number;
}

interface SvgPath {
  d: string;
  r?: "evenodd";
}

interface TextRun {
  text: string;
  fw?: number;
  fs?: number;
  ff?: string;
  lh?: number;
  c?: string;
}

interface ImageFill {
  src: string;
  mode: string;
  op?: number;
  crop?: [number, number, number, number]; // [width%, height%, left%, top%]
}

interface StrokeSpec {
  c: string;
  sw: number;
  sa: "INSIDE" | "CENTER" | "OUTSIDE" | string;
  dash?: number[];
}

interface SceneNode {
  id: string;
  t: "GRID_GROUP" | "SPECIAL_IMG" | "SVG" | "TEXT" | "BOX";
  name?: string;
  x?: number;
  y?: number;
  m?: [number, number, number, number, number, number];
  w: number;
  h: number;
  op?: number;
  // GRID_GROUP
  lines?: GridLine[];
  // SPECIAL_IMG
  src?: string;
  alt?: string;
  href?: string;
  // SVG
  fc?: string;
  fg?: SvgPath[];
  sc?: string;
  sg?: SvgPath[];
  sw?: number;
  clipIn?: boolean;
  // TEXT
  ff?: string;
  fs?: number;
  fw?: number;
  lh?: number;
  ls?: number;
  ta?: string;
  va?: string;
  ar?: string;
  trim?: boolean;
  c?: string;
  dup?: boolean;
  bullets?: string[];
  text?: string;
  runs?: TextRun[];
  // BOX
  clip?: boolean;
  bg?: string;
  imgs?: ImageFill[];
  br?: number | string;
  marchingAnts?: boolean;
  stroke?: StrokeSpec;
  bs?: string;
  df?: string;
  lb?: string;
  cutout?: boolean;
  titleBadge?: boolean;
  titleRot?: number;
  heroSubtitle?: boolean;
  weaveGroup?: string;
  weaveOverlay?: boolean;
  weaveOrigin?: string;
  cp?: string;
  ch?: SceneNode[];
  windowHeader?: boolean;
  title?: string;
  mirrorX?: boolean;
}

interface FigmaScene {
  width: number;
  height: number;
  background: string;
  children: SceneNode[];
}

const typedScene = sceneData as unknown as FigmaScene;

interface SectionItem {
  id: string;
  label: string;
  badge: string;
  desc: string;
  y: number;
  activeColor: string;
  icon: React.ReactNode;
}

const SECTIONS: SectionItem[] = [
  {
    id: "hero",
    label: "Hero",
    badge: "Cover",
    desc: "Header & 3D Identity",
    y: 0,
    activeColor: "#4565D6", // Blue (Portfolio)
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "bio",
    label: "About",
    badge: "Profil",
    desc: "Bio, Visi & Keahlian",
    y: 1080,
    activeColor: "#4A9460", // Green (Aditya Fazar Sanjaya)
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "edu",
    label: "Edu & Stack",
    badge: "Tools",
    desc: "Pendidikan & Tools Stack",
    y: 2150,
    activeColor: "#4A9460", // Green (Education)
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.42 10.922-8.5-4.5a2 2 0 0 0-1.84 0l-8.5 4.5a1 1 0 0 0 0 1.76l8.5 4.5a2 2 0 0 0 1.84 0l8.5-4.5a1 1 0 0 0 0-1.76Z" />
        <path d="M6 13v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
      </svg>
    ),
  },
  {
    id: "exp",
    label: "Experience",
    badge: "Karir",
    desc: "ESDM, Urbansolv & ITB",
    y: 3180,
    activeColor: "#DB5F2D", // Orange (Working Experience)
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "uiux",
    label: "UI/UX",
    badge: "6 Projek",
    desc: "Design System & App Mockups",
    y: 4472,
    activeColor: "#4A9460", // Green (UI/UX Design)
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    id: "3d",
    label: "3D & AR",
    badge: "8 Scene",
    desc: "Blender 3D & Interactive AR",
    y: 12444,
    activeColor: "#D93B4B", // Red (3D Design)
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
        <path d="m3 8 9 5 9-5" />
        <path d="M12 13v8" />
      </svg>
    ),
  },
];

interface ContactItem {
  id: string;
  label: string;
  desc: string;
  href: string;
  activeColor: string;
  icon: React.ReactNode;
  isExternal?: boolean;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    id: "email",
    label: "Email",
    desc: "aditya.fazarsanjaya@gmail.com",
    href: "mailto:aditya.fazarsanjaya@gmail.com",
    activeColor: "#EA4335",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: "ig-personal",
    label: "@adityaafazar",
    desc: "Instagram Personal (@adityaafazar)",
    href: "https://www.instagram.com/adityaafazar/?hl=en",
    activeColor: "#E1306C",
    isExternal: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "ig-design",
    label: "@fazar_desain",
    desc: "Instagram 3D & Design (@fazar_desain)",
    href: "https://www.instagram.com/fazar_desain/?hl=en",
    activeColor: "#C13584",
    isExternal: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    desc: "LinkedIn - Aditya Fazar Sanjaya",
    href: "https://www.linkedin.com/in/aditya-fazar-sanjaya-92a6a6383",
    activeColor: "#0A66C2",
    isExternal: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    desc: "WhatsApp (088218466192)",
    href: "https://wa.me/6288218466192",
    activeColor: "#25D366",
    isExternal: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

function getPositionStyle(node: SceneNode): React.CSSProperties {
  if (node.m) {
    const [a, b, c, d, tx, ty] = node.m;
    return {
      position: "absolute",
      left: 0,
      top: 0,
      width: node.w,
      height: node.h,
      transformOrigin: "0 0",
      transform: `matrix(${a},${b},${c},${d},${tx},${ty})`,
      opacity: node.op,
    };
  }
  return {
    position: "absolute",
    left: node.x ?? 0,
    top: node.y ?? 0,
    width: node.w,
    height: node.h,
    opacity: node.op,
  };
}

function getFontFamily(ff?: string): string {
  if (ff === "Bagel Fat One") return "'Bagel Fat One', cursive, sans-serif";
  if (ff === "Inter") return "'Inter', sans-serif";
  return "'Poppins', sans-serif";
}

function renderStrokeOverlay(
  stroke: StrokeSpec,
  w: number,
  h: number,
  br?: number | string,
  isMarchingAnts?: boolean
) {
  const { c, sw, sa, dash } = stroke;
  const numBr = typeof br === "number" ? br : 0;

  // Use crisp SVG rect for dashed borders so Figma's exact [28, 28] / [23, 23] dash lengths match 1:1
  if (dash && dash.length > 0) {
    let rx = 0;
    let x = 0;
    let y = 0;
    let rw = w;
    let rh = h;
    if (sa === "INSIDE") {
      x = sw / 2;
      y = sw / 2;
      rw = Math.max(0, w - sw);
      rh = Math.max(0, h - sw);
      rx = Math.max(0, numBr - sw / 2);
    } else if (sa === "OUTSIDE") {
      x = -sw / 2;
      y = -sw / 2;
      rw = w + sw;
      rh = h + sw;
      rx = numBr + sw / 2;
    } else {
      // CENTER
      rx = numBr;
    }

    // Animate all blue dashed strokes with continuous marching ants loop like in Hero
    const isBlueStroke = Boolean(
      c.includes("12,140,233") ||
      c.includes("12, 140, 233") ||
      c.includes("0C8CE9") ||
      c.includes("#0C8CE9")
    );
    const shouldAnimate = isMarchingAnts || isBlueStroke;

    return (
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          overflow: "visible",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <rect
          x={x}
          y={y}
          width={rw}
          height={rh}
          rx={rx}
          ry={rx}
          fill="none"
          stroke={c}
          strokeWidth={sw}
          strokeDasharray={dash.join(",")}
          className={shouldAnimate ? "figma-marching-ants" : undefined}
        />
      </svg>
    );
  }

  // Solid border overlay (keeps container origin at exact (0,0) without shifting child coordinates)
  let inset = 0;
  let radius: number | string | undefined = br;
  if (sa === "CENTER") {
    inset = -sw / 2;
    if (typeof br === "number") radius = br + sw / 2;
  } else if (sa === "OUTSIDE") {
    inset = -sw;
    if (typeof br === "number") radius = br + sw;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: inset,
        right: inset,
        bottom: inset,
        left: inset,
        border: `${sw}px solid ${c}`,
        borderRadius: radius,
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    />
  );
}

const HeroShortDescriptionTypewriter = memo(function HeroShortDescriptionTypewriter({
  node,
  innerStyle,
}: {
  node: SceneNode;
  innerStyle: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const runs: TextRun[] = useMemo(() => {
    if (node.runs && node.runs.length > 0) return node.runs;
    return [{ text: node.text || "" }];
  }, [node.runs, node.text]);

  const totalChars = useMemo(() => {
    return runs.reduce((acc, r) => acc + (r.text ? r.text.length : 0), 0);
  }, [runs]);

  // Trigger typing when scrolled into viewport, and reset/hide when scrolled away
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Entering profile section: start typing after a short 100ms buffer
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setTypedChars(0);
            setIsDone(false);
            setHasStarted(true);
          }, 100);
        } else {
          // Leaving profile section: immediately reset and hide
          if (timeoutId) clearTimeout(timeoutId);
          setHasStarted(false);
          setIsDone(false);
          setTypedChars(0);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Rapid snappy typing timer (2 chars per 8ms tick)
  useEffect(() => {
    if (!hasStarted || isDone) return;

    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(totalChars, current + 2);
      setTypedChars(current);
      if (current >= totalChars) {
        clearInterval(timer);
        setIsDone(true);
      }
    }, 8);

    return () => clearInterval(timer);
  }, [hasStarted, isDone, totalChars]);

  const handleReplay = useCallback(() => {
    setTypedChars(0);
    setIsDone(false);
    setHasStarted(false);
    const id = setTimeout(() => setHasStarted(true), 60);
    return () => clearTimeout(id);
  }, []);

  let remaining = hasStarted ? typedChars : 0;

  return (
    <div
      ref={containerRef}
      className={node.trim ? "cap-trim select-text cursor-pointer" : "select-text cursor-pointer"}
      style={{
        ...innerStyle,
        textAlign: "justify",
        textJustify: "inter-word",
        textAlignLast: "left",
        lineHeight: "49px",
        position: "relative",
      }}
      onClick={handleReplay}
    >
      {runs.map((run, idx) => {
        const full = run.text || "";
        const len = full.length;
        if (remaining <= 0) return null;

        const take = Math.min(remaining, len);
        remaining -= take;
        const visibleSlice = full.slice(0, take);

        return (
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
            {visibleSlice}
          </span>
        );
      })}

      {/* Blinking blue caret indicating active typing */}
      {hasStarted && !isDone && (
        <span
          className="inline-block w-[4px] h-[0.85em] ml-[3px] bg-[#0C8CE9] animate-pulse"
          style={{ verticalAlign: "baseline", transform: "translateY(3px)" }}
        />
      )}
    </div>
  );
});

interface FigmaBrowserWindowBarProps {
  activeWindow: "hero" | "uiux" | "3d";
  top?: number;
  onScrollToSection?: (targetY: number) => void;
}

const FigmaBrowserWindowBar = memo(function FigmaBrowserWindowBar({
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

      {/* 347:820 - Plus '+' Button (Proportional 1:1 plus icon, no right divider after it) */}
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
          <line
            x1="6"
            y1="1"
            x2="6"
            y2="11"
            stroke="rgb(0,0,0)"
            strokeWidth="1.2"
          />
          <line
            x1="1"
            y1="6"
            x2="11"
            y2="6"
            stroke="rgb(0,0,0)"
            strokeWidth="1.2"
          />
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
          <path
            d="M0 0L0 0.5L16 0.5L16 0L16 -0.5L0 -0.5L0 0Z"
            fill="rgb(0,0,0)"
          />
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

// All 14 Overview explanation description text nodes in figmaScene.json
const OVERVIEW_DESC_NODE_IDS = new Set([
  "347:1032",
  "347:1057",
  "347:1088",
  "347:1374",
  "347:1523",
  "347:1611",
  "347:1653",
  "347:1707",
  "347:1785",
  "347:1888",
  "347:2538",
  "347:2781",
  "347:3632",
  "347:3644",
]);

const SceneNodeView = memo(function SceneNodeView({
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
  // User requested deletion of cursor & caret at Hero Short Description (347:1115, 347:1116, 347:1117, 347:1118)
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

  // Window Mockup Header: Standardized Reusable OS Window Frame (32px fixed height, 100% width, uniform typography)
  if (node.windowHeader || MOCKUP_WINDOW_HEADER_MAP[node.id]) {
    const title =
      node.title ||
      MOCKUP_WINDOW_HEADER_MAP[node.id] ||
      "Blender 3D Project";
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
        <HeroLeftToolbar
          node={node}
          onScrollToSection={onScrollToSection}
        />
      );
    }

    return (
      <div style={{ ...posStyle, pointerEvents: "none" }} aria-hidden="true">
        {imgEl}
      </div>
    );
  }

  // 3. Crisp Inline Vector / Bezier Cable / Cursor / Icon (exact Figma fillGeometry & strokeGeometry)
  if (node.t === "SVG") {
    // Hide horizontal cap ticks on vertical guideline (347:1025, 347:1026)
    if (node.id === "347:1025" || node.id === "347:1026") {
      return null;
    }

    // Working Experience: Option 1 - Animated Marching Ants on 2022 x 2026 vertical guideline (347:1022)
    // Preserves exact Figma 5px stroke thickness with seamless marching ants animation
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

    // Working Experience: Option 2 - Radar Pulse Ping on Yellow Node (Agu 2026 - Sekarang)
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
          {/* Concentric expanding radar rings */}
          <span className="figma-radar-ping-ring figma-radar-ring-1" />
          <span className="figma-radar-ping-ring figma-radar-ring-2" />
          {/* Main yellow circle node */}
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

    // Interactive Mouse Cursors Floating & Click Animation across the entire website:
    // 347:949  - Black cursor at Working Experience
    // 347:1020 - White cursor at Hero Top Banner
    // 347:1186 - White cursor at UI/UX Intro
    // 347:1387 - White cursor at 3D Showcase
    const isInteractiveCursor =
      node.id === "347:949" ||
      node.id === "347:1020" ||
      node.id === "347:1186" ||
      node.id === "347:1387";

    if (isInteractiveCursor) {
      // Natural organic delay offset so they don't all click in perfect unison
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
            {/* Click ripple wave at arrow tip */}
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
                <path key={`s${i}`} d={g.d} fill={node.sc} fillRule={g.r || "evenodd"} />
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
      // Point 1: UI/UX black cable sits BEHIND mockups (30) but IN FRONT OF green badges (10)
      svgZIndex = 20;
    } else if (node.id === "347:1272") {
      // Point 4: 3D cover curve vector sits ON TOP of blue badge (20)
      svgZIndex = 25;
    } else if (node.id === "347:995") {
      // Point 1: Hero cable weaves on top of base title badge (20) and under clipped overlay (30)
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
      <HeroShortDescriptionTypewriter node={node} innerStyle={innerStyle} />
    ) : isOverviewDesc ? (
      <InteractiveTypewriterText
        text={fullText}
        runs={node.runs}
        innerStyle={innerStyle}
      />
    ) : (
      <div
        className={node.trim ? "cap-trim" : undefined}
        style={innerStyle}
      >
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
  // Working Experience: Alternating Looping Focus on Career Cards (347:908)
  if (node.id === "347:908") {
    return (
      <WorkingExperienceCardsRow
        node={node}
        onOpenLightbox={onOpenLightbox}
        hoveredWeaveGroup={hoveredWeaveGroup}
        onHoverWeaveGroup={onHoverWeaveGroup}
        onScrollToSection={onScrollToSection}
      />
    );
  }

  // UI/UX Intro: 4 Mockups Rotating Cluster ("berbarengan seperti di grup looping rotate kanan kiri secara elegan")
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
        onOpenLightbox={onOpenLightbox}
        hoveredWeaveGroup={hoveredWeaveGroup}
        onHoverWeaveGroup={onHoverWeaveGroup}
        onScrollToSection={onScrollToSection}
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
          im.src &&
          im.src.includes("2cdc3943f8d30bbfc8d69cbb3469dc6991da2f75")
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
    // Point 1: Hero clipped overlay of "Portfolio" badge (left side in front of cable)
    zIndexVal = 30;
  } else if (node.id === "347:834") {
    // Point 1: Hero base "Portfolio" badge (cable weaves in front of its right side)
    zIndexVal = 20;
  } else if (node.id === "347:999") {
    // Hero "Oktober x 2026" pill sits in front of the scribble line (25)
    zIndexVal = 30;
  } else if (node.id === "347:uiux_mockups_cluster") {
    // Cover UI/UX: Mockup screens sit in front of cable (20)
    zIndexVal = 30;
  } else if (
    node.id === "347:1165" ||
    node.id === "347:1121" ||
    node.id === "347:1171" ||
    node.id === "347:1169"
  ) {
    // Cover UI/UX: Badges sit behind cable (20)
    zIndexVal = 10;
  } else if (node.id === "347:2572") {
    // Lancer Evo IX top-left back window (image)
    zIndexVal = 2;
  } else if (node.id === "347:2594") {
    // Lancer Evo IX middle-left front window
    zIndexVal = 4;
  } else if (node.id === "347:2704") {
    // Lancer Evo IX bottom-left window sits in front of middle-left window
    zIndexVal = 6;
  } else if (node.id === "347:1187") {
    // 3D Design red title badge sits in the very front (above ThreeDCoverLine at 50)
    zIndexVal = 60;
  } else if (node.id === "347:1270") {
    // Point 4: 3D cover blue badge "Animation, Digital Twin, & AR" (under cable 347:1272 at 25)
    zIndexVal = 20;
  } else if (node.id === "347:1337" || node.id === "347:1338" || node.id === "347:1287") {
    // Point 5 & 6: Malin Kundang palm trees & group (behind ITB render window and card)
    zIndexVal = 12;
  } else if (node.id === "347:1215") {
    // 3D palm tree: above Malin Kundang (5) and behind ITB (12)
    zIndexVal = 12;
  } else if (
    node.id === "347:1434" ||
    node.id === "347:1435" ||
    node.id === "347:1462" ||
    node.id === "347:1487"
  ) {
    // Point 6: ITB x NTU Singapore Digital Twin card and windows (in front of palm trees)
    zIndexVal = 12;
  } else if (node.id === "347:2772") {
    // Point 8: Stormtrooper cutout (behind overview box 347:2773)
    zIndexVal = 10;
  } else if (
    node.id === "347:2773" ||
    node.id === "347:2531" ||
    node.id === "347:3620" ||
    node.id === "347:1515" ||
    node.id === "347:1367"
  ) {
    // Point 8: TOOL USED & OVERVIEW boxes (above cutouts and mockups)
    zIndexVal = 25;
  } else if (node.titleBadge) {
    zIndexVal = 30;
  } else if (isCutout || isSubmarine || isShowcaseCutout) {
    zIndexVal = 20;
  } else if (node.id === "347:1246") {
    // Hero 3D Mockup 3 (Submarine Warship - foreground)
    zIndexVal = 14;
  } else if (node.id === "347:1219") {
    // Hero 3D Mockup 2 (Digital Twin Tanks - middle)
    zIndexVal = 12;
  } else if (node.id === "347:1189") {
    // Hero 3D Mockup 1 (Malin Kundang - background)
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
                  className={node.lb ? "figma-img-target" : isCutout ? "figma-cutout-img" : undefined}
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
                className={node.lb ? "figma-img-target" : isCutout ? "figma-cutout-img" : undefined}
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

      {/* Stroke overlay drawn on top of fills & clipped content just like Figma */}
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
        className={`figma-lightbox-trigger group ${isSubmarine ? "figma-submarine-trigger" : ""
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
        ? `figma-title-badge figma-title-badge-rot-pos ${isWovenActive ? "figma-title-badge-active-pos" : ""
        }`
        : `figma-title-badge figma-title-badge-rot-neg ${isWovenActive ? "figma-title-badge-active-neg" : ""
        }`;

    // UI/UX cover badges must sit BEHIND the hand-written cable (z-10) and tablet (z-30)
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

// 4. Working Experience: Interactive Alternating Looping Focus on Career Cards (347:908)
// Exactly like Tools I Use (MacDockRow): sequential auto-rolling spotlight, pauses on hover, smooth elevation & accent glow
function WorkingExperienceCardsRow({
  node,
  onOpenLightbox,
  hoveredWeaveGroup,
  onHoverWeaveGroup,
  onScrollToSection,
}: {
  node: SceneNode;
  onOpenLightbox: (src: string, title?: string) => void;
  hoveredWeaveGroup?: string | null;
  onHoverWeaveGroup?: (group: string | null) => void;
  onScrollToSection?: (targetY: number) => void;
}) {
  const cards = node.ch || [];
  const cardCount = cards.length;

  const [autoIdx, setAutoIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [activeBounceIdx, setActiveBounceIdx] = useState<number | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through the 3 cards sequentially (every 3000ms)
  useEffect(() => {
    if (isUserHovering || cardCount === 0) return;

    const interval = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % cardCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [isUserHovering, cardCount]);

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
    // Resume auto-roll after 2.4 seconds of inactivity, identical to Tools I Use
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

  // Accent ambient glows corresponding to each company's branding:
  // idx 0: Kementerian ESDM (Yellow)
  // idx 1: Urbansolv (Blue)
  // idx 2: SCCIC ITB (Red)
  const ACCENT_GLOWS = [
    "rgba(245, 197, 24, 0.45)",
    "rgba(12, 140, 233, 0.45)",
    "rgba(224, 60, 68, 0.45)",
  ];

  return (
    <div
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

        let translateY = 0;
        let scale = 1.0;
        let zIndex = 10;
        let opacity = isUserHovering ? (isActive ? 1.0 : 0.82) : (isActive ? 1.0 : 0.92);

        if (isActive) {
          // Perfectly balanced elevation: gentle -4px lift with scale 1.0 so clearance is ~17px on top and ~18px at the bottom
          translateY = -4;
          scale = 1.0;
          zIndex = 35;
        }

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
            <SceneNodeView
              node={{
                ...card,
                x: 0,
                y: 0,
              }}
              onOpenLightbox={onOpenLightbox}
              hoveredWeaveGroup={hoveredWeaveGroup}
              onHoverWeaveGroup={onHoverWeaveGroup}
              onScrollToSection={onScrollToSection}
            />
          </div>
        );
      })}
    </div>
  );
}

function MacDockRow({
  node,
  onOpenLightbox,
  hoveredWeaveGroup,
  onHoverWeaveGroup,
  onScrollToSection,
}: {
  node: SceneNode;
  onOpenLightbox: (src: string, title?: string) => void;
  hoveredWeaveGroup?: string | null;
  onHoverWeaveGroup?: (group: string | null) => void;
  onScrollToSection?: (targetY: number) => void;
}) {
  const children = node.ch || [];
  const itemCount = children.length;
  const is3D = node.id === "347:986";

  // Uniform icon scaling and horizontal spacing across both Design & Multimedia (7 items) and 3D Design (5 items)
  const scaleFactor = is3D ? 0.68 : 0.72;

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [autoIdx, setAutoIdx] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [activeBounceIdx, setActiveBounceIdx] = useState<number | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute scaled widths, heights, and distributed X positions with uniform spacing
  const scaledItems = useMemo(() => {
    const items = children.map((child) => ({
      ...child,
      w: child.w * scaleFactor,
      h: child.h * scaleFactor,
      br: typeof child.br === "number" ? child.br * scaleFactor : child.br,
    }));

    const totalW = items.reduce((sum, item) => sum + item.w, 0);
    // Keep horizontal gap consistent (~44px) and center the row within node.w
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

  // Auto-rolling cycle ("bergulir dan keluar namanya bergantian")
  useEffect(() => {
    if (isUserHovering || itemCount === 0) return;

    // Stagger 3D row slightly (1900ms vs 1700ms) so both cards don't change in unison
    const intervalTime = is3D ? 1900 : 1700;
    const interval = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % itemCount);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isUserHovering, itemCount, is3D]);

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
    // Resume auto-roll after 2.4 seconds of inactivity
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
  // Shift dock row 24px so it sits optically centered between the top badge and bottom subtitle with generous clearance
  const rowTop = (node.y ?? 0) + 24;

  return (
    <div
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

        // Controlled magnification curve so icons stay clean, spacious, and uncrowded
        let scale = 1.0;
        let translateY = 0;
        let zIndex = 1;

        if (isUserHovering) {
          if (dist === 0) {
            scale = 1.24;
            translateY = -6;
            zIndex = 40;
          } else if (dist === 1) {
            scale = 1.10;
            translateY = -2;
            zIndex = 20;
          }
        } else {
          // Auto-roll mode
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
            {/* Themed Tooltip Pill directly above active item - unscaled, crisp, never touches header */}
            <div
              className={`macos-dock-tooltip ${is3D ? "macos-dock-tooltip-3d" : "macos-dock-tooltip-design"}`}
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
              <SceneNodeView
                node={{ ...item, x: 0, y: 0 }}
                onOpenLightbox={onOpenLightbox}
                hoveredWeaveGroup={hoveredWeaveGroup}
                onHoverWeaveGroup={onHoverWeaveGroup}
                onScrollToSection={onScrollToSection}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface ToolbarItem {
  id: string;
  name: string;
  targetY?: number;
  icon: string;
  isFirstItem?: boolean;
}

interface ToolbarCapsule {
  id: string;
  top: number;
  height: number;
  items: ToolbarItem[];
}

// 1 single consistent icon size for all tools
const TOOLBAR_ICON_SIZE = 46;

const HERO_TOOLBAR_CAPSULES: ToolbarCapsule[] = [
  {
    id: "capsule-1",
    top: 17,
    height: 146,
    items: [
      {
        id: "tool-box-select",
        name: "Select Box",
        targetY: 0,
        icon: "/figma/toolbar_select_transparent.webp",
        isFirstItem: true,
      },
      {
        id: "tool-3d-cursor",
        name: "3D Cursor",
        targetY: 0,
        icon: "/figma/toolbar_cursor_transparent.webp",
      },
    ],
  },
  {
    id: "capsule-2",
    top: 175,
    height: 294,
    items: [
      {
        id: "tool-blender",
        name: "Blender 3D",
        targetY: 12444,
        icon: "/figma/61afd6ebcb0a931aa9d284f902ad7a684b8e2250.webp",
      },
      {
        id: "tool-figma",
        name: "Figma",
        targetY: 4472,
        icon: "/figma/toolbar_figma.webp",
      },
      {
        id: "tool-photoshop",
        name: "Photoshop",
        targetY: 2150,
        icon: "/figma/e0b4adcf1b9dc7df1fac5e92640c9c279acc862a.webp",
      },
      {
        id: "tool-illustrator",
        name: "Illustrator",
        targetY: 2150,
        icon: "/figma/e7b627f94b362250ae8b526328fdecd9747583ae.webp",
      },
    ],
  },
  {
    id: "capsule-3",
    top: 481,
    height: 146,
    items: [
      {
        id: "tool-premiere",
        name: "Premiere Pro",
        targetY: 3180,
        icon: "/figma/1025e605f0e601c1b76e41ce891f9738b9f30f7d.webp",
      },
      {
        id: "tool-capcut",
        name: "CapCut",
        targetY: 3180,
        icon: "/figma/842356f45e1d207de2e4fe2d1e58c7e5dc9dde48.webp",
      },
    ],
  },
  {
    id: "capsule-4",
    top: 640,
    height: 73,
    items: [
      {
        id: "tool-canva",
        name: "Canva",
        targetY: 2150,
        icon: "/figma/3164279e85f96dc89808c6a93a64d5ca615b09de.webp",
      },
    ],
  },
];

function HeroLeftToolbar({
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
                  {/* Left 82px Icon Slot - Perfectly centered and unified 1 consistent size (46px x 46px) */}
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
}

interface VideoWindowConfig {
  videoSrc: string;
  title: string;
  lightboxTitle: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
}

const VIDEO_WINDOW_CONFIGS: Record<string, VideoWindowConfig> = {
  "347:2594": {
    videoSrc: "/figma/render 2.mp4",
    title: "Lancer Evo IX 3D Model",
    lightboxTitle: "Lancer Evo IX 3D Model",
    left: 221.75,
    top: 8059,
    width: 648.34,
    height: 410.5,
    zIndex: 4,
  },
  "347:2660": {
    videoSrc: "/render.mp4",
    title: "Lancer Evo IX 3D Model",
    lightboxTitle: "Lancer Evo IX 3D Model & Animation",
    left: 1014,
    top: 7954.46,
    width: 850.27,
    height: 538.36,
    zIndex: 10,
  },
  "347:1616": {
    videoSrc: "/figma/0001-0434.mp4",
    title: "3D Animation Short Film",
    lightboxTitle: "3D Animation Short Film",
    left: 55,
    top: 4487.75,
    width: 1134,
    height: 718,
    zIndex: 5,
  },
  "347:2550": {
    videoSrc:
      "/AQMWOdwGKuEVaV9CEDgR-3C6WQKKlcSUO7Buyu6fZHuJhh_7TUe8YicZ7KaZzOiXsB-1a8MQe1dVlYhoOn0gOQl2Z-vMPKSJk_-hkgw.mp4",
    title: "3D Animation Unreal",
    lightboxTitle: "3D Animation Unreal",
    left: 55,
    top: 6671,
    width: 1134,
    height: 718,
    zIndex: 5,
  },
  "347:2682": {
    videoSrc: "/figma/all render.mp4",
    title: "3D Car & Environment Animation",
    lightboxTitle: "3D Car & Environment Animation",
    left: 1014,
    top: 9059.46,
    width: 850.27,
    height: 538.36,
    zIndex: 10,
  },
};

const VideoMockupWindow = memo(function VideoMockupWindow({
  config,
  onOpenLightbox,
}: {
  config: VideoWindowConfig;
  onOpenLightbox: (src: string, title?: string) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Perbesar video ${config.title}`}
      onClick={() => onOpenLightbox(config.videoSrc, config.lightboxTitle)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          onOpenLightbox(config.videoSrc, config.lightboxTitle);
      }}
      className="figma-lightbox-trigger absolute cursor-zoom-in overflow-hidden rounded-[25px] select-none"
      style={{
        left: config.left,
        top: config.top,
        width: config.width,
        height: config.height,
        zIndex: config.zIndex,
        backgroundColor: "#171614",
      }}
    >
      <LazyVideo
        src={config.videoSrc}
        borderRadius={25}
        label={`Memuat ${config.title}...`}
      />
      <MockupWindowHeader
        title={config.title}
        width="100%"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 20,
        }}
      />
    </div>
  );
});

export default function FigmaPortfolioCanvas() {
  const [zoomFactor, setZoomFactor] = useState<number>(0.8);
  const [scale, setScale] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [viewportWidth, setViewportWidth] = useState<number>(1920);
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);
  const [isContactHovered, setIsContactHovered] = useState<boolean>(false);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const [idleContactIndex, setIdleContactIndex] = useState<number>(0);

  useEffect(() => {
    if (isContactHovered) return;
    const interval = setInterval(() => {
      setIdleContactIndex((prev) => (prev + 1) % CONTACT_ITEMS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isContactHovered]);
  const [lightbox, setLightbox] = useState<{
    src: string;
    title?: string;
  } | null>(null);
  const [hoveredWeaveGroup, setHoveredWeaveGroup] = useState<string | null>(null);

  const updateScale = useCallback(() => {
    const vw = document.documentElement.clientWidth || window.innerWidth;
    setViewportWidth(vw);
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

  const handleZoomIn = () => {
    setZoomFactor((curr) => Math.min(1.4, Math.round((curr + 0.1) * 10) / 10));
  };

  const handleZoomOut = () => {
    setZoomFactor((curr) => Math.max(0.4, Math.round((curr - 0.1) * 10) / 10));
  };

  useEffect(() => {
    const onScroll = () => {
      const figmaY = (window.scrollY + window.innerHeight * 0.28) / (scale || 1);
      let current: string = SECTIONS[0].id;
      for (const sec of SECTIONS) {
        if (figmaY >= sec.y) current = sec.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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

  const scrollToSection = (figmaY: number) => {
    window.scrollTo({
      top: Math.round(figmaY * scale),
      behavior: "smooth",
    });
  };

  const FRAME_GAP = 56;
  const FRAME1_HEIGHT = 4400; // Balanced bottom breathing room below Working Experience cards
  const FRAME2_HEIGHT = 7872; // Standardized 56px bottom breathing room below Coffee Shop Website (7816)
  const FRAME3_HEIGHT = 10180; // Standardized +262px bottom breathing room below Japanese Garage (9918)
  const TOTAL_CANVAS_HEIGHT =
    FRAME1_HEIGHT + FRAME_GAP + FRAME2_HEIGHT + FRAME_GAP + FRAME3_HEIGHT;
  const F2_BASE_Y = 4280;
  const F3_BASE_Y = 11786;

  const { frame1Nodes, frame2Nodes, frame3Nodes } = useMemo(() => {
    const f1: SceneNode[] = [];
    const f2: SceneNode[] = [];
    const f3: SceneNode[] = [];

    const getNodeY = (n: SceneNode): number => {
      if (n.m) return n.m[5];
      return n.y ?? 0;
    };

    for (const node of typedScene.children) {
      // Keep node 347:140 (Group 42.svg: 3D Viewport Floor Grid + 2D grid for Frame 1)
      if (node.t === "GRID_GROUP") {
        if (node.id === "347:140") {
          f1.push(node);
        }
        continue;
      }
      const y = getNodeY(node);

      // Frame 1: Hero, Bio, Edu, Working Experience
      if (y < 4280 && node.id !== "347:1007") {
        f1.push(node);
      } else if (F2_NODE_IDS.has(node.id)) {
        // Frame 2: UI/UX Design System & 6 Projects (mockups down to Coffee Shop)
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
        // Frame 3: 3D Blender Studio & AR Warship Projects
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

    // Clone node 347:140 (Group 42.svg) for Frame 2 and Frame 3 so all 3 frames have the exact Group 42.svg 3D Floor Grid + 2D Grid!
    const group42Node = typedScene.children.find((n) => n.id === "347:140");
    if (group42Node) {
      f2.unshift({
        ...group42Node,
        id: "347:140-f2",
      });
      f3.unshift({
        ...group42Node,
        id: "347:140-f3",
      });
    }

    return { frame1Nodes: f1, frame2Nodes: f2, frame3Nodes: f3 };
  }, []);

  const renderFrameGrid = (_frameHeight: number, _isHeroFrame = false) => {
    // All 3 frames now render Group 42.svg (node 347:140) natively from their node lists!
    return null;
  };

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

      {/* Interactive Terrain Background */}
      <TerrainCanvas />

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
        {/* Unscaled 1920px Canvas Wrapper (scaled via transform) */}
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
          {/* ======================================================== */}
          {/* FRAME 1: Hero, Bio, Edu & Working Experience            */}
          {/* ======================================================== */}
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
            {/* Authentic Figma Grid (Frame 1 uses Group 42.svg node 347:140) */}
            {renderFrameGrid(FRAME1_HEIGHT, true)}

            {/* Frame 1 Layers (Hero scribble line replaces 347:995 per Gambar 1 & Gambar 2) */}
            {frame1Nodes.map((layer) => {
              if (layer.id === "347:995") {
                return <HeroScribbleLine key={layer.id} />;
              }
              if (layer.id === "347:1008") {
                // Hide old guideline line as shown in Gambar 2
                return null;
              }
              if (layer.id === "347:996") {
                // Hide duplicate clipping overlay of "Portfolio" badge that causes double-border overlap
                return null;
              }
              if (layer.id === "347:1020") {
                // Shift interactive hero cursor synchronously with Hero scribble & dedicated cursor offset
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

          {/* ======================================================== */}
          {/* FRAME 2: UI/UX Design System & 6 Projects (Port adit)    */}
          {/* ======================================================== */}
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
            {/* Authentic Figma Grid */}
            {renderFrameGrid(FRAME2_HEIGHT)}

            {/* Frame 2 Browser Window Header at top of card */}
            <FigmaBrowserWindowBar
              activeWindow="uiux"
              top={0}
              onScrollToSection={scrollToSection}
            />

            {/* Frame 2 Layers (UI/UX cover cable & mockups are hand-written React components) */}
            {frame2Nodes.map((layer) => {
              if (layer.id === "347:1167") return <UiuxCoverCable key={layer.id} />;
              if (
                layer.id === "347:1007" ||
                layer.id === "347:1175" ||
                layer.id === "347:1180"
              ) {
                // Hide old top-right cable segment and pen guideline gizmos (already in UiuxCoverCable)
                return null;
              }
              if (layer.id === "347:1186") {
                // Shift interactive cursor synchronously with UI/UX cable fine-tuning & dedicated cursor offset
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
              if (layer.id === "347:uiux_mockups_cluster")
                return <UiuxMockupCluster key={layer.id} onOpenLightbox={handleOpenLightbox} />;
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

          {/* ======================================================== */}
          {/* FRAME 3: 3D Blender Studio & AR Warship Projects         */}
          {/* ======================================================== */}
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
            {/* Authentic Figma Grid */}
            {renderFrameGrid(FRAME3_HEIGHT)}

            {/* Frame 3 Browser Window Header at top of card */}
            <FigmaBrowserWindowBar
              activeWindow="3d"
              top={0}
              onScrollToSection={scrollToSection}
            />

            {/* Frame 3 Layers (Hero Malin window & Malin Kundang card are hand-written React components) */}
            {frame3Nodes.map((layer) => {
              if (layer.id === "347:1189")
                return <HeroMalinWindow key={layer.id} onOpenLightbox={handleOpenLightbox} />;
              if (layer.id === "347:1287")
                return <MalinKundangCard key={layer.id} onOpenLightbox={handleOpenLightbox} />;
              if (layer.id === "347:1272") {
                // Replace old cable segment with full vector live-3d-design.svg
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
                layer.id === "347:4303"
              ) {
                // Remove QR codes & "Watch Video" buttons since videos are embedded directly in the mockup windows
                return null;
              }
              if (
                layer.id === "347:1125" ||
                layer.id === "347:1216" ||
                layer.id === "347:1218" ||
                layer.id === "347:1273" ||
                layer.id === "347:1280" ||
                layer.id === "347:1379"
              ) {
                // Hide old separate cable segments and guideline gizmos (already included in ThreeDCoverLine)
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

      {/* Unified Right Floating Docks (Contact Dock + Section Nav Dock), Centered Vertically */}
      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3.5 pointer-events-none">
        {/* Sleek Vertical Contact Dock (Same Hover Expansion Animation as Section Nav Dock) */}
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
                  {item.icon}
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

        {/* Sleek Vertical Section Navigation Dock on the Right */}
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
                onClick={() => scrollToSection(sec.y)}
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
                <span className="flex-shrink-0 flex items-center justify-center">{sec.icon}</span>
                {isNavHovered && (
                  <span className="truncate text-xs tracking-tight transition-opacity duration-200">
                    {sec.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sleek Vertical Zoom Dock (Unified in same column, never overlaps) */}
        <div
          role="toolbar"
          aria-label="Kontrol Zoom Kanvas"
          className="pointer-events-auto flex w-[56px] flex-col items-center gap-1 rounded-2xl border-2 border-black bg-[#F8F6F2]/95 p-1.5 shadow-[4px_4px_0px_#000] backdrop-blur-md"
        >
          <button
            type="button"
            onClick={handleZoomIn}
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
            onClick={handleZoomOut}
            title="Zoom Out (–)"
            aria-label="Zoom Out"
            className="flex h-8 w-9 items-center justify-center rounded-xl border-2 border-transparent text-sm font-black text-[#1A1A1A] transition-all hover:border-black hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_#000]"
          >
            –
          </button>

          <div className="h-[1.5px] w-6 bg-black/20 my-0.5" />

          <button
            type="button"
            onClick={() => setZoomFactor(1)}
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
            onClick={() => setZoomFactor(0.8)}
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
            onClick={() => setZoomFactor(0.6)}
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

      {/* High-Res Image Lightbox Modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex max-h-[92vh] max-w-[92vw] flex-col items-center rounded-2xl border-4 border-black bg-[#F2EFE9] p-3 shadow-[10px_10px_0px_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex w-full items-center justify-between gap-4 border-b-2 border-black/15 px-2 pb-2">
              <span className="truncate text-xs font-semibold text-[#1A1A1A]">
                {lightbox.title ? `${lightbox.title} — Aditya Fazar Sanjaya` : "Preview Karya — Aditya Fazar Sanjaya"}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="rounded-lg border-2 border-black bg-[#DB5F2D] px-2.5 py-0.5 text-xs font-bold text-white shadow-[2px_2px_0px_#000] hover:brightness-110"
              >
                Tutup (ESC)
              </button>
            </div>
            {lightbox.src.toLowerCase().includes(".mp4") || lightbox.src.toLowerCase().includes(".webm") ? (
              <video
                src={lightbox.src}
                controls
                autoPlay
                loop
                playsInline
                className="max-h-[82vh] max-w-[88vw] rounded-lg object-contain bg-black"
              />
            ) : (
              <img
                src={lightbox.src}
                alt={lightbox.title || "Portfolio Preview"}
                className="max-h-[82vh] max-w-[88vw] rounded-lg object-contain"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
