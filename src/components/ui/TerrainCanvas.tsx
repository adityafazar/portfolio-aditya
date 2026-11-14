"use client";

import React, { useEffect, useRef, memo } from "react";

export const TerrainCanvas = memo(function TerrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const INK_COLOR = "#d5d1cbff";
    const NAME = "PORTFOLIO ADITYA FAZAR • ";
    const FONT = 'Poppins, ui-sans-serif, system-ui, "Helvetica Neue", Arial, sans-serif';
    const ROW_SHIFT = 3;
    const CW = 14;
    const CH = 18;
    const FPS = 36;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const fade = (t: number) => t * t * (3 - 2 * t);

    const hash = (x: number, y: number, z: number) => {
      let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
    };

    const noise = (x: number, y: number, z: number) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const zi = Math.floor(z);
      const xf = fade(x - xi);
      const yf = fade(y - yi);
      const zf = fade(z - zi);
      const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
      return lerp(
        lerp(lerp(c(0, 0, 0), c(1, 0, 0), xf), lerp(c(0, 1, 0), c(1, 1, 0), xf), yf),
        lerp(lerp(c(0, 0, 1), c(1, 0, 1), xf), lerp(c(0, 1, 1), c(1, 1, 1), xf), yf),
        zf
      );
    };

    const fbm = (x: number, y: number, z: number) =>
      0.6 * noise(x, y, z) +
      0.3 * noise(x * 2.1, y * 2.1, z * 1.7) +
      0.1 * noise(x * 4.3, y * 4.3, z * 2.9);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const s = {
      w: 0,
      h: 0,
      t: 40000,
      px: -9999,
      py: -9999,
      active: false,
      k: 0,
      scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
    };

    let raf = 0;
    let onScreen = true;
    let clock = 0;
    let last = 0;
    let lastDraw = 0;
    let scrollDebounceTimer: number | null = null;
    let pointerIdleTimer: number | null = null;

    const draw = () => {
      const { w, h, t, scrollY } = s;
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);
      let curSize = 0;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = INK_COLOR;

      const rows = Math.ceil(h / CH);
      const cols = Math.ceil(w / CW);
      const rowOffset = Math.floor(scrollY / CH);
      const ySubPixel = scrollY % CH;

      for (let j = -1; j <= rows + 1; j++) {
        const j_global = j + rowOffset;
        const y = j * CH + CH / 2 - ySubPixel;
        const letterIdxBase = j_global * ROW_SHIFT;

        for (let i = 0; i < cols; i++) {
          const letter = NAME[((i + letterIdxBase) % NAME.length + NAME.length) % NAME.length];
          if (letter === " ") continue;

          const x = i * CW + CW / 2;
          const lens = s.k > 0 ? s.k * Math.max(0, 1 - Math.hypot(x - s.px, y - s.py) / 170) : 0;
          let v = fbm(i * 0.06, j_global * 0.09, t * 1.2e-4) + lens * 0.45;
          v = clamp((v - 0.35) * 1.9);
          if (v < 0.12) continue;

          ctx.globalAlpha = 0.10 + Math.pow(v, 1.35) * 0.75;

          const size = v > 0.85 ? 12 : v > 0.5 ? 10 : 8;
          if (size !== curSize) {
            ctx.font = `900 ${size}px ${FONT}`;
            curSize = size;
          }
          ctx.fillText(letter, x, y);
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = 1;
      s.w = w;
      s.h = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const frame = (now: number) => {
      raf = 0;
      if (reduced || !onScreen || document.hidden) return;

      s.k += ((s.active ? 1 : 0) - s.k) * 0.12;
      clock += last ? Math.min(50, now - last) : 0;
      last = now;

      if (!s.active && s.k <= 0.01) {
        s.k = 0;
        draw();
        return;
      }

      raf = requestAnimationFrame(frame);
      if (now - lastDraw < 1000 / FPS) return;
      lastDraw = now;
      s.t = clock + 40000;
      draw();
    };

    const start = () => {
      if (raf || reduced || !onScreen || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    // Draw once after scroll settles instead of redrawing on every scroll tick
    const onScroll = () => {
      s.scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollDebounceTimer !== null) {
        window.clearTimeout(scrollDebounceTimer);
      }
      scrollDebounceTimer = window.setTimeout(() => {
        scrollDebounceTimer = null;
        s.scrollY = window.scrollY || window.pageYOffset || 0;
        draw();
      }, 120);
    };

    const onPointerMove = (e: PointerEvent) => {
      s.px = e.clientX;
      s.py = e.clientY;
      const inside = s.px >= 0 && s.py >= 0 && s.px <= s.w && s.py <= s.h;
      s.active = inside;
      if (pointerIdleTimer !== null) {
        window.clearTimeout(pointerIdleTimer);
      }
      if (inside) {
        start();
        pointerIdleTimer = window.setTimeout(() => {
          pointerIdleTimer = null;
          s.active = false;
        }, 650);
      }
    };

    const onPointerLeave = () => {
      if (pointerIdleTimer !== null) {
        window.clearTimeout(pointerIdleTimer);
        pointerIdleTimer = null;
      }
      s.active = false;
      s.px = -9999;
      s.py = -9999;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (onScreen && (s.active || s.k > 0.01)) start();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (!onScreen) stop();
      else if (s.active || s.k > 0.01) start();
    });
    io.observe(canvas);

    resize();

    return () => {
      stop();
      if (scrollDebounceTimer !== null) window.clearTimeout(scrollDebounceTimer);
      if (pointerIdleTimer !== null) window.clearTimeout(pointerIdleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="terrain"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
});
