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

export const PERSONAL_INFO: ProfileData = {
  name: "Aditya Fazar Sanjaya",
  nickname: "Adit",
  headline: "3D, Design & UI UX",
  dateLabel: "Oktober x 2026",
  bio: "Saya merupakan seorang Multimedia Spesialist & 3D Visual Designer lulusan DKV dengan pengalaman di Kementerian ESDM, SCCIC ITB, dan Urbansolv. Fokus saya di UI/UX dan 3D Generalis yang biasanya digunakan untuk visualisasi, Digital Twin, AR, dan Metaverse, serta visualisasi data geospasial.",
  location: "Bandung, Indonesia",
  email: "aditya.fazarsanjaya@gmail.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/aditya-fazar-sanjaya-92a6a6383",
    instagram: "https://www.instagram.com/adityaafazar/?hl=en",
    instagramDesign: "https://www.instagram.com/fazar_desain/?hl=en",
    whatsapp: "https://wa.me/6288218466192",
    behance: "https://behance.net",
  },
};

export const TOOLS_USED = [
  { name: "Figma", category: "Design & Multimedia", icon: "/figma/68f9fb4f5008f3d44ce9902081fb2ceca0df3f25.webp" },
  { name: "Photoshop", category: "Design & Multimedia", icon: "/figma/05ed1f73b05302da81ed5fb021cb1ae93c0051be.webp" },
  { name: "Illustrator", category: "Design & Multimedia", icon: "/figma/5c24f81a8321c9b2bd516b5d8b21edef75417369.webp" },
  { name: "Alight Motion", category: "Design & Multimedia", icon: "/figma/c7482441f57b1b3222502cd9ed3877b7ff60430b.webp" },
  { name: "Canva", category: "Design & Multimedia", icon: "/figma/a14fcba8eb963d780f5b557a4fb4967d0b660aa5.webp" },
  { name: "Premiere Pro", category: "Design & Multimedia", icon: "/figma/f7b9158a40bf28d54bd3fa7fb850a1fa6c5261be.webp" },
  { name: "CapCut", category: "Design & Multimedia", icon: "/figma/1b538dc3759b252ca693591f108242b709c3a25a.webp" },
  { name: "Blender", category: "3D Design", icon: "/figma/61afd6ebcb0a931aa9d284f902ad7a684b8e2250.webp" },
  { name: "Unity", category: "3D Design", icon: "/figma/bd0b42287e9fc5a5f2653da98004dc370b5c7718.webp" },
  { name: "Unreal Engine", category: "3D Design", icon: "/figma/bc78d22c937364157ef295a273dc7cc1de843d4c.webp" },
  { name: "CLO 3D", category: "3D Design", icon: "/figma/7f40b919f7b71a192578283277a0b6c2c38f0524.webp" },
  { name: "Daz 3D", category: "3D Design", icon: "/figma/90a761fd97d68d85535b592d2c3ee31279ef9e44.webp" },
];

export const EDUCATIONS: EducationItem[] = [
  {
    id: "edu-stmik-amik",
    period: "2021 – 2026",
    field: "Design & Multimedia",
    degree: "S1 Desain Komunikasi Visual",
    institution: "STMIK AMIK Bandung",
    skills: "UI/UX - Visual - Video Editing - Infographic",
  },
  {
    id: "edu-smkn-2",
    period: "2019 – 2021",
    field: "3D Design",
    degree: "SMK Animasi",
    institution: "SMKN 2 Kota Bandung",
    skills: "Modeling · Texturing · Lighting · Optimization",
  },
];

