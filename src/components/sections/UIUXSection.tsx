"use client";

import React, { memo } from "react";
import { UIUX_PROJECTS } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";

export interface UIUXSectionProps {
  onOpenLightbox?: (src: string, title?: string) => void;
}

export const UIUXSection = memo(function UIUXSection({ onOpenLightbox }: UIUXSectionProps) {
  return (
    <section id="uiux-section" className="w-full py-12 space-y-14">
      <div className="inline-flex items-center px-8 py-4 rounded-[20px] border-[4px] border-black bg-[#4A9460] shadow-[8px_8px_0px_0px_#000]">
        <h2
          className="text-white text-3xl md:text-5xl"
          style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
        >
          UI/UX Design
        </h2>
      </div>

      <div className="space-y-14">
        {UIUX_PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>
    </section>
  );
});

export default UIUXSection;

