import type { Route } from "./+types/Home";
import { useNavigate } from "react-router";
import Block from "~/components/Block";
import HParagraph from "~/components/HParagraph";
import RightArrow from "../../public/Arrow right.svg?react"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - CMS" },
    { name: "description", content: "A Content Management System that's made with React Router v7 and Django from scratch" },
  ];
}

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="page">
            <section id="hero-section" className="section pt-25">
                <h1 className="font-heading mb-4 bg-linear-to-br 
                from-primary via-white text-transparent to-primary
                hover:from-white hover:via-primary hover:to-white]
                 text-6xl bg-clip-text">
                    A CMS That Actually Works<br/> — No Buzzwords.</h1>
                <p className="max-w-2xl text-lg font-main">
                    Built from scratch with React Router v7 and Django. Fully open-source. 
                    Simple. Clean. Powerful.
                </p>
                <div>
                    <div className="mt-6 flex gap-4 w-full justify-center">
                        <button className="button-primary" onClick={() => navigate("/about")}>
                            Get started
                        </button>
                        <button className="button-primary">
                            View on GitHub    
                        </button>    
                    </div>
                    <button className="button-primary mt-5 w-full">
                        Tech used    
                    </button>
                </div>
            </section>
            <hr className="w-screen mt-40" />

            <section id="features" className="section">
                <div className="section-nested">
                    <HParagraph title="⚡ Modular Architecture" text="Made with 2 separate apps with separation of concerns in mind. Scalable and Maintainable"/>
                    <HParagraph title="💾 Built with Django + React Router v7" text="Made with 2 of the biggest frameworks in web industry."/>
                    <HParagraph title="🔐 JWT-ready Authentication" text="Secured with JSON Web Token, making sure users are safe."/>
                    <HParagraph title="🚀 API-first, SPA and SSR ready" text="Made with decoupled frontend that supports SPA and even SSR"/>

                </div>
            </section>

            <section id="how-it-works" className="section gap-10">
                <div className="w-full">
                    <h1 className="font-heading text-3xl text-left">📚 How it works</h1>
                </div>
                <p className="max-w-2xl text-lg font-main">“No magic. Just Django, React, and clean architecture.”</p>
                <div className="w-full flex flex-wrap gap-5 justify-center items-center">
                    <Block text="User"/>
                    <Block text="React Router Page"/>

                    <Block text="React Router Fetch / Axios"/>
                    <Block text="Zustand Stored Access Token"/>
                    <Block text="Django REST"/>
                    <Block text="PostgreSQL"/>  
                </div>     
            </section>

            <section id="demos" className="section">
                <div className="w-full">
                    <h1 className="font-heading text-3xl text-left">📷 Demos</h1>
                </div>
                <div className="w-[80vw] mt-20">
                    Soon to be added demos!
                </div>
            </section>
            <section id="contribute" className="section">
                <div className="w-full">
                    <h1 className="font-heading text-3xl text-left">✨ Contribute</h1>
                </div>
                <p className="font-main text-xl mt-10">“This is open source. Fork it, break it, fix it.”</p>

                <div className="flex flex-row gap-5 p-2 mt-5">
                    <button className="button-primary">⭐ Star on GitHub</button>
                    <button className="button-primary">🐛 Report Bug</button>
                    <button className="button-primary">💡 Suggest Feature</button>
                </div>
            </section>

            <section id="roadmap" className="section">
                <div className="w-full">
                    <h1 className="font-heading text-3xl text-left">🛣 Roadmap</h1>
                </div>
                <div className="section-nested">
                    <div id="roadmap-mvp-0.5" className="section-nested mt-10 border p-4 hover:scale-110 ">
                        <h1 className="font-heading text-3xl text-center">MVP - v0.5</h1>
                        <ul className="font-main text-xl mt-5">
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-0 before:content-['🔒']">
                                Authentication
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['✏']">
                                Simple CRUD Admin
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['⛔']">
                                Private & Public Content
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['📖']">
                                Dasboard UI
                            </li>
                        </ul>
                    </div>
                    <div id="roadmap-mvp-1" className="section-nested mt-10 border p-4 hover:scale-110">
                            <h1 className="font-heading text-3xl text-center">MVP - v1.0</h1>
                        <ul className="font-main text-xl mt-5">
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-0 before:content-['📚']">
                                3 Roles editing
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['📑']">
                                Rich Text Editor
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['👀']">
                                Improved UI
                            </li>
                        </ul>
                    </div>
                    <div id="roadmap-mvp-2" className="section-nested mt-10 border p-4 hover:scale-110">
                            <h1 className="font-heading text-3xl text-center">MVP - v2.0</h1>
                        <ul className="font-main text-xl mt-5">
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-0 before:content-['🔒']">
                                Better and Improved user roles and permissions
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['📂']">
                                Media manager (Upload, Preview)
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['⏰']">
                                Content scheduling
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['🔍']">
                                Search, Filter and Pagination
                            </li>
                            <li className="relative pl-10 text-left before:absolute before:left-0 before:top-1 before:content-['📖']">
                                Dashboard Analytics
                            </li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    );
}
