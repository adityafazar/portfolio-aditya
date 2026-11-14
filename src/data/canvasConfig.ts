import type {
  ContactItem,
  SectionItem,
  ToolbarCapsule,
  VideoWindowConfig,
} from "@/types/portfolio";

// =============================================================================
// 1. Ukuran Artboard & Konstanta Kanvas Utama (1920px Base Width)
// =============================================================================

/** Jarak vertikal antar artboard (Hero -> UI/UX -> 3D) dalam satuan px Figma */
export const FRAME_GAP = 56;

/** Tinggi artboard Frame 1: Hero, Bio, Edukasi & Pengalaman Kerja */
export const FRAME1_HEIGHT = 4400;

/** Tinggi artboard Frame 2: UI/UX Design System & 6 Proyek */
export const FRAME2_HEIGHT = 7872;

/** Tinggi artboard Frame 3: 3D Blender Studio & AR Warship */
export const FRAME3_HEIGHT = 10180;

/** Tinggi total seluruh kanvas gabungan */
export const TOTAL_CANVAS_HEIGHT =
  FRAME1_HEIGHT + FRAME_GAP + FRAME2_HEIGHT + FRAME_GAP + FRAME3_HEIGHT;

/** Titik potong Y dasar untuk memetakan koordinat Figma ke Frame 2 & Frame 3 */
export const F2_BASE_Y = 4280;
export const F3_BASE_Y = 11786;

/** Ukuran seragam ikon di Toolbar Kiri Hero (46x46 px) */
export const TOOLBAR_ICON_SIZE = 46;

// =============================================================================
// 2. Daftar Seksi Navigasi Kanvas (Dock Navigasi Kanan)
// =============================================================================

export const SECTIONS: SectionItem[] = [
  {
    id: "hero",
    label: "Hero",
    badge: "Cover",
    desc: "Header & 3D Identity",
    y: 0,
    activeColor: "#4565D6", // Biru (Portfolio)
  },
  {
    id: "bio",
    label: "About",
    badge: "Profil",
    desc: "Bio, Visi & Keahlian",
    y: 1080,
    activeColor: "#4A9460", // Hijau (Aditya Fazar Sanjaya)
  },
  {
    id: "edu",
    label: "Edu and Tool",
    badge: "Tools",
    desc: "Pendidikan & Tools",
    y: 2150,
    activeColor: "#4A9460", // Hijau (Education)
  },
  {
    id: "exp",
    label: "Experience",
    badge: "Karir",
    desc: "ESDM, Urbansolv & ITB",
    y: 3180,
    activeColor: "#DB5F2D", // Oranye (Working Experience)
  },
  {
    id: "uiux",
    label: "UI/UX",
    badge: "6 Projek",
    desc: "Design System & App Mockups",
    y: 4472,
    activeColor: "#4A9460", // Hijau (UI/UX Design)
  },
  {
    id: "3d",
    label: "3D Design",
    badge: "8 Scene",
    desc: "Blender 3D & Interactive AR",
    y: 12444,
    activeColor: "#D93B4B", // Merah (3D Design)
  },
];

// =============================================================================
// 3. Daftar Kontak & Media Sosial (Dock Kontak Kanan)
// =============================================================================

export const CONTACT_ITEMS: ContactItem[] = [
  {
    id: "email",
    label: "Email",
    desc: "aditya.fazarsanjaya@gmail.com",
    href: "mailto:aditya.fazarsanjaya@gmail.com",
    activeColor: "#EA4335",
  },
  {
    id: "ig-personal",
    label: "@adityaafazar",
    desc: "Instagram (@adityaafazar)",
    href: "https://www.instagram.com/adityaafazar/?hl=en",
    activeColor: "#E1306C",
    isExternal: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    desc: "LinkedIn - Aditya Fazar Sanjaya",
    href: "https://www.linkedin.com/in/aditya-fazar-sanjaya-92a6a6383",
    activeColor: "#0A66C2",
    isExternal: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    desc: "WhatsApp (088218466192)",
    href: "https://wa.me/6288218466192",
    activeColor: "#25D366",
    isExternal: true,
  },
];

// =============================================================================
// 4. Kapsul Toolbar Kreatif Blender di Sisi Kiri Hero
// =============================================================================

export const HERO_TOOLBAR_CAPSULES: ToolbarCapsule[] = [
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

// =============================================================================
// 5. Konfigurasi 5 Jendela Video 3D di Frame 3
// =============================================================================

export const VIDEO_WINDOW_CONFIGS: Record<string, VideoWindowConfig> = {
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

// =============================================================================
// 6. ID Node Teks Overview yang Memakai Efek Ketik (Typewriter)
// =============================================================================

export const OVERVIEW_DESC_NODE_IDS = new Set([
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
