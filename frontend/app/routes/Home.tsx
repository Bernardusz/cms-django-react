import type { Route } from "./+types/Home";
import { useNavigate } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="page">
            <div id="hero-section"
            className="flex flex-col justify-center items-center w-screen h-300 ">
                <section id="hero-section" className="flex flex-col items-center justify-center text-center p-24 bg-secondary text-primary">
                    <h1 className="text-5xl font-heading mb-4">A CMS That Actually Works — No Buzzwords.</h1>
                    <p className="max-w-2xl text-lg text-gray-600 dark:text-white font-main">
                        Built from scratch with React Router v7 and Django. Fully open-source. 
                        Simple. Clean. Powerful.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <button className="button-primary" onClick={() => navigate("/about")}>
                            Try the demo
                        </button>
                        <button className="button-primary">
                            View on GitHub    
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}
