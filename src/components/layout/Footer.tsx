"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio";
import { Mail, ArrowUp, Send, Check } from "lucide-react";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="border-t-2 border-[#1A1A1A] bg-[#2B2B2B] text-white">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block px-3 py-1 rounded bg-[#DB5F2D] text-white text-xs font-mono font-bold uppercase mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-poppins tracking-tight mb-4 text-white">
              Tertarik Berkolaborasi?
            </h2>
            <p className="text-sm sm:text-base text-[#AAAAAA] max-w-lg mb-8 leading-relaxed">
              Saya selalu terbuka untuk proyek baru, konsultasi UI/UX, visualisasi 3D, Digital Twin, maupun peluang kolaborasi menarik lainnya.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#DB5F2D] text-white font-bold text-sm border-2 border-[#1A1A1A] shadow-retro hover:bg-[#C24F22] hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Kirim Pesan Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#3D3D3D] text-white font-mono text-xs border border-[#555555] hover:bg-[#4D4D4D] transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#4A9460]" /> : <Send className="w-4 h-4" />}
                <span>{copied ? "Email Tersalin!" : PERSONAL_INFO.email}</span>
              </button>
            </div>
          </div>

          {/* Socials & Location Card */}
          <div className="lg:col-span-5 bg-[#1E1E1E] p-6 rounded-2xl border-2 border-[#1A1A1A] shadow-retro">
            <div className="text-xs font-mono text-[#888888] mb-4 uppercase">
              Connect Directly
            </div>

            <div className="space-y-3 font-mono text-sm">
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#282828] hover:bg-[#333333] border border-[#3E3E3E] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-[#0A66C2]" />
                  <span className="font-semibold text-white">LinkedIn</span>
                </div>
                <span className="text-xs text-[#888888] group-hover:text-white">&rarr;</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#282828] hover:bg-[#333333] border border-[#3E3E3E] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white">GitHub</span>
                </div>
                <span className="text-xs text-[#888888] group-hover:text-white">&rarr;</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#282828] hover:bg-[#333333] border border-[#3E3E3E] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <InstagramIcon className="w-5 h-5 text-[#E4405F]" />
                  <span className="font-semibold text-white">Instagram</span>
                </div>
                <span className="text-xs text-[#888888] group-hover:text-white">&rarr;</span>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-[#333333] flex items-center justify-between text-xs text-[#888888] font-mono">
              <span>Lokasi: {PERSONAL_INFO.location}</span>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Retro Blender Status Bar */}
      <div className="bg-[#181818] border-t border-[#333333] px-4 py-2 text-[11px] font-mono text-[#888888] flex flex-wrap items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-3">
          <span className="text-[#DB5F2D] font-bold">Blender 4.x Viewport</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">Verts: 14,210</span>
          <span className="hidden sm:inline">Faces: 12,892</span>
          <span className="hidden sm:inline">Tris: 25,640</span>
          <span>Mem: 48.2 MB</span>
        </div>

        <div>
          &copy; 2026 {PERSONAL_INFO.name}. Designed &amp; Crafted with Next.js &amp; Tailwind.
        </div>
      </div>
    </footer>
  );
};
