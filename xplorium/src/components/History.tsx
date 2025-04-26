"use client";
import { Press_Start_2P } from "next/font/google";
import SignOutButton from "./SignOutButton";
import NavigationSidebar from "./NavigationSidebar";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function History() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <NavigationSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 bg-white relative">
        
        {/* Sign Out Button */}
        <div className="absolute top-4 right-4">
          <SignOutButton />
        </div>

        {/* Title */}
        <div className={`text-black ${pressStart2P.className} text-lg`}>
          History
        </div>

        {/* Empty Content */}
        <div className="flex flex-1 items-center justify-center">
          {/* You can leave it empty or put something later */}
        </div>

      </div>
    </div>
  );
}

export default History;
