import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const press = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p"
})

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const handleBackButton = () => {
    router.push("/projects");
  }

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/project/${id}`)
        .then(res => res.json())
        .then(data => setProject(data));
    }
  }, [id]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p className={`text-lg ${press.className}`}>Loading your adventure...</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br bg-cover bg-right px-6 py-10 text-gray-800"
      style={{ backgroundImage: "url('/Background.png')" }}  
    >
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-blue-200">
        {/* Title */}
        <h1 className={`text-2xl text-center font-bold text-[#0180FF] mb-4 ${press.className}`}>{project.title}</h1>

        {/* Description */}
        <p className="text-lg mb-6 text-gray-700">{project.description}</p>

        {/* Preparations */}
        <div className="mb-8">
          <h2 className={`text-md font-semibold text-[#0180FF] mb-2 ${press.className}`}>What you'll need</h2>
          <ul className="list-inside space-y-1 text-gray-800">
            {project.prepare.map((item, idx) => (
              <li key={idx} className="pl-2">{item}</li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div>
          <h2 className={`text-md font-semibold text-[#0180FF] mb-2 ${press.className}`}>Let's get started!</h2>
          <ol className="list-inside space-y-2 text-gray-800">
            {project.steps.map((step, idx) => (
              <li key={idx} className="pl-2">{step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-4 flex">
          <button
            className={`text-xm px-4 py-2 rounded border cursor-pointer hover:bg-gray-200 ${press.className}`}
            onClick={() => handleBackButton()}  
          >
            Back
          </button>

          <button className={`ml-auto text-sm bg-green-400 px-4 py-2 rounded cursor-pointer hover:bg-green-500 ${press.className} text-white`}>
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}
