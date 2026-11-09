import fs from "fs";
import path from "path";

const SCRATCH_DIR =
  "/Users/adityafazar/.gemini/antigravity/brain/a8039ce7-8982-4788-8e46-9cbc57f7b885/scratch";
const INPUT_JSON = path.join(SCRATCH_DIR, "figma_node_paths.json");
const OUTPUT_JSON = path.resolve(
  "/Users/adityafazar/Antigravity/Web/src/data/figmaScene.json"
);

const raw = JSON.parse(fs.readFileSync(INPUT_JSON, "utf8"));
const root = raw.nodes["347:5"].document;

// Key layout elements for weaving pairs
const f834 = root.children?.find((c) => c.id === "347:834");
const g849 = root.children?.find((c) => c.id === "347:849");
const n1165 = root.children?.find((c) => c.id === "347:1165");
const n1121 = root.children?.find((c) => c.id === "347:1121");

// Special @2x native Figma exported subtrees (masks, glass blur, dense QR vectors)
const SPECIAL_PNG_NODES = {
  "347:141": { src: "/figma/special_347_141.webp", alt: "3D Viewport Floor Grid" },
  "347:858": { src: "/figma/special_347_858.webp", alt: "Blender XYZ Axis Gizmo" },
  "347:870": { src: "/figma/special_347_870.webp", alt: "Creative Tools Sidebar" },
  "347:1896": {
    src: "/figma/special_347_1896.webp",
    alt: "QR Code - 3D Animation Blender",
    href: "https://www.instagram.com/p/C3RkIOQJn46/?hl=en&img_index=1",
  },
  "347:2846": {
    src: "/figma/special_347_2846.webp",
    alt: "QR Code - 3D Environment Animation",
    href: "https://www.instagram.com/p/DAf1NqIyJWI/?utm_source=ig_web_copy_link&cplk=NTc4MTIwNjQ2YQ==",
  },
  "347:3650": {
    src: "/figma/special_347_3650.webp",
    alt: "QR Code - Lancer Evo IX Animation",
    href: "https://www.instagram.com/p/DCwlBdoSlwP/?img_index=1",
  },
  "347:4304": {
    src: "/figma/special_347_4304.webp",
    alt: "QR Code - Japanese Garage Animation",
    href: "https://www.instagram.com/p/DC_XhsdpZFB/?img_index=2",
  },
};

// Watch Video button frames mapped to their target URLs
const ACTION_FRAME_LINKS = {
  "347:1619": "https://www.instagram.com/p/C3RkIOQJn46/?hl=en&img_index=1",
  "347:2548":
    "https://www.instagram.com/p/DAf1NqIyJWI/?utm_source=ig_web_copy_link&cplk=NTc4MTIwNjQ2YQ==",
  "347:4301": "https://www.instagram.com/p/DCwlBdoSlwP/?img_index=1",
  "347:4920": "https://www.instagram.com/p/DC_XhsdpZFB/?img_index=2",
};

// Duplicate text nodes used purely as Z-order weave masks over black cables
const WEAVE_DUPLICATE_TEXT_IDS = new Set([
  "347:998",
  "347:1000",
  "347:1170",
  "347:1172",
]);

// Duplicate container frames used purely as Z-order weave masks over black cables
const WEAVE_DUPLICATE_FRAME_IDS = new Set([
  "347:996",
  "347:997",
  "347:999",
  "347:1169",
  "347:1171",
]);

// Free-floating decorative 3D cutouts that overlap cards/text (keep pointer-events: none)
const DECORATIVE_CUTOUT_IDS = new Set([
  "347:811", // hero floor gradient image
  "347:895", // hero lanyard
  "347:1174", // floating malin kundang intro island
  "347:1215", // palm tree intro
  "347:1217", // stormtrooper intro
  "347:1269", // submarine cutout (Hero 3D)
  "347:1337", // palm tree 1
  "347:1338", // palm tree 2
  "347:1512", // water tanks cutout
  "347:1576", // submarine cutout (3D3 AR Warship)
  "347:1641", // knight helmet cutout
  "347:1658", // horse cutout
  "347:2530", // houseplant cutout
  "347:2772", // stormtrooper cutout
]);