export const EXPERIENCES: WorkExperienceItem[] = [
  {
    id: "exp-esdm",
    period: "Agu 2026 – Sekarang",
    company: "Kementerian ESDM",
    role: "Staf Desain & Konten Digital Intern",
    description:
      "Berawal dari 3D Generalist & UI Design Intern. 10+ layar UI dan 15+ model 3D, serta 50+ aset visual dan deck presentasi.",
    highlights: [
      "Berawal dari 3D Generalist & UI Design Intern",
      "10+ layar UI dan 15+ model 3D",
      "50+ aset visual dan deck presentasi",
    ],
    accentColor: "rgba(245, 197, 24, 0.45)",
  },
  {
    id: "exp-urbansolv",
    period: "Feb 2025 – Jan 2026",
    company: "Urbansolv",
    role: "Multimedia Specialist & Creative Coordinator",
    description:
      "Berawal dari 3D Generalist & UI Design Intern. 10+ layar UI dan 15+ model 3D, serta 50+ aset visual dan deck presentasi.",
    highlights: [
      "Berawal dari 3D Generalist & UI Design Intern",
      "10+ layar UI dan 15+ model 3D",
      "50+ aset visual dan deck presentasi",
    ],
    accentColor: "rgba(12, 140, 233, 0.45)",
  },
  {
    id: "exp-sccic-itb",
    period: "Sep – Des 2024",
    company: "SCCIC ITB",
    role: "3D Generalist Intern",
    description:
      "Riset Digital Twin NTU Singapore. 10+ aset 3D: gedung dan vegetasi, serta optimasi aset dan integrasi ke engine.",
    highlights: [
      "Riset Digital Twin NTU Singapore",
      "10+ aset 3D: gedung dan vegetasi",
      "Optimasi aset dan integrasi ke engine",
    ],
    accentColor: "rgba(224, 60, 68, 0.45)",
  },
  {
    id: "exp-earlier",
    period: "Earlier",
    company: "PT Cipta Teknologi Persada & STMIK AMIK Bandung",
    role: "Multimedia Specialist Intern & Asisten Dosen",
    description:
      "Multimedia Specialist Intern - PT Cipta Teknologi Persada, 20+ produksi konten Video · Asisten Dosen - Short Animation Production, STMIK AMIK Bandung",
    highlights: [
      "Multimedia Specialist Intern - PT Cipta Teknologi Persada, 20+ produksi konten Video",
      "Asisten Dosen - Short Animation Production, STMIK AMIK Bandung",
    ],
  },
];

