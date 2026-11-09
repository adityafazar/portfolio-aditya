"use client";

import React, { memo, useRef, useState, useEffect, useMemo, useCallback } from "react";

export interface TextRunItem {
  text: string;
  fw?: number;
  fs?: number;
  ff?: string;
  lh?: number;
  c?: string;
}

export function getFontFamilyHelper(ff?: string): string {
  if (ff === "Bagel Fat One") return "'Bagel Fat One', cursive, sans-serif";
  if (ff === "Inter") return "'Inter', sans-serif";
  return "'Poppins', sans-serif";
}

export interface InteractiveTypewriterTextProps {
  text?: string;
  runs?: TextRunItem[];
  innerStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  lineHeightOverride?: string;
  typingSpeedMs?: number; // default 10ms
  bufferMs?: number; // default 150ms
  threshold?: number; // default 0.15
  caretColor?: string; // default "#0C8CE9"
  onComplete?: () => void;
}

export const InteractiveTypewriterText = memo(function InteractiveTypewriterText({
  text,
  runs: propRuns,
  innerStyle = {},
  className = "",
  style = {},
  lineHeightOverride,
  typingSpeedMs = 8,
  bufferMs = 100,
  threshold = 0.15,
  caretColor = "#0C8CE9",
  onComplete,
}: InteractiveTypewriterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const runs: TextRunItem[] = useMemo(() => {
    if (propRuns && propRuns.length > 0) return propRuns;
    return [{ text: text || "" }];
  }, [propRuns, text]);

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
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setTypedChars(0);
            setIsDone(false);
            setHasStarted(true);
          }, bufferMs);
        } else {
          if (timeoutId) clearTimeout(timeoutId);
          setHasStarted(false);
          setIsDone(false);
          setTypedChars(0);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [bufferMs, threshold]);

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
        onComplete?.();
      }
    }, typingSpeedMs);

    return () => clearInterval(timer);
  }, [hasStarted, isDone, totalChars, typingSpeedMs, onComplete]);

  const handleReplay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
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
      className={`select-text cursor-pointer ${className}`}
      style={{
        ...innerStyle,
        ...style,
        lineHeight: lineHeightOverride || innerStyle.lineHeight || style.lineHeight,
        textAlign: innerStyle.textAlign || style.textAlign || "justify",
        textJustify: (innerStyle as any).textJustify || (style as any).textJustify || "inter-word",
        textAlignLast: (innerStyle as any).textAlignLast || (style as any).textAlignLast || "left",
        position: "relative",
      }}
      onClick={handleReplay}
      title="Klik untuk memutar ulang animasi teks"
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
              fontFamily: run.ff ? getFontFamilyHelper(run.ff) : undefined,
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
          className="inline-block w-[4px] h-[0.85em] ml-[3px] animate-pulse"
          style={{
            backgroundColor: caretColor,
            verticalAlign: "baseline",
            transform: "translateY(2px)",
          }}
        />
      )}
    </div>
  );
});