function round(n, digits = 3) {
  if (typeof n !== "number" || !Number.isFinite(n)) return 0;
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

function rgba(color, opacity = 1) {
  if (!color) return "transparent";
  const r = Math.round((color.r ?? 0) * 255);
  const g = Math.round((color.g ?? 0) * 255);
  const b = Math.round((color.b ?? 0) * 255);
  const a = round((color.a ?? 1) * opacity, 4);
  if (a >= 0.999) {
    return `rgb(${r},${g},${b})`;
  }
  return `rgba(${r},${g},${b},${a})`;
}

function extractTransform(rt) {
  if (!rt) return { x: 0, y: 0 };
  const [[a, b, tx], [c, d, ty]] = rt;
  const isPureTranslate =
    Math.abs(a - 1) < 1e-4 &&
    Math.abs(d - 1) < 1e-4 &&
    Math.abs(b) < 1e-4 &&
    Math.abs(c) < 1e-4;
  if (isPureTranslate) {
    return { x: round(tx, 2), y: round(ty, 2) };
  }
  return {
    m: [
      round(a, 6),
      round(c, 6),
      round(b, 6),
      round(d, 6),
      round(tx, 2),
      round(ty, 2),
    ],
    rawRt: [
      [a, b],
      [c, d],
    ],
  };
}

function compileBackgroundLines(groupNode) {
  // Compact representation for the 3 subtle Blender viewport grid groups
  const lines = [];
  const children = [];
  for (const c of groupNode.children || []) {
    if (c.visible === false) continue;
    if (c.type === "LINE") {
      const stroke = (c.strokes || []).find(
        (s) => s.visible !== false && s.type === "SOLID"
      );
      if (!stroke) continue;
      const [[a, b, tx], [cc, d, ty]] = c.relativeTransform;
      const len = c.size?.x || 0;
      const x1 = round(tx, 2);
      const y1 = round(ty, 2);
      const x2 = round(tx + a * len, 2);
      const y2 = round(ty + cc * len, 2);
      lines.push({
        x1,
        y1,
        x2,
        y2,
        c: rgba(stroke.color, stroke.opacity ?? 1),
        sw: round(c.strokeWeight || 1.5, 2),
      });
    } else {
      const compiled = compileNode(c);
      if (compiled) children.push(compiled);
    }
  }
  const tf = extractTransform(groupNode.relativeTransform);
  return {
    id: groupNode.id,
    t: "GRID_GROUP",
    w: round(groupNode.size?.x || 1920, 2),
    h: round(groupNode.size?.y || 9723, 2),
    x: tf.x,
    y: tf.y,
    m: tf.m,
    op: groupNode.opacity !== undefined ? round(groupNode.opacity, 3) : undefined,
    lines,
    ch: children.length ? children : undefined,
  };
}

function compileTextRuns(node) {
  let rawChars = node.characters || "";
  let overrides = Array.isArray(node.characterStyleOverrides)
    ? [...node.characterStyleOverrides]
    : [];

  // Strip trailing \r or \n that Figma sometimes leaves after single-line display headings
  while (rawChars.length > 0 && (rawChars.endsWith("\r") || rawChars.endsWith("\n"))) {
    rawChars = rawChars.slice(0, -1);
    if (overrides.length > rawChars.length) {
      overrides.length = rawChars.length;
    }
  }
  rawChars = rawChars.replace(/\r\n/g, "\n").replace(/[\r\u2028]/g, "\n");

  const baseStyle = node.style || {};
  const table = node.styleOverrideTable || {};

  if (!overrides.length || Object.keys(table).length === 0) {
    return { text: rawChars };
  }

  const runs = [];
  for (let i = 0; i < rawChars.length; i++) {
    const ovKey = overrides[i] || 0;
    const ch = rawChars[i];
    if (runs.length > 0 && runs[runs.length - 1].ovKey === ovKey) {
      runs[runs.length - 1].text += ch;
    } else {
      runs.push({ ovKey, text: ch });
    }
  }

  if (runs.length === 1 && runs[0].ovKey === 0) {
    return { text: rawChars };
  }

  return {
    runs: runs.map((r) => {
      const ov = table[r.ovKey] || {};
      const fill = (ov.fills || []).find(
        (f) => f.visible !== false && f.type === "SOLID"
      );
      const span = { text: r.text };
      if (ov.fontWeight && ov.fontWeight !== baseStyle.fontWeight)
        span.fw = ov.fontWeight;
      if (ov.fontSize && ov.fontSize !== baseStyle.fontSize)
        span.fs = round(ov.fontSize, 2);
      if (ov.fontFamily && ov.fontFamily !== baseStyle.fontFamily)
        span.ff = ov.fontFamily;
      if (ov.lineHeightPx && ov.lineHeightPx !== baseStyle.lineHeightPx)
        span.lh = round(ov.lineHeightPx, 2);
      if (fill) span.c = rgba(fill.color, fill.opacity ?? 1);
      return span;
    }),
  };
}

function countTabbars(n) {
  let count = n.name && /blender-tabbar/i.test(n.name) ? 1 : 0;
  for (const c of n.children || []) count += countTabbars(c);
  return count;
}

function findPrimaryImageRef(n) {
  for (const f of n.fills || []) {
    if (f.visible !== false && f.type === "IMAGE" && f.imageRef) return f.imageRef;
  }
  for (const c of n.children || []) {
    if (c.name && /blender-tabbar/i.test(c.name)) continue;
    const r = findPrimaryImageRef(c);
    if (r) return r;
  }
  return null;
}

function compileNode(node, insideWindow = false) {
  if (node.visible === false) return null;

  // Background grid groups
  if (node.id === "347:6" || node.id === "347:73" || node.id === "347:140") {
    return compileBackgroundLines(node);
  }

  // Detect whether this node is a complete unified Blender window container
  const isWindowContainer =
    !insideWindow &&
    node.id !== "347:5" &&
    node.id !== "347:812" &&
    countTabbars(node) === 1;

  const windowImgRef = isWindowContainer ? findPrimaryImageRef(node) : null;
  const isWindow = Boolean(windowImgRef);

  let cp = undefined;

  // Weave overlay synchronization:
  if (node.id === "347:1171" && n1165) {
    node = {
      ...n1165,
      id: "347:1171",
      clipsContent: false,
      children: (n1165.children || []).map((tc) => ({
        ...tc,
        id: "347:1172",
      })),
    };
    cp = "inset(-40px -40px -40px 22.01%)";
  } else if (node.id === "347:1169" && n1121) {
    node = {
      ...n1121,
      id: "347:1169",
      clipsContent: false,
      children: (n1121.children || []).map((tc) => ({
        ...tc,
        id: "347:1170",
      })),
    };
    cp = "inset(-40px -40px -40px 47.63%)";
  }

  const tf = extractTransform(node.relativeTransform);
  const w = round(node.size?.x ?? node.absoluteBoundingBox?.width ?? 0, 2);
  const h = round(node.size?.y ?? node.absoluteBoundingBox?.height ?? 0, 2);
  const op =
    node.opacity !== undefined && node.opacity < 0.999
      ? round(node.opacity, 3)
      : undefined;

  // Special @2x native Figma exported subtrees
  if (SPECIAL_PNG_NODES[node.id]) {
    const spec = SPECIAL_PNG_NODES[node.id];
    return {
      id: node.id,
      t: "SPECIAL_IMG",
      x: tf.x,
      y: tf.y,
      m: tf.m,
      w,
      h,
      op,
      src: spec.src,
      alt: spec.alt,
      href: spec.href,
    };
  }

  // VECTOR / LINE / ELLIPSE -> inline SVG with Figma's exact fillGeometry & strokeGeometry
  if (node.type === "VECTOR" || node.type === "LINE" || node.type === "ELLIPSE") {
    const solidFill = (node.fills || []).find(
      (f) => f.visible !== false && f.type === "SOLID"
    );
    const solidStroke = (node.strokes || []).find(
      (s) => s.visible !== false && s.type === "SOLID"
    );
    const fg =
      solidFill && Array.isArray(node.fillGeometry) && node.fillGeometry.length > 0
        ? node.fillGeometry.map((g) => ({
            d: g.path,
            r: g.windingRule === "EVENODD" ? "evenodd" : undefined,
          }))
        : undefined;
    const sg =
      solidStroke &&
      (node.strokeWeight ?? 0) > 0 &&
      Array.isArray(node.strokeGeometry) &&
      node.strokeGeometry.length > 0
        ? node.strokeGeometry.map((g) => ({
            d: g.path,
            r: g.windingRule === "EVENODD" ? "evenodd" : undefined,
          }))
        : undefined;

    if (!fg && !sg) return null;

    // Timeline circles in Working Experience: reduce stroke to proportional 6px so they don't merge (User Request #6)
    if (node.id === "347:934" || node.id === "347:932" || node.id === "347:933") {
      return {
        id: node.id,
        t: "SVG",
        x: tf.x,
        y: tf.y,
        m: tf.m,
        w: Math.max(w, 1),
        h: Math.max(h, 1),
        op,
        fc: fg ? rgba(solidFill.color, solidFill.opacity ?? 1) : undefined,
        fg,
        sc: "rgb(0,0,0)",
        sw: 6,
      };
    }

    return {
      id: node.id,
      t: "SVG",
      x: tf.x,
      y: tf.y,
      m: tf.m,
      w: Math.max(w, 1),
      h: Math.max(h, 1),
      op,
      fc: fg ? rgba(solidFill.color, solidFill.opacity ?? 1) : undefined,
      fg,
      sc: sg ? rgba(solidStroke.color, solidStroke.opacity ?? 1) : undefined,
      sg,
      clipIn:
        fg && sg && node.strokeAlign === "INSIDE" ? true : undefined,
    };
  }

  // TEXT -> real HTML selectable text
  if (node.type === "TEXT") {
    const s = node.style || {};
    const solidFill = (node.fills || []).find(
      (f) => f.visible !== false && f.type === "SOLID"
    );
    const content = compileTextRuns(node);
    const isUnorderedList =
      Array.isArray(node.lineTypes) &&
      node.lineTypes.some((lt) => lt === "UNORDERED");
    return {
      id: node.id,
      t: "TEXT",
      x: tf.x,
      y: tf.y,
      m: tf.m,
      w,
      h,
      op,
      ff: s.fontFamily || "Poppins",
      fs: round(s.fontSize || 16, 2),
      fw: s.fontWeight || 400,
      lh: s.lineHeightPx ? round(s.lineHeightPx, 2) : undefined,
      ls: s.letterSpacing ? round(s.letterSpacing, 3) : undefined,
      ta:
        (s.textAlignHorizontal || "LEFT").toLowerCase() === "justified"
          ? "justify"
          : (s.textAlignHorizontal || "LEFT").toLowerCase(),
      va: (s.textAlignVertical || "TOP").toLowerCase(),
      ar: s.textAutoResize || "FIXED",
      trim: s.leadingTrim === "CAP_HEIGHT" ? true : undefined,
      c: solidFill ? rgba(solidFill.color, solidFill.opacity ?? 1) : "#000",
      dup: WEAVE_DUPLICATE_TEXT_IDS.has(node.id) ? true : undefined,
      bullets:
        isUnorderedList && content.text
          ? content.text.split("\n")
          : undefined,
      ...content,
    };
  }

  // GROUP / FRAME / RECTANGLE
  const visibleFills = (node.fills || []).filter((f) => f.visible !== false);
  let bg = undefined;
  const imgs = [];

  for (const f of visibleFills) {
    if (f.type === "SOLID") {
      bg = rgba(f.color, f.opacity ?? 1);
    } else if (f.type === "IMAGE" && f.imageRef) {
      const imgEntry = {
        src: `/figma/${f.imageRef}.webp`,
        mode: f.scaleMode || "FILL",
      };
      if (f.opacity !== undefined && f.opacity < 0.999) {
        imgEntry.op = round(f.opacity, 3);
      }
      if (f.scaleMode === "STRETCH" && Array.isArray(f.imageTransform)) {
        const [[sx, , tx], [, sy, ty]] = f.imageTransform;
        if (sx > 0 && sy > 0) {
          imgEntry.crop = [
            round(100 / sx, 3),
            round(100 / sy, 3),
            round((-tx / sx) * 100, 3),
            round((-ty / sy) * 100, 3),
          ];
        }
      }
      imgs.push(imgEntry);
    }
  }

  // Corner radius
  let br = undefined;
  if (node.type === "GROUP" && node.children?.some((c) => c.name && /blender-tabbar/i.test(c.name))) {
    const childCr = node.children.find((c) => c.cornerRadius)?.cornerRadius;
    br = round(childCr || 25, 2);
  } else if (Array.isArray(node.rectangleCornerRadii)) {
    const [tl, tr, brr, bl] = node.rectangleCornerRadii.map((v) => round(v, 2));
    if (tl || tr || brr || bl) {
      br = tl === tr && tr === brr && brr === bl ? tl : `${tl}px ${tr}px ${brr}px ${bl}px`;
    }
  } else if (node.cornerRadius) {
    br = round(node.cornerRadius, 2);
  }

  // Strokes
  let stroke = undefined;
  const sw = node.strokeWeight ?? 0;
  const solidStroke = (node.strokes || []).find(
    (s) => s.visible !== false && s.type === "SOLID"
  );
  if (solidStroke && sw > 0) {
    stroke = {
      c: rgba(solidStroke.color, solidStroke.opacity ?? 1),
      sw: round(sw, 2),
      sa: node.strokeAlign || "INSIDE",
      dash:
        Array.isArray(node.strokeDashes) && node.strokeDashes.length > 0
          ? node.strokeDashes.map((d) => round(d, 2))
          : undefined,
    };
  }

  // Effects (DROP_SHADOW)
  let boxShadow = undefined;
  let dropFilter = undefined;
  const shadows = (node.effects || []).filter(
    (e) => e.visible !== false && e.type === "DROP_SHADOW"
  );
  if (shadows.length > 0) {
    const hasFill = Boolean(bg || imgs.length > 0);
    if (node.type === "GROUP" || !hasFill) {
      const e = shadows[0];
      dropFilter = `drop-shadow(${round(e.offset.x, 1)}px ${round(
        e.offset.y,
        1
      )}px ${round(e.radius, 1)}px ${rgba(e.color, 1)})`;
    } else {
      boxShadow = shadows
        .map((e) => {
          let ox = e.offset.x;
          let oy = e.offset.y;
          // Convert canvas-space drop shadow vector into local rotated box coordinates
          if (tf.rawRt) {
            const [[a, b], [c, d]] = tf.rawRt;
            ox = a * e.offset.x + c * e.offset.y;
            oy = b * e.offset.x + d * e.offset.y;
          }
          return `${round(ox, 1)}px ${round(oy, 1)}px ${round(
            e.radius,
            1
          )}px ${round(e.spread || 0, 1)}px ${rgba(e.color, 1)}`;
        })
        .join(", ");
    }
  }

  // Children: propagate insideWindow if this node is a window container
  const children = [];
  let rawChildren = node.children || [];
  if (node.id === "347:1171" && n1165?.children?.[0]) {
    rawChildren = [
      {
        ...n1165.children[0],
        id: "347:1172",
      },
    ];
  } else if (node.id === "347:1169" && n1121?.children?.[0]) {
    rawChildren = [
      {
        ...n1121.children[0],
        id: "347:1170",
      },
    ];
  }
  for (const c of rawChildren) {
    const compiled = compileNode(c, insideWindow || isWindow);
    if (compiled) children.push(compiled);
  }

  // Check if this node is a good interactive Lightbox target
  const absY = node.absoluteBoundingBox?.y ?? 0;
  const isShowcaseCutout =
    node.id === "347:1174" ||
    node.id === "347:1217" ||
    node.id === "347:1269" ||
    node.id === "347:1512" ||
    node.id === "347:1641" ||
    node.id === "347:1658" ||
    node.id === "347:2772";

  const isLightboxable =
    !insideWindow &&
    (isWindow ||
      isShowcaseCutout ||
      (imgs.length > 0 &&
        absY > 4300 &&
        w >= 170 &&
        h >= 170 &&
        !DECORATIVE_CUTOUT_IDS.has(node.id)));

  const lbSrc = isWindow
    ? `/figma/${windowImgRef}.webp`
    : isLightboxable && imgs.length > 0
    ? imgs[imgs.length - 1].src
    : undefined;

  const isCutout =
    !isLightboxable &&
    DECORATIVE_CUTOUT_IDS.has(node.id) &&
    node.id !== "347:811";

  // Woven title badge pairs (base layer behind cable + clipped overlay in front of cable)
  const weaveInfo =
    node.id === "347:834"
      ? { group: "portfolio", isBase: true, rot: -1.4 }
      : node.id === "347:996"
      ? { group: "portfolio", isOverlay: true, rot: -1.4 }
      : node.id === "347:1165"
      ? { group: "uiux", isBase: true, rot: 1.4 }
      : node.id === "347:1171"
      ? { group: "uiux", isOverlay: true, rot: 1.4 }
      : node.id === "347:1121"
      ? { group: "mobileapps", isBase: true, rot: -1.4 }
      : node.id === "347:1169"
      ? { group: "mobileapps", isOverlay: true, rot: -1.4 }
      : undefined;

  // Check if this node is a section or project title badge (Bagel Fat One heading)
  const isHeroSubtitle = node.id === "347:838";
  const isWeaveDup =
    WEAVE_DUPLICATE_FRAME_IDS.has(node.id) && !weaveInfo?.isOverlay;

  const isTitleBadge =
    Boolean(weaveInfo) ||
    (!isWindow &&
      !lbSrc &&
      !isWeaveDup &&
      node.id !== "347:835" && // Inner Portfolio badge inside unified 347:834
      node.id !== "347:997" && // Inner duplicate overlay badge
      !ACTION_FRAME_LINKS[node.id] &&
      (node.type === "FRAME" || node.type === "GROUP" || node.type === "RECTANGLE") &&
      h >= 75 &&
      w >= 300 &&
      Array.isArray(node.children) &&
      node.children.some(
        (c) =>
          c.type === "TEXT" &&
          c.style?.fontFamily === "Bagel Fat One" &&
          !c.characters?.includes("Watch Video")
      ));

  const titleRot = weaveInfo
    ? weaveInfo.rot
    : isTitleBadge
    ? isHeroSubtitle
      ? 0
      : String(node.id)
          .split("")
          .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
          2 ===
        0
      ? -1.4
      : 1.4
    : undefined;

  const shouldClip = Boolean(
    node.clipsContent || (node.type === "GROUP" && br)
  );

  return {
    id: node.id,
    t: "BOX",
    name: isLightboxable || isCutout ? node.name : undefined,
    x: tf.x,
    y: tf.y,
    m: tf.m,
    w,
    h,
    op,
    clip: shouldClip ? true : undefined,
    cp,
    bg,
    imgs: imgs.length > 0 ? imgs : undefined,
    br,
    stroke,
    bs: boxShadow,
    df: dropFilter,
    href: ACTION_FRAME_LINKS[node.id],
    lb: lbSrc,
    cutout: isCutout ? true : undefined,
    titleBadge: isTitleBadge ? true : undefined,
    titleRot,
    heroSubtitle: isHeroSubtitle ? true : undefined,
    weaveGroup: weaveInfo?.group,
    weaveOverlay: weaveInfo?.isOverlay ? true : undefined,
    weaveOrigin: weaveInfo?.origin,
    dup: isWeaveDup ? true : undefined,
    ch: children.length > 0 ? children : undefined,
  };
}

// Group root-level tabbar and image pairs into unified window containers
const ROOT_WINDOW_PAIRS = [
  { tabId: "347:1659", rectId: "347:1388", name: "3D Knight & Interior Render Window" },
  { tabId: "347:2806", rectId: "347:2544", name: "3D Scifi Unreal Render Window" },
  { tabId: "347:2786", rectId: "347:2545", name: "3D Scifi Unreal Detail Window" },
  { tabId: "347:2826", rectId: "347:2546", name: "3D Scifi Unreal Wireframe Window" },
];

const tabIdsToRemove = new Set(ROOT_WINDOW_PAIRS.map((p) => p.tabId));
const rectMap = new Map(ROOT_WINDOW_PAIRS.map((p) => [p.rectId, p.tabId]));

// Combine 347:834 (Hero Frame 7 with dashed border and "Portfolio" badge) and 347:849 (Group 1 with 4 corner handles)
let unifiedPortfolioGroup = null;
if (f834 && g849) {
  const [[a, b, tx1], [c, d, ty1]] = f834.relativeTransform;
  const [[ga, gb, tx2], [gc, gd, ty2]] = g849.relativeTransform;
  const dtx = tx2 - tx1;
  const dty = ty2 - ty1;
  const ltx = a * dtx + c * dty;
  const lty = b * dtx + d * dty;

  const handleChildren = (g849.children || []).map((r) => ({
    ...r,
    relativeTransform: [
      [1, 0, round(r.relativeTransform[0][2] + ltx, 2)],
      [0, 1, round(r.relativeTransform[1][2] + lty, 2)],
    ],
  }));

  unifiedPortfolioGroup = {
    ...f834,
    name: "Hero Portfolio Selection Group",
    children: [...(f834.children || []), ...handleChildren],
  };
}

const newRootChildren = [];
for (const c of root.children || []) {
  if (tabIdsToRemove.has(c.id)) continue;
  if (c.id === "347:849") continue;
  if (c.id === "347:834" && unifiedPortfolioGroup) {
    newRootChildren.push(unifiedPortfolioGroup);
    continue;
  }
  if (rectMap.has(c.id)) {
    const tab = root.children.find((t) => t.id === rectMap.get(c.id));
    const winGroup = {
      id: "win_" + c.id,
      name: c.name + " Window",
      type: "GROUP",
      visible: true,
      absoluteBoundingBox: {
        x: Math.min(c.absoluteBoundingBox.x, tab.absoluteBoundingBox.x),
        y: Math.min(c.absoluteBoundingBox.y, tab.absoluteBoundingBox.y),
        width:
          Math.max(
            c.absoluteBoundingBox.x + c.absoluteBoundingBox.width,
            tab.absoluteBoundingBox.x + tab.absoluteBoundingBox.width
          ) - Math.min(c.absoluteBoundingBox.x, tab.absoluteBoundingBox.x),
        height:
          Math.max(
            c.absoluteBoundingBox.y + c.absoluteBoundingBox.height,
            tab.absoluteBoundingBox.y + tab.absoluteBoundingBox.height
          ) - Math.min(c.absoluteBoundingBox.y, tab.absoluteBoundingBox.y),
      },
      relativeTransform: c.relativeTransform,
      size: c.size,
      children: [
        {
          ...c,
          relativeTransform: [
            [1, 0, 0],
            [0, 1, 0],
          ],
        },
        {
          ...tab,
          relativeTransform: [
            [1, 0, tab.absoluteBoundingBox.x - c.absoluteBoundingBox.x],
            [0, 1, tab.absoluteBoundingBox.y - c.absoluteBoundingBox.y],
          ],
        },
      ],
    };
    newRootChildren.push(winGroup);
  } else {
    newRootChildren.push(c);
  }
}

const compiledChildren = [];
for (const c of newRootChildren) {
  const n = compileNode(c);
  if (n) compiledChildren.push(n);
}

// =========================================================================
// Harmonize & Standardize Page/Section/Card Spacing
// =========================================================================
function findById(nodes, id) {
  for (const n of nodes || []) {
    if (n.id === id) return n;
    const found = findById(n.ch, id);
    if (found) return found;
  }
  return null;
}

// 1. Align "Education" & "Tools I Use" Section (347:952) columns, cards, and internal vertical spacing
const secEduTools = findById(compiledChildren, "347:952");
if (secEduTools) {
  secEduTools.h = 988;

  // Left Column: Education (347:953)
  const colEdu = findById([secEduTools], "347:953");
  if (colEdu) {
    colEdu.y = 0;
    colEdu.h = 988;
  }
  const hdrEdu = findById([secEduTools], "347:954");
  if (hdrEdu) hdrEdu.y = 0;

  // Right Column: Tools I Use (347:968)
  const colTools = findById([secEduTools], "347:968");
  if (colTools) {
    colTools.y = 0;
    colTools.h = 988;
  }
  const hdrTools = findById([secEduTools], "347:969");
  if (hdrTools) hdrTools.y = 0;

  // Uniform 48px vertical gaps between Header (h: 144) -> Row 1 Cards (y: 192, h: 374) -> Row 2 Cards (y: 614, h: 374)
  const cardEdu1 = findById([secEduTools], "347:956");
  const cardEdu2 = findById([secEduTools], "347:962");
  const cardTools1 = findById([secEduTools], "347:971");
  const cardTools2 = findById([secEduTools], "347:983");

  if (cardEdu1) cardEdu1.y = 192;
  if (cardTools1) cardTools1.y = 192;
  if (cardEdu2) cardEdu2.y = 614;
  if (cardTools2) cardTools2.y = 614;

  // Harmonize internal vertical rhythm inside Education cards (347:956, 347:962)
  for (const eduCard of [cardEdu1, cardEdu2]) {
    if (!eduCard || !eduCard.ch) continue;
    const badge = eduCard.ch[0]; // Date pill badge (h: 67)
    const logo = eduCard.ch[1];  // School emblem (h: 99)
    const title = eduCard.ch[2]; // Degree / Major (h: 28)
    const sub = eduCard.ch[3];   // Institution name (h: 21)
    if (badge) badge.y = 30;
    if (logo) logo.y = 122;
    if (title) title.y = 244;
    if (sub) sub.y = 296;
  }

  // Harmonize internal vertical rhythm inside Tools I Use cards (347:971, 347:983) so badges & subtitles align with Education cards
  for (const toolsCard of [cardTools1, cardTools2]) {
    if (!toolsCard || !toolsCard.ch) continue;
    const badge = toolsCard.ch[0]; // Category pill badge (h: 67)
    const sub = toolsCard.ch[2];   // Skills subtitle (h: 24)
    if (badge) badge.y = 30;
    if (sub) sub.y = 296;
  }

  // Center the blue dashed crosshair (347:993 horizontal, 347:994 vertical) right in the 48px intersection between the 4 cards (center Y = 590)
  const crossH = findById([secEduTools], "347:993");
  const crossV = findById([secEduTools], "347:994");
  if (crossH) crossH.y = 590;
  if (crossV) crossV.y = 507;
}

// 2. Standardize ALL Blue Dashed Overview / Info Boxes to match the Gold Standard (Image 2 - 347:1779)
// a) Unified "Short Description" badge & 4 corner handles for UI Project Cards:
function makeHandle(id, x, y) {
  return {
    id,
    t: "BOX",
    x: round(x, 2),
    y: round(y, 2),
    w: 40,
    h: 40,
    bg: "rgb(12,140,233)",
    stroke: { c: "rgb(12,140,233)", sw: 4, sa: "CENTER" },
  };
}

// 1. UI2: Perpustakaan Kemenikbud App (347:1703)
const cPerpus = findById(compiledChildren, "347:1703");
if (cPerpus) {
  const badge = findById([cPerpus], "347:1708");
  const box = findById([cPerpus], "347:1704");
  const hTL = findById([cPerpus], "347:1710");
  const hTR = findById([cPerpus], "347:1711");
  const hBR = findById([cPerpus], "347:1712");
  const hBL = findById([cPerpus], "347:1713");

  if (box) { box.x = 0; box.y = 0; box.h = 344; }
  // Position badge neatly on the bottom border (centered horizontally & vertically on bottom edge)
  if (badge) { badge.x = Math.round((588 - 298) / 2); badge.y = 344 - 30; }
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hTR) { hTR.x = 568; hTR.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 324; }
  if (hBR) { hBR.x = 568; hBR.y = 324; }
  cPerpus.h = 375;
}