export const UIUX_PROJECTS: PortfolioProject[] = [
  {
    id: "geologi-mapping",
    title: "Geologi Mapping App",
    category: "UI/UX",
    subtitle: "Mobile Apps & Website",
    year: "2026",
    platform: "Mobile App",
    client: "Kementerian ESDM",
    image: "/figma/47ba2697b098fe164dfb4dca76e8ff5f3dbbcf65.webp",
    images: ["/figma/47ba2697b098fe164dfb4dca76e8ff5f3dbbcf65.webp"],
    overview:
      "Aplikasi mobile untuk survei geologi lapangan: kelola peta dan lapisan, catat titik pengamatan, dan bekerja offline di lokasi. Isian form mengacu pada dokumen Rekaman Data Lapangan (RDL).",
    keyFeatures: ["Offline Maps", "Auto-Fill Form", "Custom Markers"],
    tools: ["Figma"],
    toolsUsed: ["Figma"],
    tags: ["Offline Maps", "Auto-Fill Form", "Custom Markers"],
    badges: ["Mapping", "Mobile App", "Field Survey"],
  },
  {
    id: "ev-charging",
    title: "EV Charging App",
    category: "UI/UX",
    subtitle: "Mobile Apps & Website",
    year: "2026",
    platform: "Mobile App",
    client: "PT Hariff Daya Tunggal Engineering",
    image: "/figma/82e75e5fb432db50aa527b10287951590747cb90.webp",
    images: ["/figma/82e75e5fb432db50aa527b10287951590747cb90.webp"],
    overview:
      "Proyek untuk PT Hariff Daya Tunggal Engineering: aplikasi mobile bagi pengguna kendaraan listrik untuk memantau status pengisian, menemukan SPKLU terdekat, dan mengelola saldo serta riwayat transaksi.",
    keyFeatures: ["Live Charging", "Station Map", "Top Up Wallet", "Promos"],
    tools: ["Figma"],
    toolsUsed: ["Figma"],
    tags: ["Live Charging", "Station Map", "Top Up Wallet", "Promos"],
    badges: ["EV Charging", "Clean Tech", "IoT Integration"],
  },
  {
    id: "perpustakaan-kemendikbud",
    title: "Perpustakaan Kemendikbud App",
    category: "UI/UX",
    subtitle: "Mobile Apps & Website",
    year: "2021",
    platform: "Mobile App",
    client: "Kemendikbud",
    image: "/figma/e8b7ebceab6231d102e3b6e834fe89ee3fe1355e.webp",
    images: ["/figma/e8b7ebceab6231d102e3b6e834fe89ee3fe1355e.webp"],
    overview:
      "Redesign Aplikasi perpustakaan digital Kemendikbud untuk menjelajahi dan membaca buku, dengan beranda berisi buku favorit, kategori, dan halaman detail buku.",
    keyFeatures: ["Categories", "Book Detail"],
    tools: ["Figma"],
    toolsUsed: ["Figma"],
    tags: ["Categories", "Book Detail"],
    badges: ["Education", "Digital Library", "Redesign"],
  },
  {
    id: "smart-building",
    title: "Smart Building Monitoring",
    category: "UI/UX",
    subtitle: "Web Dashboard & Digital Twin",
    year: "2025",
    platform: "Web Dashboard",
    client: "Urbansolv",
    image: "/figma/e16279f57ebbf7bb0db397e543666299b9cf959e.webp",
    images: ["/figma/e16279f57ebbf7bb0db397e543666299b9cf959e.webp"],
    overview:
      "Dashboard untuk memantau kondisi gedung secara real-time (suhu, kelembapan, CO₂, energi, dan biaya), dilengkapi analitik prediksi dan simulasi skenario.",
    keyFeatures: ["Scenario Simulation", "Prediction Analytics", "Real-Time Monitoring"],
    tools: ["Figma"],
    toolsUsed: ["Figma"],
    tags: ["Scenario Simulation", "Prediction Analytics", "Real-Time Monitoring"],
    badges: ["Smart Building", "IoT Dashboard", "Analytics"],
  },
  {
    id: "cena-digital-twin",
    title: "Digital Twin Monitoring",
    category: "UI/UX",
    subtitle: "Web Dashboard & 3D Integration",
    year: "2025",
    platform: "Web Dashboard",
    client: "CENA",
    image: "/figma/2a0ff99896ce6d34e6284617a6aeb01150c26588.webp",
    images: ["/figma/2a0ff99896ce6d34e6284617a6aeb01150c26588.webp"],
    overview:
      "Dashboard digital twin untuk memantau kondisi bangunan secara real-time. CENA menampilkan denah lantai dan model 3D lengkap dengan data energi, serta saran optimasi dari AI. Dibuat pada 2025.",
    keyFeatures: ["Scenario Simulation", "Real-Time Monitoring", "AI Suggestions"],
    tools: ["Figma"],
    toolsUsed: ["Figma"],
    tags: ["Scenario Simulation", "Real-Time Monitoring", "AI Suggestions"],
    badges: ["Digital Twin", "AI Suggestions", "3D Web"],
  },
  {
    id: "spatial-3d-info",
    title: "3D Spatial Information System",
    category: "UI/UX",
    subtitle: "Geospatial 3D Platform",
    year: "2025",
    platform: "Web App",
    client: "Summarecon Bandung",
    image: "/figma/c615e45447e17c0bbfd9b4b0a424268e3aeb5c27.webp",
    images: ["/figma/c615e45447e17c0bbfd9b4b0a424268e3aeb5c27.webp"],
    overview:
      "Sistem informasi spasial 3D untuk memvisualisasikan kawasan Sumarecon Bandung. Pengguna dapat menelusuri model bangunan 3D, membandingkan perubahan lahan berdasarkan tahun lewat fitur Time Series, serta mengatur layer peta 2D seperti rencana pengembangan. Dibuat pada 2025.",
    keyFeatures: ["Time Series Comparison", "3D Building Layer", "Map Layer Settings"],
    tools: ["Figma"],
    toolsUsed: ["Figma"],
    tags: ["Time Series Comparison", "3D Building Layer", "Map Layer Settings"],
    badges: ["Geospatial", "3D GIS", "Time Series"],
  },
];

