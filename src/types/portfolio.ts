import type React from "react";

// =============================================================================
// 1. Tipe Node Kanvas Figma (Scene Graph)
// =============================================================================

export interface GridLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  c: string;
  sw: number;
}

export interface SvgPath {
  d: string;
  r?: "evenodd";
}

export interface TextRun {
  text: string;
  fw?: number;
  fs?: number;
  ff?: string;
  lh?: number;
  c?: string;
}

export interface ImageFill {
  src: string;
  mode: string;
  op?: number;
  crop?: [number, number, number, number]; // [width%, height%, left%, top%]
}

export interface StrokeSpec {
  c: string;
  sw: number;
  sa: "INSIDE" | "CENTER" | "OUTSIDE" | string;
  dash?: number[];
}

export interface SceneNode {
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

export interface FigmaScene {
  width: number;
  height: number;
  background: string;
  children: SceneNode[];
}

// =============================================================================
// 2. Tipe Navigasi, Toolbar, & Window Video
// =============================================================================

export interface SectionItem {
  id: string;
  label: string;
  badge: string;
  desc: string;
  y: number;
  activeColor: string;
  icon?: React.ReactNode;
}

export interface ContactItem {
  id: string;
  label: string;
  desc: string;
  href: string;
  activeColor: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
}

export interface ToolbarItem {
  id: string;
  name: string;
  targetY?: number;
  icon: string;
  isFirstItem?: boolean;
}

export interface ToolbarCapsule {
  id: string;
  top: number;
  height: number;
  items: ToolbarItem[];
}

export interface VideoWindowConfig {
  videoSrc: string;
  title: string;
  lightboxTitle: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface UiuxMockup {
  id: string;
  name: string;
  m: [number, number, number, number, number, number];
  w: number;
  h: number;
  src: string;
  crop?: [number, number, number, number];
  lb?: string;
}

// =============================================================================
// 3. Tipe Konten Portfolio (Profil, Karir, Edukasi, & Proyek)
// =============================================================================

export interface PortfolioProject {
  id: string;
  title: string;
  category: "UI/UX" | "3D";
  subtitle: string;
  year: string;
  platform?: string;
  client?: string;
  overview: string;
  tools: string[];
  toolsUsed: string[];
  images: string[];
  image?: string;
  tags: string[];
  badges: string[];
  keyFeatures: string[];
  windowTitle?: string;
  demoUrl?: string;
  videoUrl?: string;
  hasVideo?: boolean;
}

export type Project = PortfolioProject;

export interface WorkExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string;
  highlights: string[];
  accentColor?: string;
  logo?: string;
}

export type Experience = WorkExperienceItem;

export interface EducationItem {
  id: string;
  period: string;
  field: string;
  degree: string;
  institution: string;
  skills: string;
  logo?: string;
}

export type Education = EducationItem;

export interface ProfileData {
  name: string;
  nickname: string;
  headline: string;
  dateLabel: string;
  bio: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    instagramDesign?: string;
    whatsapp?: string;
    behance: string;
  };
}