// 2. UI4: Mobile Banking App (347:1028)
const cMobileBank = findById(compiledChildren, "347:1028");
if (cMobileBank) {
  const badge = findById([cMobileBank], "347:1051");
  const box = findById([cMobileBank], "347:1029");
  const hTL = findById([cMobileBank], "347:1034");
  const hTR = findById([cMobileBank], "347:1033");
  const hBL = findById([cMobileBank], "347:1050");
  const hBR = findById([cMobileBank], "347:1049");

  // Move top handles from inside box to parent container
  if (box && box.ch) {
    box.ch = box.ch.filter((c) => c.id !== "347:1033" && c.id !== "347:1034");
  }
  if (box) { box.x = 0; box.y = 0; box.h = 891; }
  // Position badge neatly on the bottom border (centered horizontally & vertically on bottom edge)
  if (badge) { badge.x = Math.round((524 - 298) / 2); badge.y = 891 - 30; }
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hTR) { hTR.x = 504; hTR.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 871; }
  if (hBR) { hBR.x = 504; hBR.y = 871; }
  if (hTL && !cMobileBank.ch.find((c) => c.id === hTL.id)) cMobileBank.ch.push(hTL);
  if (hTR && !cMobileBank.ch.find((c) => c.id === hTR.id)) cMobileBank.ch.push(hTR);
  cMobileBank.h = 922;
}

