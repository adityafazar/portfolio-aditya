"use client";

/**
 * Hand-written React + Tailwind sections that replace the auto-compiled
 * Figma scene nodes for the 3 problematic areas:
 *   a. UI/UX Cover   – black cable (347:1167) + tablet/phone mockup cluster
 *   b. 3D Card       – "AR Story of Malin Kundang" (347:1287)
 *   c. Hero 3D       – Malin Kundang island window (347:1189)
 *
 * NOTE ON POSITIONING:
 * Everything inside a Figma artboard frame lives on an absolute canvas
 * coordinate system (1920px wide). The outer wrapper of each section therefore
 * keeps `absolute` + explicit left/top so it lands on the same spot as the
 * design. Stacking is controlled with Tailwind z-index classes, and all inner
 * layout (columns, overview box, etc.) uses normal flex layout.
 */

import React, { memo } from "react";
import { MockupWindowHeader } from "@/components/ui/MockupWindowHeader";
import { InteractiveTypewriterText } from "@/components/ui/InteractiveTypewriterText";
import { UIUX_MOCKUPS } from "./sceneAssets";

type OpenLightbox = (src: string, title?: string) => void;

/* -------------------------------------------------------------------------- */
/* Shared helpers                                                              */
/* -------------------------------------------------------------------------- */

/** Image rendered with Figma-style crop (percentages: [width, height, left, top]). */
function CroppedImg({
  src,
  alt,
  crop,
  mirror = false,
  className = "",
}: {
  src: string;
  alt: string;
  crop?: [number, number, number, number];
  mirror?: boolean;
  className?: string;
}) {
  const [cw, ch, cl, ct] = crop ?? [100, 100, 0, 0];
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      loading="lazy"
      decoding="async"
      className={`absolute max-w-none select-none ${className}`}
      style={{
        width: `${cw}%`,
        height: `${ch}%`,
        left: `${cl}%`,
        top: `${ct}%`,
        transform: mirror ? "scaleX(-1)" : undefined,
      }}
    />
  );
}

