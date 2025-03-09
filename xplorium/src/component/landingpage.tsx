"use client";

import Image from 'next/image';
import { Press_Start_2P } from 'next/font/google';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

// Gunakan font di proyek
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const LandingPage = () => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("#D00000"); // Warna awal tombol

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {/* Navbar */}
      <Navbar />
      {/* Hero Image */}
      <div className="w-full h-1/3">
        <Image
          width={1920}
          height={1080}
          src="/landingpage.gif"
          alt="hero"
          className="w-full h-1/3 object-cover"
        />
      </div>

      {/* Get Started Button */}
      <button
        className={`fixed top-[75%] left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white font-semibold 
                    transition-all duration-200 shadow-lg active:shadow-xl active:scale-95 focus:outline-none
                    ${pressStart2P.className}`}
        style={{
          backgroundColor: bgColor,
          fontFamily: "'Press Start 2P', cursive",
          fontSize: "13px",
          letterSpacing: "1px",
          padding: "15px 30px",
          borderRadius: "30px",
        }}
        onMouseEnter={() => setBgColor("#B00000")} // Warna saat hover
        onMouseLeave={() => setBgColor("#D00000")} // Kembali ke warna awal
        onClick={() => router.push("/register")} // Arahkan ke /register
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