export const THREE_D_PROJECTS: PortfolioProject[] = [
  {
    id: "ar-malin-kundang",
    title: "AR Story of Malin Kundang",
    windowTitle: "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)",
    category: "3D",
    subtitle: "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)",
    year: "2022 - 2023",
    platform: "Augmented Reality",
    client: "LPPM STMIK AMIK Bandung",
    image: "/figma/f6caba0293d66ebcdf1fc55dadbffb84a8a6e427.webp",
    images: [
      "/figma/fce7455fa6085712753ae4217aac8a0a6e97c616.webp",
      "/figma/f6caba0293d66ebcdf1fc55dadbffb84a8a6e427.webp",
      "/figma/f9da738cac75ff4b79dc332877fe9d0b46489346.webp",
    ],
    overview:
      "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2022), dikerjakan bersama LPPM STMIK AMIK Bandung.",
    keyFeatures: ["Low-Poly Modeling", "Character Rigging", "Texturing", "AR Foundation Ready"],
    tools: ["Blender"],
    toolsUsed: ["Blender"],
    tags: ["Augmented Reality", "Culture", "Folktale"],
    badges: ["Augmented Reality", "Culture", "Folktale"],
    hasVideo: false,
  },
  {
    id: "itb-ntu-digital-twin",
    title: "ITB x NTU Singapore Digital Twin",
    windowTitle: "ITB x NTU Singapore Digital Twin",
    category: "3D",
    subtitle: "High Precision 3D Assets",
    year: "2024",
    platform: "Real-time Simulation",
    client: "SCCIC ITB & NTU Singapore",
    image: "/figma/fdec5738063c757ef50305307e08ea322f2f6cc5.webp",
    images: [
      "/figma/fdec5738063c757ef50305307e08ea322f2f6cc5.webp",
      "/figma/5f9f2aa6977e3306c9c99ffe1942df7a1868afe1.webp",
      "/figma/503c2d6c07024951b51154065055d0e880aff7e0.webp",
    ],
    overview:
      "Pembuatan 3D Asset untuk Digital Twin NTU Singapore (Work Package 0 dan 3, 2024): memodelkan 10+ aset 3D presisi berupa gedung dan Water Treatment Plant untuk simulasi Realtime, lalu dioptimasi dan diintegrasikan ke engine.",
    keyFeatures: ["Architectural Precision", "Water Treatment Plant Modeling", "PBR Materials", "Engine Integration"],
    tools: ["Blender", "Unity"],
    toolsUsed: ["Blender", "Unity"],
    tags: ["Digital Twin", "Smart Campus", "NTU Singapore"],
    badges: ["Digital Twin", "Smart Campus", "NTU Singapore"],
    hasVideo: true,
    videoUrl: "/final.mp4",
  },
  {
    id: "ar-warship",
    title: "AR Warship Indonesia",
    windowTitle: "AR Warship Indonesia",
    category: "3D",
    subtitle: "Augmented Reality Military Assets",
    year: "2022",
    platform: "Augmented Reality",
    client: "LPPM STMIK AMIK Bandung",
    image: "/figma/f1943632a8ecbf7c2c025fb41f3ac476c78c40df.webp",
    images: [
      "/figma/f1943632a8ecbf7c2c025fb41f3ac476c78c40df.webp",
      "/figma/f62dd475dfca99f92bc7fcb4ed211c198b2ace12.webp",
      "/figma/1ca4cb61accc0d4a89d337f867ead00ab3ed2388.webp",
    ],
    overview:
      "Pembuatan Aset 3D untuk aplikasi Augmented Reality bertema kapal perang Indonesia (2022), dikerjakan bersama LPPM STMIK AMIK Bandung",
    keyFeatures: ["Military Hard-surface Modeling", "Detail Weaponry", "Mobile Polygon Budgeting"],
    tools: ["Blender"],
    toolsUsed: ["Blender"],
    tags: ["Military 3D", "Augmented Reality", "Hard Surface"],
    badges: ["Military 3D", "Augmented Reality", "Hard Surface"],
    hasVideo: false,
  },
  {
    id: "battlefield-animation",
    title: "3D Animation Blender",
    windowTitle: "3D Animation Short Film",
    category: "3D",
    subtitle: "3D Animation Short Film",
    year: "2024",
    platform: "3D Animation",
    client: "Proyek Akhir UAS",
    image: "/figma/0001-0434.mp4",
    images: [
      "/figma/0001-0434.mp4",
      "/figma/ee9adaa04b1259e88bf962c6ae6734fb73c68f18.webp",
    ],
    overview:
      "Animasi sinematik 3D bertema medan perang, dibuat sebagai proyek akhir UAS (2024), dibuat dan dirender di Blender.",
    keyFeatures: ["Dynamic Lighting", "Particle FX (Smoke & Fire)", "Camera Sequencer", "Sound Design Sync"],
    tools: ["Blender"],
    toolsUsed: ["Blender"],
    tags: ["Cinematic", "Blender Render", "Action Animation"],
    badges: ["Cinematic", "Blender Render", "Action Animation"],
    demoUrl: "https://www.instagram.com/p/C3RkIOQJn46/?hl=en&img_index=1",
    videoUrl: "https://www.instagram.com/p/C3RkIOQJn46/?hl=en&img_index=1",
    hasVideo: true,
  },
  {
    id: "classic-interior",
    title: "3D Envirorment Interior",
    windowTitle: "3D Interior",
    category: "3D",
    subtitle: "3D Interior",
    year: "2022",
    platform: "Architectural Visualization",
    client: "Proyek Akhir UAS",
    image: "/figma/0846d863461e88923701b16f0ba02b2cbc339b7c.webp",
    images: [
      "/figma/cd492dbdf60e7e35b3a281765e296b157849c464.webp",
      "/figma/ee9ada43c2f96d0bb524b93a20e26e6f05e9d4f7.webp",
      "/figma/0846d863461e88923701b16f0ba02b2cbc339b7c.webp",
    ],
    overview:
      "Scene interior 3D bergaya klasik ibuat sebagai proyek akhir UAS (2022) Dibuat dan dirender di Blender.",
    keyFeatures: ["Architectural Modeling", "Wood & Marble Textures", "Global Illumination", "Interior Composition"],
    tools: ["Blender"],
    toolsUsed: ["Blender"],
    tags: ["ArchViz", "Photorealism", "Interior Design"],
    badges: ["ArchViz", "Photorealism", "Interior Design"],
    hasVideo: false,
  },
  {
    id: "sci-fi-unreal",
    title: "3D Environment Animation",
    windowTitle: "3D Animation Unreal",
    category: "3D",
    subtitle: "3D Animation Unreal",
    year: "2024",
    platform: "Realtime Cinematic",
    client: "Personal Project",
    image: "/figma/00562bbb947ba3178190848a422067412600f7dc.webp",
    images: [
      "/figma/00562bbb947ba3178190848a422067412600f7dc.webp",
      "/figma/bcf7f1e784dd71a171ec50ef5ec8c81da169bbf9.webp",
      "/figma/31d52ca954d168400338277d32c0866002aa6c70.webp",
    ],
    overview:
      "Animasi sinematik sci-fi di Unreal Engine (2024) dengan pencahayaan dinamis, kamera di Sequencer, dan render via Movie Render Queue.",
    keyFeatures: ["Lumen Dynamic GI", "Nanite Geometry", "Sequencer Camera Choreography", "Atmospheric Fog"],
    tools: ["Unreal Engine"],
    toolsUsed: ["Unreal Engine"],
    tags: ["Unreal Engine", "Sci-Fi", "Cinematic"],
    badges: ["Unreal Engine", "Sci-Fi", "Cinematic"],
    demoUrl: "https://www.instagram.com/p/DAf1NqIyJWI/?utm_source=ig_web_copy_link&cplk=NTc4MTIwNjQ2YQ==",
    videoUrl: "/AQMWOdwGKuEVaV9CEDgR-3C6WQKKlcSUO7Buyu6fZHuJhh_7TUe8YicZ7KaZzOiXsB-1a8MQe1dVlYhoOn0gOQl2Z-vMPKSJk_-hkgw.mp4",
    hasVideo: true,
  },
  {
    id: "lancer-evo-ix",
    title: "Lancer Evo IX 3D Model & Animation",
    windowTitle: "Lancer Evo IX 3D Model",
    category: "3D",
    subtitle: "Lancer Evo IX 3D Model",
    year: "2024",
    platform: "Vehicle Animation",
    client: "Portfolio Project",
    image: "/figma/14c1a28ca84f80b28f22d1c25cbdfb64c0d354a4.webp",
    images: [
      "/figma/1aee7ff4b588140bdc5f2852ab6720f416327223.webp",
      "/figma/df4547812e781c786e2ab47f4cf18e9df9f00790.webp",
      "/figma/bf0e1217536c848ae580340d13a2e93984851a02.webp",
      "/figma/14c1a28ca84f80b28f22d1c25cbdfb64c0d354a4.webp",
    ],
    overview:
      "Memodelkan dan menganimasikan Lancer Evo IX lengkap dengan setup pencahayaan di Blender.(2024)",
    keyFeatures: ["Subdivision Surface Modeling", "Car Paint Shader", "Studio Lighting Rig", "Wheel Rim Detailing"],
    tools: ["Blender"],
    toolsUsed: ["Blender"],
    tags: ["Automotive", "Hard Surface", "Car Animation"],
    badges: ["Automotive", "Hard Surface", "Car Animation"],
    demoUrl: "https://www.instagram.com/p/DCwlBdoSlwP/?img_index=1",
    videoUrl: "https://www.instagram.com/p/DCwlBdoSlwP/?img_index=1",
    hasVideo: true,
  },
  {
    id: "japanese-garage-car",
    title: "3D Car & Environment Animation",
    windowTitle: "3D Car & Environment Animation",
    category: "3D",
    subtitle: "3D Car & Environment Animation",
    year: "2024",
    platform: "Environment & Vehicle",
    client: "Portfolio Showcase",
    image: "/figma/2829ef2d9da6a723dfe03062721208f816214a3d.webp",
    images: [
      "/figma/dee54ea1e185ce869ca6a94c16a58dd87b5c8749.webp",
      "/figma/ab162625ef0dfb9f6c949d73121bd733507c054a.webp",
      "/figma/4f8ceb21c7faaaca959c45503d2d39a1da30fa96.webp",
      "/figma/06b3db0f5996dafdf1fe2388e3d37548a162a27c.webp",
      "/figma/2829ef2d9da6a723dfe03062721208f816214a3d.webp",
    ],
    overview:
      "Animasi 3D mobil dan lingkungan bengkel bergaya Jepang. Seluruh proses (modeling, tekstur, pencahayaan, dan animasi) dikerjakan di Blender.(2024)",
    keyFeatures: ["Japanese Props & Signs", "Neon & Wet Surface Shader", "Atmospheric Mood", "Camera Tracking"],
    tools: ["Blender"],
    toolsUsed: ["Blender"],
    tags: ["Japanese Aesthetic", "Environment Art", "Night Lighting"],
    badges: ["Japanese Aesthetic", "Environment Art", "Night Lighting"],
    demoUrl: "https://www.instagram.com/p/DC_XhsdpZFB/?img_index=2",
    videoUrl: "/figma/all render.mp4",
    hasVideo: true,
  },
];

