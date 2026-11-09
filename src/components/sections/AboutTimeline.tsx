"use client";

import React from "react";
import { EDUCATIONS, EXPERIENCES, TOOLS_USED } from "@/data/portfolio";
import { GraduationCap, Briefcase, Wrench, CheckCircle2 } from "lucide-react";

export const AboutTimeline: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-t-2 border-[#1A1A1A] bg-[#EDE8E0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#DB5F2D] bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#1A1A1A] mb-3">
              Background & Expertise
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-poppins text-[#1A1A1A] tracking-tight">
              Education & Experience
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#555555] max-w-md">
            Perjalanan akademik dan profesional dari animasi 3D, Desain Komunikasi Visual, hingga implementasi Digital Twin dan UI/UX tingkat enterprise.
          </p>
        </div>

        {/* Tools I Use */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-5 h-5 text-[#DB5F2D]" />
            <h3 className="text-xl sm:text-2xl font-bold font-poppins text-[#1A1A1A]">
              Tools I Use
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {TOOLS_USED.map((tool, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-3.5 rounded-xl border-2 border-[#1A1A1A] shadow-retro-sm hover:shadow-retro hover:-translate-y-1 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-[#DB5F2D] mb-1">
                  {tool.category}
                </div>
                <div className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#DB5F2D] transition-colors">
                  {tool.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Columns Grid: Education vs Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Column */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border-2 border-[#1A1A1A] shadow-retro">
            <div className="flex items-center gap-2 mb-6 border-b-2 border-dashed border-[#DDD8CF] pb-4">
              <GraduationCap className="w-6 h-6 text-[#DB5F2D]" />
              <h3 className="text-2xl font-bold font-poppins text-[#1A1A1A]">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATIONS.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-[#EDE8E0] p-5 rounded-xl border-2 border-[#1A1A1A] shadow-retro-sm relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold bg-[#1A1A1A] text-white px-2.5 py-0.5 rounded">
                      {edu.period}
                    </span>
                    <span className="text-xs font-mono text-[#666666] font-semibold">
                      {edu.field}
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-[#1A1A1A] mb-1 font-poppins">
                    {edu.degree}
                  </h4>
                  <div className="text-sm font-semibold text-[#DB5F2D] mb-3">
                    {edu.institution}
                  </div>
                  <div className="text-xs text-[#444444] font-mono bg-white/70 p-2.5 rounded-lg border border-[#1A1A1A]/30">
                    {edu.skills}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border-2 border-[#1A1A1A] shadow-retro">
            <div className="flex items-center gap-2 mb-6 border-b-2 border-dashed border-[#DDD8CF] pb-4">
              <Briefcase className="w-6 h-6 text-[#4565D6]" />
              <h3 className="text-2xl font-bold font-poppins text-[#1A1A1A]">
                Working Experience
              </h3>
            </div>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-[#EDE8E0] p-5 rounded-xl border-2 border-[#1A1A1A] shadow-retro-sm hover:shadow-retro transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold bg-[#4565D6] text-white px-2.5 py-0.5 rounded">
                      {exp.period}
                    </span>
                    <span className="text-sm font-black text-[#1A1A1A] font-poppins">
                      {exp.company}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[#1A1A1A] mb-2 font-poppins">
                    {exp.role}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#DDD8CF]">
                    {exp.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-[#1A1A1A]/20 text-[#333333]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#4A9460]" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

