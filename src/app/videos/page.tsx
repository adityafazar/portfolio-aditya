"use client";

import React, { useState } from "react";
import Link from "next/link";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  software: string;
  videoSrc: string;
  year: string;
  desc: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "battlefield",
    title: "Battlefield 3D Animation Short Film",
    category: "3D Animation",
    software: "Blender",
    videoSrc: "/figma/0001-0434.mp4",
    year: "2024",
    desc: "Animasi sinematik 3D bertema medan perang, dibuat sebagai proyek akhir UAS (2024).",
  },
  {
    id: "scifi-unreal",
    title: "Sci-Fi 3D Environment Animation",
    category: "Cinematic & Environment",
    software: "Unreal Engine 5",
    videoSrc: "/AQMWOdwGKuEVaV9CEDgR-3C6WQKKlcSUO7Buyu6fZHuJhh_7TUe8YicZ7KaZzOiXsB-1a8MQe1dVlYhoOn0gOQl2Z-vMPKSJk_-hkgw.mp4",
    year: "2024",
    desc: "Animasi sinematik sci-fi di Unreal Engine dengan pencahayaan dinamis Lumen dan Sequencer kamera.",
  },
  {
    id: "lancer-studio",
    title: "Lancer Evo IX Studio Neon Animation",
    category: "Vehicle Animation",
    software: "Blender",
    videoSrc: "/render.mp4",
    year: "2024",
    desc: "Animasi pencahayaan studio neon oranye dinamis pada model mobil sport Mitsubishi Lancer Evo IX.",
  },
  {
    id: "lancer-clay",
    title: "Lancer Evo IX Model & Rigging Breakdown",
    category: "3D Modeling & Rig",
    software: "Blender",
    videoSrc: "/figma/render 2.mp4",
    year: "2024",
    desc: "Breakdown proses modeling hard surface, armature rig, dan animasi suspensi kendaraan di Blender.",
  },
  {
    id: "japanese-garage",
    title: "3D Japanese Garage & Car Environment",
    category: "Environment & Vehicle",
    software: "Blender",
    videoSrc: "/figma/all render.mp4",
    year: "2024",
    desc: "Animasi lingkungan bengkel Jepang malam hari dengan tekstur aspal basah dan pencahayaan neon sinematik.",
  },
];

export default function VideosPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const categories = ["All", "3D Animation", "Cinematic & Environment", "Vehicle Animation", "3D Modeling & Rig"];

  const filteredVideos =
    activeFilter === "All"
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#EDE8E0] px-4 py-8 md:px-12 md:py-14 text-[#1A1A1A] font-sans selection:bg-[#4565D6] selection:text-white">
      <div className="mx-auto max-w-6xl">
        {/* Navigation Bar Back to Canvas */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-[#F8F6F2] px-4 py-2 font-bold text-sm shadow-[3px_3px_0px_#000] transition-all hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5"
          >
            ← Kembali ke Canvas Portfolio
          </Link>
          <span className="rounded-full border border-black/20 bg-white/60 px-3 py-1 text-xs font-bold text-black/70">
            Dedicated Video Gallery
          </span>
        </div>

        {/* Header Banner */}
        <section className="mb-10 rounded-[28px] border-4 border-black bg-[#F8F6F2] p-6 md:p-10 shadow-[6px_6px_0px_#000]">
          <span className="inline-block rounded-full border-2 border-black bg-[#D93B4B] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0px_#000]">
            3D Motion & Reel
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-black">
            Video Showcase & Animasi
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg font-medium text-black/75 leading-relaxed">
            Galeri lengkap animasi 3D, simulasi visual, dan proses breakdown karya Aditya Fazar Sanjaya.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-black/10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`rounded-xl border-2 border-black px-3.5 py-1.5 text-xs font-bold transition-all shadow-[2px_2px_0px_#000] ${
                  activeFilter === cat
                    ? "bg-black text-white"
                    : "bg-[#F8F6F2] text-black hover:bg-black/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Video Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-[24px] border-3 border-black bg-[#F8F6F2] shadow-[5px_5px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000]"
            >
              {/* Video Player Box */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedVideo(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedVideo(item);
                }}
                className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer border-b-3 border-black"
              >
                <video
                  src={item.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="rounded-full border-2 border-white bg-black/80 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                    ▶ Klik untuk Memperbesar
                  </span>
                </div>
              </div>

              {/* Video Description Box */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border-2 border-black bg-[#4565D6] px-2.5 py-0.5 text-[11px] font-black uppercase text-white shadow-[1px_1px_0px_#000]">
                      {item.software}
                    </span>
                    <span className="text-xs font-bold text-black/50">
                      {item.year}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-black text-black">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-black/70 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-black/60">{item.category}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(item)}
                    className="rounded-xl border-2 border-black bg-black px-3.5 py-1 text-xs font-bold text-white shadow-[2px_2px_0px_#000] transition-transform hover:scale-105"
                  >
                    Nonton Penuh
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Lightbox Video Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-[24px] border-4 border-black bg-[#F8F6F2] shadow-[8px_8px_0px_#000]"
          >
            <div className="flex items-center justify-between border-b-3 border-black bg-[#EDE8E0] px-5 py-3">
              <span className="text-sm font-black text-black">
                {selectedVideo.title} ({selectedVideo.software})
              </span>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-[#D93B4B] text-xs font-black text-white hover:bg-black transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                src={selectedVideo.videoSrc}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
            <div className="p-4 bg-[#F8F6F2]">
              <p className="text-sm font-medium text-black/80">{selectedVideo.desc}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

