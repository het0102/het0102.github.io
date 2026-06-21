import { useState } from "react";
import About from "./About";
import Skill from "./Skill";
import Exprience from "./Exprience";
import Contact from "./Contact";
import Statistics from "./Statistics";
import Header from "./Header";
import Footer from "./Footer";
import ThreeCanvas from "./ThreeCanvas";
import Configurator from "./Configurator";

import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import Fade from "react-reveal/Fade";

const Home = () => {
  const [theme, setTheme] = useState("developer");
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const toggleConfig = () => {
    setIsConfigOpen((prev) => !prev);
  };

  return (
    <>
      {/* Interactive 3D WebGL Background */}
      <ThreeCanvas theme={theme} />

      <Header toggleConfig={toggleConfig} />

      {/* Dynamic 3D Configurator Drawer */}
      <Configurator
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentTheme={theme}
        setTheme={setTheme}
      />

      {/* Hero Section */}
      <section id="home">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-8 text-center hero-box glass-panel">
              <Fade big>
                <div>
                  <h1 className="content">
                    I'M <span className="content-name">HET SHAH</span>
                  </h1>
                  <div className="sub">
                    <Typewriter
                      options={{
                        strings: [
                          "Senior Software Developer",
                          "Angular & Node.js Specialist",
                          "React & Node.js Specialist",
                          "Full Stack Web Architect",
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                      }}
                    />
                  </div>
                  <p className="content2 mt-4">
                    Senior Software Developer with 5 years of experience
                    architecting and developing high-performance, scalable web
                    applications. Specialist in the MERN stack, Angular, and
                    message queuing systems.
                  </p>
                </div>
              </Fade>

              {/* Cyber Dashboard Terminal */}
              <div className="terminal-card text-start">
                <div className="terminal-header">
                  <span className="terminal-dot dot-red"></span>
                  <span className="terminal-dot dot-yellow"></span>
                  <span className="terminal-dot dot-green"></span>
                </div>
                <div className="terminal-code">
                  <p>
                    <span className="keyword">const</span> developer = &#123;
                  </p>
                  <p>
                    &nbsp;&nbsp;name: <span className="string">"Het Shah"</span>
                    ,
                  </p>
                  <p>
                    &nbsp;&nbsp;role:{" "}
                    <span className="string">"Senior Software Developer"</span>,
                  </p>
                  <p>
                    &nbsp;&nbsp;experience:{" "}
                    <span className="string">"5+ Years"</span>,
                  </p>
                  <p>
                    &nbsp;&nbsp;location:{" "}
                    <span className="string">"Gujarat, India"</span>,
                  </p>
                  <p>
                    &nbsp;&nbsp;stack: [<span className="string">"React"</span>,{" "}
                    <span className="string">"Node.js"</span>,{" "}
                    <span className="string">"Angular"</span>,{" "}
                    <span className="string">"MongoDB"</span>,{" "}
                    <span className="string">"RabbitMQ"</span>]
                  </p>
                  <p>&#125;;</p>
                </div>
              </div>

              <div className="mt-5">
                <Link to="about" smooth={true} duration={1000}>
                  <button className="btn btn-cyber me-3 mb-3">
                    Initialize Workspace
                  </button>
                </Link>
                <Link to="contact" smooth={true} duration={1000}>
                  <button className="btn btn-cyber btn-cyber-purple mb-3">
                    Hire Senior Dev
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skill">
        <Skill />
      </section>

      {/* Experience Section */}
      <section id="exprience">
        <Exprience />
      </section>

      {/* Stats Section */}
      <section id="statistics">
        <Statistics />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </>
  );
};

export default Home;
