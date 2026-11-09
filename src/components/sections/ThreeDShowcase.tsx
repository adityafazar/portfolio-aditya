"use client";

import React, { useState } from "react";
import { THREE_D_PROJECTS, Project } from "@/data/portfolio";
import { Boxes, Play, ArrowUpRight, Sparkles, Layers, Video } from "lucide-react";
import { ProjectModal } from "@/components/modals/ProjectModal";

export const ThreeDShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="3d-projects" className="py-16 md:py-24 border-t-2 border-[#1A1A1A] bg-[#EDE8E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#4565D6] bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#1A1A1A] mb-3">
            <Boxes className="w-3.5 h-3.5" /> Modeling, Rendering & Real-time
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-poppins text-[#1A1A1A] tracking-tight">
                3D Design
              </h2>
              <p className="text-lg sm:text-xl font-bold font-mono text-[#888888] mt-1">
                Animation, Digital Twin, &amp; AR
              </p>
            </div>

            <div className="text-xs font-mono bg-[#FAF8F5] px-4 py-2 rounded-xl border border-[#1A1A1A]">
              Blender &middot; Unreal Engine &middot; Unity
            </div>
          </div>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {THREE_D_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-[#FAF8F5] rounded-2xl border-2 border-[#1A1A1A] shadow-retro hover:shadow-retroLg hover:-translate-y-1 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Card Media Graphic Placeholder / 3D Canvas Mockup */}
              <div className="h-44 bg-[#2B2B2B] relative flex items-center justify-center p-4 overflow-hidden border-b-2 border-[#1A1A1A]">
                {/* 3D Wireframe / Grid Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />

                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#3D3D3D] border-2 border-[#555555] mx-auto flex items-center justify-center text-white mb-2 shadow-sm group-hover:scale-110 transition-transform">
                    {project.hasVideo ? (
                      <Video className="w-6 h-6 text-[#E9C76A]" />
                    ) : (
                      <Boxes className="w-6 h-6 text-[#4565D6]" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#CCCCCC] block truncate max-w-[200px]">
                    {project.title}
                  </span>
                </div>

                {/* Badges on preview */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1A1A1A]/80 backdrop-blur-sm text-white">
                    {project.year}
                  </span>
                </div>

                {project.hasVideo && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-[#DA251C] text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-sm">
                    <Play className="w-2.5 h-2.5 fill-white" />
                    <span>ANIMATION</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#DB5F2D] font-bold mb-1">
                    {project.subtitle}
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-[#1A1A1A] mb-2 leading-snug group-hover:text-[#4565D6] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed line-clamp-3 mb-4">
                    {project.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DDD8CF] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#888888] truncate max-w-[120px]">
                    {project.toolsUsed[0]}
                  </span>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-[#EDE8E0] text-[#1A1A1A] rounded-lg border border-[#1A1A1A] text-xs font-bold shadow-retro-sm transition-all"
                  >
                    <span>Detail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
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

