"use client";

import React, { memo } from "react";
import { PortfolioProject } from "@/data/portfolioData";
import { MockupWindowHeader } from "@/components/ui/MockupWindowHeader";
import { InteractiveTypewriterText } from "@/components/ui/InteractiveTypewriterText";

export interface ProjectCardProps {
  project: PortfolioProject;
  onOpenLightbox?: (src: string, title?: string) => void;
  className?: string;
}

/**
 * Reusable ProjectCard wrapper combining a standardized OS Window Mockup
 * (with MockupWindowHeader and top-layered red/green title badge at z-30)
 * and a dashed Figma-style "TOOL USED & OVERVIEW" information panel.
 */
export const ProjectCard = memo(function ProjectCard({
  project,
  onOpenLightbox,
  className = "",
}: ProjectCardProps) {
  const is3D = project.category === "3D";
  const badgeBg = is3D ? "#D93B4B" : "#4A9460";
  const primaryImage = project.image || project.images?.[0] || "";
  const windowTabTitle = project.windowTitle || project.subtitle || project.title;

  return (
    <article
      id={`project-${project.id}`}
      className={`relative flex flex-col gap-6 ${className}`}
    >
      {/* Top-layered Project Title Badge (z-30) */}
      <div
        className="relative z-30 inline-flex self-start items-center justify-center px-8 py-4 rounded-[20px] border-[4px] border-black shadow-[8px_8px_0px_0px_#000]"
        style={{ backgroundColor: badgeBg }}
      >
        <h3
          className="text-white text-2xl md:text-4xl font-normal tracking-wide"
          style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
        >
          {project.title}
        </h3>
      </div>

      {/* Window Mockup Preview (z-10) */}
      {primaryImage && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpenLightbox?.(primaryImage, project.title)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenLightbox?.(primaryImage, project.title);
            }
          }}
          className="relative z-10 w-full rounded-[25px] overflow-hidden border border-black/15 shadow-lg cursor-zoom-in group bg-[#1E1E1E]"
        >
          {is3D && <MockupWindowHeader title={windowTabTitle} />}
          <img
            src={primaryImage}
            alt={project.title}
            className="w-full h-auto object-cover block"
            draggable={false}
          />
        </div>
      )}

      {/* Dashed Figma Selection Info Panel ("TOOL USED" & "OVERVIEW") */}
      <div className="relative z-20 border-[3px] border-dashed border-[#0C8CE9] bg-[#0C8CE9]/[0.08] p-6 md:p-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center">
        {/* 4 Corner Selection Handles */}
        <span className="absolute -top-2.5 -left-2.5 w-5 h-5 bg-[#0C8CE9] border-2 border-[#0C8CE9]" />
        <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-[#0C8CE9] border-2 border-[#0C8CE9]" />
        <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 bg-[#0C8CE9] border-2 border-[#0C8CE9]" />
        <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 bg-[#0C8CE9] border-2 border-[#0C8CE9]" />

        {/* TOOL USED Column */}
        <div className="flex flex-col items-start gap-3">
          <span className="text-lg font-bold tracking-wider text-black uppercase">
            TOOL USED
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full bg-white/90 border border-black/20 text-xs font-semibold text-black"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* OVERVIEW Column */}
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold tracking-wider text-black uppercase">
            OVERVIEW
          </span>
          <InteractiveTypewriterText
            text={project.overview}
            className="text-sm md:text-base text-black/90 leading-relaxed text-justify"
          />
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-black/10 text-xs font-medium text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
});

export default ProjectCard;

