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
      className="h-screen px-4 py-10 overflow-y-auto bg-cover"
      style={{ backgroundImage: "url('/Background-night.png')" }}
    >
      <div className="max-w-3xl p-8 mx-auto space-y-8 bg-white shadow-lg rounded-2xl">
        <h1 className={`text-2xl font-bold text-center mb-6 ${press.className}`}>Your Xplorium Projects</h1>
        
        <ul className="space-y-4">
          {projects.map(project => (
            <li key={project.id} className="p-4 transition bg-blue-100 rounded shadow hover:bg-blue-200">
              <Link href={`/projects/${project.id}`}>
                <div>
                  <h2 className={`text-sm font-semibold text-[#0180FF] ${press.className}`}>{project.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{project.description.slice(0, 100)}...</p>
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
