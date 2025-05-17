import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { useRouter } from "next/router";


const press = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p"
});

export default function HomePage() {
  const router = useRouter();
  
  const handleSignInButton = () => {
    router.push("/login");
  }

  return (
    <div 
      className="relative min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/animationlandingpage.gif')"}}
    >
      {/* Sign In button */}
      <div className="absolute top-6 right-6">
        <Link href="/login">
          <button
            className={`bg-white text-xs text-gray-800 px-4 py-3 rounded-xl shadow cursor-pointer hover:bg-gray-200 ${press.className}`}
            onClick={() => handleSignInButton()}  
          >
            Sign In
          </button>
        </Link>
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* <h1 className={`text-4xl md:text-5xl text-yellow-400 font-bold mb-4 ${press.className}`}>
          Xplorium, Xplore The Maximum
        </h1>
        <p className="mb-8 text-lg md:text-xl text-gray-50">
          Let your imagination run wild with <span className={`font-semibold text-sm text-yellow-400 ${press.className}`}>Plo</span>, our AI chatbot
        </p> */}

        <Link href="/projects">
          <button className={`bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer text-white px-6 py-3 rounded-xl text-lg shadow-md transition ${press.className}`}>
            Start Xploring
          </button>
        </Link>
      </div>
    </div>
  );
}