// Standardized mapping of all 29 window mockup header titles across 3D projects
export const MOCKUP_WINDOW_HEADER_MAP: Record<string, string> = {
  // Hero 3D Cluster (3 cascading mockups)
  "347:1191": "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)",
  "347:1224": "ITB x NTU Singapore Digital Twin",
  "347:1249": "AR Warship Indonesia",

  // 3D1: Malin Kundang
  "347:1291": "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)",
  "347:1317": "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)",
  "347:1341": "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)",

  // 3D2: ITB x NTU Singapore Digital Twin
  "347:1440": "ITB x NTU Singapore Digital Twin",
  "347:1465": "ITB x NTU Singapore Digital Twin",
  "347:1490": "ITB x NTU Singapore Digital Twin",

  // 3D3: AR Warship Indonesia
  "347:1531": "AR Warship Indonesia",
  "347:1556": "AR Warship Indonesia",
  "347:1582": "AR Warship Indonesia",

  // 3D4: 3D Knight & Medieval Asset
  "347:1621": "3D Animation Short Film",
  "347:1659": "3D Animation Short Film",

  // 3D5: 3D Interior / Cozy Room
  "347:1392": "3D Interior",
  "347:1414": "3D Interior",

  // 3D6: 3D Environment Animation / Scifi Unreal
  "347:2552": "3D Animation Unreal",
  "347:2786": "3D Animation Unreal",
  "347:2806": "3D Animation Unreal",
  "347:2826": "3D Animation Unreal",

  // 3D7: 3D Lancer Evo IX Animation
  "347:2574": "Lancer Evo IX 3D Model",
  "347:2596": "Lancer Evo IX 3D Model",
  "347:2662": "Lancer Evo IX 3D Model",
  "347:2706": "Lancer Evo IX 3D Model",

  // 3D8: 3D Japanese Garage Animation
  "347:2618": "3D Car & Environment Animation",
  "347:2640": "3D Car & Environment Animation",
  "347:2684": "3D Car & Environment Animation",
  "347:2728": "3D Car & Environment Animation",
  "347:2750": "3D Car & Environment Animation",
};