// 3. UI5: Smart Home App (347:1084)
const cSmartHome = findById(compiledChildren, "347:1084");
if (cSmartHome) {
  const badge = findById([cSmartHome], "347:1108");
  const box = findById([cSmartHome], "347:1085");
  const hTL = findById([cSmartHome], "347:1090");
  const hTR = findById([cSmartHome], "347:1089");
  const hBL = findById([cSmartHome], "347:1107");
  const hBR = findById([cSmartHome], "347:1106");

  // Move top handles from inside box to parent container
  if (box && box.ch) {
    box.ch = box.ch.filter((c) => c.id !== "347:1089" && c.id !== "347:1090");
  }
  if (box) { box.x = 0; box.y = 0; box.h = 720; }
  // Position badge neatly on the bottom border (centered horizontally & vertically on bottom edge)
  if (badge) { badge.x = Math.round((653 - 298) / 2); badge.y = 720 - 30; }
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hTR) { hTR.x = 633; hTR.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 700; }
  if (hBR) { hBR.x = 633; hBR.y = 700; }
  if (hTL && !cSmartHome.ch.find((c) => c.id === hTL.id)) cSmartHome.ch.push(hTL);
  if (hTR && !cSmartHome.ch.find((c) => c.id === hTR.id)) cSmartHome.ch.push(hTR);
  cSmartHome.h = 751;
}

