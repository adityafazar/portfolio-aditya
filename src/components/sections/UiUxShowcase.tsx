"use client";

import React, { useState } from "react";
import { UIUX_PROJECTS, Project } from "@/data/portfolio";
import { Smartphone, Layout, ArrowUpRight, CheckCircle, Sparkles } from "lucide-react";
import { ProjectModal } from "@/components/modals/ProjectModal";

export const UiUxShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="uiux-projects" className="py-16 md:py-24 border-t-2 border-[#1A1A1A] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Figma */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#DB5F2D] bg-[#EDE8E0] px-3 py-1 rounded-md border border-[#1A1A1A] mb-3">
            <Layout className="w-3.5 h-3.5" /> Product & Interaction Design
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-poppins text-[#1A1A1A] tracking-tight">
                UI/UX Design
              </h2>
              <p className="text-lg sm:text-xl font-bold font-mono text-[#888888] mt-1">
                Mobile Apps & Website Solutions
              </p>
            </div>

            <div className="text-xs font-mono bg-[#EDE8E0] px-4 py-2 rounded-xl border border-[#1A1A1A]">
              Total: <span className="font-bold text-[#1A1A1A]">6 Selected Projects</span>
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UIUX_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-[#EDE8E0] rounded-2xl border-2 border-[#1A1A1A] shadow-retro hover:shadow-retroLg hover:-translate-y-1 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header Top */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#1A1A1A] text-white">
                    {project.platform}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#DB5F2D] bg-white px-2 py-0.5 rounded border border-[#1A1A1A]/30">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-poppins text-[#1A1A1A] group-hover:text-[#DB5F2D] transition-colors mb-1">
                  {project.title}
                </h3>

                <p className="text-xs font-semibold text-[#666666] font-mono mb-4">
                  {project.client}
                </p>

                {/* Overview preview */}
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed line-clamp-3 mb-4">
                  {project.overview}
                </p>

                {/* Key features checklist */}
                <div className="space-y-1.5 pt-3 border-t border-[#D5CEC2]">
                  <div className="text-[11px] font-mono font-bold text-[#888888] uppercase mb-1">
                    Key Features:
                  </div>
                  {project.keyFeatures.slice(0, 3).map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-[#222222] font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#4A9460] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Bottom */}
              <div className="p-6 pt-3 bg-[#E4DFD5] border-t-2 border-[#1A1A1A] flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.toolsUsed.slice(0, 2).map((tool, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#1A1A1A]/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#DB5F2D] text-white rounded-lg border border-[#1A1A1A] text-xs font-bold shadow-retro-sm hover:bg-[#C24F22] active:translate-y-0.5 transition-all"
                >
                  <span>Detail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

