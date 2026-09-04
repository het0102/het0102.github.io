import React from "react";
import Fade from "react-reveal/Fade";

const Experience = () => {
  const experiences = [
    {
      role: "Senior Software Developer",
      company: "Commerce Pundit Technologies",
      location: "Ahmedabad, India",
      duration: "July 2024 - Present",
      bullets: [
        "Developed and maintained critical modules for enterprise and e-commerce applications.",
        "Collaborated directly with international clients for requirement gathering and feature delivery.",
        "Mentored and trained 3 junior developers on Angular.js, Node.js, and MongoDB.",
        "Performed code reviews and ensured coding best practices.",
        "Participated in staging deployment, unit testing, debugging, and production support.",
        "Leveraged Agile methodologies to orchestrate the end-to-end delivery of scalable, high-performance web architectures.",
      ],
    },
    {
      role: "React.js Developer",
      company: "Commerce Pundit Technologies",
      location: "Ahmedabad, India",
      duration: "September 2021 - June 2024",
      bullets: [
        "Built responsive web applications using React.js, Node.js, JavaScript, and MongoDB.",
        "Handled frontend development, backend integration, and deployment support.",
        "Participated in client meetings and collaborated with teams for successful project delivery.",
        "Resolved bugs and optimized application performance.",
      ],
    },
    {
      role: "Trainee React.js Developer",
      company: "Commerce Pundit Technologies",
      location: "Ahmedabad, India",
      duration: "June 2021 - August 2021",
      bullets: [
        "Completed intensive React.js training and contributed directly to frontend feature development.",
      ],
    },
    {
      role: "Frontend Developer (Internship)",
      company: "Pruthatechno Market Pvt. Ltd.",
      location: "Gujarat, India",
      duration: "June 2020 - March 2021",
      bullets: [
        "Developed and enhanced multiple features with high customizability across e-commerce web applications.",
        "Developed the frontend for a price recommendation system for Amazon products (thetiger.live).",
        "Developed the UI for a converter application that packages web portals into mobile applications (pruthatek.app).",
        "Rebuilt the primary company corporate website using React.js (pruthatek.com).",
      ],
    },
  ];

  return (
    <div className="container my-5">
      <div className="section-title">
        <h2>Career Timeline</h2>
      </div>

      <div className="experience-timeline mt-5">
        {experiences.map((exp, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-marker"></div>
            <Fade left={idx % 2 === 0} right={idx % 2 !== 0}>
              <div className="timeline-content glass-panel">
                <h3 className="timeline-title">{exp.role}</h3>
                <h4 className="timeline-subtitle">{exp.company}</h4>
                <div className="timeline-duration">
                  <span>{exp.duration}</span> &nbsp;|&nbsp;{" "}
                  <span>{exp.location}</span>
                </div>
                <div className="timeline-body">
                  <ul>
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