// Deterministic set of all top-level node IDs belonging to Frame 2 (UI/UX Section)
export const F2_NODE_IDS = new Set([
  "347:1007", "347:73", "347:1028", "347:1053", "347:1080", "347:1082", "347:1084",
  "347:1110", "347:1121", "347:1126", "347:1139", "347:1152", "347:1165", "347:1167",
  "347:uiux_mockups_cluster", "347:1168", "347:1169", "347:1171", "347:1175", "347:1180",
  "347:1186", "347:1679", "347:1681", "347:1703", "347:1714", "347:1754", "347:1819",
  "347:1845", "347:1882", "347:1893", "347:1894", "347:2543", "347:3619", "347:3620",
]);

export const DOCK_APP_METADATA: Record<string, { name: string }> = {
  // Design & Multimedia (Row 1)
  "347:975": { name: "Figma" },
  "347:976": { name: "Photoshop" },
  "347:977": { name: "Illustrator" },
  "347:978": { name: "Alight Motion" },
  "347:979": { name: "Canva" },
  "347:980": { name: "Premiere Pro" },
  "347:981": { name: "CapCut" },

  // 3D Design (Row 2)
  "347:987": { name: "Blender" },
  "347:988": { name: "Unity" },
  "347:989": { name: "Unreal Engine" },
  "347:990": { name: "CLO 3D" },
  "347:991": { name: "Daz 3D" },
};

