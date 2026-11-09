"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { BlenderGizmo, BlenderToolbarStrip } from "@/components/ui/BlenderGizmo";
import { ArrowDown, Sparkles, Send, Download } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Decorative Blueprint / Coordinate Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-[#C8C1B2] border-dashed border-b" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-[#C8C1B2] border-dashed border-b" />
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-[#C8C1B2] border-dashed border-r hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-[#C8C1B2] border-dashed border-r hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Badge & Date */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] shadow-retro-sm">
            <span className="w-2 h-2 rounded-full bg-[#4A9460] animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wide">
              {PERSONAL_INFO.dateLabel}
            </span>
            <span className="text-xs text-[#888888]">&bull;</span>
            <span className="text-xs font-mono font-semibold text-[#DB5F2D]">
              {PERSONAL_INFO.headline}
            </span>
          </div>

          <BlenderToolbarStrip />
        </div>

        {/* Big Stylized "PORTFOLIO" Heading (Bagel Fat One) */}
        <div className="relative my-4 select-none">
          <div className="relative">
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-bagel leading-none tracking-tight text-[#1A1A1A] drop-shadow-[4px_4px_0px_#EDE8E0]">
              Portfolio
            </h1>
            <div className="absolute -top-3 left-1 text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-bagel leading-none tracking-tight text-[#DB5F2D]/15 -z-10 pointer-events-none">
              Portfolio
            </div>
          </div>

          {/* Subheading tags */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="text-base sm:text-xl font-bold font-poppins bg-[#1A1A1A] text-white px-4 py-1 rounded-md shadow-retro-sm">
              By. {PERSONAL_INFO.name}
            </span>
            <span className="text-xs sm:text-sm font-mono bg-[#E2DDD4] px-3 py-1 rounded-md border border-[#1A1A1A]">
              DKV Specialist &middot; 3D &middot; UI/UX
            </span>
          </div>
        </div>

        {/* Hero Content Grid with Blender Gizmo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
          {/* Main Bio Card */}
          <div className="lg:col-span-8 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border-2 border-[#1A1A1A] shadow-retro relative">
            <div className="absolute -top-3 right-6 bg-[#DB5F2D] text-white text-xs font-mono font-bold px-3 py-1 rounded-md border border-[#1A1A1A] shadow-retro-sm">
              SHORT DESCRIPTION
            </div>

            <div className="flex items-center gap-2 text-sm font-mono text-[#666666] mb-3">
              <Sparkles className="w-4 h-4 text-[#DB5F2D]" />
              <span>Hello, I am</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-poppins text-[#1A1A1A] mb-4 tracking-tight">
              {PERSONAL_INFO.name}
            </h2>

            <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-normal mb-6">
              {PERSONAL_INFO.bio}
            </p>

            {/* Quick Experience Badges from ESDM, ITB, Urbansolv */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-dashed border-[#DDD8CF]">
              <div className="bg-[#EDE8E0] p-3 rounded-xl border border-[#1A1A1A]">
                <div className="text-[11px] font-mono font-bold text-[#888888] uppercase">Current</div>
                <div className="text-sm font-bold text-[#1A1A1A]">Urbansolv</div>
                <div className="text-xs text-[#555555]">Multimedia Specialist</div>
              </div>

              <div className="bg-[#EDE8E0] p-3 rounded-xl border border-[#1A1A1A]">
                <div className="text-[11px] font-mono font-bold text-[#888888] uppercase">Research</div>
                <div className="text-sm font-bold text-[#1A1A1A]">SCCIC ITB</div>
                <div className="text-xs text-[#555555]">Digital Twin NTU Singapore</div>
              </div>

              <div className="bg-[#EDE8E0] p-3 rounded-xl border border-[#1A1A1A]">
                <div className="text-[11px] font-mono font-bold text-[#888888] uppercase">Government</div>
                <div className="text-sm font-bold text-[#1A1A1A]">Kementerian ESDM</div>
                <div className="text-xs text-[#555555]">Digital Geospatial & UI</div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href="#uiux-projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DB5F2D] text-white font-bold rounded-xl border-2 border-[#1A1A1A] shadow-retro hover:shadow-retro-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
              >
                <span>Lihat Karya Portofolio</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1A1A1A] font-bold rounded-xl border-2 border-[#1A1A1A] shadow-retro hover:bg-[#F2EFE9] transition-all text-sm"
              >
                <Send className="w-4 h-4 text-[#DB5F2D]" />
                <span>Mari Berkolaborasi</span>
              </a>
            </div>
          </div>

          {/* Side Widget: Interactive Gizmo & Scene Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex justify-center lg:justify-start">
              <BlenderGizmo />
            </div>

            <div className="bg-[#2B2B2B] text-[#C5C5C5] p-4 rounded-2xl border-2 border-[#1A1A1A] shadow-retro font-mono text-xs">
              <div className="flex items-center justify-between text-[#888888] border-b border-[#3E3E3E] pb-2 mb-2">
                <span>PROJECT STATS</span>
                <span className="text-[#4A9460] font-bold">READY</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>UI/UX Apps:</span>
                  <span className="text-white font-bold">6 Projects</span>
                </div>
                <div className="flex justify-between">
                  <span>3D & Animations:</span>
                  <span className="text-white font-bold">8 Projects</span>
                </div>
                <div className="flex justify-between">
                  <span>Major Stacks:</span>
                  <span className="text-[#E9C76A]">Blender &middot; Figma &middot; UE5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

