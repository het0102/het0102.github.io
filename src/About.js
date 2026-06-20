import React from "react";
import { Link } from "react-scroll";
import Fade from "react-reveal/Fade";
import Tada from "react-reveal/Tada";

const About = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 glass-panel p-5">
          <div className="section-title">
            <h2>About Me</h2>
          </div>

          <div className="row align-items-center mt-4">
            {/* Column 1: Picture & Status */}
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <Fade left>
                <img
                  className="about-circle-img mb-3"
                  src="./img/Prof._Het.png"
                  alt="Het Shah Profile"
                />
                <h3
                  className="mt-3"
                  style={{
                    fontWeight: "700",
                    fontFamily: "var(--font-orbitron)",
                  }}
                >
                  <Tada>Het Shah</Tada>
                </h3>
                <p
                  style={{
                    color: "var(--color-cyan)",
                    fontSize: "14px",
                    fontFamily: "var(--font-orbitron)",
                  }}
                >
                  Senior Software Developer
                </p>
              </Fade>
            </div>

            {/* Column 2: Details */}
            <div className="col-md-8">
              <Fade right>
                <p className="content-about">
                  I am a passionate <strong>Senior Software Developer</strong>{" "}
                  based in India, with 5 years of professional experience
                  building scalable e-commerce and enterprise applications.
                </p>

                {/* Key Strengths Grid */}
                <div className="row g-3 my-4">
                  <div className="col-sm-6">
                    <div className="glass-card p-3">
                      <h4
                        style={{
                          color: "var(--color-cyan)",
                          fontSize: "15px",
                          fontWeight: "700",
                          fontFamily: "var(--font-orbitron)",
                          marginBottom: "8px",
                        }}
                      >
                        ⚡ Technical Leadership
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                          margin: 0,
                          lineHeight: "1.6",
                        }}
                      >
                        Mentoring junior engineers, establishing styling
                        guidelines, and conducting rigorous code reviews.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="glass-card p-3">
                      <h4
                        style={{
                          color: "var(--color-purple)",
                          fontSize: "15px",
                          fontWeight: "700",
                          fontFamily: "var(--font-orbitron)",
                          marginBottom: "8px",
                        }}
                      >
                        ⚙️ Architecture & Queues
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                          margin: 0,
                          lineHeight: "1.6",
                        }}
                      >
                        Designing microservices architectures using RabbitMQ
                        messaging queues and MongoDB / SQL.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="glass-card p-3">
                      <h4
                        style={{
                          color: "var(--color-purple)",
                          fontSize: "15px",
                          fontWeight: "700",
                          fontFamily: "var(--font-orbitron)",
                          marginBottom: "8px",
                        }}
                      >
                        💼 E-Commerce Scale
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                          margin: 0,
                          lineHeight: "1.6",
                        }}
                      >
                        Architecting and scaling auto parts commerce platforms
                        (PirateMX Powersports) and listing integrations.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="glass-card p-3">
                      <h4
                        style={{
                          color: "var(--color-cyan)",
                          fontSize: "15px",
                          fontWeight: "700",
                          fontFamily: "var(--font-orbitron)",
                          marginBottom: "8px",
                        }}
                      >
                        🎓 Education & Growth
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                          margin: 0,
                          lineHeight: "1.6",
                        }}
                      >
                        B.E. in Computer Engineering from LDRP. Passionate about
                        WebGL and modern performance frameworks.
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>

              {/* <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="contact" smooth={true} duration={1000}>
                  <button className="btn btn-cyber">
                    Contact Me
                  </button>
                </Link>
                <a
                  href="./img/Het_Shah_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-cyber btn-cyber-purple"
                >
                  View Resume
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
