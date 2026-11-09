"use client";

import React from "react";
import { Project } from "@/data/portfolio";
import { X, Calendar, Layers, User, Sparkles, Check, ExternalLink, Play } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] rounded-2xl border-2 border-[#1A1A1A] shadow-retroLg p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#EDE8E0] hover:bg-[#DDD8CF] border-2 border-[#1A1A1A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[#1A1A1A]" />
        </button>

        {/* Category & Year */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded bg-[#DB5F2D] text-white border border-[#1A1A1A]">
            {project.category}
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded bg-[#E2DDD4] border border-[#1A1A1A]">
            {project.year}
          </span>
          {project.platform && (
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#E2DDD4] border border-[#1A1A1A]">
              {project.platform}
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-[#1A1A1A] mb-1">
          {project.title}
        </h3>
        <p className="text-sm font-semibold text-[#888888] mb-6">
          {project.subtitle} &bull; {project.client || "Portfolio Project"}
        </p>

        {/* Project Meta Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#EDE8E0] border border-[#1A1A1A] mb-6 text-xs font-mono">
          <div>
            <div className="text-[#888888] flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5" /> YEAR
            </div>
            <div className="font-bold text-[#1A1A1A]">{project.year}</div>
          </div>
          <div>
            <div className="text-[#888888] flex items-center gap-1 mb-1">
              <Layers className="w-3.5 h-3.5" /> PLATFORM
            </div>
            <div className="font-bold text-[#1A1A1A]">{project.platform || "Design / 3D"}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[#888888] flex items-center gap-1 mb-1">
              <User className="w-3.5 h-3.5" /> CLIENT / ORG
            </div>
            <div className="font-bold text-[#1A1A1A] truncate">{project.client || "Self Project"}</div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-6">
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#DB5F2D] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> OVERVIEW
          </h4>
          <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
            KEY FEATURES
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#1A1A1A]/30 text-xs font-medium text-[#222222]"
              >
                <div className="w-4 h-4 rounded-full bg-[#4A9460] flex items-center justify-center text-white shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Used */}
        <div className="mb-6">
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
            TOOLS USED
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.toolsUsed.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#1A1A1A] text-white"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t-2 border-dashed border-[#DDD8CF] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border-2 border-[#1A1A1A] bg-white text-sm font-bold shadow-retro-sm hover:bg-[#F2EFE9] transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

