"use client";

import React, { memo } from "react";
import { EXPERIENCES } from "@/data/portfolioData";

export const WorkExperienceTimeline = memo(function WorkExperienceTimeline() {
  return (
    <section id="work-experience-timeline" className="w-full py-12 space-y-8">
      <div className="inline-flex items-center px-6 py-3 rounded-[20px] border-[4px] border-black bg-[#DB5F2D] shadow-[8px_8px_0px_0px_#000]">
        <h2
          className="text-white text-2xl md:text-4xl"
          style={{ fontFamily: "'Bagel Fat One', cursive, sans-serif" }}
        >
          Working Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-[24px] border-[3px] border-black bg-[#FFFCF6] shadow-[6px_6px_0px_0px_#000] space-y-3"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-semibold">
              {exp.period}
            </span>
            <h3 className="text-xl font-bold text-black">{exp.company}</h3>
            <p className="text-sm font-semibold text-[#DB5F2D]">{exp.role}</p>
            <ul className="list-disc list-inside text-sm text-black/80 space-y-1">
              {exp.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
});

export default WorkExperienceTimeline;