/** OS-style mockup window: rounded image card with the standard 32px header. */
function MockupWindow({
  title,
  src,
  crop,
  width,
  height,
  className = "",
  style,
  onOpenLightbox,
}: {
  title: string;
  src: string;
  crop?: [number, number, number, number];
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  onOpenLightbox: OpenLightbox;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Perbesar gambar: ${title}`}
      onClick={() => onOpenLightbox(src, title)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenLightbox(src, title);
      }}
      className={`figma-lightbox-trigger shrink-0 cursor-zoom-in overflow-hidden rounded-[25px] ${className}`}
      style={{ width, height, ...style }}
    >
      <CroppedImg src={src} alt={title} crop={crop} className="figma-img-target" />
      <MockupWindowHeader title={title} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* a. UI/UX Cover – cable (behind) & mockup cluster (front)                    */
/* -------------------------------------------------------------------------- */

/**
 * Pengaturan posisi manual garis UI/UX (UiuxCoverCable) & kursor.
 * Ganti angka di bawah ini untuk menggeser:
 * - UIUX_CABLE_OFFSET_Y: minus (-) untuk naik, plus (+) untuk turun
 * - UIUX_CABLE_OFFSET_X: minus (-) untuk geser kiri, plus (+) untuk geser kanan
 */
export const UIUX_CABLE_OFFSET_X = 0;
export const UIUX_CABLE_OFFSET_Y = -20; // Menaikkan posisi 30px ke atas

/**
 * Pengaturan posisi manual KURSOR UI/UX (347:1186):
 * - UIUX_CURSOR_OFFSET_Y: minus (-) untuk NAIK, plus (+) untuk TURUN
 * - UIUX_CURSOR_OFFSET_X: minus (-) untuk KIRI, plus (+) untuk KANAN
 */
export const UIUX_CURSOR_OFFSET_X = 0;
export const UIUX_CURSOR_OFFSET_Y = 20;

/** Black cable vector from ui ux line svg.svg. Sits BEHIND the tablet (z-10 < z-30). */
export const UiuxCoverCable = memo(function UiuxCoverCable() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-10 select-none"
      style={{
        width: 1920,
        height: 1182,
        transform: `translate(${UIUX_CABLE_OFFSET_X}px, ${UIUX_CABLE_OFFSET_Y}px)`,
      }}
    >
      <svg
        width={1920}
        height={1182}
        viewBox="0 0 1920 1182"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="pointer-events-none overflow-visible w-full h-full"
      >
        <path
          d="M1629.47 272.995C1625.82 239.399 1631.65 204.449 1655.5 166.995C1751 16.9945 2199 184.495 2130 -59.005"
          strokeWidth="16"
          stroke="black"
          strokeLinecap="round"
        />
        <path
          d="M862.5 932.937C623.227 1065.3 475.372 1131.18 543 951.494C570.52 878.371 584.746 818.94 588.897 771"
          strokeWidth="16"
          stroke="black"
          strokeLinecap="round"
        />
        <path
          d="M-27.5 216.016C414.802 -21.9609 330.648 229.811 172.5 427.496C2.5 639.996 -15.4612 832.401 310 630.495C377.537 588.597 515.694 564.144 569.5 651.5"
          strokeWidth="16"
          stroke="black"
          strokeLinecap="round"
        />
        <path d="M738.559 998.518L933.298 794.66" stroke="#0C8CE9" />
        <path d="M576.565 1163.41L738.369 999.487" stroke="#0C8CE9" />
        <path
          d="M574.631 1162.84C575.59 1162.29 576.812 1162.63 577.359 1163.59C577.906 1164.55 577.573 1165.77 576.613 1166.32C575.654 1166.86 574.432 1166.53 573.885 1165.57C573.337 1164.61 573.671 1163.39 574.631 1162.84Z"
          fill="white"
          stroke="#0C8CE9"
        />
        <path
          d="M735.931 995.572C738.089 994.34 740.838 995.091 742.07 997.25C743.301 999.408 742.55 1002.16 740.392 1003.39C738.233 1004.62 735.485 1003.87 734.253 1001.71C733.021 999.552 733.772 996.804 735.931 995.572Z"
          fill="white"
          stroke="#0C8CE9"
        />
        <path d="M169.913 432.133L357.54 642.555" stroke="#0C8CE9" />
        <path d="M18.5059 257.467L168.963 431.866" stroke="#0C8CE9" />
        <path
          d="M22.5147 256.505C23.3354 258.255 22.582 260.339 20.8319 261.16C19.0818 261.981 16.9977 261.227 16.177 259.477C15.3562 257.727 16.1097 255.643 17.8598 254.822C19.6099 254.001 21.694 254.755 22.5147 256.505Z"
          fill="white"
          stroke="#0C8CE9"
        />
        <path
          d="M173.06 429.749C174.115 431.999 173.146 434.679 170.896 435.734C168.646 436.789 165.967 435.82 164.911 433.57C163.856 431.32 164.825 428.64 167.075 427.585C169.325 426.53 172.005 427.499 173.06 429.749Z"
          strokeWidth="2"
          fill="white"
          stroke="#0C8CE9"
        />
        <path
          d="M361.883 642.654C362.742 644.487 361.953 646.669 360.121 647.528C358.288 648.387 356.106 647.599 355.247 645.766C354.388 643.934 355.176 641.751 357.009 640.892C358.841 640.033 361.024 640.822 361.883 642.654Z"
          strokeWidth="2"
          fill="white"
          stroke="#0C8CE9"
        />
      </svg>
    </div>
  );
});

/** White tablet + phone mockups. Always in FRONT of the cable (z-30). */
export const UiuxMockupCluster = memo(function UiuxMockupCluster({
  onOpenLightbox,
}: {
  onOpenLightbox: OpenLightbox;
}) {
  return (
    <div
      aria-label="UI/UX Showcase Mockups Cluster"
      className="absolute z-30"
      style={{ left: 774, top: 62, width: 1131, height: 1098 }}
    >
      <div className="figma-uiux-cluster-float-rotate relative z-30 h-full w-full overflow-visible">
        {UIUX_MOCKUPS.map((mk) => {
          const [a, b, c, d, tx, ty] = mk.m;
          return (
            <div
              key={mk.id}
              role="button"
              tabIndex={0}
              aria-label={`Perbesar mockup ${mk.name}`}
              onClick={() => onOpenLightbox(mk.lb ?? mk.src, "UI/UX Design")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  onOpenLightbox(mk.lb ?? mk.src, "UI/UX Design");
              }}
              className="figma-lightbox-trigger absolute left-0 top-0 cursor-zoom-in overflow-hidden"
              style={{
                width: mk.w,
                height: mk.h,
                transformOrigin: "0 0",
                transform: `matrix(${a},${b},${c},${d},${tx},${ty})`,
              }}
            >
              <div className="relative z-30 h-full w-full">
                <CroppedImg src={mk.src} alt={mk.name} crop={mk.crop} className="figma-img-target" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* b. 3D Card – "AR Story of Malin Kundang"                                    */
/* -------------------------------------------------------------------------- */

const MALIN_TITLE = "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)";
const PALM_TREE_SRC = "/figma/c111e08d5f412f21293c75b818c06829217f7156.webp";

/**
 * Pengaturan posisi manual Window 2 (Render Warna Depan-Kiri):
 * - MALIN_WIN2_OFFSET_X: minus (-) kiri, plus (+) kanan
 * - MALIN_WIN2_OFFSET_Y: minus (-) atas, plus (+) bawah
 */
export const MALIN_WIN2_OFFSET_X = 150;
export const MALIN_WIN2_OFFSET_Y = 0;

/**
 * Ukuran dasar pohon kelapa Malin Kundang:
 */
export const MALIN_TREE_WIDTH = 402.8;
export const MALIN_TREE_HEIGHT = 667.3;

/**
 * Pengaturan posisi, ukuran & layer Pohon Kelapa Kiri (Malin Kundang):
 * - MALIN_TREE_LEFT_SCALE: faktor skala ukuran (contoh: 1.0 normal, 0.8 mengecil 20%, 0.7 mengecil 30%, 1.2 membesar)
 * - MALIN_TREE_LEFT_OFFSET_X: minus (-) geser kiri, plus (+) geser kanan
 * - MALIN_TREE_LEFT_OFFSET_Y: minus (-) geser atas, plus (+) geser bawah
 * - MALIN_TREE_LEFT_FLIP: true untuk balik horizontal, false normal
 * - MALIN_TREE_LEFT_Z_INDEX: urutan layer (z-index):
 *     5  -> di belakang wireframe
 *     20 -> di depan wireframe, di belakang render warna (default)
 *     35 -> di depan render warna
 */
export const MALIN_TREE_LEFT_SCALE = 1.0;
export const MALIN_TREE_LEFT_OFFSET_X = 0;
export const MALIN_TREE_LEFT_OFFSET_Y = -120;
export const MALIN_TREE_LEFT_FLIP = true;
export const MALIN_TREE_LEFT_Z_INDEX = 20;

/**
 * Pengaturan posisi, ukuran & layer Pohon Kelapa Kanan (Malin Kundang):
 * - MALIN_TREE_RIGHT_SCALE: faktor skala ukuran (contoh: 1.0 normal, 0.8 mengecil 20%, 0.7 mengecil 30%, 1.2 membesar)
 * - MALIN_TREE_RIGHT_OFFSET_X: minus (-) geser kiri, plus (+) geser kanan
 * - MALIN_TREE_RIGHT_OFFSET_Y: minus (-) geser atas, plus (+) geser bawah
 * - MALIN_TREE_RIGHT_FLIP: true untuk balik horizontal, false normal
 * - MALIN_TREE_RIGHT_Z_INDEX: urutan layer (z-index):
 *     20 -> di belakang render window kanan (Window 3)
 *     35 -> di depan render window kanan (default)
 *     45 -> di depan kotak overview
 */
export const MALIN_TREE_RIGHT_SCALE = 1.0;
export const MALIN_TREE_RIGHT_OFFSET_X = -150;
export const MALIN_TREE_RIGHT_OFFSET_Y = -250;
export const MALIN_TREE_RIGHT_FLIP = false;
export const MALIN_TREE_RIGHT_Z_INDEX = 25;

function OverviewBox({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  const w = 983;
  const h = 239;
  const corner = "absolute h-10 w-10 bg-[rgb(12,140,233)]";
  return (
    <div
      className={`shrink-0 bg-[rgba(12,140,233,0.08)] ${className}`}
      style={{ width: w, height: h, ...style }}
    >
      {/* Dashed blue border (Figma dash 28/28, 4px) */}
      <svg
        className="pointer-events-none absolute inset-0 overflow-visible"
        width={w}
        height={h}
        aria-hidden="true"
      >
        <rect
          x={0}
          y={0}
          width={w}
          height={h}
          fill="none"
          stroke="rgb(12,140,233)"
          strokeWidth={4}
          strokeDasharray="28 28"
        />
      </svg>

      {/* Corner handles */}
      <span className={`${corner} -left-5 -top-5`} />
      <span className={`${corner} -right-5 -top-5`} />
      <span className={`${corner} -bottom-5 -right-5`} />
      <span className={`${corner} -bottom-5 -left-5`} />

      {/* Content */}
      <div className="relative flex h-full gap-[50px] px-[50px] pt-[51px] font-poppins text-black">
        <div className="flex w-[217px] shrink-0 flex-col gap-[25px]">
          <h4 className="text-[40px] font-semibold leading-[28px]">TOOL USED</h4>
          <div className="flex justify-center">
            <img
              src="/figma/61afd6ebcb0a931aa9d284f902ad7a684b8e2250.webp"
              alt="Blender"
              title="Blender"
              draggable={false}
              className="h-[82px] w-[100px] object-cover"
            />
          </div>
        </div>
        <div className="flex w-[553px] flex-col gap-[25px]">
          <h4 className="text-[40px] font-semibold leading-[28px]">OVERVIEW</h4>
          <InteractiveTypewriterText
            text="Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2022), dikerjakan bersama LPPM STMIK AMIK Bandung."
            className="text-justify text-[23px] font-medium leading-[34.5px]"
          />
        </div>
      </div>
    </div>
  );
}

export const MalinKundangCard = memo(function MalinKundangCard({
  onOpenLightbox,
}: {
  onOpenLightbox: OpenLightbox;
}) {
  return (
    <div
      className="absolute z-[12]"
      style={{ left: -136, top: 1195.75, width: 2006, height: 1027 }}
    >
      {/* relative overflow-hidden: palm tree decorations are clipped inside the card and never leak into the ITB card below. */}
      <section
        aria-label="AR Story of Malin Kundang"
        className="relative overflow-hidden h-full w-full"
      >
        {/* 1. Window 1: Wireframe Render (Belakang Kiri) */}
        <MockupWindow
          title={MALIN_TITLE}
          src="/figma/fce7455fa6085712753ae4217aac8a0a6e97c616.webp"
          crop={[100.025, 145.638, 0, -14.473]}
          width={660.13}
          height={454}
          className="absolute z-[10]"
          style={{ left: 186, top: 2 }}
          onOpenLightbox={onOpenLightbox}
        />

        {/* 2. Left Palm Tree: Berada di belakang Window 2 (Render Warna) dan di depan Window 1 (Wireframe) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0"
          style={{
            zIndex: MALIN_TREE_LEFT_Z_INDEX,
            width: MALIN_TREE_WIDTH * MALIN_TREE_LEFT_SCALE,
            height: MALIN_TREE_HEIGHT * MALIN_TREE_LEFT_SCALE,
            transformOrigin: "0 0",
            transform: `matrix(-0.96047,0.278384,0.278384,0.96047,${386.87 + MALIN_TREE_LEFT_OFFSET_X},${144 + MALIN_TREE_LEFT_OFFSET_Y})`,
          }}
        >
          <CroppedImg
            src={PALM_TREE_SRC}
            alt=""
            crop={[202.378, 122.16, -57.5, -8.287]}
            mirror={!MALIN_TREE_LEFT_FLIP}
            className="figma-cutout-img"
          />
        </div>

        {/* 3. Window 2: Color Island Render (Depan Kiri - Menumpuk di atas wireframe & di atas OverviewBox) */}
        <MockupWindow
          title={MALIN_TITLE}
          src="/figma/f6caba0293d66ebcdf1fc55dadbffb84a8a6e427.webp"
          crop={[103.371, 150.486, 0, -17.575]}
          width={717.93}
          height={493.16}
          className="absolute z-[30]"
          style={{
            left: 245 + MALIN_WIN2_OFFSET_X,
            top: 250 + MALIN_WIN2_OFFSET_Y,
            boxShadow: "0 10px 30px -5px rgba(0,0,0,0.15)",
          }}
          onOpenLightbox={onOpenLightbox}
        />

        {/* 4. Window 3: Right Island Render */}
        <MockupWindow
          title={MALIN_TITLE}
          src="/figma/f9da738cac75ff4b79dc332877fe9d0b46489346.webp"
          crop={[125.961, 105.346, -12.981, 0]}
          width={695}
          height={831}
          className="absolute z-[25]"
          style={{ left: 1311, top: 176 }}
          onOpenLightbox={onOpenLightbox}
        />

        {/* 5. Right Palm Tree: Daun & batang melintas di antara Window 2 & Window 3 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0"
          style={{
            zIndex: MALIN_TREE_RIGHT_Z_INDEX,
            width: MALIN_TREE_WIDTH * MALIN_TREE_RIGHT_SCALE,
            height: MALIN_TREE_HEIGHT * MALIN_TREE_RIGHT_SCALE,
            transformOrigin: "0 0",
            transform: `matrix(0.972996,0.230822,-0.230822,0.972996,${1251 + MALIN_TREE_RIGHT_OFFSET_X},${285 + MALIN_TREE_RIGHT_OFFSET_Y})`,
          }}
        >
          <CroppedImg
            src={PALM_TREE_SRC}
            alt=""
            crop={[202.378, 122.16, -57.5, -8.287]}
            mirror={MALIN_TREE_RIGHT_FLIP}
            className="figma-cutout-img"
          />
        </div>

        {/* 6. Overview Box: TOOL USED & OVERVIEW dengan border putus-putus biru */}
        <OverviewBox
          className="absolute z-[40]"
          style={{ left: 192, top: 768 }}
        />

        {/* 7. Title Badge: AR Story of Malin Kundang */}
        <div className="absolute z-[50]" style={{ left: 1005, top: 0, width: 995, height: 144 }}>
          <div
            className="figma-title-badge figma-title-badge-rot-pos relative flex h-full w-full items-center justify-center rounded-[28px] border-[12px] border-black bg-[rgb(217,59,75)] shadow-[17px_16px_0px_0px_rgb(0,0,0)]"
            style={{ transformOrigin: "center center" }}
          >
            <h3
              className="whitespace-nowrap text-center text-[75px] leading-none text-[rgb(250,250,250)]"
              style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif", letterSpacing: -1.5 }}
            >
              AR Story of Malin Kundang
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* c. Hero 3D – Malin Kundang island window                                    */
/* -------------------------------------------------------------------------- */

export const HeroMalinWindow = memo(function HeroMalinWindow({
  onOpenLightbox,
}: {
  onOpenLightbox: OpenLightbox;
}) {
  return (
    // mt-8 pushes the window 32px further below the browser bar so its white header is fully visible.
    <div className="absolute z-10 mt-8" style={{ left: 1107, top: 123.75 }}>
      <MockupWindow
        title={MALIN_TITLE}
        src="/figma/f6caba0293d66ebcdf1fc55dadbffb84a8a6e427.webp"
        crop={[103.371, 150.486, 0, -17.575]}
        width={717.93}
        height={493.16}
        className="relative"
        onOpenLightbox={onOpenLightbox}
      />
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* d. Hero Top – Custom Scribble Line (Gambar 1, positioned per Gambar 2)     */
/* -------------------------------------------------------------------------- */

/**
 * Pengaturan posisi manual garis Hero (HeroScribbleLine) & kursor hero.
 * Ganti angka di bawah ini untuk menggeser:
 * - HERO_SCRIBBLE_OFFSET_Y: minus (-) untuk naik, plus (+) untuk turun
 * - HERO_SCRIBBLE_OFFSET_X: minus (-) untuk geser kiri, plus (+) untuk geser kanan
 */
export const HERO_SCRIBBLE_OFFSET_X = 0;
export const HERO_SCRIBBLE_OFFSET_Y = -1;

/**
 * Pengaturan posisi manual KURSOR Hero (347:1020):
 * - HERO_CURSOR_OFFSET_Y: minus (-) untuk NAIK, plus (+) untuk TURUN
 * - HERO_CURSOR_OFFSET_X: minus (-) untuk KIRI, plus (+) untuk KANAN
 */
export const HERO_CURSOR_OFFSET_X = 0;
export const HERO_CURSOR_OFFSET_Y = 0;

export const HeroScribbleLine = memo(function HeroScribbleLine() {
  return (
    <img
      src="/hero-scribble.svg"
      alt="Hero Scribble Line"
      draggable={false}
      aria-hidden="true"
      className="pointer-events-none select-none absolute z-40 max-w-none"
      style={{
        left: 0,
        top: 114,
        transform: `translate(${HERO_SCRIBBLE_OFFSET_X}px, ${HERO_SCRIBBLE_OFFSET_Y}px)`,
        width: 1671,
        height: 1422,
        zIndex: 40,
      }}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* e. 3D Design Cover – Vector Line (live 3d design.svg)                       */
/* -------------------------------------------------------------------------- */

/**
 * Pengaturan posisi manual garis 3D Design (ThreeDCoverLine):
 * - THREED_LINE_OFFSET_Y: minus (-) untuk NAIK, plus (+) untuk TURUN
 * - THREED_LINE_OFFSET_X: minus (-) untuk KIRI, plus (+) untuk KANAN
 */
export const THREED_LINE_OFFSET_X = 0;
export const THREED_LINE_OFFSET_Y = 30;

export const ThreeDCoverLine = memo(function ThreeDCoverLine() {
  return (
    <img
      src="/live-3d-design.svg?v=2"
      alt="3D Design Vector Line"
      draggable={false}
      aria-hidden="true"
      className="pointer-events-none select-none absolute z-50 max-w-none"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${THREED_LINE_OFFSET_X}px, ${THREED_LINE_OFFSET_Y}px)`,
        width: 1920,
        height: 1156,
        zIndex: 50,
      }}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* f. 3D Design Cover – Palm Tree Cutout (Node 347:1215)                      */
