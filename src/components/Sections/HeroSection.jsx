import React from 'react';
import { Link } from 'react-scroll';
import Typewriter from 'typewriter-effect';
import SceneCanvas from '../Character/SceneCanvas';

export const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background ambient glowing radial light behind character */}
      <div className="hero-scene-glow"></div>

      {/* Hero Content Container */}
      <div className="hero-container">
        {/* Intro / Name (Left column on desktop, Top on mobile/tablet) */}
        <div className="hero-col hero-intro">
          <div className="hero-status-pill mb-3">
            <span className="status-indicator"></span>
            <span className="font-mono status-text">ONLINE // GUJARAT, INDIA</span>
          </div>

          <span className="sub-tag">Hello! I'm</span>
          <h1 className="name-title">
            HET <span className="name-last">SHAH</span>
          </h1>

          {/* Desktop-only Bio & Badges (shown on left column for widescreen) */}
          <div className="hero-desktop-details d-none d-xl-block">
            <p className="hero-bio mt-4">
              Senior Software Developer with <strong>5+ years</strong> architecting high-performance,
              scalable web architectures, e-commerce ecosystems, and asynchronous message queues.
            </p>

            <div className="hero-badge-group mt-3">
              <span className="hero-badge">⚡ 5+ Yrs Exp</span>
              <span className="hero-badge">🏆 4x Awards</span>
              <span className="hero-badge">🚀 15+ Projects</span>
            </div>
          </div>
        </div>

        {/* 3D Character Interactive Stage (Center on desktop, Middle on mobile/tablet) */}
        <div className="hero-col hero-stage">
          <div className="hero-stage-halo"></div>
          <div className="hero-canvas-wrapper">
            <SceneCanvas />
          </div>
        </div>

        {/* Role & Actions (Right column on desktop, Bottom on mobile/tablet) */}
        <div className="hero-col hero-actions-col">
          <span className="role-sub">Sr. Software Engineer &</span>
          <h2 className="role-title">
            CREATIVE <span className="role-last">DEVELOPER</span>
          </h2>

          <div className="typewriter-box mt-2 mb-3">
            <span className="typewriter-prefix font-mono">&gt; </span>
            <Typewriter
              options={{
                strings: [
                  'Senior Software Developer',
                  'Angular, Node.js & MongoDB Specialist',
                  'React & Node.js Architect',
                  'Google Analytics & Clarity',
                ],
                autoStart: true,
                loop: true,
                delay: 45,
                deleteSpeed: 30,
              }}
            />
          </div>

          {/* Mobile & Tablet Bio & Badges (Cleanly placed in vertical reading order) */}
          <div className="hero-mobile-details d-xl-none">
            <p className="hero-bio mt-3 mb-3">
              Senior Software Developer with <strong>5+ years</strong> architecting high-performance,
              scalable web architectures, e-commerce ecosystems, and asynchronous message queues.
            </p>

            <div className="hero-badge-group mb-4">
              <span className="hero-badge">⚡ 5+ Yrs Exp</span>
              <span className="hero-badge">🏆 4x Awards</span>
              <span className="hero-badge">🚀 15+ Projects</span>
            </div>
          </div>

          <div className="hero-actions mt-2">
            <Link to="about" smooth={true} duration={800} offset={-70}>
              <button className="btn btn-cyber me-3 mb-2 interactive">
                Initialize Workspace
              </button>
            </Link>
            <Link to="contact" smooth={true} duration={800} offset={-70}>
              <button className="btn btn-cyber btn-cyber-purple mb-2 interactive">
                Hire Senior Dev
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="scroll-indicator-container">
        <Link to="about" smooth={true} duration={800} offset={-70} className="scroll-link interactive">
          <span className="scroll-label font-mono">SCROLL TO EXPLORE</span>
          <div className="scroll-chevron-box">
            <span className="scroll-chevron"></span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