// 4. UI6: Coffee Shop App (347:1053)
const cCoffee = findById(compiledChildren, "347:1053");
if (cCoffee) {
  const badge = findById([cCoffee], "347:1078");
  const box = findById([cCoffee], "347:1054");
  const hTL = findById([cCoffee], "347:1059");
  const hTR = findById([cCoffee], "347:1058");
  const hBL = findById([cCoffee], "347:1077");
  const hBR = findById([cCoffee], "347:1076");

  // Move top handles from inside box to parent container
  if (box && box.ch) {
    box.ch = box.ch.filter((c) => c.id !== "347:1058" && c.id !== "347:1059");
  }
  if (box) { box.x = 0; box.y = 0; box.h = 949; }
  // Position badge neatly on the bottom border (centered horizontally & vertically on bottom edge)
  if (badge) { badge.x = Math.round((524 - 298) / 2); badge.y = 949 - 30; }
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hTR) { hTR.x = 504; hTR.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 929; }
  if (hBR) { hBR.x = 504; hBR.y = 929; }
  if (hTL && !cCoffee.ch.find((c) => c.id === hTL.id)) cCoffee.ch.push(hTL);
  if (hTR && !cCoffee.ch.find((c) => c.id === hTR.id)) cCoffee.ch.push(hTR);
  cCoffee.h = 980;
}

// 5. UI1: Geologi Mapping App (347:1882)
const cGeologiRight = findById(compiledChildren, "347:1882");
if (cGeologiRight) {
  const badge = findById([cGeologiRight], "347:1883");
  const box = findById([cGeologiRight], "347:1885");
  if (badge) { badge.x = Math.round((475 - 298) / 2); badge.y = 0; }
  if (box) {
    box.x = 20; box.y = 81; box.h = 414;
    const hTL = findById([box], "347:1892");
    const hBL = findById([box], "347:1890");
    let hTR = findById([box], "347:1891");
    let hBR = findById([box], "347:1889");
    if (hTL) { hTL.x = -20; hTL.y = -20; }
    if (hBL) { hBL.x = -20; hBL.y = 394; }
    if (!hTR) { hTR = makeHandle("347:1891", 415, -20); box.ch.push(hTR); } else { hTR.x = 415; hTR.y = -20; hTR.w = 40; hTR.h = 40; }
    if (!hBR) { hBR = makeHandle("347:1889", 415, 394); box.ch.push(hBR); } else { hBR.x = 415; hBR.y = 394; hBR.w = 40; hBR.h = 40; }
  }
}

// 6. Hero Description Box Corner Handles (347:896..899 aligned to 347:1113 corners)
const heroBox = findById(compiledChildren, "347:1112");
const heroHTL = findById(compiledChildren, "347:897");
const heroHTR = findById(compiledChildren, "347:898");
const heroHBL = findById(compiledChildren, "347:896");
const heroHBR = findById(compiledChildren, "347:899");
if (heroBox) {
  const hx = heroBox.x ?? 953;
  const hy = heroBox.y ?? 1464;
  const hw = heroBox.w ?? 886;
  const hh = 586; // height of inner dashed box 347:1113
  if (heroHTL) { heroHTL.x = hx - 20; heroHTL.y = hy - 20; heroHTL.w = 40; heroHTL.h = 40; }
  if (heroHTR) { heroHTR.x = hx + hw - 20; heroHTR.y = hy - 20; heroHTR.w = 40; heroHTR.h = 40; }
  if (heroHBL) { heroHBL.x = hx - 20; heroHBL.y = hy + hh - 20; heroHBL.w = 40; heroHBL.h = 40; }
  if (heroHBR) { heroHBR.x = hx + hw - 20; heroHBR.y = hy + hh - 20; heroHBR.w = 40; heroHBR.h = 40; }
  const heroBadge = findById([heroBox], "347:1119");
  if (heroBadge) {
    heroBadge.x = Math.round((hw - 298) / 2);
    heroBadge.y = hh - 30;
  }
  const heroDescInner = findById([heroBox], "347:1113");
  if (heroDescInner && Array.isArray(heroDescInner.ch)) {
    // Delete cursor arrow and caret line (347:1115) from Hero Short Description box per user request
    heroDescInner.ch = heroDescInner.ch.filter((c) => c.id !== "347:1115");
  }
}

// b) Clean up all other blue dashed overview & info boxes corner handles & padding:
const boxGeologi = findById(compiledChildren, "347:1846");
if (boxGeologi) {
  const inner1851 = findById([boxGeologi], "347:1851");
  if (inner1851 && typeof boxGeologi.h === "number" && typeof inner1851.h === "number") {
    inner1851.y = Math.round((boxGeologi.h - inner1851.h) / 2);
  }
  const hTL = findById([boxGeologi], "347:1847");
  const hTR = findById([boxGeologi], "347:1849");
  const hBL = findById([boxGeologi], "347:1848");
  const hBR = findById([boxGeologi], "347:1850");
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hTR) { hTR.x = 1202; hTR.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 214; }
  if (hBR) { hBR.x = 1202; hBR.y = 214; }
}

const pPerpus = findById(compiledChildren, "347:1714");
const boxPerpus = findById(compiledChildren, "347:1715");
if (boxPerpus) {
  const c1 = findById([boxPerpus], "347:1719");
  const c2 = findById([boxPerpus], "347:1733");
  const c3 = findById([boxPerpus], "347:1737");
  if (c1) { c1.x = 50; c1.y = 50; }
  if (c2) { c2.x = 464.5; c2.y = 50; }
  if (c3) { c3.x = 695; c3.y = 50; }

  // Move top-right handle 347:1753 into boxPerpus so all 4 handles are enclosed
  const hTL = findById([boxPerpus], "347:1716");
  const hBL = findById([boxPerpus], "347:1717");
  const hBR = findById([boxPerpus], "347:1718");
  const hTR = findById([pPerpus], "347:1753");
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 258; }
  if (hBR) { hBR.x = 1206; hBR.y = 258; }
  if (hTR && !boxPerpus.ch.find((c) => c.id === hTR.id)) {
    hTR.x = 1206; hTR.y = -20;
    boxPerpus.ch.push(hTR);
    if (pPerpus) pPerpus.ch = pPerpus.ch.filter((c) => c.id !== hTR.id);
  }
}

const pSmartBldg = findById(compiledChildren, "347:1790");
const boxSmartBldg = findById(compiledChildren, "347:1791");
if (boxSmartBldg) {
  const c1 = findById([boxSmartBldg], "347:1794");
  const c2 = findById([boxSmartBldg], "347:1802");
  const c3 = findById([boxSmartBldg], "347:1806");
  if (c1) { c1.x = 50; c1.y = 50; }
  if (c2) { c2.x = 531; c2.y = 50; }
  if (c3) { c3.x = 863; c3.y = 50; }

  const hTL = findById([boxSmartBldg], "347:1792");
  const hBL = findById([boxSmartBldg], "347:1793");
  const hTR = findById([pSmartBldg], "347:1817");
  let hBR = findById([boxSmartBldg], "347:1791_br");
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 215; }
  if (hTR && !boxSmartBldg.ch.find((c) => c.id === hTR.id)) {
    hTR.x = 1206; hTR.y = -20;
    boxSmartBldg.ch.push(hTR);
    if (pSmartBldg) pSmartBldg.ch = pSmartBldg.ch.filter((c) => c.id !== hTR.id);
  }
  if (!hBR) {
    hBR = makeHandle("347:1791_br", 1206, 215);
    boxSmartBldg.ch.push(hBR);
  } else {
    hBR.x = 1206; hBR.y = 215;
  }
}

// c) Standardize all 8 2-column 3D project dashed boxes (TOOL USED + OVERVIEW):
// Fixed uniform height 240px, uniform top/bottom padding, precise corner handles
const TWO_COL_3D_DASHED_BOXES = [
  { boxId: "347:1367", col1: "347:1368", col2: "347:1372", handles: ["347:1375", "347:1376", "347:1377", "347:1378"] },
  { boxId: "347:1515", col1: "347:1516", col2: "347:1521", handles: ["347:1524", "347:1525", "347:1526", "347:1527"] },
  { boxId: "347:1604", col1: "347:1605", col2: "347:1609", handles: ["347:1612", "347:1613", "347:1614", "347:1615"] },
  { boxId: "347:1646", col1: "347:1647", col2: "347:1651", handles: ["347:1654", "347:1655", "347:1656", "347:1657"] },
  { boxId: "347:2531", col1: "347:2532", col2: "347:2536", handles: ["347:2539", "347:2540", "347:2541", "347:2542"] },
  { boxId: "347:2773", col1: "347:2774", col2: "347:2779", handles: ["347:2782", "347:2783", "347:2784", "347:2785"] },
  { boxId: "347:3625", col1: "347:3626", col2: "347:3630", handles: ["347:3633", "347:3634", "347:3635", "347:3636"] },
  { boxId: "347:3637", col1: "347:3638", col2: "347:3642", handles: ["347:3645", "347:3646", "347:3647", "347:3648"] },
];

