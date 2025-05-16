"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const press = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p"
});


export default function ProjectListPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session === null) {
    router.push("/login")
  }

  const [projects, setProjects] = useState([]);

  const handleBackButton = () => {
    router.push("/chatroom");
  }

  useEffect(() => {
    fetch("/api/project")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover overflow-y-auto px-4 py-10"
      style={{ backgroundImage: "url('/Background-night.png')" }}
    >
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-2xl space-y-8">
        <h1 className={`text-2xl font-bold text-center mb-6 ${press.className}`}>Your Xplorium Projects</h1>
        
        <ul className="space-y-4">
          {projects.map(project => (
            <li key={project.id} className="bg-blue-100 hover:bg-blue-200 transition rounded p-4 shadow">
              <Link href={`/projects/${project.id}`}>
                <div>
                  <h2 className={`text-sm font-semibold text-[#0180FF] ${press.className}`}>{project.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{project.description.slice(0, 100)}...</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={`text-xm px-4 py-2 rounded border cursor-pointer hover:bg-gray-200 ${press.className}`}
          onClick={() => handleBackButton()}  
        >
          Back
        </button>
      </div>
    </div>
  );
}
