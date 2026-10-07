import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechMarquee from "../components/TechMarquee";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip bg-mono-background">
      <div className="dot-pattern pointer-events-none absolute inset-x-0 top-0 h-[120vh] opacity-50" />
      <div className="relative z-10 w-full">
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