// Normalize ITB overview text typography so it fits cleanly in 240px without distortion
const itbOverviewText = findById(compiledChildren, "347:1523");
if (itbOverviewText) {
  itbOverviewText.fs = 19;
  itbOverviewText.lh = 28;
  itbOverviewText.h = 112;
}
const itbOverviewCol = findById(compiledChildren, "347:1521");
if (itbOverviewCol) {
  itbOverviewCol.h = 155;
}
const itbToolCol = findById(compiledChildren, "347:1516");
if (itbToolCol) {
  itbToolCol.h = 155;
}

// Normalize Scifi Unreal overview text
const scifiOverviewText = findById(compiledChildren, "347:2781");
if (scifiOverviewText) {
  scifiOverviewText.fs = 21;
  scifiOverviewText.lh = 30;
  scifiOverviewText.h = 90;
}
const scifiOverviewCol = findById(compiledChildren, "347:2779");
if (scifiOverviewCol) {
  scifiOverviewCol.h = 135;
}

for (const item of TWO_COL_3D_DASHED_BOXES) {
  const box = findById(compiledChildren, item.boxId);
  if (!box) continue;
  box.h = 240;
  const c1 = findById([box], item.col1);
  const c2 = findById([box], item.col2);
  if (c1 && c2) {
    const maxH = Math.max(c1.h || 0, c2.h || 0);
    const topPad = Math.max(28, Math.round((240 - maxH) / 2));
    c1.y = topPad;
    c2.y = topPad;
  }
  const [tlId, trId, brId, blId] = item.handles;
  const hTL = findById([box], tlId);
  const hTR = findById([box], trId);
  const hBR = findById([box], brId);
  const hBL = findById([box], blId);
  if (hTL) { hTL.x = -20; hTL.y = -20; }
  if (hTR) { hTR.x = box.w - 20; hTR.y = -20; }
  if (hBL) { hBL.x = -20; hBL.y = 220; }
  if (hBR) { hBR.x = box.w - 20; hBR.y = 220; }
}

// 3. Harmonize Page-Wide Section & Project Vertical Rhythm (Uniform 56px gap between project blocks)
// Also standardize left header X positions to x: 54 across UI/UX sections
function shiftNodeY(id, dy) {
  if (!dy) return;
  const n = findById(compiledChildren, id);
  if (!n) return;
  if (typeof n.y === "number") {
    n.y = round(n.y + dy, 2);
  } else if (Array.isArray(n.m)) {
    n.m[5] = round(n.m[5] + dy, 2);
  }
}

// Standardize left-aligned section headers to x: 54 (matching Education & Tools I Use at x: 54)
for (const hdrId of ["347:901", "347:1894", "347:1679", "347:1080", "347:1110", "347:1082"]) {
  const hdr = findById(compiledChildren, hdrId);
  if (hdr && typeof hdr.x === "number") {
    hdr.x = 54;
  }
}
const containerSmartBldg = findById(compiledChildren, "347:1754");
if (containerSmartBldg) {
  containerSmartBldg.h = 1022; // Align container height to actual content bottom (347:1790 at y: 787 + h: 235 = 1022)
  const hdrSmartBldg = findById([containerSmartBldg], "347:1755");
  if (hdrSmartBldg) {
    hdrSmartBldg.x = 126; // Inside 347:1754 (x: -72) -> global X = 54
  }
}

// 1. Working Experience timeline node circles (Image 1 - resize from oversized 79px to balanced 44px)
const cYellow = findById(compiledChildren, "347:934");
const cBlue = findById(compiledChildren, "347:932");
const cRed = findById(compiledChildren, "347:933");
const circleD = 44;
const circleR = circleD / 2;
const circlePath = "M44 22C44 34.1493 34.1493 44 22 44C9.85075 44 0 34.1493 0 22C0 9.85075 9.85075 0 22 0C34.1493 0 44 9.85075 44 22Z";

if (cYellow) {
  cYellow.w = circleD;
  cYellow.h = circleD;
  cYellow.x = 228.5 - circleR; // 206.5
  cYellow.y = 39.5 - circleR;  // 17.5
  cYellow.sw = 4.5;
  if (cYellow.fg && cYellow.fg[0]) cYellow.fg[0].d = circlePath;
}
if (cBlue) {
  cBlue.w = circleD;
  cBlue.h = circleD;
  cBlue.x = 782.5 - circleR; // 760.5
  cBlue.y = 39.5 - circleR;  // 17.5
  cBlue.sw = 4.5;
  if (cBlue.fg && cBlue.fg[0]) cBlue.fg[0].d = circlePath;
}
if (cRed) {
  cRed.w = circleD;
  cRed.h = circleD;
  cRed.x = 1336.5 - circleR; // 1314.5
  cRed.y = 39.5 - circleR;   // 17.5
  cRed.sw = 4.5;
  if (cRed.fg && cRed.fg[0]) cRed.fg[0].d = circlePath;
}

// 4. Hero Short Description text (347:1114) spacing & typography cleanup
const heroDesc = findById(compiledChildren, "347:1114");
if (heroDesc) {
  heroDesc.ta = "justify";
  heroDesc.lh = 49;
  if (Array.isArray(heroDesc.runs)) {
    for (const r of heroDesc.runs) {
      if (r.text) {
        // Fix double comma and double space in run: ', , dan ' -> ', dan '
        r.text = r.text.replace(/,\s*,\s*dan\s*/g, ", dan ");
        // Fix typo: 'Saya meupakan' -> 'Saya merupakan'
        r.text = r.text.replace(/Saya meupakan/g, "Saya merupakan");
        // Fix Indonesian grammar: 'di gunakan' -> 'digunakan'
        r.text = r.text.replace(/di gunakan/g, "digunakan");
      }
    }
  }
}

// 5. Remove horizontal cap lines on 2022 x 2026 vertical guideline (347:1025, 347:1026)
const guideBox = findById(compiledChildren, "347:1021");
if (guideBox && Array.isArray(guideBox.ch)) {
  guideBox.ch = guideBox.ch.filter(
    (c) => c.id !== "347:1025" && c.id !== "347:1026"
  );
}

// Extract 347:1215 (Palm Tree cutout) from Hero 3D window group 347:1189 and set 347:1189 to its true window bounds
const heroWin1189 = findById(compiledChildren, "347:1189");
const heroPalm1215 = findById(compiledChildren, "347:1215");
if (heroWin1189) {
  if (heroPalm1215) {
    heroPalm1215.x = round(heroWin1189.x ?? 847.38, 2);
    heroPalm1215.y = round(heroWin1189.y ?? 11853, 2);
    heroPalm1215.m = undefined;
    heroPalm1215.cutout = true;
    heroPalm1215.name = "3D Palm Tree Cutout";
    const idx1189 = compiledChildren.findIndex((c) => c.id === "347:1189");
    if (idx1189 !== -1) {
      compiledChildren.splice(idx1189 + 1, 0, heroPalm1215);
    } else {
      compiledChildren.push(heroPalm1215);
    }
  }
  heroWin1189.x = 1107;
  heroWin1189.y = 11909.75;
  heroWin1189.w = 717.93;
  heroWin1189.h = 493.16;
}

// Extract 347:1619 ("Watch Video" button) from 3D4 window group 347:1616 before SECTION_Y_SHIFTS
const win1616 = findById(compiledChildren, "347:1616");
const btn1619 = findById(compiledChildren, "347:1619");
if (win1616) {
  if (btn1619) {
    btn1619.x = round((win1616.x ?? 55) + (btn1619.x ?? 921), 2);
    btn1619.y = round((win1616.y ?? 16251.75) + (btn1619.y ?? 972), 2);
    btn1619.m = undefined;
    const idx1616 = compiledChildren.findIndex((c) => c.id === "347:1616");
    if (idx1616 !== -1) {
      compiledChildren.splice(idx1616 + 1, 0, btn1619);
    } else {
      compiledChildren.push(btn1619);
    }
  }
  win1616.h = 718;
}

