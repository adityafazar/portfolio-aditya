"use client";

import React, { useState } from "react";
import { Boxes, Sparkles, FolderGit2, Mail, ExternalLink } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const blenderTabs = [
    { id: "layout", label: "Layout" },
    { id: "modeling", label: "Modeling" },
    { id: "shading", label: "Shading" },
    { id: "animation", label: "Animation" },
    { id: "geometry", label: "Geometry Nodes" },
    { id: "rendering", label: "Rendering" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#EDE8E0]/95 backdrop-blur-md border-b-2 border-[#1A1A1A]">
      {/* Top micro-bar: Blender Tab Bar */}
      <div className="bg-[#2B2B2B] text-xs text-[#C5C5C5] px-4 py-1.5 flex items-center justify-between overflow-x-auto select-none border-b border-[#1A1A1A]">
        <div className="flex items-center gap-1 min-w-max">
          <div className="flex items-center gap-1.5 mr-3 font-semibold text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA7600] inline-block shadow-[0_0_8px_#EA7600]" />
            <span>Blender Studio UI</span>
          </div>

          <div className="flex items-center gap-0.5">
            {blenderTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#4772B3] text-white shadow-sm"
                    : "hover:bg-[#3D3D3D] hover:text-white text-[#9E9E9E]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Viewport Gizmo Preview */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#AAAAAA] pl-4">
          <span className="text-[#DA251C] font-bold">X</span>
          <span className="text-[#4A9460] font-bold">Y</span>
          <span className="text-[#4565D6] font-bold">Z</span>
          <span className="text-[#888888] ml-2">Scene Collection</span>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="flex items-center gap-2 text-lg font-bold font-poppins text-[#1A1A1A] group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#DB5F2D] border-2 border-[#1A1A1A] flex items-center justify-center text-white font-bagel shadow-retro-sm group-hover:rotate-6 transition-transform">
              A
            </div>
            <span>Aditya Fazar</span>
            <span className="text-xs bg-[#1A1A1A] text-white px-2 py-0.5 rounded font-mono font-normal hidden md:inline-block">
              DKV &middot; 3D &middot; UI/UX
            </span>
          </a>
        </div>

        <nav className="flex items-center gap-1 sm:gap-3 text-xs sm:text-sm font-medium">
          <a
            href="#about"
            className="px-3 py-1.5 rounded-md hover:bg-[#DDD8CF] transition-colors"
          >
            Tentang
          </a>
          <a
            href="#uiux-projects"
            className="px-3 py-1.5 rounded-md hover:bg-[#DDD8CF] transition-colors"
          >
            UI/UX
          </a>
          <a
            href="#3d-projects"
            className="px-3 py-1.5 rounded-md hover:bg-[#DDD8CF] transition-colors"
          >
            3D & Animasi
          </a>
          <a
            href="#contact"
            className="ml-2 px-3.5 py-1.5 bg-[#DB5F2D] text-white rounded-md border-2 border-[#1A1A1A] shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 active:translate-y-0 transition-all font-semibold"
          >
            Hubungi
          </a>
        </nav>
      </div>
    </header>
  );
};

