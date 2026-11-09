import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditya Fazar Sanjaya | 3D, Design & UI/UX Portfolio",
  description:
    "Portfolio of Aditya Fazar Sanjaya - Multimedia Specialist, UI/UX Designer & 3D Generalist with experience at Kementerian ESDM, SCCIC ITB, and Urbansolv.",
  keywords: [
    "Aditya Fazar",
    "Aditya Fazar Sanjaya",
    "Portfolio",
    "UI/UX Designer",
    "3D Generalist",
    "Blender 3D",
    "Digital Twin",
    "ESDM",
    "ITB",
  ],
  authors: [{ name: "Aditya Fazar Sanjaya" }],
  openGraph: {
    title: "Aditya Fazar Sanjaya | 3D, Design & UI/UX Portfolio",
    description: "Multimedia Specialist, UI/UX Designer & 3D Visual Designer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#EDE8E0] text-[#1A1A1A] antialiased selection:bg-[#DB5F2D] selection:text-white">
        {children}
      </body>
    </html>
  );
}