// Shift section blocks so vertical gaps between consecutive sections are strictly uniform (56px) across the entire portfolio:
const SECTION_Y_SHIFTS = [
  // Working Experience + UI/UX Intro Assembly (+15px -> 48px gap after Education & Tools I Use)
  {
    dy: 15,
    ids: [
      "347:900", "347:901", "347:904", "347:905", "347:906", "347:949",
      "347:1007", "347:1021", "347:1027", "347:1121", "347:1123", "347:1124",
      "347:1165", "347:1167", "347:1169", "347:1171", "347:1173", "347:1175",
      "347:1180", "347:1186",
    ],
  },
  // UI2: Perpustakaan Kemendikbud App (+1px -> 56px gap after UI1)
  {
    dy: 1,
    ids: ["347:1679", "347:1681", "347:1703", "347:1714", "347:2543"],
  },
  // UI3: Smart Building Monitoring (+47px -> 56px gap after UI2)
  {
    dy: 47,
    ids: ["347:1754"],
  },
  // UI4: Mobile Banking App (+45px -> 56px gap after UI3 visual bottom)
  {
    dy: 45,
    ids: ["347:1080", "347:1028", "347:1126", "347:1168"],
  },
  // UI5: Smart Home App (+70px -> 56px gap after UI4 visual bottom)
  {
    dy: 70,
    ids: ["347:1110", "347:1152", "347:1084", "347:3619"],
  },
  // UI6: Coffee Shop App (+100px -> 56px gap after UI5 visual bottom)
  {
    dy: 100,
    ids: ["347:1082", "347:1053", "347:1139", "347:3620"],
  },
  // 3D2: ITB x NTU Singapore Digital Twin (-40px -> 56px gap after 3D1 Malin Kundang)
  {
    dy: -40,
    ids: ["347:1434"],
  },
  // 3D3: AR Warship Indonesia (+23px -> 56px gap after 3D2)
  {
    dy: 23,
    ids: ["347:1528"],
  },
  // 3D4: 3D Knight & Medieval Asset (+22px -> 56px gap after 3D3)
  {
    dy: 22,
    ids: ["347:1616", "347:1619", "347:1642", "win_347:1388", "347:1646", "347:1896", "347:1641", "347:1658"],
  },
  // 3D5: 3D Cozy Room & Isometric (+51px -> 56px gap after 3D4)
  {
    dy: 51,
    ids: ["347:1389", "347:1644", "347:1412", "347:2531", "347:2530"],
  },
  // 3D6: 3D Environment Animation / Scifi Unreal (+54px -> 56px gap after 3D5)
  {
    dy: 54,
    ids: [
      "347:2550", "347:2770", "347:2547", "win_347:2544", "win_347:2545", "win_347:2546",
      "347:2773", "347:2846", "347:2548", "347:2772",
    ],
  },
  // 3D7: 3D Lancer Evo IX Animation (+72px -> 56px gap after 3D6)
  {
    dy: 72,
    ids: ["347:3621", "347:2572", "347:2594", "347:2704", "347:2660", "347:3649", "347:3625"],
  },
  // 3D8: 3D Japanese Garage Animation (+93px -> 56px gap after 3D7)
  {
    dy: 93,
    ids: ["347:3623", "347:2616", "347:2638", "347:2726", "347:2748", "347:2682", "347:4303", "347:3637"],
  },
];

for (const group of SECTION_Y_SHIFTS) {
  for (const id of group.ids) {
    shiftNodeY(id, group.dy);
  }
}

// Working Experience vertical connector lines (347:900, 347:904, 347:905)
// Trim excess line length so they terminate cleanly inside the circle nodes / horizontal timeline bar at global Y = 3476,
// removing the protruding chimney stubs above the resized 44px circles.
const vLine1 = findById(compiledChildren, "347:900");
const vLine2 = findById(compiledChildren, "347:904");
const vLine3 = findById(compiledChildren, "347:905");
const timelineGroup = findById(compiledChildren, "347:906");
const timelineBarGY = (timelineGroup?.y ?? 3436) + 40; // 3476

for (const line of [vLine1, vLine2, vLine3]) {
  if (!line || !line.m) continue;
  const startGY = line.m[5];
  const newW = round(startGY - timelineBarGY, 1);
  line.w = newW;
  if (line.sg && line.sg[0]) {
    line.sg[0].d = `M0 -9.5L0 0L${newW} 0L${newW} -9.5L${newW} -19L0 -19L0 -9.5Z`;
  }
}

// Group the 4 UI/UX Intro Mockup Images into a single cluster for synchronized elegant rotation
const uiuxMockupIds = ["347:1027", "347:1123", "347:1124", "347:1173"];
const uiuxMockupNodes = [];
for (const id of uiuxMockupIds) {
  const node = findById(compiledChildren, id);
  if (node) uiuxMockupNodes.push(node);
}

if (uiuxMockupNodes.length === 4) {
  const idSet = new Set(uiuxMockupIds);
  const filtered = compiledChildren.filter((c) => !idSet.has(c.id));
  // Insert cluster AFTER the black loop line (347:1167) so the line is cleanly behind the pictures
  const idx1167 = filtered.findIndex((c) => c.id === "347:1167");
  const insertIdx = idx1167 !== -1 ? idx1167 + 1 : filtered.length;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  uiuxMockupNodes.forEach((n) => {
    const [a, b, c, d, tx, ty] = n.m;
    const corners = [
      [0, 0],
      [n.w, 0],
      [0, n.h],
      [n.w, n.h],
    ];
    corners.forEach(([px, py]) => {
      const gx = a * px + c * py + tx;
      const gy = b * px + d * py + ty;
      if (gx < minX) minX = gx;
      if (gx > maxX) maxX = gx;
      if (gy < minY) minY = gy;
      if (gy > maxY) maxY = gy;
    });
  });

  const clusterX = Math.round(minX);
  const clusterY = Math.round(minY);
  const clusterW = Math.round(maxX - minX);
  const clusterH = Math.round(maxY - minY);

  const localChildren = uiuxMockupNodes.map((n) => {
    const [a, b, c, d, tx, ty] = n.m;
    return {
      ...n,
      m: [a, b, c, d, Math.round((tx - clusterX) * 100) / 100, Math.round((ty - clusterY) * 100) / 100],
    };
  });

  const clusterGroup = {
    id: "347:uiux_mockups_cluster",
    t: "BOX",
    x: clusterX,
    y: clusterY,
    w: clusterW,
    h: clusterH,
    ch: localChildren,
  };

  filtered.splice(insertIdx, 0, clusterGroup);
  compiledChildren.length = 0;
  compiledChildren.push(...filtered);
}

// =========================================================================
// Point 5: AR Story of Malin Kundang - Mirror palm tree asset (transform: scaleX(-1))
// & clean up card layout (only 2 windows: wireframe 347:1288 + render 347:1315,
// tool overview 347:1367 below wireframe on left, remove stray 347:1339, clip card so palm tree trunks don't leak)
// =========================================================================
const tree1337 = findById(compiledChildren, "347:1337");
if (tree1337) {
  tree1337.mirrorX = true;
}

const malinGroup1287 = findById(compiledChildren, "347:1287");
if (malinGroup1287) {
  malinGroup1287.ch = (malinGroup1287.ch || []).filter((c) => c.id !== "347:1339");
  malinGroup1287.clip = true;
}

// =========================================================================
// Point 7: Card "3D Environment Interior" (Spacing & Alignment)
// Establish symmetrical 60px side margins and 60px center gap across the 1920 grid:
// Left column:  x = 60,  w = 870 (right edge: 930)
// Center gap:   60px (from 930 to 990)
// Right column: x = 990, w = 870 (right edge: 1860)
// Right margin: 60px (from 1860 to 1920)
// =========================================================================
const w1389 = findById(compiledChildren, "347:1389");
if (w1389) {
  w1389.x = 60;
  w1389.w = 870;
}

const w1412 = findById(compiledChildren, "347:1412");
if (w1412) {
  w1412.x = 990;
  w1412.w = 870;
}

const badge1644 = findById(compiledChildren, "347:1644");
if (badge1644) {
  badge1644.x = 990;
  badge1644.w = 870;
  const text1645 = badge1644.ch?.find((c) => c.id === "347:1645");
  if (text1645) {
    text1645.x = round((870 - (text1645.w || 795)) / 2, 1);
  }
}

const overview2531 = findById(compiledChildren, "347:2531");
if (overview2531) {
  overview2531.x = 990;
  overview2531.w = 870;
  // Update right-side handles to (870 - 20) = 850
  const hTopRight = overview2531.ch?.find((c) => c.id === "347:2540");
  if (hTopRight) hTopRight.x = 850;
  const hBotRight = overview2531.ch?.find((c) => c.id === "347:2541");
  if (hBotRight) hBotRight.x = 850;
}

