"use client";

import { Press_Start_2P } from "next/font/google";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const LoginButton = ({ onClick }) => {
  const [bgColor, setBgColor] = useState("#FFFFFF"); // Default warna putih
  const router = useRouter();

  return (
    <button
      
      onClick={() => router.push("/login")}
      onMouseEnter={() => setBgColor("#000000")} // Warna saat hover (hitam)
      onMouseLeave={() => setBgColor("#FFFFFF")} // Kembali ke putih saat dilepas
      className={`px-4 py-2 mr-5 text-[10px] font-['Press_Start_2P'] rounded-full shadow-md 
                  transition-all duration-200 active:bg-black active:text-white 
                  max-md:px-3 max-md:py-1.5 max-md:text-[9px] max-sm:px-2 max-sm:py-1 max-sm:text-[8px]`}
      style={{ backgroundColor: bgColor, color: bgColor === "#000000" ? "#FFFFFF" : "#000000" }} // Ubah warna teks sesuai background
    >
      Login
    </button>
  );
};
