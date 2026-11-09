"use client";

import React, { memo } from "react";
import { PERSONAL_INFO, EDUCATIONS, TOOLS_USED } from "@/data/portfolioData";

export const ProfileSection = memo(function ProfileSection() {
  return (
    <section id="profile-section" className="w-full py-12 space-y-12">
      {/* Personal Profile & Short Description */}
      <div className="space-y-6">
        <div className="inline-flex items-center px-6 py-3 rounded-[20px] border-[4px] border-black bg-[#4A9460] shadow-[8px_8px_0px_0px_#000]">
          <h2
            className="text-white text-2xl md:text-4xl"
            style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
          >
            {PERSONAL_INFO.name}
          </h2>
        </div>

        <div className="relative border-[3px] border-dashed border-[#0C8CE9] bg-[#0C8CE9]/[0.08] p-8">
          <p className="text-lg md:text-xl leading-relaxed text-black text-justify">
            {PERSONAL_INFO.bio}
          </p>
        </div>
      </div>

      {/* Education & Tools I Use Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education Column */}
        <div className="space-y-6">
          <div className="inline-flex items-center px-6 py-3 rounded-[20px] border-[4px] border-black bg-[#4A9460] shadow-[8px_8px_0px_0px_#000]">
            <h3
              className="text-white text-2xl"
              style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
            >
              Education
            </h3>
          </div>
          <div className="space-y-4">
            {EDUCATIONS.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-[24px] border-[3px] border-black bg-[#FFFCF6] shadow-[6px_6px_0px_0px_#000] space-y-2"
              >
                <span className="inline-block px-4 py-1 rounded-full border-2 border-black bg-[#4565D6] text-white text-sm font-semibold">
                  {edu.period}
                </span>
                <h4 className="text-xl font-bold text-black">{edu.degree}</h4>
                <p className="text-sm font-medium text-black/80">{edu.institution}</p>
                <p className="text-xs text-black/60">{edu.skills}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools I Use Column */}
        <div className="space-y-6">
          <div className="inline-flex items-center px-6 py-3 rounded-[20px] border-[4px] border-black bg-[#4A9460] shadow-[8px_8px_0px_0px_#000]">
            <h3
              className="text-white text-2xl"
              style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
            >
              Tools I Use
            </h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-6 rounded-[24px] border-[3px] border-black bg-[#FFFCF6] shadow-[6px_6px_0px_0px_#000]">
            {TOOLS_USED.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-2 text-center">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-12 h-12 object-contain"
                  draggable={false}
                />
                <span className="text-xs font-semibold text-black">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ProfileSection;

