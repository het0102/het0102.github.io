import React from "react";
import About from "./About";
import Skill from "./Skill";
import Exprience from "./Exprience";
import Contact from "./Contact";
import Statistics from "./Statistics";
import Header from "./Header";
import Footer from "./Footer";
import ThreeCanvas from "./ThreeCanvas";
import HeroSection from "./components/Sections/HeroSection";
import TechMarquee from "./components/UI/TechMarquee";
import { useScrollAnimations } from "./hooks/useScrollAnimations";

const Home = () => {
  // Activate GSAP scroll-triggered entrance animations
  useScrollAnimations();

  return (
    <>
      {/* Background vignette & ambient gradient mesh */}
      <div className="ambient-background" />

      {/* Interactive 3D WebGL Background Canvas */}
      <ThreeCanvas theme="developer" />

      {/* Navigation Header */}
      <Header />

      {/* Redesigned 3D Hero Section (3-Column Split + 3D Viewport) */}
      <HeroSection />

      {/* High-speed Tech Stack Marquee */}
      <TechMarquee />

      {/* About Section */}
      <section id="about" className="reveal-on-scroll">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skill" className="reveal-on-scroll">
        <Skill />
      </section>

      {/* Experience Section */}
      <section id="exprience" className="reveal-on-scroll">
        <Exprience />
      </section>

      {/* Statistics & Awards Section */}
      <section id="statistics" className="reveal-on-scroll">
        <Statistics />
      </section>

      {/* Contact Section */}
      <section id="contact" className="reveal-on-scroll">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
