"use client";

import React, { useState } from "react";
import { Move, RotateCw, Scaling, MousePointer, Edit3, Ruler, Eye, Layers } from "lucide-react";

export const BlenderGizmo: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 15, y: -25 });

  const handleGizmoClick = (axis: string) => {
    if (axis === "x") setRotation({ x: 0, y: 90 });
    if (axis === "y") setRotation({ x: 90, y: 0 });
    if (axis === "z") setRotation({ x: 0, y: 0 });
    if (axis === "reset") setRotation({ x: 15, y: -25 });
  };

  return (
    <div className="relative inline-flex flex-col items-center p-3 rounded-2xl bg-[#2B2B2B] text-white border-2 border-[#1A1A1A] shadow-retro select-none">
      <div className="text-[10px] uppercase font-mono tracking-wider text-[#A0A0A0] mb-2 flex items-center justify-between w-full">
        <span>Viewport Gizmo</span>
        <button
          onClick={() => handleGizmoClick("reset")}
          className="hover:text-white transition-colors text-[9px] underline"
        >
          Reset
        </button>
      </div>

      {/* Interactive 3D Orbit Dial */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Outer Orbit Circle */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[#555555] animate-[spin_60s_linear_infinite]" />

        {/* Center Pivot */}
        <div className="w-3 h-3 rounded-full bg-[#E5E5E5] z-10 shadow-md" />

        {/* Z Axis - Blue (Top) */}
        <button
          onClick={() => handleGizmoClick("z")}
          title="Top View (Z)"
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#4565D6] hover:bg-[#3451B5] border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-bold text-white shadow-sm transition-transform hover:scale-110 active:scale-95"
        >
          Z
        </button>

        {/* X Axis - Red (Right) */}
        <button
          onClick={() => handleGizmoClick("x")}
          title="Right View (X)"
          className="absolute top-1/2 -right-1 -translate-y-1/2 w-7 h-7 rounded-full bg-[#DA251C] hover:bg-[#B71C1C] border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-bold text-white shadow-sm transition-transform hover:scale-110 active:scale-95"
        >
          X
        </button>

        {/* Y Axis - Green (Bottom Left) */}
        <button
          onClick={() => handleGizmoClick("y")}
          title="Front View (Y)"
          className="absolute bottom-1 left-3 w-7 h-7 rounded-full bg-[#4A9460] hover:bg-[#387A4A] border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-bold text-white shadow-sm transition-transform hover:scale-110 active:scale-95"
        >
          Y
        </button>

        {/* Connecting Axis Lines */}
        <div className="absolute w-[2px] h-10 bg-[#4565D6] top-3 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute h-[2px] w-10 bg-[#DA251C] top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute w-[2px] h-8 bg-[#4A9460] bottom-4 left-7 rotate-45 pointer-events-none" />
      </div>

      <div className="mt-2 text-[10px] font-mono text-[#888888] flex items-center gap-2">
        <span>Rot: {rotation.x}&deg;, {rotation.y}&deg;</span>
      </div>
    </div>
  );
};

export const BlenderToolbarStrip: React.FC = () => {
  const [activeTool, setActiveTool] = useState("cursor");

  const tools = [
    { id: "select", icon: MousePointer, label: "Select Box" },
    { id: "cursor", icon: Layers, label: "3D Cursor" },
    { id: "move", icon: Move, label: "Move Tool (G)" },
    { id: "rotate", icon: RotateCw, label: "Rotate Tool (R)" },
    { id: "scale", icon: Scaling, label: "Scale Tool (S)" },
    { id: "annotate", icon: Edit3, label: "Annotate" },
    { id: "measure", icon: Ruler, label: "Measure" },
  ];

  return (
    <div className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-[#282828] border-2 border-[#1A1A1A] shadow-retro-sm">
      {tools.map((t) => {
        const Icon = t.icon;
        const isActive = activeTool === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id)}
            title={t.label}
            className={`p-1.5 rounded-lg transition-all ${
              isActive
                ? "bg-[#4772B3] text-white shadow-sm"
                : "text-[#AAAAAA] hover:text-white hover:bg-[#3A3A3A]"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

