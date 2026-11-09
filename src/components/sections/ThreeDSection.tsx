"use client";

import React, { memo } from "react";
import { THREE_D_PROJECTS } from "@/data/portfolioData";
import { ProjectCard } from "@/components/ui/ProjectCard";

export interface ThreeDSectionProps {
  onOpenLightbox?: (src: string, title?: string) => void;
}

export const ThreeDSection = memo(function ThreeDSection({
  onOpenLightbox,
}: ThreeDSectionProps) {
  return (
    <section id="three-d-section" className="w-full py-12 space-y-14">
      <div className="inline-flex items-center px-8 py-4 rounded-[20px] border-[4px] border-black bg-[#D93B4B] shadow-[8px_8px_0px_0px_#000]">
        <h2
          className="text-white text-3xl md:text-5xl"
          style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
        >
          3D Design (Animation, Digital Twin, &amp; AR)
        </h2>
      </div>

      <div className="space-y-14">
        {THREE_D_PROJECTS.map((project) => (
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

export default ThreeDSection;

