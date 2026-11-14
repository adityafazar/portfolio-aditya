"use client";

import React, { memo } from "react";
import type { VideoWindowConfig } from "@/types/portfolio";
import { MockupWindowHeader } from "@/components/ui/MockupWindowHeader";
import { LazyVideo } from "@/components/ui/LazyVideo";

export const VideoMockupWindow = memo(function VideoMockupWindow({
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
