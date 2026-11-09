import React from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const metadata = {
  title: "Social Media Hub | Aditya Fazar Sanjaya",
  description: "Koleksi akun media sosial, karya visual, dan kanal interaktif Aditya Fazar Sanjaya.",
};

export default function SocialMediaPage() {
  const socialCards = [
    {
      platform: "Instagram Personal",
      handle: "@adityaafazar",
      url: "https://www.instagram.com/adityaafazar/?hl=en",
      desc: "Aktivitas personal, behind-the-scenes, eksplorasi kreatif harian, dan dokumentasi proyek.",
      color: "#E1306C",
      badge: "Personal & Lifestyle",
    },
    {
      platform: "Instagram 3D & Design",
      handle: "@fazar_desain",
      url: "https://www.instagram.com/fazar_desain/?hl=en",
      desc: "Showcase khusus karya 3D modeling, rendering Blender & Unreal Engine, animasi sinematik, dan UI/UX showcase.",
      color: "#C13584",
      badge: "Official Showcase",
    },
    {
      platform: "LinkedIn",
      handle: "Aditya Fazar Sanjaya",
      url: "https://www.linkedin.com/in/aditya-fazar-sanjaya-92a6a6383",
      desc: "Profil profesional, rekam jejak karir di Kementerian ESDM, SCCIC ITB, Urbansolv, serta jejaring industri.",
      color: "#0A66C2",
      badge: "Professional Network",
    },
    {
      platform: "WhatsApp Direct",
      handle: "+62 882-1846-6192",
      url: "https://wa.me/6288218466192",
      desc: "Kanal komunikasi langsung untuk konsultasi proyek, kolaborasi freelance, dan penawaran kerja sama.",
      color: "#25D366",
      badge: "Direct Contact",
    },
    {
      platform: "Email Resmi",
      handle: PERSONAL_INFO.email,
      url: `mailto:${PERSONAL_INFO.email}`,
      desc: "Kirim pesan resmi, brief proyek, atau proposal kerja sama formal melalui email.",
      color: "#EA4335",
      badge: "Business Inquiry",
    },
  ];

  return (
    <main className="min-h-screen bg-[#EDE8E0] px-4 py-8 md:px-12 md:py-14 text-[#1A1A1A] font-sans selection:bg-[#4565D6] selection:text-white">
      <div className="mx-auto max-w-5xl">
        {/* Navigation Bar Back to Canvas */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-[#F8F6F2] px-4 py-2 font-bold text-sm shadow-[3px_3px_0px_#000] transition-all hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5"
          >
            ← Kembali ke Canvas Portfolio
          </Link>
          <span className="rounded-full border border-black/20 bg-white/60 px-3 py-1 text-xs font-bold text-black/70">
            Social Media Hub
          </span>
        </div>

        {/* Header Banner */}
        <section className="mb-10 rounded-[28px] border-4 border-black bg-[#F8F6F2] p-6 md:p-10 shadow-[6px_6px_0px_#000]">
          <span className="inline-block rounded-full border-2 border-black bg-[#4565D6] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0px_#000]">
            Connect & Collaborate
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-black">
            Social Media & Kontak
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg font-medium text-black/75 leading-relaxed">
            Temukan akun media sosial, portofolio online, dan kanal komunikasi resmi Aditya Fazar Sanjaya di bawah ini.
          </p>
        </section>

        {/* Grid of Social Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialCards.map((card) => (
            <a
              key={card.handle}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-[24px] border-3 border-black bg-[#F8F6F2] p-6 shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full border-2 border-black px-3 py-0.5 text-[11px] font-black uppercase text-white shadow-[1px_1px_0px_#000]"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.badge}
                  </span>
                  <span className="text-sm font-bold text-black/50 group-hover:text-black group-hover:translate-x-1 transition-all">
                    Buka ↗
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-black text-black">
                  {card.platform}
                </h2>
                <p className="font-mono text-sm font-bold text-black/80">
                  {card.handle}
                </p>
                <p className="mt-3 text-sm text-black/70 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <span className="text-xs font-bold text-black/60">Tautan Langsung</span>
                <span
                  className="rounded-xl border-2 border-black px-3 py-1 text-xs font-bold text-white shadow-[2px_2px_0px_#000] transition-transform group-hover:scale-105"
                  style={{ backgroundColor: card.color }}
                >
                  Kunjungi
                </span>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}

