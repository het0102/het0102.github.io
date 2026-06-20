import React from "react";
import Fade from "react-reveal/Fade";

const Project = () => {
  const projectsData = [
    {
      title: "PirateMX Powersports - Admin Panel",
      desc: "Developed a comprehensive browser-based administrative platform to orchestrate vendor product inventories, manage pricing feeds, and automate bulk listing uploads directly to eBay and corporate web portals. Implemented background worker queue management using RabbitMQ.",
      tech: ["Angular.js", "Node.js", "MongoDB", "RabbitMQ", "Express.js"],
      type: "Enterprise Dashboard",
    },
    {
      title: "PirateMX Powersports - E-commerce Website",
      desc: "Designed and engineered client-facing storefront modules and e-commerce checkout flows for a high-traffic auto parts commerce platform. Directed backend integration, performance optimizations, bug resolution, and live deployment operations.",
      tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Bootstrap"],
      type: "E-Commerce System",
    },
    {
      title: "Pruthatek.app",
      desc: "Architected a converter platform enabling users to wrap existing web portals into fully compiled mobile applications within 24 hours simply by inputting a valid domain name.",
      tech: ["React.js", "Node.js", "Express.js", "MySQL"],
      type: "SaaS Utility",
    },
    {
      title: "The Tiger.live",
      desc: "Developed the frontend interface and integration hooks for a real-time price tracker and recommendation engine monitoring Amazon catalog items to notify subscribers of discount threshold alerts.",
      tech: ["React.js", "Python", "Django", "MongoDB"],
      type: "Analytics Tool",
    },
  ];

  return (
    <div className="container my-5">
      <div className="section-title">
        <h2>Key Projects</h2>
      </div>

      <div className="row mt-5 g-4">
        {projectsData.map((project, idx) => (
          <div key={idx} className="col-md-6">
            <Fade left={idx % 2 === 0} right={idx % 2 !== 0}>
              <div className="glass-panel project-card">
                <span
                  style={{
                    fontSize: "11px",
                    color:
                      idx % 2 === 0
                        ? "var(--color-cyan)"
                        : "var(--color-purple)",
                    fontFamily: "var(--font-orbitron)",
                    textTransform: "uppercase",
                  }}
                >
                  {project.type}
                </span>
                <h3 className="project-title mt-2">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((t, tIdx) => (
                    <span key={tIdx} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-cyber py-2 px-3"
                    style={{ fontSize: "12px" }}
                  >
                    Source Code
                  </button>
                  <button
                    className="btn btn-cyber btn-cyber-purple py-2 px-3"
                    style={{ fontSize: "12px" }}
                  >
                    Live Preview
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
