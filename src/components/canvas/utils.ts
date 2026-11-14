import React from "react";
import type { SceneNode, StrokeSpec } from "@/types/portfolio";

export function getPositionStyle(node: SceneNode): React.CSSProperties {
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

export function getFontFamily(ff?: string): string {
  if (ff === "Bagel Fat One") return "'Bagel Fat One', cursive, sans-serif";
  if (ff === "Inter") return "'Inter', sans-serif";
  return "'Poppins', sans-serif";
}

export function renderStrokeOverlay(
  stroke: StrokeSpec,
  w: number,
  h: number,
  br?: number | string,
  isMarchingAnts?: boolean
): React.ReactNode {
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
      rx = numBr;
    }

    // Only opt-in marching ants strokes receive the animation class
    const shouldAnimate = Boolean(isMarchingAnts);

    return React.createElement(
      "svg",
      {
        width: w,
        height: h,
        viewBox: `0 0 ${w} ${h}`,
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          overflow: "visible",
          pointerEvents: "none",
        },
        "aria-hidden": "true",
      },
      React.createElement("rect", {
        x,
        y,
        width: rw,
        height: rh,
        rx,
        ry: rx,
        fill: "none",
        stroke: c,
        strokeWidth: sw,
        strokeDasharray: dash.join(","),
        className: shouldAnimate ? "figma-marching-ants" : undefined,
      })
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

  return React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: inset,
      right: inset,
      bottom: inset,
      left: inset,
      border: `${sw}px solid ${c}`,
      borderRadius: radius,
      boxSizing: "border-box",
      pointerEvents: "none",
    },
  });
}
