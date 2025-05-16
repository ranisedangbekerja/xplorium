import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const press = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p"
})

export default function Home() {
  // States
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "What do you want to explore today?", 
      sender: "bot" 
    }
  ]);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [proposedProjects, setProposedProjects] = useState([]);
  const [customTopic, setCustomTopic] = useState("");
  const router = useRouter();

  // Handler for project recommendations from "Generate more" button
  const handleNewProjects = (newProjects) => {
    const uniqueProjects = newProjects.filter(
      project => !proposedProjects.some(
        existing => existing.title.toLowerCase() === project.title.toLowerCase()
      )
    );
    setProposedProjects(prev => [...prev, ...uniqueProjects]);
    
    return uniqueProjects;
  };

  const handleSelectedProject = (project) => {
    const projectTitle = project.title;
    const projectPrepare = project.prepare;
    const steps = project.steps;
  }

  // Handlers
  // Category Click Handler
  const handleCategoryClick = async (categorySelect) => {
    // User message
    setMessages(prev => [...prev, { 
      text: `I want to explore ${categorySelect}`, 
      sender: "user" }]);

    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Suggest 3 hands-on project ideas about ${categorySelect} for kids ages 8-12. Respond in strict JSON format only: [{"title":"...","description":"..."}]`
        }),
      });
      const { text, error } = await response.json();

      // if (error) throw new Error(error);

      // const projects = JSON.parse(text);
      const projects = handleNewProjects(JSON.parse(text));

      setMessages(prev => [...prev, {
        text: `Here are some projects about ${categorySelect}!`,
        sender: "bot",
        projects
      }]);

      // setProposedProjects(prev => [...prev, ...projects]);
    }
    catch (error) {
      setMessages(prev => [...prev, {
        text: "Oops! Let's try that again. Pick a category:", 
        sender: "bot"
      }]);
    }
    finally {
      setIsLoading(false);
      setCategory(categorySelect)
    }
  };

  // Custom Topic (More Button) Handler
  const handleCustomTopic = async (userInput) => {
    setMessages(prev => [...prev, { text: `I want to explore ${userInput}`, sender: "user" }])
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Suggest 3 hands-on project ideas about ${userInput} for kids ages 8-12. Respond in strict JSON format only: [{"title":"...","description":"..."}]`
        }),
      });
      const { text, error } = await response.json();

      if (error) throw new Error(error);
      
      // const projects = JSON.parse(text);
      const projects = handleNewProjects(JSON.parse(text));

      setMessages(prev => [...prev, {
        text: `Here are some projects about ${userInput}!`,
        sender: "bot",
        projects
      }]);
    }
    catch (error) {
      setMessages(prev => [...prev, {
        text: "Oops! Let's try that again. Pick a category:", 
        sender: "bot"
      }]);
    }
    finally {
      setIsLoading(false);
      setIsInputEnabled(false);
      setCategory(userInput);
    }
  };

  // After Selecting a Project Handler
  const handleProjectSelect = async (project) => {
    setIsLoading(true);
    setMessages(prev => [...prev, {
      text: `I want to do the "${project.title}"`,
      sender: "user"
    }]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Provide a step-by-step guide for kids to build: ${project.title}. Include materials and instructions.`
        }),
      });

      // const { text, error } = await response.json();
      const data = await response.json();
      router.push(`/projects/${data.project.id}`);
      
      if (error) throw new Error(error);

      setMessages(prev => [...prev, { text, sender: "bot" }]);
    }
    catch (error) {
      setMessages(prev => [...prev, { text: "Failed to generate guide. Try again later.", sender: "bot" }]);
    } 
    finally {
      setIsLoading(false);
    }
  };

  // "Generate More" Button Handler 
  const handleGenerateMore = async() => {
    setIsLoading(true);
    
    try {
      const existingTitles = proposedProjects.map(p => p.title).join(", ");

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Suggest 3 NEW hands-on project ideas about ${category} for kids. Exclude these existing projects: ${existingTitles}. Use this exact JSON format: [{"title":"...","description":"..."}]`
        }),
      });

      const { text, error } = await response.json();

      if (error) throw new Error(error);
      
      // const newProjects = JSON.parse(text);
      const newProjects = handleNewProjects(JSON.parse(text));

      setMessages(prev => [...prev, {
        text: `Please generate more`,
        sender: "user",
      }]);

      setMessages(prev => [...prev, {
        text: `Here are some more projects about ${category}!`,
        sender: "bot",
        projects: newProjects
      }]);
    }
    catch (error) {
      setMessages(prev => [...prev, {
        text: "Could't generate more projects. Try again later.",
        sender: "bot"
      }]);

      console.error("More project error", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  console.log(messages);

  return (
    <div
      className="bg-cover bg-bottom min-h-screen overflow-auto"
      style={{ backgroundImage: "url('/Background-kosong.png')" }}
    >
      <div className="absolute top-4 right-4">
        <button
          className={`text-xs cursor-pointer bg-red-500 rounded-md px-4 py-2 text-white shadow hover:bg-red-700 transition ${press.className}`}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </button>
      </div>
      <div className=" flex-1 flex flex-col h-screen p-4 max-w-4xl mx-auto space-y-4">
      {/* Chat messages container */}
      {!isInputEnabled && !category &&
        <div className="px-10 flex flex-1 justify-center items-end">
          <div className="flex justify-center items-center">
            <Image
              src={"/Maskot-plo-miring.png"}
              width={150}
              height={150}
              draggable="false"
              alt="Maskot Plo Miring"
            />
            <h1 className={`font-bold text-xl text-white ${press.className}`}>Hi, Xplorers! What do you want to Xplore with Plo?</h1>
          </div>
        </div>
      }

      {/* Input area (initially hidden) */}
      {isInputEnabled && (
        <div className="flex flex-1 flex-col justify-center items-center gap-x-4 gap-y-4">
          {/* Text input + Send button */}
          <h1 className={`${press.className} text-white text-2xl text-center mb-4`}>What other thing you want to Xplore?</h1>
          <div className="flex gap-2 flex-col">
            <div className="space-x-2">
              <input
                className={`w-[500px] p-2 border rounded text-white ${isLoading ? "opacity-50" : ""}`}
                placeholder="Type your topic..."
                onChange={(e) => setCustomTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomTopic(customTopic)}
                disabled={isLoading}
              />
            </div>
            <button
              className="w-1/6 p-2 rounded bg-gray-100 cursor-pointer hover:bg-gray-200"
              onClick={() => setIsInputEnabled(false)}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Category buttons (initial state) */}
      {!isInputEnabled && !category && (
        <div className="flex flex-col items-center justify-start flex-1">
          <div className="items-start justify-center space-y-4">
            <div className="grid grid-cols-5 gap-2">
              
              {/* Robotics */}
              <div>
                <button onClick={() => handleCategoryClick("Robotics")}>
                    <Image
                      width={1920}
                      height={1080}
                      src={"/Button-Robotics.png"}
                      alt={"Frame Robotics"}
                      className="w-[100px] h-[100px] object-cover hover:cursor-pointer hover:-translate-y-2 transition-transform"
                      draggable="false"
                    />
                </button>
              </div>

              {/* Physics */}
              <div>
                <button onClick={() => handleCategoryClick("Physics")}>
                    <Image
                      width={1920}
                      height={1080}
                      src={"/Button-Physics.png"}
                      alt={"Frame Physics"}
                      className="w-[100px] h-[100px] object-cover hover:cursor-pointer hover:-translate-y-2 transition-transform"
                      draggable="false"
                    />
                </button>
              </div>

              {/* Biology */}
              <div>
                <button onClick={() => handleCategoryClick("Biology")}>
                    <Image
                      width={1920}
                      height={1080}
                      src={"/Button-Biology.png"}
                      alt={"Frame Biology"}
                      className="w-[100px] h-[100px] object-cover hover:cursor-pointer hover:-translate-y-2 transition-transform"
                      draggable="false"
                    />
                </button>
              </div>

              {/* Art */}
              <div>
                <button onClick={() => handleCategoryClick("Art")}>
                    <Image
                      width={1920}
                      height={1080}
                      src={"/Button-Art.png"}
                      alt={"Frame Art"}
                      className="w-[100px] h-[100px] object-cover hover:cursor-pointer hover:-translate-y-2 transition-transform"
                      draggable="false"
                    />
                </button>
              </div>

              {/* More button */}
              {/* More */}
              <div>
                <button onClick={() => setIsInputEnabled(true)}>
                    <Image
                      width={1920}
                      height={1080}
                      src={"/Button-More.png"}
                      alt={"Frame More"}
                      className="w-[100px] h-[100px] object-cover hover:cursor-pointer hover:-translate-y-2 transition-transform"
                      draggable="false"
                    />
                </button>
              </div>
            </div>
            <div className={`cursor-pointer hover:bg-white hover:text-[#0180FF] px-4 py-2 rounded-md border text-white text-center mx-auto text-sm ${press.className}`} onClick={() => router.push("/projects")}>
              <button className="cursor-pointer">
                Go to my projects
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the messages */}
      {category && messages.map((msg, i) => (
        <div
          key={i} 
          className={`p-3 text-lg ${msg.sender === "bot" ? "rounded-xl text-white" : "bg-white ml-auto rounded-tl-3xl rounded-b-3xl"}`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {msg.text}

          {/* Render the projects in card format */}
          {msg.projects && (
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                {msg.projects.map((project, j) => (
                  <div
                    key={j}
                    className={`flex flex-col justify-center items-center p-3 border rounded-lg cursor-pointer mt-4 transition text-white hover:bg-white hover:text-black hover:-translate-y-2`}
                    onClick={() => handleProjectSelect(project)}
                  >
                    {/* Title */}
                    <h3 className={`${press.className} text-xs mb-4`}>{project.title}</h3>

                    {/* Description */}
                    <p className="text-md">{project.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Generate more button */}
              {/* <div className="ml-auto">
                <button 
                  className="p-3 border rounded-lg cursor-pointer transition hover:bg-[#0180FF]"
                  onClick={handleGenerateMore}
                >
                  Generate More
                </button>
              </div> */}
            </div>
          )}
        </div>
      ))}

      {/* Loading Animation */}
      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Generate more button */}
      {!isLoading && category && 
        <div className="mx-auto">
          <button 
            className={`p-3 mb-5 border rounded-lg cursor-pointer transition text-sm text-white hover:bg-white hover:text-black ${press.className}`}
            onClick={handleGenerateMore}
          >
            Generate More
          </button>
        </div>
      }
      </div>
    </div>
  );
}