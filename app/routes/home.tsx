import type { Route } from "./+types/home";
// import { Welcome } from "../welcome/welcome";
import { Store } from "../pages/store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Shape Store" },
    { name: "description", content: "Vite + React + React Router + ShadCD" },
  ];
}

export default function Home() {
  return <Store />;
}