// =========================================================================
// Harmonize ALL 29 Mockup Window Headers across all 8 3D project sections
// using the standardized MockupWindowHeader layout (fixed 32px height, 100% width, uniform typography)
// =========================================================================
const ALL_MOCKUP_WINDOWS = [
  // Hero 3D Cluster (3 cascading mockups)
  { gid: "347:1189", iid: "347:1190", hid: "347:1191", title: "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)" },
  { gid: "347:1219", iid: "347:1223", hid: "347:1224", title: "ITB x NTU Singapore Digital Twin" },
  { gid: "347:1246", iid: "347:1248", hid: "347:1249", title: "AR Warship Indonesia" },

  // 3D1: Malin Kundang
  { gid: "347:1288", iid: "347:1290", hid: "347:1291", title: "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)" },
  { gid: "347:1315", iid: "347:1316", hid: "347:1317", title: "Aset 3D untuk Augmented Reality cerita rakyat Malin Kundang (2023)" },

  // 3D2: ITB x NTU Singapore Digital Twin
  { gid: "347:1435", iid: "347:1439", hid: "347:1440", title: "ITB x NTU Singapore Digital Twin" },
  { gid: "347:1462", iid: "347:1464", hid: "347:1465", title: "ITB x NTU Singapore Digital Twin" },
  { gid: "347:1487", iid: "347:1489", hid: "347:1490", title: "ITB x NTU Singapore Digital Twin" },

  // 3D3: AR Warship Indonesia
  { gid: "347:1553", iid: "347:1555", hid: "347:1556", title: "AR Warship Indonesia" },
  { gid: "347:1579", iid: "347:1580", extraIid: "347:1581", hid: "347:1582", title: "AR Warship Indonesia" },
  { gid: "347:1529", iid: "347:1530", hid: "347:1531", title: "AR Warship Indonesia" },

  // 3D4: 3D Knight & Medieval Asset
  { gid: "347:1616", iid: "347:1618", hid: "347:1621", title: "3D Animation Short Film" },
  { gid: "win_347:1388", iid: "347:1388", hid: "347:1659", title: "3D Animation Short Film" },

  // 3D5: 3D Cozy Room & Isometric
  {
    gid: "347:1389",
    iid: "347:1390",
    stackedBottomIid: "347:1391",
    hid: "347:1392",
    title: "3D Interior",
    forceImg: "/figma/cd492dbdf60e7e35b3a281765e296b157849c464.webp",
  },
  {
    gid: "347:1412",
    iid: "347:1413",
    hid: "347:1414",
    title: "3D Interior",
    forceImg: "/figma/0846d863461e88923701b16f0ba02b2cbc339b7c.webp",
  },

  // 3D6: 3D Environment Animation / Scifi Unreal
  { gid: "347:2550", iid: "347:2551", hid: "347:2552", title: "3D Animation Unreal" },
  { gid: "win_347:2544", iid: "347:2544", hid: "347:2806", title: "3D Animation Unreal" },
  { gid: "win_347:2545", iid: "347:2545", hid: "347:2786", title: "3D Animation Unreal" },
  { gid: "win_347:2546", iid: "347:2546", hid: "347:2826", title: "3D Animation Unreal" },

  // 3D7: 3D Lancer Evo IX Animation
  { gid: "347:2572", iid: "347:2573", hid: "347:2574", title: "Lancer Evo IX 3D Model" },
  { gid: "347:2594", iid: "347:2595", hid: "347:2596", title: "Lancer Evo IX 3D Model" },
  { gid: "347:2660", iid: "347:2661", hid: "347:2662", title: "Lancer Evo IX 3D Model" },
  { gid: "347:2704", iid: "347:2705", hid: "347:2706", title: "Lancer Evo IX 3D Model" },

  // 3D8: 3D Japanese Garage Animation
  { gid: "347:2616", iid: "347:2617", hid: "347:2618", title: "3D Car & Environment Animation" },
  { gid: "347:2638", iid: "347:2639", hid: "347:2640", title: "3D Car & Environment Animation" },
  { gid: "347:2682", iid: "347:2683", hid: "347:2684", title: "3D Car & Environment Animation" },
  { gid: "347:2726", iid: "347:2727", hid: "347:2728", title: "3D Car & Environment Animation" },
  { gid: "347:2748", iid: "347:2749", hid: "347:2750", title: "3D Car & Environment Animation" },
];

function normalizeWindowImageNode(imgNode) {
  if (!imgNode || !Array.isArray(imgNode.imgs) || imgNode.imgs.length === 0) return;
  // Keep the topmost visible fill from Figma's fill stack
  const topFill = { ...imgNode.imgs[imgNode.imgs.length - 1] };
  if (Array.isArray(topFill.crop)) {
    let [cw, ch, cl, ct] = topFill.crop;
    // Eliminate any positive top offset (which previously left a gap under the 32px header)
    if (ct > 0) {
      ch = round(Math.max(100, ch + ct), 3);
      ct = 0;
    }
    // Eliminate any positive left offset
    if (cl > 0) {
      cw = round(Math.max(100, cw + cl), 3);
      cl = 0;
    }
    // Ensure right and bottom edges cover at least 100% of the window frame
    if (cl + cw < 100) {
      cw = round(100 - cl, 3);
    }
    if (ct + ch < 100) {
      ch = round(100 - ct, 3);
    }
    topFill.crop = [cw, ch, cl, ct];
  }
  imgNode.imgs = [topFill];
}

for (const m of ALL_MOCKUP_WINDOWS) {
  const g = findById(compiledChildren, m.gid);
  const img = findById(compiledChildren, m.iid);
  const h = findById(compiledChildren, m.hid);
  const extraImg = m.extraIid ? findById(compiledChildren, m.extraIid) : null;
  const stackedBottomImg = m.stackedBottomIid
    ? findById(compiledChildren, m.stackedBottomIid)
    : null;

  if (!g || !img || !h) continue;

  if (m.forceImg) {
    img.imgs = [{ src: m.forceImg, mode: "FILL" }];
    g.lb = m.forceImg;
  } else {
    normalizeWindowImageNode(img);
    if (img.imgs && img.imgs[0]) {
      g.lb = img.imgs[0].src;
    }
  }

  // 1. Group Container: clean 25px rounded corners and overflow clipping
  g.br = 25;
  g.clip = true;

  // 2. Image Fill: spans full window dimensions (or stacked top/bottom split for 347:1389)
  if (img.m) {
    if (img.m[0] === -1) {
      img.m[4] = g.w;
    } else {
      img.m[4] = 0;
    }
    img.m[5] = 0;
  } else {
    img.x = 0;
    img.y = 0;
  }
  img.w = g.w;

  if (stackedBottomImg) {
    // 347:1389: Two vertically stacked renders inside a single tall window frame
    const topH = 532.21;
    img.h = topH;
    img.br = "25px 25px 0px 0px";

    normalizeWindowImageNode(stackedBottomImg);
    stackedBottomImg.m = undefined;
    stackedBottomImg.x = 0;
    stackedBottomImg.y = topH;
    stackedBottomImg.w = g.w;
    stackedBottomImg.h = round(g.h - topH, 2);
    stackedBottomImg.br = "0px 0px 25px 25px";
  } else {
    img.h = g.h;
    img.br = 25;
  }

  if (extraImg) {
    // 347:1579: Half-wireframe top overlay (347:1581) over full render (347:1580)
    normalizeWindowImageNode(extraImg);
    extraImg.m = undefined;
    extraImg.x = 0;
    extraImg.y = 0;
    extraImg.w = g.w;
    extraImg.br = "25px 25px 0px 0px";
  }

  // 3. Header Bar: fixed 32px height, top-rounded corners, clean cream background
  h.m = undefined;
  h.x = 0;
  h.y = 0;
  h.w = g.w;
  h.h = 32;
  h.br = "25px 25px 0px 0px";
  h.clip = true;
  h.bg = "rgb(255,252,246)";
  h.windowHeader = true;
  h.title = m.title;
  h.ch = [];

  if (stackedBottomImg) {
    g.ch = [img, stackedBottomImg, h];
  } else if (extraImg) {
    g.ch = [img, extraImg, h];
  } else {
    g.ch = [img, h];
  }
}

const scene = {
  width: 1920,
  height: 21660,
  background: "#EDE8E0",
  children: compiledChildren,
};

fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(scene));

const stat = fs.statSync(OUTPUT_JSON);
console.log(
  `Compiled scene successfully to ${OUTPUT_JSON} (${(
    stat.size / 1024
  ).toFixed(1)} KB, ${compiledChildren.length} top-level layers)`
);

