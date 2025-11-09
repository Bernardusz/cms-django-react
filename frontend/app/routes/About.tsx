import type { Route } from "./+types/About";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const About = () => {
    return <h1 className="text-9xl">HELLO REACT!💀🐧</h1>
}

export default About;