/* -------------------------------------------------------------------------- */

/**
 * Pengaturan posisi manual Pohon Kelapa 3D (ThreeDPalmTree):
 * - THREED_PALM_TREE_OFFSET_X: plus (+) untuk geser KANAN, minus (-) untuk geser KIRI
 * - THREED_PALM_TREE_OFFSET_Y: plus (+) untuk geser TURUN, minus (-) untuk geser NAIK
 */
export const THREED_PALM_TREE_OFFSET_X = 100; // Ubah angka ini untuk menggeser kanan/kiri
export const THREED_PALM_TREE_OFFSET_Y = -50;   // Ubah angka ini untuk menggeser atas/bawah

export const ThreeDPalmTree = memo(function ThreeDPalmTree() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute select-none"
      style={{
        left: 847.38 + THREED_PALM_TREE_OFFSET_X,
        top: 67 + THREED_PALM_TREE_OFFSET_Y,
        width: 305.24,
        height: 553.43,
        zIndex: 12, // Di atas Malin Kundang (5) dan di belakang ITB (12)
        overflow: "hidden",
      }}
    >
      <img
        src="/figma/c111e08d5f412f21293c75b818c06829217f7156.webp"
        alt="3D Palm Tree"
        draggable={false}
        className="figma-cutout-img absolute"
        style={{
          width: "209.196%",
          height: "115.381%",
          left: "-59.437%",
          top: "-7.827%",
          transform: "scaleX(-1)", // Balik horizontal
          maxWidth: "none",
        }}
      />
    </div>
  );
});

/** Scene node ids that are now rendered by the hand-written components above. */
export const MANUAL_SECTION_IDS = new Set([
  "347:995",
  "347:1167",
  "347:uiux_mockups_cluster",
  "347:1287",
  "347:1189",
]);

